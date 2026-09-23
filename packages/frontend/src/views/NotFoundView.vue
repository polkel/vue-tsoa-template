<script setup lang="ts">
import Button from "primevue/button"
</script>

<template>
    <main class="flex flex-col justify-center items-center gap-8">
        <i class="pi pi-exclamation-circle" style="font-size: 24rem" />
        <div class="text-2xl">This page does not exist</div>
        <Button class="text-2xl" variant="link" v-slot="slotProps">
            <RouterLink to="/" :class="slotProps.class">Click here to go home</RouterLink>
        </Button>
    </main>
</template>
