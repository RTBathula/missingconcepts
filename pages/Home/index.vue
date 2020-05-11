<template>
  <div class="home">
  	<div class="home__innerscreen">
  		<div v-if="storyList.value.length && !storyList.error && !storyList.pending" class="home__list">
		  	<masonry
			  :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
		  	  :gutter="{default: '30px', 700: '15px'}"
			  >
			  <div class="home__cardwrap" v-for="(story, key) in storyList.value" :key="key">		  	
			  	<Card :data="story" />
			  </div>		  	 
			</masonry>
			<div class="home__loadingmore">
				<i v-if="storyList.appendRecordsPending" class="fa fa-circle-o-notch fa-spin"></i>
			</div>
		</div>
		<div v-if="!storyList.value.length && !storyList.error && !storyList.pending" class="home__nolist">			
			<div>No posts available.</div>
		</div>
		<div v-if="storyList.error || storyList.pending"  class="home__pendingorerror">
			<div v-if="storyList.pending" >Loading...</div>
			<div v-if="storyList.error">{{storyList.error}}</div>
		</div>
	</div>
  </div>
</template>

<script src="./control.js" scoped></script>
<style src="./style.scss" lang="scss" scoped></style>
