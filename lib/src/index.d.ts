import { Options, Result } from './type';
export default class ImagePreloader {
    private index;
    private result;
    private target;
    private hideBeforeLoaded;
    /**
     * add event by dom background
     * @param {HTMLElement | null} target
     * @param {Options} options
     * @returns Promise
     */
    constructor(target: HTMLElement | null, hideBeforeLoaded?: boolean);
    load(options?: Options): Promise<Result>;
    getStyle(el: Element | any, styleProp: string): string;
}
