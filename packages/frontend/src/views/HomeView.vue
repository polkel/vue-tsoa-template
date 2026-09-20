<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue"
import Button from "primevue/button"
import { Api } from "@polkel/shared"
import { useAsyncState } from "@vueuse/core"
const api = new Api({ baseURL: new URL("http://localhost:8080") })

const randomNameApi = useAsyncState(
    async () => {
        return api.test.getRandomName()
    },
    { name: "No name chosen yet" },
    { immediate: false, resetOnExecute: false }
)
</script>

<template>
    <main>
        <TheWelcome />
        <div
            class="p-4 flex flex-col gap-4 rounded-lg border-1 border-red-400 bg-yellow-200 text-black"
        >
            <div>Click here to get a random name</div>
            <div>Name: {{ randomNameApi.state.value.name }}</div>
            <div v-if="randomNameApi.error.value" class="text-red-600 text-sm">
                There was an error with the request: {{ String(randomNameApi.error.value) }}
            </div>
            <Button :disabled="!randomNameApi.isReady" @click="randomNameApi.execute()"
                >Get a name!</Button
            >
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
    </main>
</template>
