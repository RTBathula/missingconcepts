<template>
    <tmodal
      v-show="isModalVisible"      
      @close="onClickCancelHandler"
      overlaybg="rgba(255, 255, 255, 0.95)"
      widthheight="700:300"
    >
    	<template v-slot:body>
    		<div class="loginopts">
    			<div>
	    			<div class="loginopts__modaldesc">
	    				<div class="loginopts__title">Let's start.</div>
	    				<div class="loginopts__desc">Login to post a new story of missing concept.</div>
	    			</div>
	    			<div class="loginopts__btns">   			
		    			<google-login 
		    				:params="params" 
		    				:renderParams="renderParams" 
		    				:onSuccess="onSuccess" 
		    				:onFailure="onFailure"
		    			>    					
		    			</google-login>
	    			</div>
    			</div> 
    		</div>
    	</template>
	</tmodal>
</template>

<script src="./control.js" scoped></script>
<style src="./style.scss" lang="scss" scoped></style>
