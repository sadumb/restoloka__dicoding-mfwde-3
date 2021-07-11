import FavoriteResto from '../src/scripts/data/favoriteResto-idb';
import * as TestFactories from './helpers/testFactories';

describe('Favoriting a restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show the favorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="favorite this restaurant"]')).toBeTruthy();
    const a = document.querySelector('[aria-label="favorite this restaurant"]');
  });

  it('should not show the favorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="unfavorite this restaurant"]'))
      .toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteResto.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    FavoriteResto.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already favorited', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

    // Tambahkan resto dengan ID 1 ke daftar restoran yang disukai
    await FavoriteResto.putRestaurant({ id: 1 });
    // Simulasikan pengguna menekan tombol favorit restoran
    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
    // tidak ada restoran yang ganda
    expect(await FavoriteResto.getAllRestaurants()).toEqual([{ id: 1 }]);

    FavoriteResto.deleteRestaurant(1);
  });

  // menggunakan metode xit, bukan it
  it('should not favorite a restaurant when it has no id', async () => {
    await TestFactories.createFavoriteButtonPresenterWithRestaurant({});

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    expect(await FavoriteResto.getAllRestaurants()).toEqual([]);
  });
});
