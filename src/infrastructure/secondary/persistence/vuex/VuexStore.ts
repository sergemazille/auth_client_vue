import { createStore } from 'vuex';
import { auth } from '@/infrastructure/secondary/persistence/vuex/modules/Auth';
import { notifications } from '@/infrastructure/secondary/persistence/vuex/modules/Notifications';

export default createStore({
  modules: {
    auth,
    notifications,
  },
});
