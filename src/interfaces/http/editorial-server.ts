import { buildEditorialApp } from './editorial-app.js';

const app = buildEditorialApp();
const port = Number(process.env.EDITORIAL_PORT ?? 3002);

app
  .listen({ port, host: '127.0.0.1' })
  .then(() => {
    app.log.info(`Editorial library running at http://localhost:${port}`);
  })
  .catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
