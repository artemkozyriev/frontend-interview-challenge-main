<template>
  <nav class="p-4 bg-gray-800 text-white flex justify-between">
    <div>
      <router-link to="/admin" class="px-4">Admin</router-link>
      <router-link to="/" class="px-4">Home</router-link>
    </div>
    <router-link to="/cart" class="hover:underline">Cart ({{ ticketStore.cart.length }})</router-link>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { useTicketStore } from "@/store/tickets";

const ticketStore = useTicketStore();
</script>