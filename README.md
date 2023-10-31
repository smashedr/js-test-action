# JS Test Action

This action should never be used under any circumstances, be it life, death, or npm...

## Inputs

| input    | description               |
|----------|---------------------------|
| chrome:  | Remote Docker host        |
| firefox: | Remote Docker username    |

## Example usage

```yaml
name: "Test JS Test"

on:
  workflow_dispatch:
  release:
    types: [published]

jobs:
  test:
    name: "Test"
    runs-on: ubuntu-latest
    timeout-minutes: 5

    steps:
      - name: "Checkout"
        uses: actions/checkout@v3

      - name: "Test JS"
        uses: smashedr/js-test-action@master
        with:
          chrome: 'build/chrome.zip'
          firefox: 'build/firefox.zip'
```
