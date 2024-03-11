import { Query, QueryCriteria } from '../src/query';

interface Person {
  id: number;
  name: string;
  age: number;
}

describe('Query', () => {
  const objects: Person[] = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 },
    { id: 3, name: 'Doe', age: 40 },
  ];

  let query: Query<Person>;

  beforeEach(() => {
    query = new Query(objects);
  });

  it('searches for objects matching the query criteria', () => {
    const queryCriteria: QueryCriteria<Person, keyof Person> = { age: 30 };
    const results = query.search(queryCriteria);
    expect(results).toEqual([{ id: 1, name: 'John', age: 30 }]);
  });

  it('sorts objects based on a compare function', () => {
    const results = query.sort((a, b) => a.age - b.age);
    expect(results).toEqual([
      { id: 2, name: 'Jane', age: 25 },
      { id: 1, name: 'John', age: 30 },
      { id: 3, name: 'Doe', age: 40 },
      ]);
  });

  it('finds the first object matching the query criteria', () => {
    const queryCriteria: QueryCriteria<Person, keyof Person> = { age: 25 };
    const result = query.find(queryCriteria);
    expect(result).toEqual({ id: 2, name: 'Jane', age: 25 });
  });

  it('updates objects matching the query criteria', () => {
    const queryCriteria: QueryCriteria<Person, keyof Person> = { id: 2 };
    query.update(queryCriteria, obj => {
      obj.age = 35;
    });
    const updatedObject = query.find(queryCriteria);
    expect(updatedObject).toEqual({ id: 2, name: 'Jane', age: 35 }); // Corrected syntax here
  });
});
