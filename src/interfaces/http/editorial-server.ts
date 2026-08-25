import { buildEditorialApp } from './editorial-app.js';

const app = buildEditorialApp();
const port = Number(process.env.EDITORIAL_PORT ?? 3002);

app
  .listen({ port, host: '0.0.0.0' })
  .then(() => {
    app.log.info(`Editorial server running at http://localhost:${port}/game-content`);
  })
  .catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
