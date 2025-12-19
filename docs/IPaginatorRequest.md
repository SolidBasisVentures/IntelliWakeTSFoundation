# Interface: IPaginatorRequest<SORT, FILTER\>

A structure to pass to the server in an API REQUEST to tell it how to walk through pages of data.

page = What page of data to retrieve
search = A search string if any
sortColumns = Tells the server how to sort the data
active = Tells the server whether to find active, inactive or all items
filterValues = Other filter data (of type T) to pass to the structure to limit result sets (e.g. customer_id = 1 for all items that match customer 1)

IFilterSortPaginatorReturn should be in the RESPONSE of the API to tell the app about the data it received (e.g. how many pages there are, etc.)

## Type parameters

| Name | Type |
| :------ | :------ |
| `SORT` | `Record`<`string`, `any`\> |
| `FILTER` | `Record`<`string`, `any`\> |

## Properties

### active

• **active**: [`TFindIsActive`](../wiki/Exports#tfindisactive)

#### Defined in

[SortSearch.ts:152](https://github.com/SolidBasisVentures/IntelliWakeTSFoundation/blob/07249ec/src/SortSearch.ts#L152)

___

### countPerPage

• **countPerPage**: `number`

#### Defined in

[SortSearch.ts:149](https://github.com/SolidBasisVentures/IntelliWakeTSFoundation/blob/07249ec/src/SortSearch.ts#L149)

___

### filterValues

• **filterValues**: `FILTER`

#### Defined in

[SortSearch.ts:153](https://github.com/SolidBasisVentures/IntelliWakeTSFoundation/blob/07249ec/src/SortSearch.ts#L153)

___

### page

• **page**: `number`

#### Defined in

[SortSearch.ts:148](https://github.com/SolidBasisVentures/IntelliWakeTSFoundation/blob/07249ec/src/SortSearch.ts#L148)

___

### search

• **search**: `string`

#### Defined in

[SortSearch.ts:150](https://github.com/SolidBasisVentures/IntelliWakeTSFoundation/blob/07249ec/src/SortSearch.ts#L150)

___

### sortColumns

• **sortColumns**: [`ISortColumn`](../wiki/ISortColumn)<`SORT`\>

#### Defined in

[SortSearch.ts:151](https://github.com/SolidBasisVentures/IntelliWakeTSFoundation/blob/07249ec/src/SortSearch.ts#L151)
