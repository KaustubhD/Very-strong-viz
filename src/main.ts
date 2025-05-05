import './assets/main.css';
import 'balm-ui-css';

import { createApp } from 'vue';
import BalmUI, { useTheme } from 'balm-ui';

import App from './App.vue';
import { darkTheme } from './common/theme/themes';
import type { Theme, ThemeColor } from 'balm-ui/dist/typings/plugins';

// Incorrect type by the lib
type FixedTheme = Omit<Theme, 'colors'> & { colors: ThemeColor; };

const app = createApp(App);

app.use(BalmUI);

const theme = useTheme() as FixedTheme;
theme.colors = darkTheme;

app.mount('#app');
