import { encode } from 'cbor';
import { createSocket } from 'dgram';
import { namedLog } from '@nx-home-assistant/common';

const log = namedLog('UDP Service');

export interface IUDPOptions {
  udp_discovery_packet: string;
  device_id: string;
  device_model: string;
  hardware_revision: string;
  firmware_revision: string;
  udp_discovery_port: number;
}

export const startUDPServer = (argv: IUDPOptions) => {
  const socket = createSocket('udp4');
  // Handle discovery request.
  socket.on('message', (msg, rinfo) => {
    const discoveryPacket = Buffer.from(argv.udp_discovery_packet, 'hex');
    if (msg.compare(discoveryPacket) !== 0) {
      log.warn(`received unknown payload from ${rinfo}:`, msg);
      return;
    }
    const discoveryData = {
      id: argv.device_id,
      model: argv.device_model,
      hw_rev: argv.hardware_revision,
      fw_rev: argv.firmware_revision,
      isLocalOnly: true,
      isProxy: true
    };
    const responsePacket = encode(discoveryData);
    socket.send(responsePacket, rinfo.port, rinfo.address, error => {
      if (error !== null) {
        log.error('failed to send ack:', error);
        return;
      }
    });
  });
  socket
    .on('listening', () => {
      log.info('discovery listening', socket.address());
    })
    .bind(argv.udp_discovery_port);
};
