import log from 'loglevel';
import config from '../config';

log.setDefaultLevel(config.logLevel);

export default log;
