[![GitHub Tag Major](https://img.shields.io/github/v/tag/smashedr/js-test-action?sort=semver&filter=!v*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/smashedr/js-test-action/tags)
[![GitHub Tag Minor](https://img.shields.io/github/v/tag/smashedr/js-test-action?sort=semver&filter=!v*.*.*&logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/smashedr/js-test-action/tags)
[![GitHub Release Version](https://img.shields.io/github/v/release/smashedr/js-test-action?logo=git&logoColor=white&labelColor=585858&label=%20)](https://github.com/smashedr/js-test-action/releases/latest)
[![Workflow Release](https://img.shields.io/github/actions/workflow/status/smashedr/js-test-action/release.yaml?logo=github&label=release)](https://github.com/smashedr/js-test-action/actions/workflows/release.yaml)
[![Workflow Test](https://img.shields.io/github/actions/workflow/status/smashedr/js-test-action/test.yaml?logo=github&label=test)](https://github.com/smashedr/js-test-action/actions/workflows/test.yaml)
[![Workflow lint](https://img.shields.io/github/actions/workflow/status/smashedr/js-test-action/lint.yaml?logo=github&label=lint)](https://github.com/smashedr/js-test-action/actions/workflows/lint.yaml)
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
- [Support](#Support)
- [Contributing](#Contributing)
- [Development](#Development)

This action creates or updates the provided `tag` to the `sha` has that triggered the workflow.

This includes inputs, outputs, job summary, and automatic token authentication.

## Inputs

| Input     | Req. | Default&nbsp;Value | Description&nbsp;of&nbsp;Input |
| :-------- | :--: | :----------------- | :----------------------------- |
| `tag`     |  -   | `test`             | Tag to Create or Update        |
| `summary` |  -   | `true`             | Add Summary to Job             |
| `token`   |  -   | `github.token`     | Only for PAT [^1]              |

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

| Output | Description |
| :----- | :---------- |
| `sha`  | Tag Hash    |

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

| Version&nbsp;Tag                                                                                                                                                                                                   | Rolling | Bugs | Feat. | Target   | Example  |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----: | :--: | :---: | :------- | :------- |
| [![GitHub Tag Major](https://img.shields.io/github/v/tag/smashedr/js-test-action?sort=semver&filter=!v*.*&style=for-the-badge&label=%20&color=44cc10)](https://github.com/smashedr/js-test-action/releases/latest) |   ✅    |  ✅  |  ✅   | `vN.x.x` | `vN`     |
| [![GitHub Tag Minor](https://img.shields.io/github/v/tag/smashedr/js-test-action?sort=semver&filter=!v*.*.*&style=for-the-badge&label=%20&color=blue)](https://github.com/smashedr/js-test-action/releases/latest) |   ✅    |  ✅  |  ❌   | `vN.N.x` | `vN.N`   |
| [![GitHub Release](https://img.shields.io/github/v/release/smashedr/js-test-action?style=for-the-badge&label=%20&color=red)](https://github.com/smashedr/js-test-action/releases/latest)                           |   ❌    |  ❌  |  ❌   | `vN.N.N` | `vN.N.N` |

You can view the release notes for each version on the [releases](https://github.com/smashedr/js-test-action/releases) page.

# Support

For general help or to request a feature, see:

- Q&A Discussion: https://github.com/cssnr/portainer-stack-deploy-action/discussions/categories/q-a
- Request a Feature: https://github.com/cssnr/portainer-stack-deploy-action/discussions/categories/feature-requests

If you are experiencing an issue/bug or getting unexpected results, you can:

- Report an Issue: https://github.com/cssnr/portainer-stack-deploy-action/issues
- Chat with us on Discord: https://discord.gg/wXy6m2X8wY
- Provide General Feedback: [https://cssnr.github.io/feedback/](https://cssnr.github.io/feedback/?app=Portainer%20Stack%20Deploy)

For more information, see the CSSNR [SUPPORT.md](https://github.com/cssnr/.github/blob/master/.github/SUPPORT.md#support).

# Contributing

Currently, the best way to contribute to this project is to star this project on GitHub.

For more information, see the CSSNR [CONTRIBUTING.md](https://github.com/cssnr/.github/blob/master/.github/CONTRIBUTING.md#contributing).

Additionally, you can support other GitHub Actions I have published:

- [Stack Deploy Action](https://github.com/cssnr/stack-deploy-action?tab=readme-ov-file#readme)
- [Portainer Stack Deploy](https://github.com/cssnr/portainer-stack-deploy-action?tab=readme-ov-file#readme)
- [VirusTotal Action](https://github.com/cssnr/virustotal-action?tab=readme-ov-file#readme)
- [Mirror Repository Action](https://github.com/cssnr/mirror-repository-action?tab=readme-ov-file#readme)
- [Update Version Tags Action](https://github.com/cssnr/update-version-tags-action?tab=readme-ov-file#readme)
- [Update JSON Value Action](https://github.com/cssnr/update-json-value-action?tab=readme-ov-file#readme)
- [Parse Issue Form Action](https://github.com/cssnr/parse-issue-form-action?tab=readme-ov-file#readme)
- [Cloudflare Purge Cache Action](https://github.com/cssnr/cloudflare-purge-cache-action?tab=readme-ov-file#readme)
- [Mozilla Addon Update Action](https://github.com/cssnr/mozilla-addon-update-action?tab=readme-ov-file#readme)
- [Docker Tags Action](https://github.com/cssnr/docker-tags-action?tab=readme-ov-file#readme)

For a full list of current projects to support visit: [https://cssnr.github.io/](https://cssnr.github.io/)

# Development

Development instructions have been moved to the [CONTRIBUTING.md](CONTRIBUTING.md).

[^1]:
    The `${{ github.token }}` / `{{ secrets.GITHUB_TOKEN }}` is automatically passed, there is no need to manually pass these!
    This is only available to allow users to pass a different token they have created and defined in their `secrets`.
