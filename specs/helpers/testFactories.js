/* eslint-disable import/prefer-default-export */
import FavoriteButtonPresenter from '../../src/scripts/utils/favorite-button-presenter';
import FavoriteResto from '../../src/scripts/data/favoriteResto-idb';

const createFavoriteButtonPresenterWithRestaurant = async (restaurant) => {
  await FavoriteButtonPresenter.init({
    favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
    favoriteRestaurant: FavoriteResto,
    restaurant,
  });
};

export { createFavoriteButtonPresenterWithRestaurant };
