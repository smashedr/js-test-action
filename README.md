[![GitHub Tag Major](https://img.shields.io/github/v/tag/smashedr/js-test-action?sort=semver&filter=!v*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/smashedr/js-test-action/tags)
[![GitHub Tag Minor](https://img.shields.io/github/v/tag/smashedr/js-test-action?sort=semver&filter=!v*.*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/smashedr/js-test-action/tags)
[![GitHub Release Version](https://img.shields.io/github/v/release/smashedr/js-test-action?logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/smashedr/js-test-action/releases/latest)
[![Release WF](https://img.shields.io/github/actions/workflow/status/smashedr/js-test-action/release.yaml?logo=github&label=release)](https://github.com/smashedr/js-test-action/actions/workflows/release.yaml)
[![Test WF](https://img.shields.io/github/actions/workflow/status/smashedr/js-test-action/test.yaml?logo=github&label=test)](https://github.com/smashedr/js-test-action/actions/workflows/test.yaml)
[![lint WF](https://img.shields.io/github/actions/workflow/status/smashedr/js-test-action/lint.yaml?logo=github&label=lint)](https://github.com/smashedr/js-test-action/actions/workflows/lint.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=smashedr_js-test-action&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=smashedr_js-test-action)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/smashedr/js-test-action?logo=github&label=updated)](https://github.com/smashedr/js-test-action/graphs/commit-activity)
[![Codeberg Last Commit](https://img.shields.io/gitea/last-commit/shaner/js-test-action/master?gitea_url=https%3A%2F%2Fcodeberg.org%2F&logo=codeberg&logoColor=white&label=updated)](https://codeberg.org/shaner/js-test-action)
[![GitHub Top Language](https://img.shields.io/github/languages/top/smashedr/js-test-action?logo=htmx)](https://github.com/smashedr/js-test-action)
[![GitHub Discussions](https://img.shields.io/github/discussions/smashedr/js-test-action)](https://github.com/smashedr/js-test-action/discussions)
[![GitHub Forks](https://img.shields.io/github/forks/smashedr/js-test-action?style=flat&logo=github)](https://github.com/smashedr/js-test-action/forks)
[![GitHub Repo Stars](https://img.shields.io/github/stars/smashedr/js-test-action?style=flat&logo=github)](https://github.com/smashedr/js-test-action/stargazers)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)

# JavaScript Test Action

- [Inputs](#Inputs)
  - [Permissions](#Permissions)
- [Outputs](#Outputs)
- [Examples](#Examples)
- [Tags](#Tags)
- [Development](#Development)

This action creates or updates the provided `tag` to the `sha` has that triggered the workflow.

This includes inputs, outputs, job summary, and automatic token authentication.

## Inputs

| input   | required | default               | description             |
| ------- | :------: | --------------------- | ----------------------- |
| tag     |    -     | `test`                | Tag to Create or Update |
| summary |    -     | `true`                | Add Summary to Job      |
| token   |    -     | `${{ github.token }}` | Only for PAT [^1]       |

<details><summary>👀 View Example Job Summary</summary>

---

Updated: [test](https://github.com/smashedr/js-test-action/releases/tag/test) :arrow_right: `6470ef53102d5229672433f1adb6afa42e7b64d9`

<details><summary>Inputs</summary><table><tr><th>Input</th><th>Value</th></tr><tr><td>tag</td><td>test</td></tr><tr><td>summary</td><td>true</td></tr></table></details>

---

</details>

With no inputs this will create/update the tag `test`.

```yaml
- name: 'JavaScript Test Action'
  uses: smashedr/js-test-action@master
```

With all inputs. Note that `token` is NOT required.

```yaml
- name: 'JavaScript Test Action'
  uses: smashedr/js-test-action@master
  with:
    tag: test
    summary: true
    token: ${{ secrets.PAT }} # only include this if you need to use a PAT
```

### Permissions

This action requires the following permissions:

```yaml
permissions:
  contents: write
```

Permissions documentation for
[Workflows](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/controlling-permissions-for-github_token)
and [Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication).

## Outputs

| output | description |
| ------ | ----------- |
| sha    | Tag Hash    |

```yaml
- name: 'JavaScript Test Action'
  id: test
  uses: smashedr/js-test-action@master

- name: 'Echo Output'
  run: |
    echo "sha: '${{ steps.test.outputs.sha }}'"
```

## Examples

```yaml
name: 'Test'

on:
  workflow_dispatch:
  push:

jobs:
  test:
    name: 'Test'
    runs-on: ubuntu-latest
    timeout-minutes: 5
    permissions:
      contents: write

    steps:
      - name: 'Checkout'
        uses: actions/checkout@v4

      - name: 'JavaScript Test Action'
        id: test
        uses: smashedr/js-test-action@master

      - name: 'Echo Outputs'
        run: |
          echo "sha: '${{ steps.test.outputs.sha }}'"
```

For more examples, you can check out other projects using this action:  
https://github.com/smashedr/js-test-action/network/dependents

## Tags

The following rolling [tags](https://github.com/smashedr/js-test-action/tags) are maintained.

| Tag                                                                                                                                                                                                                       | Example  | Target   | Bugs | Feat. | Description                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- | :--: | :---: | --------------------------------------------------------- |
| [![GitHub Tag Major](https://img.shields.io/github/v/tag/smashedr/js-test-action?sort=semver&filter=!v*.*&style=for-the-badge&label=%20&color=limegreen)](https://github.com/smashedr/js-test-action/releases/latest)     | `vN`     | `vN.x.x` |  ✅  |  ✅   | Includes new features but is always backwards compatible. |
| [![GitHub Tag Minor](https://img.shields.io/github/v/tag/smashedr/js-test-action?sort=semver&filter=!v*.*.*&style=for-the-badge&label=%20&color=yellowgreen)](https://github.com/smashedr/js-test-action/releases/latest) | `vN.N`   | `vN.N.x` |  ✅  |  ❌   | Only receives bug fixes. This is the most stable tag.     |
| [![GitHub Release](https://img.shields.io/github/v/release/smashedr/js-test-action?style=for-the-badge&label=%20&color=orange)](https://github.com/smashedr/js-test-action/releases/latest)                               | `vN.N.N` | `vN.N.N` |  ❌  |  ❌   | Not a rolling tag. **Not** recommended.                   |

You can view the release notes for each version on the [releases](https://github.com/smashedr/js-test-action/releases) page.

# Development

A GitHub Actions Primer: https://docs.github.com/en/actions/sharing-automations/creating-actions

## Actions Overview

This is a JavaScript Action. For other types see:

- TypeScript: https://github.com/smashedr/ts-test-action
- Docker/Python: https://github.com/smashedr/py-test-action

The heart of a GitHub Action is the [action.yml](action.yml) file. This describes everything about your action.

- https://docs.github.com/en/actions/sharing-automations/creating-actions/metadata-syntax-for-github-actions

JavaScript Actions must be fully built in the action's environment. See the `build` in [package.json](package.json) for details.

## Actions Toolkit

The toolkit contains many parts. The `@actions/core` is required and this action uses the `@actions/github` module.

- https://github.com/actions/toolkit

This also uses `github.getOctokit`.

- https://octokit.github.io/rest.js

## Local Development

To run actions locally you need to install act: https://nektosact.com/installation/index.html

```shell
npm install
npm run build:watch
act -j test
```

Alternatively, to run from source, change `main` in [action.yml](action.yml) to `src/index.js` and
run: `act -j test --use-gitignore=false`

For advanced using with things like secrets, variables and context see: https://nektosact.com/usage/index.html

You should also review the options from `act --help`

Note, the `.env`, `.secrets` and `.vars` files are automatically sourced with no extra options.
To source `event.json` you need to run act with `act -e event.json`

[^1]:
    The `${{ github.token }}` / `{{ secrets.GITHUB_TOKEN }}` is automatically passed, there is no need to manually pass these!
    This is only available to allow users to pass a different token they have created and defined in their `secrets`.
