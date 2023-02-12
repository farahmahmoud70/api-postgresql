import { OrdersStore } from '../orders';

const store = new OrdersStore();

describe('Product Model', () => {
  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
});
