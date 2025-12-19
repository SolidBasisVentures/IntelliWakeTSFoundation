# Interface: IPaginatorResponse<T\>

A structure returned in an API RESPONSE that tells the app what kind of data the counts found.

page = The actual page returned, which may be different from the page requested if fewer pages exist than the page that was requested.
pageCount = The total number of pages there would be based on the count of rows found
rowCount = The total number of rows found
countPerPage = How many rows make up a page
currentOffset = More used by the database, but this would be the offset (e.g. 51 on the second page of a set that had CountPerPage = 50 and RowCount > 50)

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `Record`<`string`, `any`\> |

## Properties

### countPerPage

• **countPerPage**: `number`

#### Defined in

[SortSearch.ts:183](https://github.com/SolidBasisVentures/IntelliWakeTSFoundation/blob/07249ec/src/SortSearch.ts#L183)

___

### currentOffset

• **currentOffset**: `number`

#### Defined in

[SortSearch.ts:184](https://github.com/SolidBasisVentures/IntelliWakeTSFoundation/blob/07249ec/src/SortSearch.ts#L184)

___

### page

• **page**: `number`

#### Defined in

[SortSearch.ts:180](https://github.com/SolidBasisVentures/IntelliWakeTSFoundation/blob/07249ec/src/SortSearch.ts#L180)

___

### pageCount

• **pageCount**: `number`

#### Defined in

[SortSearch.ts:181](https://github.com/SolidBasisVentures/IntelliWakeTSFoundation/blob/07249ec/src/SortSearch.ts#L181)

___

### rowCount

• **rowCount**: `number`

#### Defined in

[SortSearch.ts:182](https://github.com/SolidBasisVentures/IntelliWakeTSFoundation/blob/07249ec/src/SortSearch.ts#L182)

___

### rows

• **rows**: `T`[]

#### Defined in

[SortSearch.ts:185](https://github.com/SolidBasisVentures/IntelliWakeTSFoundation/blob/07249ec/src/SortSearch.ts#L185)
