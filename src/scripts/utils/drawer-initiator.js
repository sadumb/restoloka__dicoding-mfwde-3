/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const DrawerInitiator = {
  init({
    hamburgerButton, closeButton, drawer, content,
  }) {
    hamburgerButton.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });

    closeButton.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
    drawer.classList.remove('close');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
    drawer.classList.toggle('close');
  },
};

export default DrawerInitiator;
