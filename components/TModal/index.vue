<template>
    <transition name="modal-fade">
	    <div class="tmodal-backdrop" :style="{ 'background-color': overlaybg }">
	      <div class="tmodal-backdrop__modal" :style="{ 'width': getWidthHeight().width, 'height': getWidthHeight().height }">
	      	<div class="tmodal-backdrop__close">
	      		<svg @click="close" class="tmodal-backdrop__closex" width="29" height="29">
	      			<path d="M20.13 8.11l-5.61 5.61-5.6-5.61-.81.8 5.61 5.61-5.61 5.61.8.8 5.61-5.6 5.61 5.6.8-.8-5.6-5.6 5.6-5.62" fill-rule="evenodd"></path>
	      		</svg>
	      	</div>
	      	<slot name="body"></slot>	      		
	      </div>	      
	    </div>
  	</transition>
</template>

<script src="./control.js" scoped></script>
<style src="./style.scss" lang="scss" scoped></style>
