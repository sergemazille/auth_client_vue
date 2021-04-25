import { createStore } from 'vuex';
import { auth } from '@/infrastructure/persistence/vuex/modules/Auth';
import { notifications } from '@/infrastructure/persistence/vuex/modules/Notifications';

export default createStore({
  modules: {
    auth,
    notifications,
  },
});
