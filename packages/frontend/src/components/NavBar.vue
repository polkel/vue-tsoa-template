<script setup lang="ts">
import { isDarkMode } from "@/lib/dark-mode"
import ToggleButton from "primevue/togglebutton"
import { computed, onMounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const isHome = computed<boolean>(() => {
    return route.path.toLocaleLowerCase() === "/"
})
const isAbout = computed<boolean>(() => {
    return route.path.toLocaleLowerCase() === "/about"
})
const isExample = computed<boolean>(() => {
    return route.path.toLocaleLowerCase() === "/example"
})
</script>

<template>
    <div
        class="p-4 flex flex-row justify-center items-center bg-primary border-b-2 border-surface text-primary-contrast transition-colors"
    >
        <div class="flex-1 flex flex-row gap-8 justify-between max-w-content-max-width">
            <div class="item-a flex flex-row items-center">
                <RouterLink
                    to="/"
                    class="w-fit-content rounded-corner hover:bg-primary-emphasis"
                    style="display: inline-block"
                >
                    <img
                        src="@/assets/polkel_transparent.png"
                        :class="['w-16', { invert: !isDarkMode }]"
                    />
                </RouterLink>
            </div>
            <div class="item-b flex mobile:hidden flex-row items-center justify-between gap-8">
                <RouterLink
                    to="/"
                    :class="[
                        'p-2 rounded-2xl hover:bg-primary-emphasis',
                        { 'bg-primary-emphasis': isHome }
                    ]"
                >
                    <i class="pi pi-home text-2xl" />
                </RouterLink>
                <RouterLink
                    to="/about"
                    :class="[
                        'p-2 rounded-2xl hover:bg-primary-emphasis',
                        { 'bg-primary-emphasis': isAbout }
                    ]"
                >
                    <i class="pi pi-info-circle text-2xl" />
                </RouterLink>
                <RouterLink
                    to="/example"
                    :class="[
                        'p-2 rounded-2xl hover:bg-primary-emphasis',
                        { 'bg-primary-emphasis': isExample }
                    ]"
                >
                    <i class="pi pi-book text-2xl" />
                </RouterLink>
            </div>
            <div class="item-b hidden mobile:flex flex-row items-center justify-stretch gap-8">
                <div class="flex flex-row items-center item-a">
                    <RouterLink
                        to="/"
                        :class="[
                            'p-2 rounded-corner hover:font-bold hover:underline hover:bg-primary-emphasis',
                            { 'font-bold bg-primary-emphasis': isHome }
                        ]"
                        >Home</RouterLink
                    >
                </div>
                <div class="flex flex-row justify-center items-center item-b">
                    <RouterLink
                        to="/about"
                        :class="[
                            'p-2 rounded-corner hover:font-bold hover:underline hover:bg-primary-emphasis',
                            { 'font-bold bg-primary-emphasis': isAbout }
                        ]"
                        >About</RouterLink
                    >
                </div>
                <div class="flex flex-row items-center justify-end item-c">
                    <RouterLink
                        to="/example"
                        :class="[
                            'p-2 rounded-corner hover:font-bold hover:underline hover:bg-primary-emphasis',
                            { 'font-bold bg-primary-emphasis': isExample }
                        ]"
                        >Example
                    </RouterLink>
                </div>
            </div>
            <div class="item-c flex flex-row justify-end items-center">
                <ToggleButton
                    v-model="isDarkMode"
                    onLabel="dark"
                    offLabel="light"
                    size="small"
                    onIcon="pi pi-moon"
                    offIcon="pi pi-sun"
                    class="rounded-corner"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.item-a,
.item-c {
    flex: 1 1 0;
    min-width: max-content;
    white-space: nowrap;
}

.item-b {
    flex: 1 1 auto;
    min-width: 0;
}
</style>
