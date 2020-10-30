## Description

It provides a simple example of the implementation of node child_process API as server workers using the observable pattern with RxJS.

You also can use this example as a reference for:

- To understand how to implement RxJS on the server-side. 🚀
- To understand how to create a new node child process and communicate with them using observable patter.
- A basic architecture to implement nestJS at enterprise-level applications.

## Project Structure Overview

```
    -- root
        -- src
            -- modules
                --  app
                    --  app.controller.ts // It contains the main route and service status route.
                    --  app.module.ts // Main application module.
                -- report
                    -- report.controller.ts // it contains the POST /generateMultipleIpReport controller to generate the reports.
                    -- report.module.ts
                    -- report.service.ts // it contains the worker launcher and communication. Also, it provides PROCESS_DELAY and MAX_ATTEMPTS variables configuration.
                    -- report.worker.ts // it contains the code that will be executed in the child node.
            -- main.ts // Application entry point.
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing multiple child_process

- Open file and change the variables for retry attempt and delay time.

- Run the application

```bash
$ npm run start

```

- Open the Activity Monitor of your operative system.

- -Run the following cURL instruccion to make a POST call to generate a new IP report.

```bash
$ curl -d '{"ip": "8.8.8.8","reportServices": ["ipapi", "freegeoip"]}' -H "Content-Type: application/json" -X POST http://localhost:3000/generateMultipleIpReport

```

- Notice that for each report system will create a new node child process to execute the task and then it will terminate the process.

```bash
$ curl -d '{"ip": "8.8.8.8","reportServices": ["ipapi", "freegeoip", "ipapi", "freegeoip", "ipapi", "freegeoip"]}' -H "Content-Type: application/json" -X POST http://localhost:3000/generateMultipleIpReport

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Bryan Ramirez](https://github.com/brq-cr)
- Framework Website - [https://nestjs.com](https://nestjs.com/)

## License

Nest framework and the code of this exercise are [MIT licensed](LICENSE).
