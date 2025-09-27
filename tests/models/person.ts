export class Person {
    public readonly firstName: string;
    public readonly lastName: string;
    public readonly age: number | null;

    public constructor(firstName: string, lastName: string, age: number | null) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}