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

  // it('create method should add a user', async () => {
  //   const result = await store.create({
  //     firstname: 'farah',
  //     lastname: 'mahmoud',
  //     username: 'farah-mahmoud-user',
  //     password: 'farah-mahmoud-password',
  //   });
  //   expect(result).toEqual({
  //     id: 1,
  //     firstname: 'farah',
  //     lastname: 'mahmoud',
  //     username: 'farah-mahmoud-user',
  //     password: 'farah-mahmoud-password',
  //   });
  // });

  // it('index method should return a list of Users', async () => {
  //   const result = await store.index();
  //   expect(result).toEqual([
  //     {
  //       id: 1,
  //       firstname: 'farah',
  //       lastname: 'mahmoud',
  //       username: 'farah-mahmoud-user',
  //       password: 'farah-mahmoud-password',
  //     },
  //   ]);
  // });

  // it('show by username method should return the correct User', async () => {
  //   const result = await store.show('username', 'farah-mahmoud-user');
  //   expect(result).toEqual({
  //     id: 1,
  //     firstname: 'farah',
  //     lastname: 'mahmoud',
  //     username: 'farah-mahmoud-user',
  //     password: '$2b$10$Cz3FjtAN0HBSmW1zb9P2le/7Rcm6CxX6ehKpExni64qzjM1OXsVAC',
  //   });
  // });
});
