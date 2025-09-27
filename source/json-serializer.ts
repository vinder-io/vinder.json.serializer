import { JsonNamingPolicy } from "./json-naming-policy";
import { JsonSerializerOptions } from "./json-serializer-options";
import { CaseConverters } from "./case-converters";

export class JsonSerializer {
    private constructor() { }

    public static serialize<TSource>(object: TSource, serializerOptions?: JsonSerializerOptions): string {
        const options = serializerOptions || new JsonSerializerOptions();

        const replacer = (key: string, value: any) => {
            if (options.ignoreNull && value === null)
                return undefined;

            return value;
        };

        const transformed = JsonSerializer.transformKeys(object, JsonNamingPolicy.CamelCase, options.namingPolicy);

        return JSON.stringify(transformed, replacer, 2);
    }

    public static deserialize<TTarget>(jsonString: string, serializerOptions?: JsonSerializerOptions): TTarget {
        const options = serializerOptions ?? new JsonSerializerOptions();
        const object = JSON.parse(jsonString);

        return JsonSerializer.transformKeys(object, JsonNamingPolicy.CamelCase, options.namingPolicy) as TTarget;
    }

    private static transformKeys(object: any, fromPolicy: JsonNamingPolicy, toPolicy?: JsonNamingPolicy): any {
        if (!object || typeof object !== "object")
            return object;

        if (Array.isArray(object)) {
            return object.map(value => JsonSerializer.transformKeys(value, fromPolicy, toPolicy));
        }

        const result: any = {};

        for (const key in object) {
            const transformedKey = toPolicy != null
                ? CaseConverters.apply(key, toPolicy)
                : key;

            result[transformedKey] = JsonSerializer.transformKeys(object[key], fromPolicy, toPolicy);
        }

        return result;
    }
}
