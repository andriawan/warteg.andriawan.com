# WartegAndriawanCom

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Knex
  - Migration
    - Make migration
      - npm run knex migrate:make create_example_table

    - Applying migration ( update database )
      - npm run knex migrate:latest
      - npm run knex migrate:up

    - Rolling Back
      - npm run knex migrate:rollback -- --all
      - npm run knex migrate:rollback

  - Seed
    - Make seed
      - npm run knex seed:make required_data

    - Applying seed ( insert data to database )
      - npm run knex seed:run
      - npm run knex seed:run -- --specific=seed-filename.ts --specific=another-seed-filename.ts

  - Documentation
    - https://knexjs.org/guide/query-builder.html
    
  
## Note
  ```json
  /**
  * angular.json
  * some library need to be excluded while compiling ( building ) for production
  */
  "externalDependencies": [
    "knex"
  ],
  ```

  ```json
  /**
  * angular.json
  * some library not support ESM , only commonjs . 
  * this area will whitelist them but remember some library might be a problem for performance by doing so
  */
  "allowedCommonJsDependencies": [
    "dotenv","dotenv-expand"
  ]
  ```
             