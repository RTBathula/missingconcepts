import { Node } from 'tiptap';

export default class Title extends Node {
  get name () {
    return 'title';
  }

  get schema () {
    return {
      content: 'inline*',      
      parseDOM: [{
        tag: 'h5'
      }],
      toDOM: () => ['h5', 0]
    };
  }
};
