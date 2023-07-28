import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '../src/assets/styles.css'

//fontawesome
import '@fortawesome/fontawesome-free/css/all.css'



import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/';

import { createI18n } from 'vue-i18n';

// Import your language files
import en from './en.js';
import ar from './ar.js';

const i18n = createI18n({
  // Set the initial locale
  locale: 'en',
  // Define the available locales and their translations
  messages: {
    en,
    ar,
  },
});


// vuex





createApp(App).use(store).use(router).use(i18n).mount('#app')
