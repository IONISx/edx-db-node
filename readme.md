# edx-db-node [![CircleCI](https://circleci.com/gh/IONISx/edx-db-node.svg?style=svg)](https://circleci.com/gh/IONISx/edx-db-node)

[![codecov](https://codecov.io/gh/IONISx/edx-db-node/branch/master/graph/badge.svg)](https://codecov.io/gh/IONISx/edx-db-node)
[![NSP Status](https://nodesecurity.io/orgs/ionisx/projects/83be9462-ccc1-49a1-99c7-46f6777095c2/badge)](https://nodesecurity.io/orgs/ionisx/projects/83be9462-ccc1-49a1-99c7-46f6777095c2)
[![npm version](https://img.shields.io/npm/v/edx-db.svg)](https://www.npmjs.com/package/edx-db)

> Open edX database library

# Testing

First, install `gulp`:

```shell
$ yarn global add --dev gulp-cli
```

Then install the local dependencies:

```shell
$ yarn install
```

Finally, assess code quality and run unit tests using `gulp`:

```shell
$ gulp test
```

It is also possible to run specific tests using `mocha`:

```shell
$ mocha test/whatever.test.js
```
