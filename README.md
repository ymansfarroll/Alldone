
# Alldone

```
Even if the service is not completely stable, many stable features have been covered up already, so you are encouraged to check out the code inside this repository and support it if you want to.
```

- [Alldone](#alldone)
  - [Features](#features)
  - [Basic Usage](#basic-usage)
  - [Environments](#environments)

## Features

  * M-V-C application design.
  * Data persistence via MongoDB storage service.
 
## Basic Usage 

It is important to note that the service is not ready for production environment yet, but a production usage snapshot is provided in the following. Please, in order to contribute to deploy it, utilize the [environments](#environments) and add features to boost its deployment down the line.

## Environments

Based on the present requirements, the service defines the following custom environments, `test` and `development`, yet its components and design are intented to extend these ones if required.

To run a development environment, first install the dependencies, then run `npm run dev`:

```console
$ npm install
$ npm run dev
```
This one trusts on `DB_DEV_HOST`, `DB_DEV_PORT`, `DB_DEV_NAME`, `DB_DEV_USER` and `DB_DEV_PASSWORD` as its environment variables.   

To run the test suite, first install the dependencies, then run `npm test`:

```console
$ npm install
$ npm test
```
This one trusts on `DB_TEST_HOST`, `DB_TEST_PORT` and `DB_TEST_NAME` as its environment variables.   
