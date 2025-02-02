import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import Admin from '../../src/pages/Admin.vue'; // Adjust the path to your component
import { useTicketStore } from '../../src/store/tickets'; // Adjust the path to your store
import { describe, it, expect, beforeEach } from 'vitest';

describe('Admin Component', () => {
  let pinia;
  let ticketStore;

  beforeEach(() => {
    pinia = createPinia();
    ticketStore = useTicketStore(pinia);
  });

  it('should add a ticket', async () => {
    const wrapper = mount(Admin, {
      global: {
        plugins: [pinia],
      },
    });

    // Simulate user interaction (e.g., submitting the form)
    await wrapper.find('input[name="name"]').setValue('New Ticket');
    await wrapper.find('textarea[name="description"]').setValue('Description of the new ticket');
    await wrapper.find('input[name="count"]').setValue(10);
    await wrapper.find('input[name="price"]').setValue(50);

    await wrapper.find('form').trigger('submit.prevent');

    // Check if ticket was added to store
    expect(ticketStore.tickets.length).toBe(1);
    expect(ticketStore.tickets[0].name).toBe('New Ticket');
  });
});
