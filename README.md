## Description

It provides a simple example of the implementation of node child_process API as server workers using the observable pattern with RxJS.

You also can use this example as a reference for:

- To understand how to implement RxJS on server-side. 🚀
- To understand how to create a new node child process and communicate with them using observable pattern.
- A basic architecture to implement nestJS at enterprise-level applications.

**THIS IS A POC**. The use of `child_process nodejs` API It is not advisable to handle asynchrony queues (workers). If you need to run queues in NestJS I recommend the use of [nestjs queues](https://docs.nestjs.com/techniques/queues) implementation for traditional architectures or use a [microservices](https://docs.nestjs.com/microservices/basics) architecture based solution instead. 



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

Visit [http://localhost:3000/api/](http://localhost:3000/api/) to see the Swagger documentation.

## Testing multiple child_process feature

- If you want to change the variables for retry attempts and delay time of workers update the `report.service.ts` file under the report module.

- Run the application:

```bash
$ npm run start

```

- Open the Activity Monitor of your operative system.
  <img width="1385" alt="Screen Shot 2020-10-30 at 12 35 07 PM" src="https://user-images.githubusercontent.com/2147281/97745412-71c06d00-1aae-11eb-95de-4f59109dedbb.png">

- Run the following cURL instruction to make a POST call to generate a new IP report.

```bash
$ curl -d '{"ip": "8.8.8.8","reportServices": ["ipapi", "freegeoip"]}' -H "Content-Type: application/json" -X POST http://localhost:3000/generateMultipleIpReport

```

<img width="1424" alt="Screen Shot 2020-10-30 at 12 36 20 PM" src="https://user-images.githubusercontent.com/2147281/97745541-a2a0a200-1aae-11eb-86ae-62ff9e84d2fe.png">

- Notice that for each report the system will create a new node child process to execute the task and then it will terminate the process.

```bash
$ curl -d '{"ip": "8.8.8.8","reportServices": ["ipapi", "freegeoip", "ipapi", "freegeoip", "ipapi", "freegeoip"]}' -H "Content-Type: application/json" -X POST http://localhost:3000/generateMultipleIpReport

```

<img width="1390" alt="Screen Shot 2020-10-30 at 12 39 40 PM" src="https://user-images.githubusercontent.com/2147281/97745510-987ea380-1aae-11eb-80fe-fbaea39153a3.png">

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
