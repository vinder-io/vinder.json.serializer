import { JsonNamingPolicy } from "./json-naming-policy";

export class JsonSerializerOptions {
    public namingPolicy: JsonNamingPolicy = JsonNamingPolicy.CamelCase;
    public ignoreNull: boolean = false;

    public constructor(init?: Partial<JsonSerializerOptions>) {
        Object.assign(this, init);
    }
}
