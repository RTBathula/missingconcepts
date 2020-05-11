<template>
	<div class="mc-card">		
		<div class="mc-card__target">			
			<img class="mc-card__image" :src="data.imageURL" />			
		</div>
		<div class="mc-card__details">
			<div class="mc-card__title">				
				{{getTitle(data.title)}}
			</div>
			<div class="mc-card__author">
				<div class="mc-card__author-left">
					<div class="mc-card__author-set">
						<div class="mc-card__profilepic">
							<img class="mc-card__profilepic-img" :src="data.user[0].picture" >	
						</div>
						<div class="mc-card__name">
							{{data.user[0].name}}
						</div>
					</div>
					<div class="mc-card__time">
						{{data.createdAt | toStoryDate }}
					</div>
				</div>
				<div class="mc-card__author-right">					
					<nuxt-link :to="'/details/' + data._id" class="mc-card__readmore">Read more</nuxt-link>
				</div>
			</div>			
		</div>						
  	</div>
</template>

<script src="./control.js" scoped></script>
<style src="./style.scss" lang="scss" scoped></style>
