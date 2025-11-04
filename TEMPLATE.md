Action Path in ESM

```js
core.debug(`GITHUB_ACTION_REPOSITORY: ${process.env.GITHUB_ACTION_REPOSITORY}`)
core.debug(`GITHUB_ACTION_REF: ${process.env.GITHUB_ACTION_REF}`)
core.debug(`GITHUB_WORKSPACE: ${process.env.GITHUB_WORKSPACE}`)
let bin = `${process.env.GITHUB_WORKSPACE}/src`
if (process.env.GITHUB_ACTION_REPOSITORY && process.env.GITHUB_ACTION_REF) {
  const actionPath = `/home/runner/work/_actions/${process.env.GITHUB_ACTION_REPOSITORY}/${process.env.GITHUB_ACTION_REF}`
  console.log(`actionPath: ${actionPath}`)
  bin = `${actionPath}/src`
}
console.log(`bin: ${bin}`)
```

Action Path in CJS

```js
core.debug(`__dirname: ${__dirname}`)
const bin = path.resolve(__dirname, '../src')
console.log(`bin: ${bin}`)
```
