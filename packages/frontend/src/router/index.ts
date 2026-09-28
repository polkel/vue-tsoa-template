import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import AboutView from "../views/AboutView.vue"
import ExampleView from "@/views/ExampleView.vue"
import NotFoundView from "@/views/NotFoundView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: "/", name: "home", component: HomeView },
        { path: "/about", name: "about", component: AboutView },
        { path: "/example", name: "example", component: ExampleView },
        { path: "/:match(.*)*", name: "not-found", component: NotFoundView }
    ]
})

router.beforeEach((to, from) => {
    document.title = to.name ? `${to.name.toString()} | vue-tsoa-template` : "vue-tsoa-template"
})

export default router
