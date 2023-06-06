import { readdir } from 'fs';
import express from 'express';
import config from './config.js';
import cors from 'cors';
import RequestMiddleware from './middlewares/request.middleware.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use(RequestMiddleware);
readdir('routes', (err, files) => {
   files.forEach(async file => {
      const routing = (await import('./routes/' + file)).default;
      app.use(routing.route, routing.router);
   });
});

app.listen(config.PORT, () => {
   console.log('SERVER RUNNING ON: http://localhost:' + config.PORT);
});
