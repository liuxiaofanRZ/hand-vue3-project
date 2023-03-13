import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

console.log(PRODUCTION, VERSION, BROWSER_SUPPORTS_HTML5, nodeEnv.test,process.env.HELLO_TEST)
app.mount('#root')
