# Google Script template

My starter template for a Google Script project.
It uses typescript and clasp.

## Instalation

To install dependencies:

```bash
bun install
```

To run tests:

```bash
bun test
```

## Pushing project

For interacting with clasp, read their [docs](https://github.com/google/clasp/blob/master/docs/README.md).

`bun run login` will log you in globally using your browser.
After logging in, either `bun run create` or `bun run clone` to pair with a project.
This creates a `.clasp.json` file with the info.

Now with the project paired, `bun run push` or `bun run watch` will update the project on google cloud.

