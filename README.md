# My TypeScript Project

This is a starter template for a TypeScript project in Visual Studio Code, using `pnpm` as the package manager and `tsc-watch` for automatic compilation and running.

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

### tsc-watch

The configuration for `tsc-watch` is located in the `tsconfig.json` file as well. You can modify this file to change the options for the `tsc-watch` compiler.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.



