[![Tags](https://img.shields.io/github/actions/workflow/status/smashedr/js-test-action/tags.yaml?logo=github&logoColor=white&label=tags)](https://github.com/smashedr/js-test-action/actions/workflows/tags.yaml)
[![GitHub Release Version](https://img.shields.io/github/v/release/smashedr/js-test-action?logo=github)](https://github.com/smashedr/js-test-action/releases/latest)
[![GitHub Top Language](https://img.shields.io/github/languages/top/smashedr/js-test-action?logo=htmx&logoColor=white)](https://github.com/smashedr/js-test-action)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=github&logoColor=white)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)

# JavaScript Test Action

* [Inputs](#Inputs)
* [Outputs](#Outputs)

> [!NOTE]   
> Please submit a [Feature Request](https://github.com/smashedr/js-test-action/discussions/categories/feature-requests)
> for new features or [Open an Issue](https://github.com/smashedr/js-test-action/issues) if you find any bugs.

## Inputs

| input | required | default | description                     |
|-------|----------|---------|---------------------------------|
| token | Yes      | -       | Token from secrets.GITHUB_TOKEN |
| body  | Yes      | -       | Test Body Data to Output        |

```yaml
  - name: "JS Test Action"
    uses: smashedr/js-test-action@master
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      body: ${{ github.event.issue.body }}
```

## Outputs

| output | description    |
|--------|----------------|
| result | Results Output |

```yaml
  - name: "JS Test Action"
    id: update
    uses: smashedr/js-test-action@master
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      body: ${{ github.event.issue.body }}

  - name: "Echo Output"
    run: |
      echo '${{ steps.update.outputs.result }}'
```
