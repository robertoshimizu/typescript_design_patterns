# Design Patterns in Typescript

## Strategy Pattern

Scenario: inheritance. Have an abstract class `Duck` and any type of Duck: Mallard Duck, Redhead Duck, implements it, and therefore inherits the behaviors: quack, swim and display.

Problems: 
- what if some type of ducks have behaviors that are not common to all ducks? For example, if we define a `fly()` method in the parent class, all subclasses will inherit the fly(), but `not all ducks can fly`. `Rubber Ducks` don't fly nor quack, but they `squeak`.

Solutions:
- override the fly() and quack() methods at the subclass implementation?
- implement specific behaviors to specific type of ducks, for example, `squeak()` in the Rubber duck subclass implementation.

Impacts:
- Need to track all duck behaviors and implement them separately.
- If another behavior is added or resumed, need to go individually to all subclasses and change it. If `changes are frequent`, then this becomes cumbersome.

> ### #1 Design Principle: Identify the aspects of your application that vary and separate them from what stays the same.

If you've got some aspect of your code that is changing, say with evry new requirement, then you know you've got a `behavior` that needs to be pulled out and separated from all the stuff that doesn't change. Take the parts that vary and **encapsulate** them, so later you can alter or extend the part that varies without affecting those that do not.

In the example, separate out `Fly` and `Quack` methods, and create a new set of classes that represent each behavior.

> ### #2 Design Principle: Program to an interface, not an implementation.


## Typescript and Jest Boilerplate

This is a starter template for a TypeScript project in Visual Studio Code, using `pnpm` as the package manager and `tsc-watch` for automatic compilation and running.

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)

## Installation

1. Clone this repository to your local machine.
2. Install `pnpm` globally by running the following command in your terminal:

```
npm install -g pnpm
```

3. Install project dependencies by running the following command in your terminal:

```
pnpm install
```

## Usage

To start the project, run the following command in your terminal:

```
pnpm run start:watch
```

This will start the project in watch mode, which will automatically recompile and run the code whenever you make changes to the TypeScript files.

To compile the code without running it, run the following command in your terminal:

```
pnpm run build
```

This will compile the TypeScript code to JavaScript and output the result to a new folder called `dist`.

To run the compiled JavaScript code, run the following command in your terminal:

```
pnpm run start
```

## Configuration

### TypeScript

The configuration for TypeScript is located in the `tsconfig.json` file. You can modify this file to change the compiler options for your project.

```json
{
  "compilerOptions": {
    "target": "ES2022", // Check node.green to select the most up-to-date ecma script version
    "module": "commonjs", // will convert to commonjs
    "outDir": "./dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true, // will work with require and import
    "allowJs": true // allow javascript files
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

### Linter

Use the JavaScript Standard Style - https://standardjs.com/ . We will configure it along with eslinter - https://eslint.org/

For that there is a wrapper at https://github.com/standard/eslint-config-standard-with-typescript

```bash
pnpm install eslint-config-standard-with-typescript
```
#### Update Settings to:
```
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": false,
```

## Jest

```bash
pnpm install -D jest @types/jest ts-jest
```
Jest Config
```
module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
```

To run:
```
pnpm test
```
But I can have several scripts to run tests, at `package.json`:
```json
"scripts": {
    "start": "node dist/index.js",
    "build": "tsc",
    "watch": "pnpx tsc-watch --onSuccess \"node dist/index.js\"",
    "test": "jest --passWithNoTests",
        "test:unit":"pnpm test -- --silent --noStackTrace -c jest-unit-config.js",
    "test:watch": "pnpm test:unit -- --watch",
    "format": "npx prettier '**/*.ts' '**/*.js' --write"
  },
```

I can have a specific script and config only for `unit tests`:

Jest-Unit-Config
```
const config = require('./jest.config.js')
config.testMatch = ['**/*.spec.ts']
module.exports = config
```
So in this project, unit tests are ran when they have the suffix `spec`

More configurations: `clean-node-api Manguinho - aula 11`


### Transpile and run (watch mode)

The configuration for `tsc-watch` is located in the `tsconfig.json` file as well. You can modify this file to change the options for the `tsc-watch` compiler.

But here we run through the script
```
pnpm build
pnpm watch
pnpm start
```

## Git

### Amend: Add a commit to the last one

```bash
git add .
git commit --amend --no-edit
```



## License

This project is licensed under the MIT License. See the LICENSE file for more information.
