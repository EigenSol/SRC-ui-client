const LOG_LEVEL = import.meta.env.VITE_LOG_LEVEL?.trim()?.toLowerCase() || 'info';
const LEVEL_WEIGHT = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

function shouldLog(level) {
  return LEVEL_WEIGHT[level] <= (LEVEL_WEIGHT[LOG_LEVEL] ?? LEVEL_WEIGHT.info);
}

export function createLogger(scope) {
  return {
    info(message, meta) {
      if (!shouldLog('info')) return;
      console.info(`[${scope}] ${message}`, meta ?? '');
    },
    warn(message, meta) {
      if (!shouldLog('warn')) return;
      console.warn(`[${scope}] ${message}`, meta ?? '');
    },
    error(message, meta) {
      if (!shouldLog('error')) return;
      console.error(`[${scope}] ${message}`, meta ?? '');
    },
    debug(message, meta) {
      if (!shouldLog('debug')) return;
      console.debug(`[${scope}] ${message}`, meta ?? '');
    },
  };
}
