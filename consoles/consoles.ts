import {DurationLongDescription} from '../src/DateManager'

require('source-map-support').install()

console.log(DurationLongDescription((60) + 23))

// const changes = {item_one: null, item_two: 2}
//
// console.log('Camel', ToCamelCase('Service Extensions'))
// console.log('Pascal', ToPascalCase('Service Extensions'))
//
// console.log(changes, RemoveDupProperties(changes, changes))
//
// console.log(HTMLToText('<p>john doe</p>'))

// console.log([
// 	{id: 1, name: 'AAA', prioritized: false},
// 	{id: 2, name: 'ZZZ', prioritized: false},
// 	{id: 3, name: 'CCC', prioritized: true},
// 	{id: 4, name: 'BBB', prioritized: false}
// ].sort((a, b) =>
// 	SortCompareNull(b.prioritized, a.prioritized) ??
// 	SortCompare(a.name, b.name)))
//
// const testObject = {
// 	name: 'The quick brown fox',
// 	amount: 1234.56,
// 	subObj: {item: 'One', desc: 'Two'},
// 	subArr: ['Bird', 'Cat', 'Dog'],
// 	subArrObjs: [{counter: 1, description: 'First'}, {counter: 2, description: 'Second'}]
// }
//
// console.log(ObjectContainsSearchTerms(testObject, ['Quick', 'One', 'bird', 'first']))
// console.log(ObjectContainsSearchTerms(testObject, ['klak', 'Quick', 'One', 'bird', 'first']))
//
// console.log([
// 	{id: 1, name: 'AAA'},
// 	{id: null, name: 'ZZZ'},
// 	{id: null, name: 'CCC'},
// 	{id: 4, name: 'BBB'}
// ].sort((a, b) => SortCompareNull(a.id, b.id, 'Top') ?? SortCompare(a.name, b.name)))
