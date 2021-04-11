import { createStore } from 'vuex';
import { auth } from '@/infrastructure/auth/AuthStore';

export default createStore({
  modules: {
    auth,
  },
});
