import Vue from 'vue';
import { LoaderPlugin } from 'vue-google-login';
import liteEnv from '~/config/lite-env';

if (process.browser) {
  	Vue.use(LoaderPlugin, {
	  client_id: liteEnv.GOOGLE_CLIENT_ID
  });
}
