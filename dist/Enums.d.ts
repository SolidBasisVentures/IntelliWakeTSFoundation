export declare const EnumValues: <T extends object>(enumumerator: T) => T[];
export declare const EnumKeys: <T extends object>(enumerator: T) => string[];
export declare const EnumKeyFromValue: <T extends object>(enumumerator: T, value: string | T) => string | undefined;
export declare const EnumValueFromKey: <T extends object>(enumumerator: T, value: string) => T | undefined;
