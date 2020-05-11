<template>
  <div class="newstory">
  	<div class="newstory__innerscreen">
  		<div class="newstory__editorwrap">
  			<div class="newstory__topstrip">                        
  			</div>
  			<div class="newstory__editor">
  				<div class="newstory__filewrap">
  					<div 
  						v-if="!imagePreview"
  						class="newstory__dagndrop" 
  						@dragenter="preventDefaults"
  						@dragleave="preventDefaults"
  						@dragover="preventDefaults"
  						@drop="handleDrop"
  					>
  						<input type="file" id="file" accept="image/*" class="newstory__inputfile" @change="filesChange($event.target.files)" />
  						<label for="file">
  							<strong>Choose a image</strong>
  							<span class="box__dragndrop"> or drag it here</span>.
  						</label>
  					</div>
  					<div v-show="imagePreview" class="newstory__imagepreviewwrap">
              <div ref="imagepreview-ref" class="newstory__imagepreview"></div>
              <div class="newstory__imagetools">
                <div>                
                  <span @click="removeImage" class="newstory__removeimage">Remove</span>
                </div>
              </div>     
            </div>
  				</div>

          <div class="newstory__titlewrap">
            <div class="newstory__title">
              <client-only>
              <TitleEditor :onUpdate="onTitleUpdateHandler" :isEditable="true" :isAutoFocus="true" />
              </client-only>
            </div>
          </div>

          <client-only>
            <div v-if="user" class="newstory__author">
              <div class="newstory__author-left">
                <div class="newstory__profilepic">
                  <img class="newstory__profilepic-img" :src="user.picture" />  
                </div>
                <div class="newstory__author-details">
                  <div class="newstory__author-name">
                    {{user.name}}
                  </div>
                  <div class="newstory__author-time">
                    {{getCurrentDate()}}
                  </div>
                </div>              
              </div>            
            </div>
          </client-only>

          <div class="newstory__desc">
            <client-only>           
            <MenuTextEditor :onUpdate="onContentUpdateHandler" :isEditable="true" /> 
            </client-only>         
          </div>

  			</div>
  			<div class="newstory__bottomstrip">
          <div>
            <button v-if="!newStory.pending" class="newstory__btn publish" @click="publish">Publish</button>
            <button v-else class="newstory__btn publish"><i class="fa fa-circle-o-notch fa-spin"></i></button>
          </div>            
  			</div>     
  		</div>  		
  	</div>	
  </div>
</template>

<script src="./control.js" scoped></script>
<style src="./style.scss" lang="scss" scoped></style>
