import json from './package.json' assert { type: 'json' }
import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'

export default {
    input: [
        'src/main.ts'
    ],
    output: [
        {
            file: json.main,
            format: 'cjs',
	        plugins: [dts()]
	        // file: 'dist/main.js',
	        // format: 'esm'
        }
    ],
    plugins: [typescript({ objectHashIgnoreUnknownHack: false })],
    external: ['moment-timezone']
}
