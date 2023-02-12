import { UsersStore } from '../users';

const store = new UsersStore();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      firstname: 'farah',
      lastname: 'mahmoud',
      password: 'farah-mahmoud-password',
    });
    const user = {
      id: result.id,
      firstname: result.firstname,
      lastname: result.lastname,
    };
    expect(user).toEqual({
      id: 1,
      firstname: 'farah',
      lastname: 'mahmoud',
    });
  });

  it('index method should return a list of Users', async () => {
    const result = await store.index();
    const user = {
      id: result[0].id,
      firstname: result[0].firstname,
      lastname: result[0].lastname,
    };
    expect(user).toEqual({
      id: 1,
      firstname: 'farah',
      lastname: 'mahmoud',
    });
  });
});
