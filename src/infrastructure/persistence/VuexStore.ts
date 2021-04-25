import { createStore } from 'vuex';
import { auth } from '@/infrastructure/persistence/vuexModules/AuthStore';

export default createStore({
  modules: {
    auth,
  },
});
