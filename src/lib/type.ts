export enum Status {
  unload,
  loading,
  loaded,
}

export type Item = {
  url: string;
  index: number;
  status: Status;
};

export interface Result {
  total: number;
  loaded: number;
  index?: number;
  url?: string;
}

export type Options = {
  hideBeforeLoaded?: boolean;
  onUpdate?: (result: Result) => void;
};
