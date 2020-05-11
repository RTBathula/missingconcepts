<template>
  <div class="details">
  	<div v-if="findStory.value && !findStory.pending" class="details__innerscreen">  		
		<div :class="['details__article']"> 
	       <div :class="['details__article-left']">
	       		<img class="details__article-img" :src="findStory.value.imageURL" />	
	       </div>
	       <div :class="['details__article-right']">
	       		<div class="details__primary">
	       			<div class="details__content">
		       			<div class="details__title">
		       				<client-only>	
		       				<TitleEditor :content="JSON.parse(findStory.value.title)" />
		       				</client-only>
		       			</div>
		       			<div class="details__author">
		       				<div class="details__author-left">
		       					<client-only>
								<div class="details__profilepic">
									<img class="details__profilepic-img" :src="findStory.value.user[0].picture" >	
								</div>
								</client-only>
								<div class="details__author-details">
									<div class="details__author-name">
										{{findStory.value.user[0].name}}
									</div>
									<div class="details__author-time">
										{{findStory.value.createdAt | toStoryDate }}
									</div>
								</div>							
							</div>
							<div class="details__author-right">					
								
							</div>
		       			</div>
		       			<div class="details__desc">
		       				<client-only>
		       				<MenuTextEditor :content="JSON.parse(findStory.value.description)" />
		       				</client-only>	       				
		       			</div>
	       			</div>	       			
	       			<div class="details__actionswrap">
	       				<div class="details__action">
		       				<div class="details__writerimg">
		       					<client-only>
		       					<img class="normal" src="~/assets/images/writer2.png" />
		       					<img @click="addOrRemovePrimary" class="onhover" src="~/assets/images/writer.png" />
		       					</client-only>
		       				</div>
		       				<div class="details__actioninfo">
		       					<div>
		       						<span>{{primaryVotes}}</span>&nbsp;
		       						<span style="font-size:12px;">good writing votes</span>
		       					</div>
		       				</div>
	       				</div>
	       				<div class="details__action">
	       					<!-- <div class="details__refute">       					
       							<span>Refute this story</span>
       						</div> -->	       				
	       				</div>
	       			</div>
	       		</div>

	       		<!-- <div class="details__refutation">
	       			<div class="details__content">
		       			<div class="details__refutenotewrap">
		       				<span class="details__refutenote">Refutation</span>
		       			</div>
		       			<div class="details__author">
		       				<div class="details__author-left">
								<div class="details__profilepic">
									<img class="details__profilepic-img" :src="findStory.value.user[0].picture" >	
								</div>
								<div class="details__author-details">
									<div class="details__author-name">
										{{findStory.value.user[0].name}}
									</div>
									<div class="details__author-time">
										{{findStory.value.createdAt | toStoryDate }}
									</div>
								</div>							
							</div>
							<div class="details__author-right">					
								
							</div>
		       			</div>
		       			<div class="details__desc">
		       				<MenuTextEditor :content="JSON.parse(findStory.value.description)" />	       				
		       			</div>
	       			</div>	       			
	       			<div class="details__actionswrap">
	       				<div class="details__action">
		       				<div class="details__writerimg">
		       					<img class="normal" src="statics/writer2.png" />
		       					<img class="onhover" src="statics/writer.png" />
		       				</div>
		       				<div class="details__actioninfo">
		       					<div>
		       						<span>{{findStory.value.goodWritingVotes || 0}}</span>&nbsp;
		       						<span>(good writing votes)</span>
		       					</div>
		       				</div>
	       				</div>	       				
	       			</div>
	       		</div> -->
	       </div>
	    </div>  		
	</div>
  </div>
</template>

<script src="./control.js" scoped></script>
<style src="./style.scss" lang="scss" scoped></style>
