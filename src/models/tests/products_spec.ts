import { ProductsStore } from '../products';

const store = new ProductsStore();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'tomato',
      price: 3,
      category: 'vegetables',
    });
    expect(result).toEqual({
      id: 1,
      name: 'tomato',
      price: 3,
      category: 'vegetables',
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'tomato',
        price: 3,
        category: 'vegetables',
      },
    ]);
  });

  it('show by ID method should return the correct product', async () => {
    const result = await store.show('id', '1');
    expect(result).toEqual([
      {
        id: 1,
        name: 'tomato',
        price: 3,
        category: 'vegetables',
      },
    ]);
  });

  it('show by Category method should return the correct product', async () => {
    const result = await store.show('category', 'vegetables');
    expect(result).toEqual([
      {
        id: 1,
        name: 'tomato',
        price: 3,
        category: 'vegetables',
      },
    ]);
  });
});
