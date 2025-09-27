import typescript from 'rollup-plugin-typescript2';
import tslib from 'typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const config = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/oklish.js',
      format: 'umd',
      name: 'OKLISH',
      sourcemap: true,
      globals: {},
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      typescript: tslib,
      tsconfig: 'tsconfig.json',
    }),
  ],
  // React/ReactDOMもバンドルに含めるためexternalは空
  external: [],
};

export default config;
