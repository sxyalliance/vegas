# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.
Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Development environment setup

Please first ensure you have all prerequisites installed as described in the [README](../README.md#prerequisites).

We do not enforce a specific IDE or editor. You can use any editor you like, as long as your code fit our code style, which enforced by [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).

To set up a development environment, please follow these steps:

1. Clone the repo
   ```sh
   git clone https://github.com/sxyalliance/vegas.git && cd vegas
   ```
2. Install dependencies
   ```sh
    pnpm install
   ```
3. Setup environment variables
   ```sh
   cp .env.example .env
   ```
   Then edit `.env` to set your environment variables.
4. Start the development server
   ```sh
   pnpm run dev
   ```
5. Open [localhost:5173](http://localhost:5173) to see the app.

## Issues and feature requests

You've found a bug in the source code, a mistake in the documentation, or maybe you'd like a new feature? You can help us by [submitting an issue on GitHub](https://github.com/sunxyw/vegas/issues). Before you create an issue, make sure to search the issue archive -- your issue may have already been addressed!

Please try to create bug reports that are:

- _Reproducible._ Include steps to reproduce the problem.
- _Specific._ Include as much detail as possible: which version, what environment, etc.
- _Unique._ Do not duplicate existing opened issues.
- _Scoped to a Single Bug._ One bug per report.

**Even better: Submit a pull request with a fix or new feature!**

### How to submit a Pull Request

1. Search our repository for open or closed
   [Pull Requests](https://github.com/sunxyw/vegas/pulls)
   that relate to your submission. You don't want to duplicate effort.
2. Fork the project
3. Create your feature branch (`git checkout -b feat/amazing_feature`)
4. Commit your changes (`git commit -m 'feat: add amazing_feature'`) Vegas uses [conventional commits](https://www.conventionalcommits.org), so please follow the specification in your commit messages.
5. Push to the branch (`git push origin feat/amazing_feature`)
6. [Open a Pull Request](https://github.com/sunxyw/vegas/compare?expand=1)
