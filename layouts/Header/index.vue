<template>
  <div class="header">
  	<div class="header__innerscreen">
  		<div class="header__left">
    		<div class="header__title">
          <nuxt-link to="/" class="header__homepage">
      			<span class="header__title-part1">missing</span>
      			<span class="header__title-part2">Concepts</span>
          </nuxt-link>
    		</div>
  		</div>
      <div class="header__right">
        <div class="header__linkswrap">
          <div>
            <nuxt-link to="/about-and-rules">About & Rules</nuxt-link>
          </div>
        </div>
        <div class="header__langwrap">
          <div>
            <client-only>     
              <dropdown class-name="headerlang hello" :close-on-click="true">
                <template slot="btn">{{selectedLangRegion}}</template>
                  <template slot="body">
                    <ul>              
                      <li v-for="(lang, key) in langList" :key="key" @click="selectLang(lang)">
                        <span>
                          {{ lang }}
                        </span>
                      </li>
                    </ul>
                  </template>
              </dropdown>
            </client-only>            
          </div>
        </div>
        <div class="header__user">
          <client-only>  
          <div v-if="!user" class="header__user-login">
            <button @click="() => { openModal = true; }">Login</button>            
          </div>
          <div v-if="user" v-click-outside="hideMenu" class="header__user-afterlogin">
            <div class="header__user-picture" @click="onClickToggleMenu($event)">
              <img :src="user.picture" />
            </div>
            <div v-if="isMenuOpen" class="header__menuwrap">
              <div class="header__menu">
                <div class="header__menuitem-user">
                  <div class="name">{{user.name}}</div>
                  <div class="email">{{user.email}}</div>
                </div>

                <div class="header__menuitem">
                  <span @click="newStory">New Post</span>
                </div>
                <div class="header__menuitem">
                  <span @click="allPosts">All Posts</span>
                </div>
                <div @click="logOut" class="header__menuitem">
                  <span>Log out</span>
                </div>
              </div>
            </div>
          </div>
          </client-only>  
        </div>        
      </div>
  	</div>
    <login-opts
      :show="openModal"
      title="Remove user"
      :hidden="($event) => { openModal = false; }" 
      actionBtnTitle="Remove"
      :onClickAction="() => {}"
      :isActionOnPending="false"
    />  	
  </div>
</template>

<script src="./control.js" scoped></script>
<style src="./style.scss" lang="scss" scoped></style>
