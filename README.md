<p align="center">
  <img src="https://i.imgur.com/MmamZlQ.png" alt="vinder.logo" />
</p>

# @vinder-io/json.serializer

A lightweight and flexible JSON serializer for TypeScript and JavaScript, inspired by the functionality of .NET's `System.Text.Json`. This library allows you to easily convert objects to and from JSON strings with control over naming policies and null value handling.

## Features

-   **Naming Policies**: Automatically convert object property names to different case styles (`PascalCase`, `camelCase`, `snake_case`).
-   **Null Value Handling**: Option to ignore `null` properties during serialization.
-   **Simple API**: A straightforward, static `JsonSerializer` class for easy use.
-   **Lightweight**: No external dependencies.

## Installation

Install the package using npm:

```bash
npm install @vinder-io/json.serializer
```

## How to Use

The library exposes a static `JsonSerializer` class with `serialize` and `deserialize` methods.

### Basic Serialization

By default, the serializer uses `camelCase` and includes null values.

```typescript
import { JsonSerializer } from '@vinder-io/json.serializer';

class User {
  constructor(public userId: number, public userName: string, public lastLogin: Date | null) {}
}

const user = new User(1, 'JohnDoe', null);

// Serialize the object
const json = JsonSerializer.serialize(user);

console.log(json);
// Output:
// {
//   "userId": 1,
//   "userName": "JohnDoe",
//   "lastLogin": null
// }
```

### Basic Deserialization

```typescript
import { JsonSerializer } from '@vinder-io/json.serializer';

const json = `{"userId":1,"userName":"JohnDoe","lastLogin":null}`;

// Deserialize the JSON string back to an object
const user = JsonSerializer.deserialize<User>(json);

console.log(user.userId); // 1
```

## Advanced Usage

You can customize the serialization behavior by passing `JsonSerializerOptions`.

### Using Naming Policies

Convert property names to `PascalCase`, `snake_case`, or `kebab-case`.

```typescript
import { JsonSerializer, JsonSerializerOptions, JsonNamingPolicy } from '@vinder-io/json.serializer';

class Product {
  public id: string;
  public name: string;

  public constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

const product = new Product('abc-123', 'My Awesome Product');

// Serialize with PascalCase

const pascalJson = JsonSerializer.serialize(product, {
  namingPolicy: JsonNamingPolicy.PascalCase
});

console.log(pascalJson);

// {
//   "Id": "abc-123",
//   "Name": "My Awesome Product"
// }

// Serialize with snake_case
const snakeJson = JsonSerializer.serialize(product, new JsonSerializerOptions({
  namingPolicy: JsonNamingPolicy.SnakeCase
}));
console.log(snakeJson);
// {
//   "product_id": "abc-123",
//   "product_name": "My Awesome Product"
// }
```

When deserializing, the library assumes the source JSON properties match the specified naming policy and converts them back to `camelCase`.

```typescript
const pascalJson = `{"ProductId":"xyz-789","ProductName":"Another Product"}`;

const product = JsonSerializer.deserialize<Product>(pascalJson, new JsonSerializerOptions({
  namingPolicy: JsonNamingPolicy.PascalCase
}));

console.log(product.productName); // "Another Product"
```

### Ignoring Null Values

To exclude properties with `null` values from the JSON output, set `ignoreNull` to `true`.

```typescript
import { JsonSerializer, JsonSerializerOptions, JsonNamingPolicy } from '@vinder-io/json.serializer';

class Person {
  constructor(public firstName: string, public lastName: string, public age: number | null) {}
}

const person = new Person("Jane", "Doe", null);

const json = JsonSerializer.serialize(person, new JsonSerializerOptions({
    namingPolicy: JsonNamingPolicy.PascalCase,
    ignoreNull: true
}));

console.log(json);
// Output:
// {
//   "FirstName": "Jane",
//   "LastName": "Doe"
// }
// "Age" property is excluded
```

### Working with Arrays

The serializer handles arrays of objects seamlessly.

```typescript
const people = [
    new Person("Alice", "Smith", 25),
    new Person("Bob", "Brown", null)
];

const json = JsonSerializer.serialize(people, new JsonSerializerOptions({
    namingPolicy: JsonNamingPolicy.SnakeCase,
    ignoreNull: true
}));

console.log(json);
// [
//   {
//     "first_name": "Alice",
//     "last_name": "Smith",
//     "age": 25
//   },
//   {
//     "first_name": "Bob",
//     "last_name": "Brown"
//   }
// ]
```

## API Reference

### `JsonSerializer`

A static class for serialization and deserialization.

-   `static serialize<TSource>(object: TSource, serializerOptions?: JsonSerializerOptions): string`
    Serializes an object into a JSON string.

-   `static deserialize<TTarget>(jsonString: string, serializerOptions?: JsonSerializerOptions): TTarget`
    Deserializes a JSON string into an object of type `TTarget`.

### `JsonSerializerOptions`

An options class to configure serialization behavior.

-   `namingPolicy?: JsonNamingPolicy`: Specifies the naming policy for property names. Defaults to `JsonNamingPolicy.CamelCase`.
-   `ignoreNull?: boolean`: If `true`, properties with `null` values are excluded from the output. Defaults to `false`.

### `JsonNamingPolicy`

An enum for available naming policies:
-   `CamelCase` (default)
-   `PascalCase`
-   `SnakeCase`
-   `KebabCase`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
*This project is maintained by Vinder.*
