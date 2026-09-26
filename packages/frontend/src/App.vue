<script setup lang="ts">
import { RouterView } from "vue-router"
import NavBar from "./components/NavBar.vue"
import Toast from "primevue/toast"
</script>

<template>
    <Toast />
    <NavBar />
    <div class="flex-1 flex flex-col items-center w-full">
        <div class="px-4 max-w-content-max-width w-full h-full">
            <RouterView />
        </div>
    </div>
</template>

<style scoped></style>
