import { CallService, execute, get, post, namedLog } from '@nx-home-assistant/common';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express_ from 'express';
import { take, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { DataAccess } from './data-access';
import * as fs from 'fs';
import { getWebRootPath } from '../utils/file';

const log = namedLog('Rest Service');
const express = express_;

const callLocalService = (token: string): CallService => {
  return (domain: string, service: string, data: { [key: string]: string }) => {
    return post<{}>(
      `${environment.homeAssistaneRestUri}/services/${domain}/${service}`,
      token,
      data
    );
  };
};

export const createRestServer = (
  app: express_.Express,
  dataAccess: DataAccess,
  token: string,
  supervisorToken?: string
) => {
  dataAccess
    .getManagedDevices()
    .pipe(
      take(1),
      map(x => {
        return x.map(y => y.entityId);
      })
    )
    .toPromise()
    .then(x => {
      log.info('managedDevices', x);
    });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());

  if (!environment.production) {
    app.use(cors());
  }

  app.get('/', async (_req, res) => {
    log.info('request 404', {
      url: _req.url,
      originalUrl: _req.originalUrl,
      path: _req.path
    });

    const addonsInfo = await get<any>(
      `http://supervisor/addons/self/info`,
      supervisorToken || token
    );

    const file = fs.readFileSync(getWebRootPath('index.html'), 'utf8');

    const data = (file as any).replace(
      `<base href="/" />`,
      `<base href="${addonsInfo.ingress_url}" />`
    );

    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    res.write(data);

    res.end();
  });

  app.get('/api/devices', async (_req, res) => {
    const devices = await dataAccess
      .getManagedDevices()
      .pipe(
        take(1),
        map(x => {
          return x.map(y => y.entityId);
        })
      )
      .toPromise();

    res.json({
      devices: devices || []
    });
  });

  app.post('/api/execute/:id', async (req, res) => {
    const id = req.params.id;

    const body: {
      devices: any;
      execution: {
        command: string;
        params: { [key: string]: any };
      }[];
    } = req.body;

    log.info('Local Execution', {
      command: body.execution[0].command,
      params: body.execution[0].params
    });

    const result = await execute(
      body.execution[0].command,
      callLocalService(token),
      id,
      body.execution[0].params
    );

    res.status(200).json(result);
  });

  app.use('/assets', express.static(getWebRootPath('assets')))

  app.use((_req, res, _next) => {
    const segments = _req.url.split('/');

    const fileName = segments[segments.length - 1];

    if (fs.existsSync(getWebRootPath(fileName))) {
      let contentType = 'text/html';

      if (fileName.endsWith('js')) {
        contentType = 'text/javascript';
      } else if (fileName.endsWith('css')) {
        contentType = 'text/css';
      }

      res.writeHead(200, {
        'Content-Type': contentType
      });

      const file = fs.readFileSync(getWebRootPath(fileName), null);

      res.write(file);

      res.end();
    } else {
      res.status(404).send("Sorry can't find that!");
    }
  });
};
