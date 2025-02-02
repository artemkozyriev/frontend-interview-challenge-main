<script setup lang="ts">
import { ref } from "vue";
import { useTicketStore } from "@/store/tickets";

const ticketStore = useTicketStore();
const name = ref("");
const description = ref("");
const isVIP = ref(false);
const count = ref(0);
const price = ref(0);

const addTicket = () => {
  if (!name.value || count.value <= 0 || price.value <= 0) return;
  ticketStore.addTicket({
    name: name.value,
    description: description.value,
    isVIP: isVIP.value,
    count: count.value,
    price: price.value,
    id: 0,
  });

  // Reset form
  name.value = "";
  description.value = "";
  isVIP.value = false;
  count.value = 0;
  price.value = 0;
};

const deleteTicket = (id: number) => {
  ticketStore.deleteTicket(id);
};
</script>

<template>
  <div class="p-6 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-4">Admin Panel - Add Tickets</h1>

    <form @submit.prevent="addTicket" class="space-y-4">
        <label class="block">
            <span class="text-gray-700">Ticket Name</span>
            <input v-model="name" type="text" placeholder="Ticket Name" name="name" class="w-full p-2 border rounded" />
        </label>

        <label class="block">
            <span class="text-gray-700">Description</span>
            <textarea v-model="description" placeholder="Description" name="description" class="w-full p-2 border rounded"></textarea>
        </label>

        <label class="flex items-center space-x-2">
            <input v-model="isVIP" type="checkbox" /> <span>VIP Ticket</span>
        </label>

        <label class="block">
            <span class="text-gray-700">Count</span>
            <input v-model.number="count" min="1" type="number" placeholder="Count" name="count" class="w-full p-2 border rounded" />
        </label>

        <label class="block">
            <span class="text-gray-700">Price ($)</span>
            <input v-model.number="price" min="1" type="number" placeholder="Price" name="price" class="w-full p-2 border rounded" />
        </label>

        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded cursor-pointer">Add Ticket</button>
    </form>

    <h2 class="text-xl font-semibold mt-6">Tickets</h2>
    <ul class="space-y-2">
      <li v-for="ticket in ticketStore.tickets" :key="ticket.id" class="border p-3 flex justify-between">
        <div>
          <strong>{{ ticket.name }}</strong> ({{ ticket.isVIP ? 'VIP' : 'Regular' }}) - 
          {{ ticket.count }} tickets - ${{ ticket.price }}
        </div>
        <button @click="deleteTicket(ticket.id)" class="text-red-500 cursor-pointer">Delete</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Additional styling if needed */
</style>