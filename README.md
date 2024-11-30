# Google Script template

My starter template for a Google Script project.
It uses typescript and clasp.

## Get Started

Clone the repository and that is it.

To install dependencies, run `bun install`.
To run tests, type `bun test`.

You may wish to change the license.

## Pushing project

For interacting with clasp, read their [docs](https://github.com/google/clasp/blob/master/docs/README.md).

`bun run login` will log you in globally using your browser.
After logging in, either `bun run create` or `bun run clone` to pair with a project.
This creates a `.clasp.json` file with the info. You may not want to commit it, because it is user-specific.

Now with the project paired, `bun run push` or `bun run watch` will update the project on google cloud.

`bun run deploy -- "description"`
