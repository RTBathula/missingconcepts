import * as moment from 'moment';
import { mapState, mapActions, mapMutations } from 'vuex';
import loadImage from 'blueimp-load-image';
import MenuTextEditor from '~/components/MenuTextEditor/index';
import TitleEditor from '~/components/TitleEditor/index';
import { emit } from '~/plugins/event-bus';
import { getUserLangRegPref } from '~/util/lang-region';

const DEFAULT_FORM = {
  file: null,
  title: null,
  desc: null
};

export default {
  components: {
    MenuTextEditor,
    TitleEditor  
  },
  data () {
  	return {
      error: 'Something went wrong, check the content',
      file: null,
      imagePreview: false,
      form: DEFAULT_FORM
    };
  },
  created () {    
    this.form = JSON.parse(JSON.stringify(DEFAULT_FORM));
  },
  computed: {    
    ...mapState('user', ['user']),
    ...mapState('story', ['newStory'])     
  },
  methods: {
    ...mapActions('story', ['addStory']),
    ...mapMutations('story', ['addStoryPending']),
  	filesChange (files) {    	
      this.previewImage(files[0]);
    },
    preventDefaults (event) {
    	event.preventDefault();  		
  		event.stopPropagation();
    },
    handleDrop (event) {
    	event.preventDefault();  		
  		event.stopPropagation();

  		const dt = event.dataTransfer;
  		const files = dt.files;  		
      this.previewImage(files[0]); 				
    },
    previewImage (file) {
      loadImage(file, { maxWidth: 638 }).then((data) => {
        this.form.file = file;
        this.$refs['imagepreview-ref'].appendChild(data.image);       
        this.$refs['imagepreview-ref'].firstElementChild.style.width = '100%';
        this.$refs['imagepreview-ref'].firstElementChild.style.height = 'auto';
        this.imagePreview = true;
      });
    },
    removeImage () {    
      this.imagePreview = false;
      this.form.file = null;   
      this.$refs['imagepreview-ref'].removeChild(this.$refs['imagepreview-ref'].childNodes[0]);     
    },
    onTitleUpdateHandler (data) {   
      if (this.isNullContent(data, 'title')) {
        this.form.title = null;
        return;
      }

      this.form.title = JSON.stringify(data.getJSON());
    },
    onContentUpdateHandler (data) {     
      if (this.isNullContent(data, 'paragraph')) {
        this.form.desc = null;
        return;
      }

      this.form.desc = JSON.stringify(data.getJSON());
    },
    isNullContent (obj, type) {
      const parsedObj = JSON.parse(JSON.stringify(obj));   
      const primary = parsedObj.state.doc.content[0];

      if (primary.type === type && (!primary.content || (primary.content && !primary.content[0].text))) {
        return true;
      }

      return false;
    },
    publish () {
      if (!this.user) {
        this.$router.push({ path: '/' });
        return;
      }

      const validationErr = this.validate();
      if (validationErr) {
        emit('globalAlert', { message: validationErr, duration: 3000 }); 
        return;
      }

      if (!this.newStory.pending) {
        this.addStoryPending(true);
        this.addStory({
          filePrePath: 'missingconcepts', 
          file: this.form.file, 
          title: this.form.title, 
          description: this.form.desc,
          langRegion: getUserLangRegPref()  
        });
      }    
    },
    validate () {
      let validationErr = '';  

      if (!this.form.file) {
        validationErr = 'Image is required.';
      }

      if (!this.form.title) {
        validationErr = (() => {
          if (!this.form.file) {
            return 'Image and Title are required.';
          }

          return 'Title is required.';
        })();         
      }

      if (!this.form.desc) {
        validationErr = (() => {
          if (!this.form.file && this.form.title) {
            return 'Image and Description are required.';
          }

          if (this.form.file && !this.form.title) {
            return 'Title and Description are required.';
          }

          if (!this.form.file && !this.form.title) {
            return 'Image, Title and Description are required.';
          }

          return 'Description is required.';
        })();         
      }

      return validationErr;
    },
    getCurrentDate () {
      return moment(new Date()).format('MMM D, YYYY');
    }
  }
};
