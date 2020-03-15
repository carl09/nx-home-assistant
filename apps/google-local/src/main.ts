import * as express_ from 'express';
import * as http from 'http';
import { environment } from './environments/environment';
import { namedLog } from '@nx-home-assistant/common';

const log = namedLog('Main');

log.debug('Environment', environment);

const options = environment.production
  ? readFileAsJson('/data/options.json')
  : environment.options;

log.debug('App options', options);

const jwt = readFileAsJson(options.googleJwtPath);

import * as admin from 'firebase-admin';
admin.initializeApp({
  credential: admin.credential.cert(jwt as admin.ServiceAccount),
  databaseURL: options.firebase.databaseURL
});

import { DataAccess } from './app/data-access';
import { IUDPOptions, startUDPServer } from './app/discover-server';
import { createRestServer } from './app/rest-server';
import { createWebSocket } from './app/socket-server';
import { smarthome, SmartHomeJwt } from 'actions-on-google';
import { readFileAsJson } from './utils/file';


const express = express_;

const smarthomeApp = smarthome({
  debug: !environment.production,
  key: options.firebase.apikey,
  jwt: jwt as SmartHomeJwt
});

const app = express();

const port = 8088;

const env = process.env;
const token: string = env.HASSIO_TOKEN || environment.homeAssistaneApiKey;

log.debug('Token', token);

const supervisorToken = env.SUPERVISOR_TOKEN;

log.debug('SupervisorToken', supervisorToken);

const argv: IUDPOptions = {
  udp_discovery_port: 3311,
  udp_discovery_packet: 'A5A5A5A5',
  device_id: 'strand1',
  device_model: '',
  hardware_revision: '',
  firmware_revision: ''
};

const dataAccess: DataAccess = new DataAccess(token, smarthomeApp);

createRestServer(app, dataAccess, token, supervisorToken);

const server = http.createServer(app);

createWebSocket(server, dataAccess);

server.listen(port);

if (environment.production) {
  startUDPServer(argv);
}
