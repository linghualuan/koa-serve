const app = require('./app/index')

const { APP_PORT } = require('./config/config.default')

app.listen(APP_PORT, () => {
    console.log(`服务器在http://localhost:${APP_PORT}`)
})