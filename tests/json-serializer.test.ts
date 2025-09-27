import { JsonSerializer, JsonSerializerOptions, JsonNamingPolicy } from "../source";
import { Person } from "./models/person";

describe("JsonSerializer", () => {
    it("should serialize with PascalCase and ignore null", () => {
        const person = new Person("John", "Doe", null);
        const json = JsonSerializer.serialize(person, new JsonSerializerOptions({
            namingPolicy: JsonNamingPolicy.PascalCase,
            ignoreNull: true
        }));

        const parsed = JSON.parse(json);

        expect(parsed.FirstName).toBe("John");
        expect(parsed.LastName).toBe("Doe");
        expect(parsed).not.toHaveProperty("Age");
    });

    it("should deserialize back to class instance", () => {
        const json = `{"FirstName":"John","LastName":"Doe"}`;
        const person = JsonSerializer.deserialize<Person>(json);

        expect(person.firstName).toBe("John");
        expect(person.lastName).toBe("Doe");
    });

    it("should handle arrays", () => {
        const people = [
            new Person("Alice", "Smith", 25),
            new Person("Bob", "Brown", null)
        ];

        const json = JsonSerializer.serialize(people, new JsonSerializerOptions({
            namingPolicy: JsonNamingPolicy.SnakeCase,
            ignoreNull: true
        }));

        const parsed = JSON.parse(json);

        expect(parsed[0].first_name).toBe("Alice");
        expect(parsed[1]).not.toHaveProperty("age");
    });
});
