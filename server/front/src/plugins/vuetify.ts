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
        primary: '#FAFAFA',
        secondary: '#424242',
        accent: '#4CB5F5',
        latestPostBtnColor: '#FD974F',
        warning: '#E64A19',
        background: '#FEF2E4',
        footer: '#020509',
        activeIconColor: '#00FF00'

      }
    }
  }

});
