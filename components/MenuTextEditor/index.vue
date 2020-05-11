<template>
    <div class="editor">
        <editor-menu-bubble v-show="isEditable" :editor="editor" :keep-in-bounds="keepInBounds" v-slot="{ commands, isActive, menu }">
            <div
              class="menububble"
              :class="{ 'is-active': menu.isActive }"
              :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
            >

            <button
                class="menubar__button"
                :class="{ 'is-active': isActive.bold() }"
                @click="commands.bold"
              >
                <i class="fa fa-bold" style="color:white; font-size: 18px;" aria-hidden="true"></i>
            </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.italic() }"
                @click="commands.italic"
              >                        
                <i class="fa fa-italic" style="color:white;font-size: 18px;" aria-hidden="true"></i>
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.strike() }"
                @click="commands.strike"
              >                       
                <i class="fa fa-strikethrough" style="color:white;font-size: 18px;" aria-hidden="true"></i>
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.underline() }"
                @click="commands.underline"
              >                       
                <i class="fa fa-underline" style="color:white;font-size: 18px;" aria-hidden="true"></i>
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.code() }"
                @click="commands.code"
              >                       
                <i class="fa fa-code" style="color:white;font-size: 18px;" aria-hidden="true"></i>
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.paragraph() }"
                @click="commands.paragraph"
              >                      
                <i class="fa fa-paragraph" style="color:white;font-size: 18px;" aria-hidden="true"></i>
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.heading({ level: 5 }) }"
                @click="commands.heading({ level: 5 })"
              >
                <span style="color:white;font-size: 18px;">H5</span>
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.bullet_list() }"
                @click="commands.bullet_list"
              >                        
                <i class="fa fa-list-ul" style="color:white;font-size: 18px;" aria-hidden="true"></i>
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.ordered_list() }"
                @click="commands.ordered_list"
              >                       
                <i class="fa fa-list-ol" style="color:white;font-size: 18px;" aria-hidden="true"></i>
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.blockquote() }"
                @click="commands.blockquote"
              >                        
                <i class="fa fa-quote-left" style="color:white;font-size: 18px;" aria-hidden="true"></i>
              </button>

              <button
                class="menubar__button"
                :class="{ 'is-active': isActive.code_block() }"
                @click="commands.code_block" >                       
                <i class="fa fa-code" style="color:white;font-size: 18px;" aria-hidden="true"></i>
              </button>

            </div>
          </editor-menu-bubble>

          <editor-content class="editor__content" :editor="editor" />
    </div>
</template>

<script src="./control.js" scoped></script>
<style src="./style.scss" lang="scss" scoped></style>
