const defaultOptions = {
	hideBeforeLoaded: true,
	onUpdate: (e) => {
		console.log(e);
	},
};

export default class ImagePreloader {
	/**
	 * add event by dom background
	 * @param {DOM} target
	 * @param {object} options
	 * @returns Promise
	 */
	constructor(target, options = defaultOptions) {
		const opt = { ...defaultOptions, ...options };
		this.target = target;

		const { onUpdate, hideBeforeLoaded } = opt;

		if (hideBeforeLoaded) this.target.style.display = 'none';

		const elements = [...this.target.querySelectorAll('*')];
		this.result = [];

		this.urls = elements.filter((e, index) => {
			const tag = e.tagName;
			const src = e.getAttribute('src');
			const backgroundImage = (e.currentStyle || window.getComputedStyle(e, false))[
				'background-image'
			]
				.replace(/url\((['"])?(.*?)\1\)/gi, '$2')
				.split(',')[0];

			const status = 'unload';

			if (tag === 'IMG' && src) {
				this.result.push({ url: src, index, status });
				return true;
			} else if (tag === 'DIV' && backgroundImage !== 'none') {
				this.result.push({ url: backgroundImage, index, status });
				return true;
			}
			return false;
		});

		return new Promise((resolve, reject) => {
			this.result.forEach((e) => {
				const { url, index } = e;

				e.status = 'loading';

				const image = new Image();
				image.onload = () => {
					e.status = 'loaded';
					const total = this.result.length;
					const loaded = this.result.filter((e) => e.status !== 'loading').length;
					if (total === loaded) {
						if (hideBeforeLoaded) this.target.style.display = 'block';
						resolve({ url, total, loaded, index });
					} else onUpdate({ url, loaded, total, index });
				};

				image.onerror = () => {
					reject(new Error('image url error'));
				};

				image.src = url;
			});
		});
	}
}
