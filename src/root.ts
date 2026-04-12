import ImagePreloader from '.';

const createApp = () => {
  return new Promise<HTMLElement>((resolve) => {
    const app = document.createElement('div');
    const a = document.getElementById('a');
    if (a) {
      const preloader = new ImagePreloader(a);
      preloader
        .load({
          onStart: (r) => console.log(r),
          onUpdate: (r) => {
            console.log(r);
          },
        })
        .then((r) => {
          console.log(r);
        });
    }
    new ImagePreloader(document.getElementById('app')).load().then(() => {
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
