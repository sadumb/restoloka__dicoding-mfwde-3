/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import { createFavoriteButtonTemplate, createUnfavoriteButtonTemplate } from '../views/templates/templates-creator';

const FavoriteButtonPresenter = {
  async init({ favoriteButtonContainer, favoriteRestaurant, restaurant }) {
    this._favoriteButtonContainer = favoriteButtonContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurant = favoriteRestaurant;

    await this._renderButton();
  },
  async _renderButton() {
    const { id } = this._restaurant;
    if (await this._isFavorited(id)) {
      this._renderUnfavorite();
    } else {
      this._renderFavorite();
    }
  },
  async _isFavorited(id) {
    const restaurant = await this._favoriteRestaurant.getRestaurant(id);
    return !!restaurant;
  },
  _renderFavorite() {
    this._favoriteButtonContainer.innerHTML = createFavoriteButtonTemplate();
    const favoriteButton = document.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },
  _renderUnfavorite() {
    this._favoriteButtonContainer.innerHTML = createUnfavoriteButtonTemplate();
    const favoriteButton = document.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default FavoriteButtonPresenter;
