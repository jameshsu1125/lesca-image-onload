[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/)

# Installation

```sh
npm install lesca-image-onload --save
```

# Usage

```javascript
import ImageOnload from 'lesca-image-onload';

new ImageOnload(container.current, {
	hideBeforeLoaded: true,
	onUpdate: (e) => {
		const { loaded, total } = e;
		const percent = (loaded / total) * 100;
		loadingBar.style.width = `${percent}%`;
	},
}).then((e) => {
	loadingBar.style.width = `100%`;
});
```

# Methods

| method                    |     options      |             description             | default |
| :------------------------ | :--------------: | :---------------------------------: | ------: |
| constructor(dom, options) |                  |                                     |         |
| dom                       |    HTML Node     |   getElementById('container')[0]    |         |
| options                   |     onUpdate     |     call when each image loaded     |         |
|                           | hideBeforeLoaded | set display when start and complete |    true |
