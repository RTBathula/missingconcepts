import { emit } from '~/plugins/event-bus';
import * as storyAPI from '~/api/story';
import * as publicAPI from '~/api/public';

const actions = {
  async addStory ({ commit }, { filePrePath, file, title, description, langRegion }) {
    const apiResp = await storyAPI.addStory(filePrePath, file, title, description, langRegion);
    commit('addStory', { apiResp });

    if (apiResp.error) {
    	emit('globalAlert', { message: apiResp.error, duration: 6000 });
    }

    if (!apiResp.error) {
    	setTimeout(() => {
        if (process.browser) {   		
      		  window.open('/', '_self');
        }
    	}, 0);
    }
  },

  async listPublicStories ({ commit }, { skip, limit, langRegion }) {
    const apiResp = await publicAPI.listPublicStories(skip, limit, langRegion);
    commit('listStories', { apiResp, skip });   
  },

  async listStories ({ commit }, { skip, limit, byUser, langRegion }) {
    const apiResp = await storyAPI.listStories(skip, limit, byUser, langRegion);
    commit('listStories', { apiResp, skip });   
  },

  async getStory ({ commit }, { id }) {   
    const apiResp = await publicAPI.getStory(id);
    commit('getStory', { apiResp });   
  },

  async deleteStory ({ commit }, { id }) {
    const apiResp = await storyAPI.deleteStory(id);
    commit('deleteStory', { apiResp, id });   
  }
};

export default actions;
