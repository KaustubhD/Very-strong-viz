import './assets/main.css';
import 'balm-ui-css';

import { createApp } from 'vue';
import BalmUIPlus from 'balm-ui-plus';
import BalmUI, { useTheme } from 'balm-ui';

import App from './App.vue';
import { darkTheme } from './common/theme/themes';

const app = createApp(App);

app.use(BalmUI);
app.use(BalmUIPlus);

const theme = useTheme();
theme.colors = darkTheme;

app.mount('#app');
