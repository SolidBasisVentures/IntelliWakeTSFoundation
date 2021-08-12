import pkg from './package.json'
import typescript from 'rollup-plugin-typescript2'

export default {
	input: [
		'src/main.ts'
	],
	output: [
		{
			file: pkg.main,
			format: 'cjs'
			// file: 'dist/main.js',
			// format: 'esm'
		}
	],
	plugins: [typescript({objectHashIgnoreUnknownHack: false})],
	external: ['dayjs', 'dayjs/plugin/duration', 'dayjs/plugin/isoWeek', 'dayjs/plugin/utc', 'dayjs/plugin/timezone', 'dayjs/plugin/AdvancedFormat', 'dayjs/plugin/LocalizedFormat', 'dayjs/plugin/customParseFormat']
}
