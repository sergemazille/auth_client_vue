import { createStore } from 'vuex';
import { auth } from '@/infrastructure/persistence/auth/AuthStore';

export default createStore({
  modules: {
    auth,
  },
});
