[![Tags](https://github.com/smashedr/js-test-action/actions/workflows/tags.yaml/badge.svg)](https://github.com/smashedr/js-test-action/actions/workflows/tags.yaml)

# JS Test Action

Parse GitHub Issue Forms Action

> [!NOTE]   
> Please submit a [Feature Request](https://github.com/smashedr/js-test-action/discussions/categories/feature-requests)
> for new features or [Open an Issue](https://github.com/smashedr/js-test-action/issues) if you find any bugs.

## Inputs

| input | required | default | description                     |
|-------|----------|---------|---------------------------------|
| token | Yes      | -       | Token from secrets.GITHUB_TOKEN |
| body  | Yes      | -       | Issue Body to Parse             |

```yaml
  - name: "Update Tags"
    uses: smashedr/js-test-action@master
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      body: ${{ github.event.issue.body }}
```

## Simple Example

Coming Soon...
