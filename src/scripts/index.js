import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import App from './views/app';
import registerServiceWorker from './utils/sw-register';

// PWA Module
const app = new App({
  hamburgerButton: document.querySelector('#hamburger'),
  closeButton: document.querySelector('#drawer__close'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#maincontent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  registerServiceWorker();
});
