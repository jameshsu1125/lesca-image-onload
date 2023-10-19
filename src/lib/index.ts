const defaultOptions = {
  hideBeforeLoaded: true,
  onUpdate: (e: Object) => {},
};

enum Status {
  unload,
  loading,
  loaded,
}

type ITEM = {
  url: string;
  index: Number;
  status: Status;
};

export default class ImagePreloader {
  private index: number;
  private result: ITEM[];

  /**
   * add event by dom background
   * @param {HTMLElement} target
   * @param {object} options
   * @returns Promise
   */
  constructor() {
    this.index = 0;
    this.result = [];
  }

  load(target: HTMLElement | null, options: object = defaultOptions) {
    if (!target) return false;

    const opt = { ...defaultOptions, ...options };
    const { onUpdate, hideBeforeLoaded } = opt;

    const display = this.getStyle(target, 'display') === 'flex' ? 'flex' : 'block';
    if (hideBeforeLoaded) target.style.display = 'none';

    var node = Array.from(target.querySelectorAll('*'));
    const elements = [target, ...node];
    elements.forEach((e, index) => {
      const tag = e.tagName;
      const src = e.getAttribute('src');
      const backgroundImage = this.getStyle(e, 'background-image')
        .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
        .split(',')[0];
      const maskImage = this.getStyle(e, '-webkit-mask-image')
        .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
        .split(',')[0];

      const status = Status.unload;
      if (tag === 'IMG' && src) {
        this.result.push({ url: src, index, status });
        return true;
      } else if (
        tag === 'DIV' &&
        backgroundImage !== 'none' &&
        backgroundImage.indexOf('http') >= 0
      ) {
        this.result.push({ url: backgroundImage, index, status });
        return true;
      } else if (tag === 'DIV' && maskImage !== 'none') {
        this.result.push({ url: maskImage, index, status });
      }
      return false;
    });

    const loadImage = ({
      resolve = (res: Object) => console.log(res),
      reject = (res: Object) => console.log(res),
    }) => {
      if (this.result.length === 0) {
        if (hideBeforeLoaded) target.style.display = display;
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
          if (hideBeforeLoaded) target.style.display = display;
          requestAnimationFrame(() => resolve({ url, total, loaded, index }));
        } else {
          onUpdate({ url, total, loaded, index });
          this.index++;
          loadImage({ resolve, reject });
        }
      };
      image.src = url;
    };

    return new Promise((resolve, reject) => {
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
      styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
        return letter.toUpperCase();
      });
      value = el['currentStyle'][styleProp];
      return value;
    }

    return '';
  }
}
