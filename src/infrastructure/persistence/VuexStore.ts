import { createStore } from 'vuex';
import { auth } from '@/infrastructure/persistence/vuexModules/AuthStore';
import { notifications } from '@/infrastructure/persistence/vuexModules/NotificationsStore';

export default createStore({
  modules: {
    auth,
    notifications,
  },
});
