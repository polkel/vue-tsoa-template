<script setup lang="ts">
import { api, useAsyncCaller } from "@/lib/api.ts"
import Button from "primevue/button"
import TheWelcome from "../components/TheWelcome.vue"
import { isDarkMode, toggleDarkMode } from "@/lib/dark-mode.ts"

const randomNameApi = useAsyncCaller(
    async () => {
        return api.test.getRandomName()
    },
    { name: "No name chosen yet" }
)
</script>

<template>
    <main>
        <TheWelcome />
        <div
            class="p-4 flex flex-col gap-4 rounded-lg border-1 border-red-400 bg-yellow-200 text-black"
        >
            <div>Click here to get a random name</div>
            <div>Name: {{ randomNameApi.state.name }}</div>
            <div v-if="randomNameApi.error" class="text-red-600 text-sm">
                There was an error with the request: {{ randomNameApi.error.message }}
            </div>
            <Button :disabled="randomNameApi.isLoading" @click="randomNameApi.execute()"
                >Get a name!</Button
            >
            <div>
                State of api helper
                {{ `ready: ${randomNameApi.isReady}; loading: ${randomNameApi.isLoading}` }}
            </div>
        </div>

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

        <div
            class="p-4 flex flex-col gap-4 items-center bg-primary hover:bg-primary-contrast rounded-xl text-muted-color-emphasis border-surface transition-colors"
        >
            <div>Let's toggle dark mode</div>
            <div>Currently: {{ isDarkMode ? "dark mode" : "light mode" }}</div>
            <Button @click="toggleDarkMode">Change theme</Button>
        </div>
    </main>
</template>
