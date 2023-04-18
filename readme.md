[![NPM](https://img.shields.io/badge/NPM-ba443f?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![React](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![React](https://img.shields.io/badge/-ReactJs-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://zh-hant.reactjs.org/)
[![React](https://img.shields.io/badge/Less-1d365d?style=for-the-badge&logo=less&logoColor=white)](https://lesscss.org/)
[![React](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://www.w3schools.com/html/)
[![React](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3schools.com/css/)
[![NPM](https://img.shields.io/badge/DEV-Jameshsu1125-9cf?style=for-the-badge)](https://www.npmjs.com/~jameshsu1125)

# Why use it?

a listener for load images of DOM.

#### [Live Demo](https://jameshsu1125.github.io/lesca-image-onload/)

# Installation

```sh
npm install lesca-image-onload --save
```

## Usage

```javascript
import ImageOnload from 'lesca-image-onload';

new ImageOnload()
  .load(containerRef.current, {
    hideBeforeLoaded: true,
    onUpdate: (e) => {
      const { loaded, total } = e;
      const percent = (loaded / total) * 100; // 0~9x
    },
  })
  .then((e) => {
    const { loaded, total } = e;
    const percent = (loaded / total) * 100; // 100
  });
```

## Development

### Methods

| method                                                     |      description      |  return |
| :--------------------------------------------------------- | :-------------------: | ------: |
| .**constructor**()                                         |       new class       |   class |
| .**load**(**dom**:_DOM_, **[options](#options)**:_object_) | Load HTML node images | Promise |

### options

| Properties                     |              description              |                                                                   return |
| :----------------------------- | :-----------------------------------: | -----------------------------------------------------------------------: |
| **onUpdate**:_function_        |    callback for each image onload     | { **url**:_string_, **index**:_int_, **total**:_int_, **loaded**:_int_ } |
| **hideBeforeLoaded**:_boolean_ | set root node style display to 'none' |                                                       default = **true** |

### Features

- add React hook
- maintain if necessary
