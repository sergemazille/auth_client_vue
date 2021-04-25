import { Store } from '@/application/models/Store';
import { Store as VuexStore } from 'vuex';

export class StoreUsingVuex<T> implements Store {
  constructor(private readonly vuexStore: VuexStore<T>, private readonly moduleSuffix: string) {}

  async dispatch(actionName: string, param?: unknown): Promise<void> {
    const { vuexStore, moduleSuffix } = this;

    vuexStore.dispatch(`${moduleSuffix}/${actionName}`, param);
  }

  get(param: string): any {
    const { vuexStore, moduleSuffix } = this;

    return vuexStore.getters[`${moduleSuffix}/${param}`];
  }
}
