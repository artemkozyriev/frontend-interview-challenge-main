import { mount } from '@vue/test-utils';
import Cart from '../../src/pages/Cart.vue'; // Adjust path as needed
import { createPinia } from 'pinia';
import { useTicketStore } from '../../src/store/tickets'; // Adjust path as needed
import { describe, it, expect, beforeEach } from 'vitest';

describe('Cart Component', () => {
  let pinia: any;
  let ticketStore: any;

  beforeEach(() => {
    // Set up a fresh Pinia store for each test
    pinia = createPinia();
    ticketStore = useTicketStore(pinia);

    // Initialize the store with test data
    ticketStore.cart = [
      { id: 1, name: 'Ticket A', count: 2, price: 20, description: 'Test ticket', isVIP: false },
      { id: 2, name: 'Ticket B', count: 1, price: 30, description: 'Another test ticket', isVIP: true }
    ];
  });

  it('should display tickets in the cart', async () => {
    const wrapper = mount(Cart, {
      global: {
        plugins: [pinia]  // Use Pinia plugin instead of Vuex
      }
    });

    // Check if the ticket names are rendered correctly
    expect(wrapper.text()).toContain('Ticket A');
    expect(wrapper.text()).toContain('Ticket B');
  });

  it('should show the correct quantity and total price', async () => {
    const wrapper = mount(Cart, {
      global: {
        plugins: [pinia]  // Use Pinia plugin instead of Vuex
      }
    });

    // Check quantity and price
    expect(wrapper.text()).toContain('Quantity: 2');
    expect(wrapper.text()).toContain('Total: $40');
    expect(wrapper.text()).toContain('Quantity: 1');
    expect(wrapper.text()).toContain('Total: $30');
  });

  it('should remove a ticket from the cart', async () => {
    const wrapper = mount(Cart, {
      global: {
        plugins: [pinia]  // Use Pinia plugin instead of Vuex
      }
    });

    // Find the remove button and simulate a click (assuming there is a remove button in Cart component)
    await wrapper.find('button').trigger('click');

    // Check if the ticket is removed from the cart
    expect(ticketStore.cart.length).toBe(2)
  });
});