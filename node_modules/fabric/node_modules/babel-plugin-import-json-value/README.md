# babel-plugin-import-json-value
[![NPM](https://nodei.co/npm/babel-plugin-import-json-value.png?downloads=true&stars=true)](https://npmjs.org/package/babel-plugin-inline-json-import)

[中文文档](./README_CN.md)

A babel pre-processor that inlines all imports of JSON files straight into your
JavaScript files.

## Example

My package.json file:

```json
{
  "name": "babel-plugin-import-json-value",
  "version": "0.0.3",
  "devDependencies": {
    "@babel/cli": "^7.12.8"
  }
}
```

input:

```js
import { version, name as name1, default as pkg } from "./data.json";
import pkg1 from "./data.json";
import * as pkg2 from "./data.json";
const pkg3 = require("./data.json");
const { version1, name: name2 } = require("./data.json");
const name3 = require("./data.json").name;
const text1 = require("./data.json").devDependencies["@babel/cli"];
```

output:

```js
const version = "0.0.3",
      name1 = "babel-plugin-import-json-value",
      pkg = "{\"name\":\"babel-plugin-import-json-value\",\"version\":\"0.0.3\",\"devDependencies\":{\"@babel/cli\":\"^7.12.8\"}}";
const pkg1 = "{\"name\":\"babel-plugin-import-json-value\",\"version\":\"0.0.3\",\"devDependencies\":{\"@babel/cli\":\"^7.12.8\"}}";
const pkg2 = "{\"name\":\"babel-plugin-import-json-value\",\"version\":\"0.0.3\",\"devDependencies\":{\"@babel/cli\":\"^7.12.8\"}}";
const pkg3 = "{\"name\":\"babel-plugin-import-json-value\",\"version\":\"0.0.3\",\"devDependencies\":{\"@babel/cli\":\"^7.12.8\"}}";
const version1 = undefined,
      name2 = "babel-plugin-import-json-value";
const name3 = "babel-plugin-import-json-value";
const text1 = "^7.12.8";

```


## Installation

```sh
$ yarn add -D babel-plugin-import-json-value
```

Add `babel-plugin-import-json-value` to your babel config . 
```json
{
  "plugins": [
    "babel-plugin-import-json-value"
  ]
}
```

## Tips

**Value types other than strings are not currently supported, and the rest will be implemented later**

- TODO:

- [ ] Support other value types.
- [x] Support import and require default export.
- [ ] Support esModule export.


## License
This project is licensed under the MIT License - see the [LICENSE](/LICENSE)
file for details