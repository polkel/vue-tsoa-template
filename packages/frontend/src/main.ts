import "./assets/main.css"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import PrimeVue from "primevue/config"
import Nora from "@primeuix/themes/nora"

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Nora,
        options: { cssLayer: { name: "primevue", order: "theme, base, primevue" } }
    }
})

app.use(router)

app.mount("#app")
