import { ref } from "vue"

export const DARK_MODE_CLASS = "app-dark"

export const isDarkMode = ref<boolean>(document.documentElement.classList.contains(DARK_MODE_CLASS))

export function toggleDarkMode() {
    document.documentElement.classList.toggle(DARK_MODE_CLASS)
    isDarkMode.value = !isDarkMode.value
}
