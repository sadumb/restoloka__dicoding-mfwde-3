/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import FavoriteResto from '../data/favoriteResto-idb';
import { createFavoriteButton, createUnfavoriteButton } from '../views/templates/templates-creator';

const FavoriteButtonInitiator = {
  async init({ favoriteButtonContainer, restaurant }) {
    this._favoriteButtonContainer = favoriteButtonContainer;
    this._restaurant = restaurant;

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
    const restaurant = await FavoriteResto.getRestaurant(id);
    return !!restaurant;
  },
  _renderFavorite() {
    this._favoriteButtonContainer.innerHTML = createFavoriteButton();
    const favoriteButton = document.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await FavoriteResto.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },
  _renderUnfavorite() {
    this._favoriteButtonContainer.innerHTML = createUnfavoriteButton();
    const favoriteButton = document.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      await FavoriteResto.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default FavoriteButtonInitiator;
