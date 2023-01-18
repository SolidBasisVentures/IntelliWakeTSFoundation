declare type EnumKeys<Enum> = Exclude<keyof Enum, number>;
export declare const EnumKeys: <Enum extends Record<string, string | number>>(e: Enum) => Exclude<keyof Enum, number>[];
export declare const EnumValues: <Enum extends Record<string, string | number>>(e: Enum) => Enum[Exclude<keyof Enum, number>][];
export declare const EnumKeyFromValue: <Enum extends Record<string, string | number>>(e: Enum, value: string | Enum[Exclude<keyof Enum, number>] | null | undefined) => string | undefined;
export declare const EnumValueFromKey: <Enum extends Record<string, string | number>>(e: Enum, key: string | null | undefined) => Enum[Exclude<keyof Enum, number>] | undefined;
export {};
