import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js';
import store from './store/store.js';

import BaseCard from './components/ui/BaseCard.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseInputNumber from './components/ui/BaseInputNumber.vue'
import BaseSelect from './components/ui/BaseSelect.vue'

import './assets/css/styles.scss' // custom styles

const app = createApp(App)
app.use(router)
app.use(store)

store.commit('initalizeTuning');

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-input-number', BaseInputNumber);
app.component('base-select', BaseSelect);

router.isReady().then(() => {
    app.mount('#app');
});
