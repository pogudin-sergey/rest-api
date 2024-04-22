import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import logger from './utils/logger';
import config from './config';
import routes from './routes';

const app: Application = express();

const corsOptions: CorsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(config.port, () => {
  logger.log(`Server is running on port ${config.port}.`);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.on('error', (err: Record<string, any>) => {
  if (err.code === 'EADDRINUSE') {
    logger.error('Error: address already in use');
  } else {
    logger.error(err);
  }
});
