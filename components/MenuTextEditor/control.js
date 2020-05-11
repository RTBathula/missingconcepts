import { Editor, EditorContent, EditorMenuBubble } from 'tiptap';
import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  ListItem,
  OrderedList,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Placeholder
} from 'tiptap-extensions';

export default {
  props: ['onUpdate', 'content', 'isEditable', 'isAutoFocus'],
  components: {
    EditorContent,
    EditorMenuBubble
  },
  data () {
    return {
      keepInBounds: true,      
      editor: new Editor({
        autoFocus: this.isAutoFocus || false,
        editable: this.isEditable || false,
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: node => {              
              return 'Write here...';
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
