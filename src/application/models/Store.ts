export interface Store {
  dispatch(actionName: string, param?: unknown): Promise<void>;
  get(param: string): any;
}
