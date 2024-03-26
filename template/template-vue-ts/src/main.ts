import { createApp } from 'vue'
import App from '@/App.vue'
import 'normalize.css'
import '@/assets/styles/index.scss'

import router from '@/router'

const app = createApp(App).use(router)
app.mount('#app')

export default app
