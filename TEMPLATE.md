## Action Path

CJS

```js
const path = require('node:path')

core.debug(`__dirname: ${__dirname}`)
const src = path.resolve(__dirname, '../src')
console.log(`src: ${src}`)
```

ESM

```js
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
core.debug(`__filename: ${__filename}`)
const __dirname = path.dirname(__filename)
core.debug(`__dirname: ${__dirname}`)
const src = path.resolve(__dirname, '../src')
console.log(`src: ${src}`)
```

GitHub Variables

```js
core.debug(`GITHUB_ACTION_REPOSITORY: ${process.env.GITHUB_ACTION_REPOSITORY}`)
core.debug(`GITHUB_ACTION_REF: ${process.env.GITHUB_ACTION_REF}`)
core.debug(`GITHUB_WORKSPACE: ${process.env.GITHUB_WORKSPACE}`)
let src = `${process.env.GITHUB_WORKSPACE}/src`
if (process.env.GITHUB_ACTION_REPOSITORY && process.env.GITHUB_ACTION_REF) {
  const actionPath = `/home/runner/work/_actions/${process.env.GITHUB_ACTION_REPOSITORY}/${process.env.GITHUB_ACTION_REF}`
  console.log(`actionPath: ${actionPath}`)
  src = `${actionPath}/src`
}
console.log(`src: ${src}`)
```
