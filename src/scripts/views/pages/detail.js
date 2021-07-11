/* eslint-disable import/no-cycle */
import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import ReviewInitiator from '../../utils/review-initiator';
import FavoriteButtonPresenter from '../../utils/favorite-button-presenter';
import { createRestaurantDetail, createLoader } from '../templates/templates-creator';
import FavoriteResto from '../../data/favoriteResto-idb';

const Detail = {
  async render() {
    return `
    <section class="detail__container">
      <div id="loader-container"></div>
      <div class="resto" id="root-content">
        <!-- render-->
      </div>
    </section>
    <div id="favoriteButtonContainer"></div>
      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const { id } = UrlParser.parseActiveUrlWithoutCombiner();
    const restoWrapper = document.querySelector('#root-content');
    const loaderContainer = document.querySelector('#loader-container');
    loaderContainer.innerHTML = createLoader();
    const restaurant = await RestaurantSource.restoDetail(id);
    loaderContainer.innerHTML = '';
    restoWrapper.innerHTML = '';
    restoWrapper.innerHTML += createRestaurantDetail(restaurant);

    ReviewInitiator.init({
      id,
      name: document.querySelector('#review__name'),
      review: document.querySelector('#review__text'),
      form: document.querySelector('#review__form'),
    });

    FavoriteButtonPresenter.init({
      favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
      favoriteRestaurant: FavoriteResto,
      restaurant: {
        id: restaurant.id,
        pictureId: restaurant.pictureId,
        name: restaurant.name,
        description: restaurant.description,
        rating: restaurant.rating,
        city: restaurant.city,
      },
    });
  },
};

export default Detail;
