import { defineStore } from "pinia";

interface Ticket {
  id: number;
  name: string;
  description: string;
  isVIP: boolean;
  count: number;
  price: number;
}

export const useTicketStore = defineStore("ticketStore", {
  state: () => ({
    tickets: [] as Ticket[],
    cart: [] as Ticket[],
  }),
  actions: {
    addTicket(ticket: Ticket) {
      this.tickets.push({ ...ticket, id: Date.now() });
    },
    deleteTicket(id: number) {
      this.tickets = this.tickets.filter(ticket => ticket.id !== id);
    },
    addToCart(ticket: Ticket) {
        // Check if the ticket is already in the cart
        const existingTicket = this.cart.find(t => t.id === ticket.id);
      
        // Prevent adding more than available stock
        const existingCount = existingTicket ? existingTicket.count : 0;
        const totalCountInCart = existingCount + 1; // We are adding one more ticket now
      
        if (totalCountInCart <= ticket.count) {
          if (existingTicket) {
            // If ticket exists in cart, increase the quantity
            existingTicket.count++;
          } else {
            // Add new ticket to cart if it doesn't exist
            this.cart.push({ ...ticket, count: 1 });
          }
        } else {
          alert("Not enough tickets available!");
        }
    },      
    removeFromCart(id: number) {
        const ticketIndex = this.cart.findIndex(ticket => ticket.id === id);
        if (ticketIndex !== -1) {
          const ticket = this.cart[ticketIndex];
          // If there's more than one ticket, decrease the quantity
          if (ticket.count > 1) {
            ticket.count--;
          } else {
            // Otherwise, remove the ticket completely
            this.cart.splice(ticketIndex, 1);
          }
        }
    },      
  },
});
