import Header from '../Header/index';
import Footer from '../Footer/index';
import Alert from '~/components/Alert/index';
import Bus from '~/plugins/event-bus';

const eventBus = Bus();

export default {
  components: {
    Header,
    Footer,
    Alert
  },
  data () {
  	return {
  		alertConf: null
  	};
  },
  	created () { 
	    eventBus.$on('globalAlert', (conf) => {
	    	const duration = conf.duration || 4000;
	      	this.alertConf = conf;
	      	setTimeout(() => {
	      		this.alertConf = null; 
	      	 }, duration);
	    });								
  	}
};
