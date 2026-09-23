<script setup lang="ts">
import { RouterView } from "vue-router"
import NavBar from "./components/NavBar.vue"
</script>

<template>
    <NavBar />
    <div class="flex-1 flex flex-col items-center w-full">
        <div class="max-w-content-max-width w-full">
            <RouterView />
        </div>
    </div>
</template>

<style scoped></style>
