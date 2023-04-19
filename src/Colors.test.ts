import {describe, expect, it} from 'vitest'
import {hslShades} from './Colors'

describe('hslShades', () => {
	it('should return an empty array when the count is 0', () => {
		const shades = hslShades(0, 120)
		expect(shades).toEqual([])
	})

	it('should return an array of length "count" when count is greater than 0', () => {
		const shades = hslShades(5, 120)
		expect(shades.length).toBe(5)
	})

	it('should return an array with the correct start and end hues when options are not provided', () => {
		const shades = hslShades(3, 120)
		expect(shades).toEqual(['hsl(120, 30%, 30%)', 'hsl(120, 55%, 45%)', 'hsl(120, 80%, 60%)'])
	})

	it('should return an array with the correct start and end hues when options are provided', () => {
		const shades = hslShades(3, 140, {
			startHue: 130,
			startSaturation: 20,
			endSaturation: 80,
			startLightness: 40,
			endLightness: 60
		})
		expect(shades).toEqual(['hsl(130, 20%, 40%)', 'hsl(135, 50%, 50%)', 'hsl(140, 80%, 60%)'])
	})

	it('should return an array with the correct start saturation and end saturation', () => {
		const shades = hslShades(3, 120, {
			startHue: 121,
			startSaturation: 20,
			endSaturation: 80
		})
		expect(shades).toEqual(['hsl(121, 20%, 30%)', 'hsl(120.5, 50%, 45%)', 'hsl(120, 80%, 60%)'])
	})

	it('should return an array with the correct start lightness and end lightness', () => {
		const shades = hslShades(3, 120, {
			startLightness: 40,
			endLightness: 60
		})
		expect(shades).toEqual(['hsl(120, 30%, 40%)', 'hsl(120, 55%, 50%)', 'hsl(120, 80%, 60%)'])
	})
})
