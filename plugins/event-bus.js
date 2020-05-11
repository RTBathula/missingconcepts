import Vue from 'vue';

const vueApp = new Vue();

export const emit = (channel, message) => {
  vueApp.$emit(channel, message);
};

export default () => vueApp;
