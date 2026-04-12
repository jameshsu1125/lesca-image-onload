/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Item, Options, Result, Status } from './type';

const defaultOptions = {
  onUpdate: (result: Result) => {
    if (Date.now() < 100) console.log(result);
  },
  onStart: (result: Pick<Result, 'total' | 'loaded'> & { urls: string[] }) => {
    if (Date.now() < 100) console.log(result);
  },
};

export default class ImagePreloader {
  private index: number;
  private result: Item[];
  private target: HTMLElement | null = null;
  private hideBeforeLoaded: boolean = true;

  /**
   * add event by dom background
   * @param {HTMLElement} target
   * @param {Options} options
   * @returns Promise<Result>
   */
  constructor(target: HTMLElement | null, hideBeforeLoaded?: boolean) {
    this.target = target;
    if (hideBeforeLoaded !== undefined) {
      this.hideBeforeLoaded = hideBeforeLoaded;
    }

    this.index = 0;
    this.result = [];
  }

  load(options: Options = defaultOptions) {
    if (!this.target) {
      return new Promise<Result>((resolve) => {
        resolve({ total: 0, loaded: 0 });
      });
    }

    const opt = { ...defaultOptions, ...options };
    const { onUpdate, onStart, hideBeforeLoaded } = opt;

    const display = this.getStyle(this.target, 'display') === 'flex' ? 'flex' : 'block';
    if (hideBeforeLoaded) this.target.style.display = 'none';

    const node = Array.from(this.target.querySelectorAll('*'));
    const elements = [this.target, ...node];

    elements.forEach((e, index) => {
      const tag = e.tagName;
      const src = e.getAttribute('src');

      const backgroundImage = this.getStyle(e, 'background-image').replace(
        /url\((['"])?(.*?)\1\)/gi,
        '$2',
      );

      const maskImage = this.getStyle(e, '-webkit-mask-image').replace(
        /url\((['"])?(.*?)\1\)/gi,
        '$2',
      );

      const beforeStyle = window.getComputedStyle(e, '::before');
      const beforeBackgroundImage = beforeStyle
        .getPropertyValue('background-image')
        .replace(/url\((['"])?(.*?)\1\)/gi, '$2');

      const afterStyle = window.getComputedStyle(e, '::after');
      const afterBackgroundImage = afterStyle
        .getPropertyValue('background-image')
        .replace(/url\((['"])?(.*?)\1\)/gi, '$2');

      const status = Status.unload;

      if (tag === 'IMG' && src) {
        this.result.push({ url: src, index, status });
      }

      if (tag === 'DIV' && backgroundImage !== 'none') {
        if (!backgroundImage.includes('gradient')) {
          this.result.push({ url: backgroundImage, index, status });
        }
      }

      if (tag === 'DIV' && maskImage !== 'none') {
        this.result.push({ url: maskImage, index, status });
      }

      if (tag === 'DIV' && beforeBackgroundImage !== 'none') {
        if (!beforeBackgroundImage.includes('gradient')) {
          this.result.push({ url: beforeBackgroundImage, index, status });
        }
      }

      if (tag === 'DIV' && afterBackgroundImage !== 'none') {
        if (!afterBackgroundImage.includes('gradient')) {
          this.result.push({ url: afterBackgroundImage, index, status });
        }
      }
    });

    onStart({ total: this.result.length, loaded: 0, urls: this.result.map((item) => item.url) });

    const loadImage = ({
      resolve = (res: Result) => console.log(res),
      reject = (res: Result) => console.log(res),
    }) => {
      if (this.result.length === 0) {
        if (this.hideBeforeLoaded && this.target) this.target.style.display = display;
        resolve({ total: 0, loaded: 0 });
        return;
      }

      const data = this.result[this.index];
      const total = this.result.length;

      const { url, index } = data;
      data.status = Status.loading;

      const image = new Image();
      image.onload = () => {
        data.status = Status.loaded;
        const loaded = this.result.filter((e) => e.status === Status.loaded).length;
        if (total === loaded) {
          if (this.hideBeforeLoaded && this.target) this.target.style.display = display;
          requestAnimationFrame(() => resolve({ url, total, loaded, index }));
        } else {
          onUpdate({ url, total, loaded, index });
          this.index++;
          loadImage({ resolve, reject });
        }
      };
      image.src = url;
    };

    return new Promise<Result>((resolve, reject) => {
      loadImage({ resolve, reject });
    });
  }

  getStyle(el: Element | any, styleProp: string): string {
    let value;
    const defaultView = el.ownerDocument.defaultView;

    if (defaultView && defaultView.getComputedStyle) {
      styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
      return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    } else if (el['currentStyle']) {
      styleProp = styleProp.replace(/\-(\w)/g, function (_, letter) {
        return letter.toUpperCase();
      });
      value = el['currentStyle'][styleProp];
      return value;
    }

    return '';
  }
}
