import express from 'express';
import { dirname, join, resolve } from 'node:path';

import ApiRoutes from '@server/routes/api'

/**
 * Simple api service for development mode with out server side rendering fitur
 * 
*/
// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = process.cwd();
  const browserDistFolder = resolve(serverDistFolder, './src');
  const indexHtml = join(serverDistFolder, 'index.html');

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  server.use('/api', ApiRoutes )
  // server.get('/api/**', (req:any, res:any) => { });
  // Serve static files from /browser
  server.use('/uploads',express.static(`${ resolve( serverDistFolder , './uploads' ) }`, {
    maxAge: '1y'
  }));
  // server.get('*.*', express.static(browserDistFolder, {
  //   maxAge: '1y'
  // }));
  
  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();