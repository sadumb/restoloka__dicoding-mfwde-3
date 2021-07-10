import FavoriteResto from '../../data/favoriteResto-idb';
import { createRestaurantList } from '../templates/templates-creator';

const Favorites = {
  async render() {
    return `
    <div class="hero hero--favorite">
    <div class="hero__inner">
        <h1 class="hero__title">Favorites.</h1>
    </div>
  </div>
    <section class="main__container">
        <h2 id="main__title">Your favorite place(s):</h2>
        <div class="resto" id="root-content">
          <div class="resto__wrapper">
            <!-- render-->
          </div>
        </div>
    </section>
      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const restoWrapper = document.querySelector('.resto__wrapper');
    const restaurants = await FavoriteResto.getAllRestaurants();
    if (restaurants.length === 0) restoWrapper.innerHTML = '<h2 id="no-favorite">Oops, no restaurant added yet.</h2>';
    restaurants.forEach((restaurant) => {
      restoWrapper.innerHTML += createRestaurantList(restaurant);
    });
  },
};

export default Favorites;
