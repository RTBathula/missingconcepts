import tmodal from '../TModal/index';
import GoogleLogin from 'vue-google-login';
import { mapActions } from 'vuex';
import liteEnv from '~/config/lite-env';

export default {
  props: ['show', 'title', 'hidden', 'actionBtnTitle', 'onClickAction', 'isActionOnPending'],
  components: {
    tmodal,
    GoogleLogin
  },
  data () {
    return {
      isModalVisible: false,
      params: {
        client_id: liteEnv.GOOGLE_CLIENT_ID
      },     
      renderParams: {
        width: 250,
        height: 45,
        longtitle: true
      }
    };
  }, 
  watch: {
    	show: {  
	      immediate: true, 
	      handler (val, oldVal) {        
	        if (val !== oldVal) {
	          if (val) {           
	          	this.isModalVisible = true;            
	          	return;
	          }
          
	          this.isModalVisible = false;         
	        }
	      }   
	    }
  },
  methods: {
    ...mapActions('user', ['login']),
    onClickCancelHandler (event) {
      this.hidden();
    },
    onClickActionHandler (event) {
      if (this.onClickAction) {
        this.onClickAction();
      }
    },
    onSuccess (googleUser) {    
      const idToken = googleUser.getAuthResponse().id_token;  
      this.login({ idToken }).then(() => {
        this.isModalVisible = false;
        this.hidden();
      });
    },
    onFailure (error) {
      console.log(error);  
    }	
  }
};
