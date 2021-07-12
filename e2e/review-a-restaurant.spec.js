/* eslint-disable no-undef */
Feature('Review A Restaurant');

Scenario('Add Review for first restaurant in list', async ({ I }) => {
  const name = 'E2E Automation Test';
  const review = 'Hello! I am codecept E2E.';

  I.amOnPage('/');
  I.seeElement('.resto__item');
  I.click(locate('.resto__item a').first());

  I.seeElement('#review__form');
  I.fillField('#review__name', name);
  I.fillField('#review__text', review);
  I.click('.review__btnSubmit');
  I.see(name, locate('.restoDetail__reviews__item h3').last());
  I.see(review, locate('.restoDetail__reviews__item p').last());
});
