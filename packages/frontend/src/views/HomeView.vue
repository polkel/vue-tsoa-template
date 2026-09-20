<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue"
import Button from "primevue/button"
</script>

<template>
    <main>
        <TheWelcome />
        <div class="flex flex-col gap-4 text-black">
            <div class="p-4 bg-blue-300">item 1</div>
            <div class="p-4 bg-red-300">item 2</div>
            <div class="p-4 bg-yellow-300">item 3</div>
            <Button class="bg-blue-400 hover:bg-blue-700 transition-colors">PrimeVue works</Button>
        </div>
        <div class="pt-4 flex flex-row gap-2 justify-center">
            <i class="pi pi-check pi-spin text-sm" />
            <i class="pi pi-times text-xl" />
        </div>
    </main>
</template>
