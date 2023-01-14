import pkg from './package.json'
import typescript from 'rollup-plugin-typescript2'

export default {
	input: [
		'src/main.ts'
	],
	output: [
		{
			file: pkg.main,
			format: 'esm'
			// format: 'cjs'
			// file: 'dist/main.js',
		}
	],
	plugins: [typescript({objectHashIgnoreUnknownHack: false})],
	external: ['moment-timezone']
}
