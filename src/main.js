import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/icons/logo.svg';
import './assets/icons/cart.svg';
import './assets/icons/heart.svg';
import './assets/icons/profile.svg';
import './assets/icons/search.svg';
import "./styles/global.css";
import heroImage from './assets/images/hero_slide.webp';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');