import {IsOn} from '../src/Functions'

require("ts-node/register")
import deepEqual from 'deep-equal'

console.log(IsOn(1), deepEqual({One: 1}, {One: 1}))
