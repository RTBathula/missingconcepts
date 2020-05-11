<template>
  <div class="userposts">
  	<div class="userposts__innerscreen">
  		<div class="userposts__sectionwrap">
  			<div v-if="storyList.value.length && !storyList.error && !storyList.pending" class="userposts__list">
  				<div>
  					<div v-for="(story, key) in storyList.value" :key="key" class="userposts__storywrap">
  						<div class="userposts__story">	  						
	  						<div class="userposts__storycontent">                  
	  							<div class="userposts__title">
                    {{getTitle(story.title)}}  <span class="userposts__langregion">[{{story.langRegion}}]</span>                  
                  </div>
	  							<div class="userposts__time">{{story.createdAt | toStoryDate }}</div>                  
	  						</div>
  						</div>
  						<div class="userposts__actions">
  							<div class="userposts__action">
  								<span class="view">
                    <router-link :to="'/details/' + story._id">View</router-link>        
                  </span>
  							</div>
  							<div class="userposts__action">
  								<span v-if="!removeStory.pending[story._id]" class="delete" @click="deletePost(story._id)">Delete</span>
                  <span v-else class="delete"><i class="fa fa-circle-o-notch fa-spin"></i></span>
  							</div>
  						</div>
  					</div>  						
  				</div>
  			</div>
        <div v-if="!storyList.value.length && !storyList.error && !storyList.pending"  class="userposts__nolist">
          <div>No posts available.</div>
        </div>
        <div v-if="storyList.error || storyList.pending"  class="userposts__pendingorerror">
          <div v-if="storyList.pending" >Loading...</div>
          <div v-if="storyList.error">{{storyList.error}}</div>
        </div>
  		</div>  		
  	</div>	
  </div>
</template>

<script src="./control.js" scoped></script>
<style src="./style.scss" lang="scss" scoped></style>
