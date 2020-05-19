import Vue from 'vue';
import VueMasonry from 'vue-masonry-css';
import { mapState, mapActions, mapMutations } from 'vuex';
import Card from '~/components/Card/index';
import { debounce } from 'lodash';
import { setUserLangRegion } from '~/util/cookie';
import { getUserLangRegPref } from '~/util/lang-region';

Vue.use(VueMasonry);

export default {
  components: {
	    Card	    
  },
  head () {
    return this.setMetaTags();
  },
  created () {
    const langRegion = this.$route.query.langRegion;
    if (langRegion) {
      setUserLangRegion(langRegion);
    }

    this.listStoriesPending(true);
    this.listPublicStories({ skip: 0, limit: this.storyList.limit, langRegion: getUserLangRegPref(langRegion) });
    if (process.browser) {
      window.addEventListener('scroll', debounce(this.handleScroll, 100));
    }
  },
  destroyed () {
    if (process.browser) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  computed: {	    
	    ...mapState('story', ['storyList'])     
  },
  methods: {
    ...mapActions('story', ['listPublicStories']),
    ...mapMutations('story', ['listStoriesPending', 'appendingStoriesPending']),
    setMetaTags () {
      return {     
        meta: [     
          { hid: 'og:image', property: 'og:image', content: '/mc-logo.png' },     
          { hid: 'twitter:image', name: 'twitter:image', content: '/mc-logo.png' }          
        ]
      };
    },
    handleScroll (event) {
      const { scrollTop, clientHeight, scrollHeight } = event.target.scrollingElement;
      const contentHeight = scrollHeight - clientHeight;         
      if (scrollTop >= contentHeight && !this.storyList.appendRecordsPending && this.$route.path === '/') {        
        this.appendingStoriesPending(true);        
        this.listPublicStories({ skip: this.storyList.skip, limit: this.storyList.limit, angRegion: getUserLangRegPref(this.$route.query.langRegion) });                  
      }
    }
  }
};
