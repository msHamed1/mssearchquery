export interface QueryCriteria<T, U extends keyof T> {
  [key: string]: T[U];
}

export class Query<T> {
  private objects: T[];

  constructor(objects: T[]) {
    this.objects = objects;
  }

    search(query: QueryCriteria<T, keyof T>): T[] {
      return this.objects.filter(obj => this.matchesQuery(obj, query));
  }

  private matchesQuery(obj: T, query: QueryCriteria<T, keyof T>): boolean {
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        const queryValue = query[key];
        if ((obj as unknown as Record<keyof T, unknown> as any)[key] !== queryValue) {
          return false;
        }
      }
    }
    return true;
  }


    sort(compareFn: (a: T, b: T) => number): T[] {
      return this.objects.slice().sort(compareFn);
  }

  find(query: QueryCriteria<T, keyof T>): T | undefined {
    for (const obj of this.objects) {
      if (this.matchesQuery(obj, query)) {
        return obj;
      }
    }
    return undefined;
  }
  update(query: QueryCriteria<T, keyof T>, updateFn: (obj: T) => void): void {
    this.objects.forEach(obj => {
      if (this.matchesQuery(obj, query)) {
        updateFn(obj);
      }
    });
  }
  
}
