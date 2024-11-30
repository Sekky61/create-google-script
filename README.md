# Google Script template

My starter template for a Google Script project.
It uses clasp and bun.

It supports:
- Typescript
- npm packages
- Easy deployment with versions and bundling
- lint with Biome

## Get Started

Clone the repository and that is it.
Bun makes this very easy with [bun create](https://bun.sh/docs/cli/bun-create):
```bash
bun create Sekky61/create-google-script mydir
```

## Pushing project

For interacting with clasp, read their [docs](https://github.com/google/clasp/blob/master/docs/README.md).

`bun run login` will log you in globally using your browser.
After logging in, either `bun run create` or `bun run clone` to pair with a project.
This creates a `.clasp.json` file with the info. You may not want to commit it, because it is user-specific.

Now with the project paired, `bun run push` or `bun run watch` will update the project on google cloud.

`bun run deploy -- "description"`

## Tips

To run tests, type `bun test`.
See more in the [bun test docs](https://bun.sh/docs/cli/test).

You may wish to change the license.

Globals like `console`, `Session` and `Blob` are documented [here](https://developers.google.com/apps-script/reference/base).

## Disclaimer

DISCLAIMER: This script is not affiliated with, endorsed by, or officially supported by Google.
It is an independent tool created for managing Apps Script deployments using clasp.
Use it at your own risk, and refer to official Google documentation for guidance on Apps Script and clasp.

