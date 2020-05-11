import ClickOutside from 'vue-click-outside';
import LoginOpts from '~/components/LoginOpts/index';
import { mapMutations } from 'vuex';
import Vue from 'vue';
import { availLangRegions, getUserLangRegPref } from '~/util/lang-region.js';
import { setUserLangRegion } from '~/util/cookie';

export default {
  directives: {
    ClickOutside
  },
  components: {
	  LoginOpts        
  },
  data () {
  	return {
  		openModal: false,
      isMenuOpen: false,
      selectedLangRegion: '',
      langList: availLangRegions 
  	};
  },
  computed: { 
    user () {     
      return this.$store.state.user.user;
    }   
  },
  created () {
    this.setUserFromCookie();
    this.selectedLangRegion = getUserLangRegPref(this.$route.query.langRegion);
  },
  methods: {
    ...mapMutations('user', ['deleteToken', 'setUserFromCookie']),
    selectLang (lang) {   
      this.selectedLangRegion = lang;
      setUserLangRegion(lang);
      if (process.browser) {    
        window.open(`/?langRegion=${lang}`, '_self');
      }
    },
    onClickToggleMenu (event) {
      event.preventDefault();       
      this.isMenuOpen = !this.isMenuOpen;      
    },
    hideMenu (event) {     
      this.isMenuOpen = false; 
    },
    newStory () {
      this.isMenuOpen = false;
      this.$router.push({ path: '/new-post' });
    },
    allPosts () {
      this.isMenuOpen = false;
      this.$router.push({ path: '/user-posts' });
    },
    logOut () {
      Vue.GoogleAuth.then(auth2 => {
        if (auth2.isSignedIn.get()) {
          auth2.signOut().then(() => {
            console.log('User signed out.');
          });
        }
        this.deleteToken();
        this.isMenuOpen = false;
        setTimeout(() => {
          if (this.$route.path !== '/') {
            this.$router.push({ path: '/' });
          }
        }, 0);
      });
    }
  }
};
