import { JsonNamingPolicy } from "./json-naming-policy";

export class CaseConverters {
    public static toCamelCase(value: string): string {
        const regexFirstUppercaseLetter = /^[A-Z]/;
        const regexUnderscoreLetter = /_([a-z])/g;

        return value
            .replace(regexFirstUppercaseLetter, character => character.toLowerCase())
            .replace(regexUnderscoreLetter, (_, letter) => letter.toUpperCase());
    }

    public static toPascalCase(value: string): string {
        const camelCase = CaseConverters.toCamelCase(value);
        return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
    }

    public static toSnakeCase(value: string): string {
        const regexUppercaseLetter = /[A-Z]/g;
        const regexLeadingUnderscore = /^_/;

        return value
            .replace(regexUppercaseLetter, letter => `_${letter.toLowerCase()}`)
            .replace(regexLeadingUnderscore, "");
    }

    public static apply(value: string, policy: JsonNamingPolicy): string {
        switch (policy) {
            case JsonNamingPolicy.CamelCase:
                return CaseConverters.toCamelCase(value);
            case JsonNamingPolicy.PascalCase:
                return CaseConverters.toPascalCase(value);
            case JsonNamingPolicy.SnakeCase:
                return CaseConverters.toSnakeCase(value);
            default:
                return CaseConverters.toCamelCase(value);
        }
    }
}
