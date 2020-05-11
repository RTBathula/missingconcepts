export default {
  name: 'tmodal',
  props: ['overlaybg', 'widthheight'],
  methods: {
    close () {
      this.$emit('close');
    },
    getWidthHeight () {
    	if (!this.widthheight) {
    		return {
    			width: '500px',
    			height: '200px'
    		};
    	}

    	const [width, height] = this.widthheight.split(':');
    	return {
    		width: `${width}px`,
    		height: `${height}px` 
    	};
    }
  }
};
