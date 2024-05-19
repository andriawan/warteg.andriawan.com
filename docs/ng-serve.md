## Dirty Patch How to get REQUEST , RESPONSE context on development mode ( ng serve ) for SSR

> [!CAUTION]
> Based on this gist
> https://gist.github.com/andrewatwood/825ae87bfa0d9191cbc38cfbb21cbdab

- [angular-memory-plugin.js](../node_modules/@angular-devkit/build-angular/src/tools/vite/angular-memory-plugin.js)
  ```ts
  --- a/node_modules/@angular-devkit/build-angular/src/tools/vite/angular-memory-plugin.js
  +++ b/node_modules/@angular-devkit/build-angular/src/tools/vite/angular-memory-plugin.js
  @@ -167,6 +167,7 @@ function createAngularMemoryPlugin(options) {
                              // Files here are only needed for critical CSS inlining.
                              outputFiles: {},
                              // TODO: add support for critical css inlining.
                              inlineCriticalCss: false,
  +                           request: req,
  +                           response: res,
                          });
                          return indexHtmlTransformer && content ? await indexHtmlTransformer(content) : content;
                      });
  ```

- [render-page.js](../node_modules/@angular-devkit/build-angular/src/utils/server-rendering/render-page.js) 
  ```ts
  --- a/node_modules/@angular-devkit/build-angular/src/utils/server-rendering/render-page.js
  +++ b/node_modules/@angular-devkit/build-angular/src/utils/server-rendering/render-page.js
  @@ -37,21 +37,36 @@ exports.renderPage = void 0;
  const node_assert_1 = __importDefault(require("node:assert"));
  const node_path_1 = require("node:path");
  const load_esm_1 = require("../load-esm");
  + const parseCookie = str => str
  +  .split(';')
  +  .map(v => v.split('='))
  +  .reduce((acc, v) => {
  +      acc[decodeURIComponent(v[0]?.trim())] = decodeURIComponent(v[1]?.trim());
  +      return acc;
  +  }, {});


  + async function renderPage({ route , request , response , serverContext, document, inlineCriticalCss, outputFiles, loadBundle = load_esm_1.loadEsmModule, })

  + if(request)
  +    request.cookies = parseCookie(request?.headers?.['cookie'] || '');
  const platformProviders = [
        {
            provide: ɵSERVER_CONTEXT,
            useValue: serverContext,
        },
  +     {
  +         provide: '__REQUEST_TOKEN_TEMP',
  +         useValue: request,
  +     },
  +     {
  +         provide: '__RESPONSE_TOKEN_TEMP',
  +         useValue: response,
  +     },
  ```

  ```ts
  const parseCookie = str => str
  .split(';')
  .map(v => v.split('='))
  .reduce((acc, v) => {
      acc[decodeURIComponent(v[0]?.trim())] = decodeURIComponent(v[1]?.trim());
      return acc;
  }, {});

  const platformProviders = [
        //......
        {
            provide: '__REQUEST_TOKEN_TEMP',
            useValue: request,
        },
        {
            provide: '__RESPONSE_TOKEN_TEMP',
            useValue: response,
        },
  ```