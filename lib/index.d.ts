export default class ImagePreloader {
    private index;
    private result;
    /**
     * add event by dom background
     * @param {HTMLElement} target
     * @param {object} options
     * @returns Promise
     */
    constructor();
    load(target: HTMLElement, options?: object): Promise<unknown>;
    getStyle(el: Element | any, styleProp: string): string;
}
