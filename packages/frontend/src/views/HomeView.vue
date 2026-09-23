<script setup lang="ts">
import Divider from "primevue/divider"
import Card from "primevue/card"
import Message from "primevue/message"
import Fieldset from "primevue/fieldset"
</script>

<template>
    <main class="flex flex-col gap-2">
        <h1>vue-tsoa-template</h1>
        <Divider />
        <h4>A template for a web project with a vue frontend and a tsoa backend.</h4>
        <Fieldset legend="Quick Start">
            <div>
                <ul class="bullet-list">
                    <li>Install the <a href="#requirements">requirements</a></li>
                    <li>
                        {{ "Populate the " }}<code class="inline-code">.env</code> in frontend and
                        backend
                        <ul>
                            <li>Run this from the repo root to use the example values</li>
                        </ul>
                    </li>
                </ul>
                <pre
                    class="code-block"
                ><code>cp packages/frontend/.env.example packages/frontend/.env.development
cp packages/backend/.env.example packages/backend/.env</code></pre>
                <ul class="bullet-list">
                    <li>
                        {{ "Run" }} the docker compose script at
                        <code class="inline-code">docker/local-db/compose.yaml</code>
                    </li>
                    <li>
                        <code class="inline-code">npm i && npm run dev</code> from root and visit
                        <a href="http://localhost:5173">localhost:5173</a>
                    </li>
                    <li>Make changes to the frontend or backend and watch it reload!</li>
                </ul>
                <Message class="mt-4" severity="success"
                    >There's a high chance you've done all of the above since you're already
                    here!</Message
                >
            </div>
        </Fieldset>
        <Fieldset id="requirements" legend="Requirements">
            <div>
                <ul class="bullet-list">
                    <li>install npm and node (test on npm v12 and node v24)</li>
                    <li>
                        {{ "install" }} docker and docker-compose (tested on docker v29 and
                        docker-compose v5)
                    </li>
                    <li>install java (tested on openjdk v26)</li>
                </ul>
            </div>
        </Fieldset>
    </main>
</template>

<style scoped>
.bullet-list {
    list-style: disc inside;
}

.bullet-list ul {
    padding-left: 2rem;
    list-style-type: circle;
}

a {
    color: blue;
}

a:hover {
    text-decoration: underline;
}

a:visited {
    color: purple;
}
</style>
