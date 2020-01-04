import * as bodyParser from 'body-parser';
import * as express_ from 'express';
import * as fs from 'fs';
import { execute } from './app/device/device.execute';
import { IUDPOptions, startUDPServer } from './app/discover';

const optionsFile = { devices: [] }; // require("/data/options.json");

console.log('devices', optionsFile.devices);

const express = express_;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = 8088;

const env = process.env;
const token = env.HASSIO_TOKEN as string;

const argv: IUDPOptions = {
  udp_discovery_port: 3311,
  udp_discovery_packet: 'A5A5A5A5',
  device_id: 'strand1',
  device_model: '',
  hardware_revision: '',
  firmware_revision: ''
};

app.get('/', (_req, res) => {
  console.log('request', res);
  res.send('Hello World! again');
});

app.get('/api/fs', (_req, res) => {
  if (!fs.existsSync('/config/google_local.json')) {
    fs.writeFileSync('/config/google_local.json', '');
  }

  res.json();
});

app.get('/api/devices', (_req, res) => {
  // console.log("list devices", optionsFile.devices);
  res.json({
    devices: optionsFile.devices || []
  });
});

app.post('/api/execute/:id', async (req, res) => {
  const id = req.params.id;

  const body: {
    devices: any;
    execution: Array<{
      command: string;
      params: { [key: string]: any };
    }>;
  } = req.body;

  const result = await execute(
    body.execution[0].command,
    token,
    id,
    body.execution[0].params
  );

  res.status(200).json(result);
});

app.use((_req, res, _next) => {
  console.log('request 404', res);
  res.status(404).send("Sorry can't find that!");
});

console.log(
  'all',
  Object.keys(env).reduce((acc, k) => {
    if (!k.startsWith('npm')) {
      acc[k] = env[k];
    }
    return acc;
  }, {})
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

startUDPServer(argv);
