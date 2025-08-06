import ImagePreloader from '.';

const createApp = () => {
  return new Promise<HTMLElement>((resolve) => {
    const app = document.createElement('div');
    new ImagePreloader().load(document.getElementById('app')).then(() => {
      app.textContent = 'Images preloaded';
      resolve(app);
    });
  });
};

export default createApp;

const appElement = document.getElementById('app');
if (appElement && appElement.children.length === 0) {
  createApp().then((app) => {
    appElement.appendChild(app);
  });
}
