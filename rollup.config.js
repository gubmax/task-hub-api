import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import run from '@rollup/plugin-run'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import builtins from 'builtin-modules'

import pkg from './package.json'

const env = process.env.NODE_ENV
const isDev = process.env.ROLLUP_WATCH === 'true'
const isDebug = process.env.ROLLUP_DEBUG === 'true'

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    sourcemap: isDev || isDebug,
  },
  watch: {
    include: 'src/**',
  },
  plugins: [
    replace({
      process: JSON.stringify({
        env: {
          NODE_ENV: env || (isDev || isDebug ? 'development' : 'production'),
        },
      }),
    }),
    resolve({ jsnext: true, preferBuiltins: true }),
    commonjs({ extensions: ['.js', '.ts'] }),
    typescript(),
    !isDev && !isDebug && terser(),
    (isDev || isDebug) && run(
      isDebug
        ? { execArgv: ['--inspect-brk=127.0.0.1:9229'] }
        : {},
    ),
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...builtins,
  ],
}
