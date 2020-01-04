import { encode } from 'cbor';
import { createSocket } from 'dgram';

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
      console.warn('received unknown payload:', msg, 'from:', rinfo);
      return;
    }
    // console.debug("received discovery payload:", msg, "from:", rinfo);
    // Reply to discovery request with device parameters encoded in CBOR.
    // note: any encoding/properties could be used as long as the app-side can
    // interpret the payload.
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
        console.error('failed to send ack:', error);
        return;
      }
      // console.debug("sent discovery response:", discoveryData, "to:", rinfo);
    });
  });
  socket
    .on('listening', () => {
      console.log('discovery listening', socket.address());
    })
    .bind(argv.udp_discovery_port);
};
