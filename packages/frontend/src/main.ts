import "./assets/main.css"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import PrimeVue from "primevue/config"
import Aura from "@primeuix/themes/aura"
import { DARK_MODE_CLASS } from "./lib/dark-mode.ts"
import { definePreset } from "@primeuix/themes"

const app = createApp(App)
const CustomPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: "{teal.50}",
            100: "{teal.100}",
            200: "{teal.200}",
            300: "{teal.300}",
            400: "{teal.400}",
            500: "{teal.500}",
            600: "{teal.600}",
            700: "{teal.700}",
            800: "{teal.800}",
            900: "{teal.900}",
            950: "{teal.950}"
        }
    }
})
app.use(PrimeVue, {
    theme: {
        preset: CustomPreset,
        options: {
            darkModeSelector: `.${DARK_MODE_CLASS}`,
            cssLayer: { name: "primevue", order: "theme, base, primevue" }
        }
    }
})

app.use(router)

app.mount("#app")
