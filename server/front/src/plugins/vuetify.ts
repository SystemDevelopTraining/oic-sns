import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@fortawesome/fontawesome-free/css/all.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);
export default new Vuetify({
  icons: {
    iconfont: 'fa' || 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#ECEFF1',
        secondary: '#424242',
        accent: '#00C853',
        warning: '#E64A19',
        background: '#B0BEC5'
      }
    }
  }

});
