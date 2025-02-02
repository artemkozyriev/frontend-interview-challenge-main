<script setup lang="ts">
import { useTicketStore } from "@/store/tickets";

const ticketStore = useTicketStore();

const addToCart = (ticket: any) => {
  ticketStore.addToCart(ticket);
};
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Available Tickets</h1>

    <div class="grid md:grid-cols-2 gap-4">
      <div
        v-for="ticket in ticketStore.tickets"
        :key="ticket.id"
        class="border p-4 rounded-lg shadow-md flex flex-col justify-between"
        :class="ticket.isVIP ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100 border-gray-400'"
      >
        <div class="pb-2">
            <span v-if="ticket.isVIP" class="px-2 py-1 text-xs text-white bg-yellow-500 rounded-full mb-2 inline-block">VIP</span>
            <h2 class="text-lg font-bold">{{ ticket.name }}</h2>
            <p class="mb-4">{{ ticket.description }}</p>
        </div>
        <div>
            <p class="font-semibold mb-2">Price: ${{ ticket.price }}</p>
            <button 
                :disabled="cartCount >= ticket.count" 
                @click="addToCart(ticket)" 
                class="bg-blue-500 hover:bg-blue-800 text-white p-2 rounded disabled:opacity-50 cursor-pointer w-full"
            >
                Add to Cart
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional styling if needed */
</style>
