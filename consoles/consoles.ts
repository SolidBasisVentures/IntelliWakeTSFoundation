import {ESTTodayDateTimeLabel} from '../src/DateManager'
import {FindCommonStringPatterns} from '../src/StringManipulation'

require('source-map-support').install()

console.log('Starting', ESTTodayDateTimeLabel())
console.time('Consoles')

console.log(FindCommonStringPatterns(['1Test1FileA', '1Test2FileAb', '2Test3FileBa']))
console.log(FindCommonStringPatterns(['Test1FileA', 'Test2FileAb', 'Test3FileBa']))
console.log(FindCommonStringPatterns(['Test1FileAcsv', 'Test2FileAbcsv', 'Test3FileBacsv']))
console.log(FindCommonStringPatterns(['Test1-FileA-Pricecsv', 'Test2-FileAb-Pricecsv', 'Test3-FileBa-Pricecsv']))

console.timeEnd('Consoles')
