import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { vant } from './config/vant.config.js'
import 'vant/lib/index.css';

const app = createApp(App);
vant(app)
app.use(router)
app.mount('#app')
