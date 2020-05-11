
export const getImageDimes = (url, callback) => {
  const img = new Image();
  img.onload = function () {	 
	  callback(this.width, this.height);
  };

  img.src = url;
};
