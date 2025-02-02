<script setup lang="ts">
import { useTicketStore } from "@/store/tickets";

const ticketStore = useTicketStore();
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Shopping Cart</h1>

    <div v-if="ticketStore.cart.length === 0" class="text-gray-500">
      Your cart is empty.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="ticket in ticketStore.cart"
        :key="ticket.id"
        class="border p-4 rounded-lg shadow-md flex justify-between items-center"
        :class="ticket.isVIP ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100 border-gray-400'"
      >
        <div>
          <h2 class="text-lg font-bold">{{ ticket.name }}</h2>
          <p>{{ ticket.description }}</p>
          <p class="font-semibold">Price: ${{ ticket.price }}</p>
          <p class="text-gray-500">Quantity: {{ ticket.count }}</p>
          <p class="font-semibold">Total: ${{ ticket.price * ticket.count }}</p>
        </div>
        <button
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
          @click="ticketStore.removeFromCart(ticket.id)"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional styling if needed */
</style>
