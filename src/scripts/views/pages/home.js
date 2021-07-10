import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantList, createLoader } from '../templates/templates-creator';

const Home = {
  async render() {
    return `
        <div class="hero">
          <div class="hero__inner">
              <h1 class="hero__title">Fresh and Delicious foods in your hand.</h1>
              <p class="hero__tagline">
              Restoloka provide the best restaurant around you.
              </p>
              <a href="#root-content" class="hero__cta">Find Now</a>
          </div>
        </div>
        <section class="main__container">
            <h2 id="main__title">Explore Restaurant</h2>
            <div class="resto" id="root-content">
              <div id="loader-container"></div>
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
    const loaderContainer = document.querySelector('#loader-container');
    loaderContainer.innerHTML = createLoader();
    const restaurants = await RestaurantSource.restaurantList();
    loaderContainer.innerHTML = '';
    restaurants.forEach((restaurant) => {
      restoWrapper.innerHTML += createRestaurantList(restaurant);
    });
  },
};

export default Home;
