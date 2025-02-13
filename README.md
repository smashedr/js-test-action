[![Tags](https://img.shields.io/github/actions/workflow/status/smashedr/js-test-action/tags.yaml?logo=github&logoColor=white&label=tags)](https://github.com/smashedr/js-test-action/actions/workflows/tags.yaml)
[![Test](https://img.shields.io/github/actions/workflow/status/smashedr/js-test-action/test.yaml?logo=github&logoColor=white&label=test)](https://github.com/smashedr/js-test-action/actions/workflows/test.yaml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=smashedr_js-test-action&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=smashedr_js-test-action)
[![GitHub Release Version](https://img.shields.io/github/v/release/smashedr/js-test-action?logo=github)](https://github.com/smashedr/js-test-action/releases/latest)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/smashedr/js-test-action?logo=github&logoColor=white&label=updated)](https://github.com/smashedr/js-test-action/graphs/commit-activity)
[![Codeberg Last Commit](https://img.shields.io/gitea/last-commit/shaner/js-test-action/master?gitea_url=https%3A%2F%2Fcodeberg.org%2F&logo=codeberg&logoColor=white&label=updated)](https://codeberg.org/shaner/js-test-action)
[![GitHub Top Language](https://img.shields.io/github/languages/top/smashedr/js-test-action?logo=htmx&logoColor=white)](https://github.com/smashedr/js-test-action)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&logoColor=white)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)

# JavaScript Test Action

- [Inputs](#Inputs)
- [Outputs](#Outputs)
- [Examples](#Examples)
- [Development](#Development)

## Inputs

| input   | required | default               | description                      |
| ------- | -------- | --------------------- | -------------------------------- |
| tag     | No       | test                  | Tag to Create or Update \*       |
| summary | No       | true                  | Add Summary to Job \*            |
| token   | No       | `${{ github.token }}` | Only for backwards comaptiblity. |

```yaml
- name: 'JS Test Action'
  uses: smashedr/js-test-action@master
```

```yaml
- name: 'JS Test Action'
  uses: smashedr/js-test-action@master
  with:
    tag: test
    summary: true
    token: ${{ secrets.GITHUB_TOKEN }} # there is no need to add this input anymore
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

# Examples

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

    steps:
      - name: 'Checkout'
        uses: actions/checkout@v4

      - name: 'Test'
        id: test
        uses: smashedr/js-test-action@master

      - name: 'Echo Outputs'
        run: |
          echo "sha: '${{ steps.test.outputs.sha }}'"
```

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
