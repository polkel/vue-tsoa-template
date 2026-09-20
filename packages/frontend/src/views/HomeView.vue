<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue"
</script>

<template>
    <main>
        <TheWelcome />
        <div class="flex flex-col gap-4 text-black">
            <div class="p-4 bg-blue-300">item 1</div>
            <div class="p-4 bg-red-300">item 2</div>
            <div class="p-4 bg-yellow-300">item 3</div>
        </div>
    </main>
</template>
