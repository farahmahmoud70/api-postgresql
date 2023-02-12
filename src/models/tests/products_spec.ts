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
    });
    expect(result).toEqual({
      id: 1,
      name: 'tomato',
      price: 3,
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
