import { mapState, mapActions, mapMutations } from 'vuex';
import { parseTitle } from '~/util/editor-parse';
import { toStoryDate } from '~/util/app-date';

export default { 
  created () {  
    this.listStoriesPending(true);
    this.listStories({ skip: 0, limit: 1000, byUser: 1 });   
  }, 
  computed: {	    
    ...mapState('story', ['storyList', 'removeStory'])     
  },
  methods: {
    ...mapActions('story', ['listStories', 'deleteStory']),
    ...mapMutations('story', ['listStoriesPending', 'removeStoryPending']),
    getTitle (titleJSON) {     
  		return parseTitle(titleJSON);     		
    },
    deletePost (id) {
      if (!this.removeStory.pending[id]) {
        this.removeStoryPending({ flag: true, id });
        this.deleteStory({ id });
      }
    } 
  },
  filters: {      
	  toStoryDate
  }
};
