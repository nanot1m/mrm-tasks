# mrm-task-eslint

[Mrm](https://github.com/sapegin/mrm) task that adds [ESLint](http://eslint.org/).

## What it does

* Creates `.eslintrc`
* Adds an npm script to run ESLint before tests
* Installs dependencies

## Usage

```
npm install -g mrm mrm-task-eslint
mrm eslint
```

## Options

See [Mrm docs](https://github.com/sapegin/mrm#usage) for more details.

### `eslintPreset` (default: `eslint:recommended`)

ESLint preset name (not npm package name, e.g. `airbnb`).

### `eslintPeerDependencies` (optional)

Additional dependencies to install (e.g. `['prettier', 'eslint-plugin-prettier']`).

## Changelog

The changelog can be found in [Changelog.md](Changelog.md).

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](../Contributing.md).

## Authors and license

[Artem Sapegin](http://sapegin.me) and [contributors](https://github.com/sapegin/mrm-task-eslint/graphs/contributors).

MIT License, see the included [License.md](License.md) file.