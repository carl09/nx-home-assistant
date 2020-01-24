import * as fs from 'fs';
import * as path from 'path';
import { namedLog } from './logging';

const log = namedLog('File Util');

export const readFileAsJson = (filePath: string): any => {
  log.info('Reading File:', filePath);
  const rawdata = fs.readFileSync(filePath);
  return JSON.parse(rawdata.toString());
};

export const getRootPath = () => {
  return path.join(__dirname);
};

export const getWebRootPath = (fileName?: string) => {
  return fileName
    ? path.join(getRootPath(), '../web-admin', fileName)
    : path.join(getRootPath(), '../web-admin');
};
