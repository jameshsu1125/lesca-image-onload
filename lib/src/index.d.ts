import { Options, Result } from './type';
export default class ImagePreloader {
    private index;
    private result;
    /**
     * add event by dom background
     * @param {HTMLElement} target
     * @param {Options} options
     * @returns Promise
     */
    constructor();
    load(target: HTMLElement | null, options?: Options): Promise<Result>;
    getStyle(el: Element | any, styleProp: string): string;
}
