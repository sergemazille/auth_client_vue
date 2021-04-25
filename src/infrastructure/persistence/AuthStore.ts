import { Store } from '@/application/models/Store';
import { StoreAuth } from '@/infrastructure/persistence/vuex/modules/Auth';
import { Store as VuexStore } from 'vuex';

export class AuthStore implements Store {
  constructor(private readonly vuexStore: VuexStore<StoreAuth>) {}

  async dispatch(actionName: string, param?: unknown): Promise<void> {
    this.vuexStore.dispatch(`auth/${actionName}`, param);
  }

  get(param: string): any {
    return this.vuexStore.getters[`auth/${param}`];
  }
}
