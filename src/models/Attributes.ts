import { UserProps } from './User';

export class Attributes<T> {
  constructor(private data: T) {}

  /**
   * K is a convention only
   * <K extends keyof T> - sets a generic constraints. Limits the type 'K' can be
   *    -> 'keyof' one of the keys of 'T'
   * (key: K) 0 whatever arg we passed in, its a type 'K'. it can be name, age or id if we user UserProps
   * T[K] -> normal object look up
   *    -> T is UserProp object
   *    -> K is either name, age or id (propeties of UserProp interface)
   */
  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  set(update: T): void {
    Object.assign(this.data, update);
  }
}

const attrs = new Attributes<UserProps>({
  id: 5,
  age: 20,
  name: 'whatever',
});

const name = attrs.get('name');
const age = attrs.get('age');
const id = attrs.get('id');
