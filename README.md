[![Release](https://img.shields.io/github/actions/workflow/status/smashedr/js-test-action/release.yaml?logo=github&logoColor=white&label=tags)](https://github.com/smashedr/js-test-action/actions/workflows/release.yaml)
[![Test](https://img.shields.io/github/actions/workflow/status/smashedr/js-test-action/test.yaml?logo=github&logoColor=white&label=test)](https://github.com/smashedr/js-test-action/actions/workflows/test.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=smashedr_js-test-action&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=smashedr_js-test-action)
[![GitHub Release Version](https://img.shields.io/github/v/release/smashedr/js-test-action?logo=github)](https://github.com/smashedr/js-test-action/releases/latest)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/smashedr/js-test-action?logo=github&logoColor=white&label=updated)](https://github.com/smashedr/js-test-action/graphs/commit-activity)
[![Codeberg Last Commit](https://img.shields.io/gitea/last-commit/shaner/js-test-action/master?gitea_url=https%3A%2F%2Fcodeberg.org%2F&logo=codeberg&logoColor=white&label=updated)](https://codeberg.org/shaner/js-test-action)
[![GitHub Top Language](https://img.shields.io/github/languages/top/smashedr/js-test-action?logo=htmx&logoColor=white)](https://github.com/smashedr/js-test-action)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&logoColor=white)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)

# JavaScript Test Action

This action creates or updates the provided `tag` to the `sha` has that triggered the workflow.

This includes inputs, outputs, job summary, and automatic token authentication.

- [Inputs](#Inputs)
- [Outputs](#Outputs)
- [Examples](#Examples)
- [Development](#Development)

## Inputs

| input   | required | default               | description                 |
| ------- | -------- | --------------------- | --------------------------- |
| tag     | No       | test                  | Tag to Create or Update     |
| summary | No       | true                  | Add Summary to Job          |
| token   | No       | `${{ github.token }}` | Only if External Token [^1] |

With no inputs this will create/update the tag `test`.

```yaml
- name: 'JS Test Action'
  uses: smashedr/js-test-action@master
```

With all inputs. Note that `token` is NOT required.

```yaml
- name: 'JS Test Action'
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

## Outputs

| output | description |
| ------ | ----------- |
| sha    | Tag Hash    |

```yaml
- name: 'JS Test Action'
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

      - name: 'JS Test Action'
        id: test
        uses: smashedr/js-test-action@master

      - name: 'Echo Outputs'
        run: |
          echo "sha: '${{ steps.test.outputs.sha }}'"
```

# About Actions

This is a JavaScript Action. For other types see:

- TypeScript: https://github.com/smashedr/ts-test-action
- Docker/Python: https://github.com/smashedr/py-test-action

## Overview

The heart of a GitHub Action is the [action.yml](action.yml) file. This describes everything about your action.

- https://docs.github.com/en/actions/sharing-automations/creating-actions/metadata-syntax-for-github-actions

JS Actions must be fully built in the action's environment. See the `build` in [package.json](package.json) for details.

## Toolkit

The toolkit contains many parts. The `@actions/core` is required and this action uses the `@actions/github` module.

- https://github.com/actions/toolkit

This also uses `github.getOctokit`.

- https://octokit.github.io/rest.js

# Development

1. Install `act`: https://nektosact.com/installation/index.html
2. Run `npm run build:watch`
3. In another terminal, run `act -j test`

Alternatively, to run from source, change `main` in [action.yml](action.yml) to `src/index.js` and
run: `act -j test --use-gitignore=false`

For advanced using with things like secrets, variables and context see: https://nektosact.com/usage/index.html

You should also review the options from `act --help`

Note, the `.env`, `.secrets` and `.vars` files are automatically sourced with no extra options.
To source `event.json` you need to run act with `act -e event.json`

[^1]:
    The `${{ github.token }}` / `{{ secrets.GITHUB_TOKEN }}` is automatically passed, there is no need to manually pass these!
    This is only available to allow users to pass a different token they have created and defined in their `secrets`.
