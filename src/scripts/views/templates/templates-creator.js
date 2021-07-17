/* eslint-disable no-plusplus */
import CONFIG from '../../globals/config';

const createRestaurantList = (restaurant) => `
  <article class="resto__item">
    <a href="#/detail/${restaurant.id}" aria-label="${restaurant.name}">
      <figure class="resto__image--wrapper">
        <img 
        data-src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}"
        alt="${restaurant.name}"
        class="resto__image lazyload"
        />
      </figure>
      <div class="resto__content">
        <div class="resto__heading">
            <h2 class="resto__location">
            <span><i class="fa fa-map-marker" aria-hidden="true"></i></span>
            <span>${restaurant.city}</span>
            </h2>
            <h2 class="resto__star">
            <span><i class="fa fa-star" aria-hidden="true"></i></span>
            <span>${restaurant.rating}</span>
            </h2>
        </div>
        <div class="resto__info">
          <h2 class="resto__name">
            ${restaurant.name}
          </h2>
            <p class="resto__description">${restaurant.description}}</p>
        </div>
      </div>
    </a>
  </article>
  `;

const createSkeletonInterfaceCard = () => {
  let skeletonCards = '';
  for (let i = 0; i < 20; i++) {
    skeletonCards += `
    <article class="resto__item resto__item--skeleton">
        <figure class="resto__image--wrapper">
          <div class="resto__image"></div>
        </figure>
        <div class="resto__content">
          <div class="resto__heading">
              <h2 class="resto__location">
              <span></span>
              <span></span>
              </h2>
              <h2 class="resto__star">
              <span></span>
              <span></span>
              </h2>
          </div>
          <div class="resto__info">
            <h2 class="resto__name">
            </h2>
              <p class="resto__description"></p>
          </div>
        </div>
    </article>
    `;
  }
  return skeletonCards;
};

const makeList = (list) => {
  let items = '';
  list.forEach((item) => {
    items += `<li>${item.name}</li>`;
  });
  return items;
};

const createLoader = () => `
  <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
`;

const createRestaurantDetail = (restaurant) => `
  <article class="restoDetail">
    <div class="restoDetail__header">
      <h1 class="restoDetail__name">${restaurant.name}</h1>
      <div class="restoDetail__identity">
        <h2 class="restoDetail__address">${restaurant.address}</h2>
        <h3>
          <span><i class="fa fa-map-marker" aria-hidden="true"></i></span>
          <span>${restaurant.city}</span>
        </h3>
        <h3>
          <span><i class="fa fa-star" aria-hidden="true"></i></span>
          <span>${restaurant.rating}</span>
        </h3>
      </div>
    </div>
    <div class="restoDetail__content">
      <div class="restoDetail__wrapper">
        <figure>
          <img 
          src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}"
          alt="${restaurant.name}" 
          class="restoDetail__img lazyload"
          />
        </figure>
      </div>
      <div class="restoDetail__body">
        <ul class="restoDetail__categories">
          ${makeList(restaurant.categories)}
        </ul>
        <p class="restoDetail__description">${restaurant.description}</p>
        <div class="restoDetail__menus">
          <ul>
            <li>Foods:</li>
              <ul>
              ${makeList(restaurant.menus.foods)}
              </ul>
          </ul>
          <ul>
            <li>Drinks:</li>
              <ul>
              ${makeList(restaurant.menus.drinks)}
              </ul>
          </ul>
        </div>
      </div>
    </div>
    <div class="restoDetail__reviews">
      <h3 id="reviews__header">Customer Reviews:</h3>
      <form id="review__form" class="restoDetail__form">
        <input type="text" placeholder="Name" id="review__name">
        <textarea placeholder="Review" id="review__text"></textarea>
        <button type="submit" class="review__btnSubmit">Send Review</button>
      </form>
      <ul>
      ${restaurant.customerReviews.map((review) => (`
        <li class="restoDetail__reviews__item">
          <div>
            <i class="fa fa-user avatar" aria-hidden="true"></i>
          </div>
          <div>
            <h3> ${review.name}</h3>
            <p> ${review.review}</p>
            <time> ${review.date}</time>
          </div>
        </li>`)).join(' ')}
      </ul>
    </div>
  </article>
`;

const createFavoriteButtonTemplate = () => `
  <button aria-label="favorite this restaurant" id="favoriteButton" class="favorite">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnfavoriteButtonTemplate = () => `
  <button aria-label="unfavorite this restaurant" id="favoriteButton" class="favorite">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantList,
  createLoader,
  createRestaurantDetail,
  createFavoriteButtonTemplate,
  createUnfavoriteButtonTemplate,
  createSkeletonInterfaceCard,
};
