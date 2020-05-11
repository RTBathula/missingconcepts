import { mapState, mapActions, mapMutations } from 'vuex';
import MenuTextEditor from '~/components/MenuTextEditor/index';
import TitleEditor from '~/components/TitleEditor/index';
import { getUserFromCookie } from '../../util/cookie';
import { emit } from '~/plugins/event-bus';
import { toStoryDate } from '~/util/app-date';
import { parseContent, parseTitle } from '~/util/editor-parse';
import { getImageDimes } from '~/util/image';
import liteEnv from '~/config/lite-env';

export default {
  components: {
    MenuTextEditor,
    TitleEditor  
  },  
  async fetch ({ store, params }) {
    store.dispatch('vote/countVotes', { storyId: params.id, type: 'primary' }); 
    store.commit('story/findStoryPending', true);  
    await store.dispatch('story/getStory', { id: params.id });
  },
  head () {
    return this.setMetaTags();
  },  
  data () {
  	return {      
      url: '',
      title: '',
      description: '',
      image: '',
      imageType: '',
      imageWidth: 600,
      imageHeight: 314    		
  	};
  },
  computed: {     
    ...mapState('story', ['findStory']),
    ...mapState('vote', ['primaryVotes'])
  },
  watch: {
    'findStory.value': {
      immediate: true, 
      handler (val, oldVal) {
        if (val !== oldVal && val) {                          
        }
      }   
    }
  },
  methods: {
    ...mapActions('story', ['getStory']),
    ...mapActions('vote', ['countVotes', 'addOrRemoveVote']),
    ...mapMutations('story', ['findStoryPending']),
    setMetaTags () {     
      if (this.findStory.value) {
        this.title = parseTitle(this.findStory.value.title).trim();
        this.description = (parseContent(this.findStory.value.description) || '').substring(0, 210).trim();
        this.url = (`${liteEnv.BACKEND_URL}${this.$route.fullPath}`).trim();
        this.image = this.findStory.value.imageURL.trim();
        this.imageType = (`image/${this.findStory.value.imageURL.split('.').reverse()[0]}`).trim();

        if (process.browser) {
          getImageDimes(this.findStory.value.imageURL, (width, height) => {
            this.imageWidth = width;
            this.imageHeight = height;
          });
        }
      }

      return {     
        meta: [
          // Facebook    
          { hid: 'og:url', property: 'og:url', content: this.url },
          { hid: 'og:title', property: 'og:title', content: this.title },
          { hid: 'og:description', property: 'og:description', content: this.description },
          { hid: 'og:type', property: 'og:type', content: 'article' },
          { hid: 'og:image', property: 'og:image', content: this.image },
          { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: this.image },
          { hid: 'og:image:type', property: 'og:image:type', content: this.imageType },
          { hid: 'og:image:width', property: 'og:image:width', content: this.imageWidth },
          { hid: 'og:image:height', property: 'og:image:height', content: this.imageHeight },
         
          // Twitter
          { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
          { hid: 'twitter:title', name: 'twitter:title', content: this.title },
          { hid: 'twitter:description', name: 'twitter:description', content: this.description },
          { hid: 'twitter:image', name: 'twitter:image', content: this.image }          
        ]
      };
    },
    addOrRemovePrimary () {
      if (!getUserFromCookie()) {
        emit('globalAlert', { message: 'Login to vote', duration: 3000 }); 
        return;
      }

      const { id } = this.$route.params;  
      this.addOrRemoveVote({ storyId: id, type: 'primary' });
    }
  },
  filters: {    
    toStoryDate
  }
};
