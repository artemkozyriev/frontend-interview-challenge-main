import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia } from 'pinia';
import { useTicketStore } from '../../src/store/tickets'; // Adjust path as needed
// import { mount } from '@vue/test-utils'; // Optional, in case you need to mount components

describe('Ticket Store', () => {
  let pinia: any;
  let ticketStore: any;

  beforeEach(() => {
    pinia = createPinia();
    ticketStore = useTicketStore(pinia); // Use Pinia's store
  });

  it('should add a ticket to the cart', async () => {
    const ticket = { id: 1, name: 'Ticket A', count: 5, price: 20, description: 'Test ticket', isVIP: false };

    ticketStore.addToCart(ticket); // Directly call the store action

    expect(ticketStore.cart.length).toBe(1);
    expect(ticketStore.cart[0].count).toBe(1); // One ticket added
  });

  it('should not add more tickets than available stock', async () => {
    const ticket = { id: 2, name: 'Ticket B', count: 2, price: 30, description: 'Another test ticket', isVIP: true };

    // Add one ticket to cart
    ticketStore.addToCart(ticket);

    // Try to add more than available stock
    ticketStore.addToCart(ticket);
    ticketStore.addToCart(ticket);

    // Assert that the count of this ticket does not exceed stock
    expect(ticketStore.cart.length).toBe(1); // Only one ticket in the cart
    expect(ticketStore.cart[0].count).toBe(2); // Total count should be 2 (not 3)
  });
});
