
Rollup S3 Plugin
===

This plugin will upload all built assets to s3

Based on the [webpack-s3-plugin][1] by [MikaAK](https://github.com/MikaAK) so all configurations are the same as [webpack-s3-plugin][1]


### Install Instructions

```bash
$ npm i -D rollup-s3-plugin
```

### Usage

```javascript
// rollup.config.js

import s3Plugin from "rollup-s3-plugin";

module.exports = {
  plugins: [
    s3Plugin({
      // config
    })
  ]
}
```

[1]: https://github.com/MikaAK/s3-plugin-webpack