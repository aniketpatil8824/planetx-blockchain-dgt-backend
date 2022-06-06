# Planetx-Blockchain-DGT-Backend
Backend layer for communication between frontend and blockchain

# Requirements
- Node Version Greater than 14.0.0
- Docker Version 3 and higher
- Eslint configured in your editor

NOTE: The package type of this repo is module means the code is as per ESM format. You cannot use require statements, Instead import and export are used. Please go through ESM docs for for info

# Running instructions
## Using Docker
### On Development
- To build `docker-compose -f docker-compose.dev.yaml build`
- To build and run `docker-compose -f docker-compose.dev.yaml up`
- To rebuild and run `docker-compose -f docker-compose.dev.yaml up --build`

### On Production
- To build `docker-compose -f docker-compose.prod.yaml build`
- To build and run `docker-compose -f docker-compose.prod.yaml up`
- To rebuild and run `docker-compose -f docker-compose.prod.yaml up --build`

# Directory Structure
The code structure is made in moduler way and follows MVC architecture. Details of folders are as follows:-

- config: The folder contains index.js file which exports all environment and other important config settings. Please note always export your environment variables from this config file. Don't directly use process.env files

- database: This folder contains code to connect to mongodb database 

- middleware: Middlewares like check api key, etc are put in this folder

- routes: All the endpoints are defined in this folder. The endpoints are bifercated further under multiple users type. 

- utilities: This is utilities folder and contains some important utilities used in the project
  - serverUtils: 
    - shutDown.js: This contains code for gracefull shutdown of server when you stop it using ctrl+c command or docker-compose down command. 
    - healthCheck.js: This contains code for healthcheck of server, this returns whats the status of web3,databse,queue, etc.
  - queueUtils:
    - producer.js : To push data to queue
    - consumer.js : To start worker which consumes data and passes it to requried function
  - web3Utils: To configure web3 and connect to RPC endpoint(blockchain) provided in environment variabels
  - logger.js : To log data to console and file    
- views : Contains ejs(html) file to render on api-calls
- app.js : starting point of application. All express setup and initilizations are done here
- bin/www : Code to create https server and listen to shutdowns   