import { CaseConverters } from "../source/case-converters";
import { JsonNamingPolicy } from "../source/json-naming-policy";

describe("CaseConverters", () => {
    describe("toCamelCase", () => {
        it("should convert PascalCase to camelCase", () => {
            expect(CaseConverters.toCamelCase("FirstName")).toBe("firstName");
            expect(CaseConverters.toCamelCase("LastName")).toBe("lastName");
        });

        it("should convert snake_case to camelCase", () => {
            expect(CaseConverters.toCamelCase("first_name")).toBe("firstName");
            expect(CaseConverters.toCamelCase("last_name")).toBe("lastName");
        });

        it("should leave already camelCase unchanged", () => {
            expect(CaseConverters.toCamelCase("firstName")).toBe("firstName");
        });
    });

    describe("toPascalCase", () => {
        it("should convert camelCase to PascalCase", () => {
            expect(CaseConverters.toPascalCase("firstName")).toBe("FirstName");
        });

        it("should convert snake_case to PascalCase", () => {
            expect(CaseConverters.toPascalCase("last_name")).toBe("LastName");
        });

        it("should leave already PascalCase unchanged", () => {
            expect(CaseConverters.toPascalCase("FirstName")).toBe("FirstName");
        });
    });

    describe("toSnakeCase", () => {
        it("should convert camelCase to snake_case", () => {
            expect(CaseConverters.toSnakeCase("firstName")).toBe("first_name");
            expect(CaseConverters.toSnakeCase("lastName")).toBe("last_name");
        });

        it("should convert PascalCase to snake_case", () => {
            expect(CaseConverters.toSnakeCase("FirstName")).toBe("first_name");
            expect(CaseConverters.toSnakeCase("LastName")).toBe("last_name");
        });

        it("should leave snake_case unchanged", () => {
            expect(CaseConverters.toSnakeCase("first_name")).toBe("first_name");
        });
    });

    describe("apply", () => {
        it("should apply CamelCase policy", () => {
            expect(CaseConverters.apply("FirstName", JsonNamingPolicy.CamelCase)).toBe("firstName");
        });

        it("should apply PascalCase policy", () => {
            expect(CaseConverters.apply("firstName", JsonNamingPolicy.PascalCase)).toBe("FirstName");
        });

        it("should apply SnakeCase policy", () => {
            expect(CaseConverters.apply("firstName", JsonNamingPolicy.SnakeCase)).toBe("first_name");
        });
    });
});
