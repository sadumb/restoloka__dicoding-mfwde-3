const assert = require('assert');

Feature('Favoriting a restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('showing empty favorited restaurant', async ({ I }) => {
  I.see('Oops, no restaurant added yet.', '#no-favorite');

  I.amOnPage('/');

  I.seeElement('.resto__item a');

  const firstRestaurant= locate('.resto__item a').first();
  const firstRestaurantNameDOM = locate('.resto__item > a > .resto__content > .resto__info > .resto__name').first();
  const firstRestaurantName= await I.grabTextFrom(firstRestaurantNameDOM);
  I.click(firstRestaurant);
 
  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');
 
  I.amOnPage('/#/favorites');
  I.seeElement('.resto__item');
  const likedRestaurantName = await I.grabTextFrom('.resto__item > a > .resto__content > .resto__info > .resto__name');
  
  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});
