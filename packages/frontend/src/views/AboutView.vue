<script setup lang="ts">
import Divider from "primevue/divider"
</script>

<template>
    <main class="pb-8 flex flex-col gap-8">
        <h1>About</h1>
        <div class="flex flex-col gap-4 text-xl">
            <div>
                This is a typescript template for a full stack monorepo web app. This template was
                developed with 3 focuses in mind.
            </div>
            <ul class="bullet-list">
                <li><a href="#velocity">Velocity</a></li>
                <li><a href="#simplicity">Simplicity</a></li>
                <li><a href="#extensibility">Extensibility</a></li>
            </ul>
        </div>
        <h3 id="velocity">Velocity</h3>
        <div class="flex flex-col gap-4 text-xl">
            <div>
                Development velocity is an important factor when considering what tech stack to
                choose. The ability to start developing the important parts of your app rather than
                worry about tooling is essential. Here are a few examples of where velocity was kept
                top of mind in this template
            </div>
            <ul class="bullet-list">
                <li>
                    {{ "The" }} frontend api client is generated from tsoa's swagger spec. This
                    client is automatically regenerated when there are changes in the backend code
                    while nodemon is running.
                </li>
                <li>
                    {{ "Vue" }} is implemented for quick management of the script, html, and css in
                    the same file.
                </li>
                <li>The deploy script automatically redeploys the whole stack on the server.</li>
            </ul>
        </div>
        <h3 id="simplicity">Simplicity</h3>
        <div class="flex flex-col gap-4 text-xl">
            <div>
                Having a simple, easy to follow codebase also contributes to velocity. Additionally,
                it also helps with the longevity and maintainability of a codebase. Here's a few
                ways that this template keeps the development workflow simple:
            </div>
            <ul class="bullet-list">
                <li>
                    Tailwind and PrimeVue come with out of the box classes and components to reduce
                    the html/css overhead.
                </li>
                <li>
                    Tsoa controller format is very intuitive to use when adding new endpoints
                    (compared to raw express).
                </li>
                <li>
                    Prisma ORM keeps the database and app models in one place (<code
                        class="inline-code"
                        >schema.prisma</code
                    >). No drift between the two models.
                </li>
            </ul>
        </div>
        <h3 id="extensibility">Extensibility</h3>
        <div class="flex flex-col gap-4 text-xl">
            <div>
                What good is a template if it cannot be extended for one's own purposes? Using npm
                workspaces makes it easy to add a new app to this monorepo. The local `shared`
                package (or any other one) can be installed in any other local app for re-use. There
                are also a many frontend and backend utilities included that get users started on
                the right track, but can be extended if desired (backend errors, prisma seeding,
                etc).
            </div>
        </div>
        <h2>Components</h2>
        <ul class="bullet-list text-xl">
            <li>
                frontend
                <ul>
                    <li>vue v3</li>
                    <li>primevue v4</li>
                    <li>tailwind css</li>
                </ul>
            </li>
            <li>
                backend
                <ul>
                    <li>tsoa</li>
                    <li>prisma</li>
                    <li>postgresql</li>
                    <li>dotenv and zod</li>
                </ul>
            </li>
            <li>
                shared
                <ul>
                    <li>api client generated from tsoa swagger spec</li>
                    <li>api.ts needs to be modified when adding controllers</li>
                </ul>
            </li>
        </ul>
        <h2>Using npm workspaces</h2>
        <div class="flex flex-col gap-4 text-xl">
            <p>
                The app you want to build may contain multiple frontend or backend apps. To declare
                addtional apps, add a new npm project in the `packages` directory and run npm i.
                Make sure it doesn't conflict with any existing package names in that directory.
            </p>
            <p>
                Here's a <a href="https://docs.npmjs.com/cli/v12/using-npm/workspaces">primer</a> on
                npm workspaces if it's your first time using it.
            </p>
        </div>
        <h2>Other considerations</h2>
        <p class="text-xl">
            This template deliberately lacks a testing module. Also, the prisma client is not
            regenerated upon changes to the <code class="inline-code">schema.prisma</code> file.
            This is deliberate because changes to that file is usually done in batches and needs to
            be more intentional. The user will likely pair it with
            <code class="inline-code">prisma migrate dev</code> and generate the client that way.
        </p>
        <Divider />
        <p>Find out more about me and other projects <a href="https://polkel.dev">here</a>!</p>
    </main>
</template>

<style scoped>
a {
    color: var(--p-text-color);
}

a:hover {
    text-decoration: underline;
    color: var(--p-text-hover-color);
    text-decoration-color: var(--p-text-hover-color);
}

a:visited {
    color: var(--p-text-muted-color);
}

a:visited:hover {
    color: var(--p-text-hover-muted-color);
    text-decoration-color: var(--p-text-hover-muted-color);
}

.bullet-list {
    list-style: disc outside;
    padding-left: 2rem;
}

li {
    margin-bottom: 0.5rem;
}

.bullet-list ul {
    padding-left: 2rem;
    list-style-type: circle;
}
</style>
