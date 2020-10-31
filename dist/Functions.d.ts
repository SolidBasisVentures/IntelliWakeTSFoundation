export declare const Trunc: (subject: string, length: number) => string;
export declare const GoogleMapsGPSLink: (dataArray: any, prefix?: string) => string;
export declare const GoogleMapsAddressLink: (dataArray: any, prefix?: string) => string;
export declare const IsValidInputDecimal: (value: string) => boolean;
export declare const GenerateUUID: () => string;
export declare const IsOn: (value: any) => boolean;
export declare type TFindIsActive = boolean | null;
export interface IAddress {
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    zip: string;
}
export declare const AddressCopy: (fromObject: any, fromPrefix: string, toObject: any, toPrefix: string, includeName?: boolean, includePhone?: boolean, includeTimeZone?: boolean, includeGPS?: boolean) => void;
export declare const AddressValid: (address: any, prefix?: string | undefined) => boolean;
export declare const AddressSingleRow: (object: any, prefix?: string | undefined) => string;
