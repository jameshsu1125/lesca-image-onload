export declare enum Status {
    unload = 0,
    loading = 1,
    loaded = 2
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
