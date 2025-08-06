import createApp from ".";

const appElement = document.getElementById("app");
if (appElement && appElement.children.length === 0) {
  const app = createApp();
  appElement.appendChild(app);
}
