import { Editor, EditorContent } from 'tiptap';
import { Placeholder } from 'tiptap-extensions';
import Title from './Title';
import Doc from './Doc';

export default {
  props: ['onUpdate', 'content', 'isEditable', 'isAutoFocus'],
  components: {
    EditorContent
  },
  data () {
    return {      
      editor: new Editor({
        autoFocus: this.isAutoFocus || false,
        editable: this.isEditable || false,
        extensions: [
          new Doc(),          
          new Title(),
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: node => {               
              if (node.type.name === 'title') {
                return 'Title';
              }
              return 'Sub title(optional)';
            }
          })
        ],
        onUpdate: (data) => {
          if (this.onUpdate) {
            this.onUpdate(data);
          }          
        },
        content: this.content
      })
    };
  },
  beforeDestroy () {
    this.editor.destroy();
  }
};
