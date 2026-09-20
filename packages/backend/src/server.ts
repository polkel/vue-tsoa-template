import { app } from "./app"
import { config, initConfig } from "./config"

initConfig()
const cfg = config()

const port = cfg.apiPort

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`)
})
