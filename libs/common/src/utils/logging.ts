// tslint:disable: no-console

enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR
}

const baseLog = (level: LogLevel, message: string, agrs: any[]) => {
  const now = new Date().toLocaleString();
  const msg = `${now} ${LogLevel[level]} ${message}`;

  switch (level) {
    case LogLevel.DEBUG:
      console.info(msg, ...agrs);
      break;
    case LogLevel.INFO:
      console.log(msg, ...agrs);
      break;
    case LogLevel.WARN:
      console.warn(msg, ...agrs);
      break;
    case LogLevel.ERROR:
      console.error(msg, ...agrs);
      break;
  }
};

export const log = (message: string, ...agrs: any[]) => {
  baseLog(LogLevel.INFO, message, agrs);
};

export const logError = (message: string, ...agrs: any[]) => {
  baseLog(LogLevel.ERROR, message, agrs);
};

export const logWarn = (message: string, ...agrs: any[]) => {
  baseLog(LogLevel.WARN, message, agrs);
};

export const logInfo = (message: string, ...agrs: any[]) => {
  baseLog(LogLevel.DEBUG, message, agrs);
};

export const namedLog = (name: string) => {
  const formattedName = `[${name}]`;

  return {
    info: (message: string, ...agrs: any[]) => {
      log(`${formattedName} ${message}`, ...agrs);
    },
    debug: (message: string, ...agrs: any[]) => {
      logInfo(`${formattedName} ${message}`, ...agrs);
    },
    warn: (message: string, ...agrs: any[]) => {
      logWarn(`${formattedName} ${message}`, ...agrs);
    },
    error: (message: string, ...agrs: any[]) => {
      logError(`${formattedName} ${message}`, ...agrs);
    }
  };
};
