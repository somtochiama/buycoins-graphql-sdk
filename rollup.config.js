import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';

const packageJson = require('./package.json');

const globals = {
  ...packageJson.devDependencies,
};

export default {
  input: 'src/app.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
    },
    {
      file: packageJson.module,
      format: 'esm',
    },
  ],
  plugins: [
    json(),
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
  ],
  external: Object.keys(globals),
};
