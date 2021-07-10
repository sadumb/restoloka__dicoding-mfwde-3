import FavoriteButtonInitiator from '../src/scripts/utils/favorite-button-initiator';
import FavoriteResto from '../src/scripts/data/favoriteResto-idb';

describe('Favoriting a restaurant', () => {
  const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
  };

  beforeEach(() => {
    addFavoriteButtonContainer();
  });

  it('should show the favorite button when the restaurant has not been favorited before', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="favorite this restaurant"]')).toBeTruthy();
    const a = document.querySelector('[aria-label="favorite this restaurant"]');
  });

  it('should not show the favorite button when the restaurant has not been favorited before', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    expect(document.querySelector('[aria-label="unfavorite this restaurant"]'))
      .toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
    const restaurant = await FavoriteResto.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });

    FavoriteResto.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already favorited', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    // Tambahkan resto dengan ID 1 ke daftar restoran yang disukai
    await FavoriteResto.putRestaurant({ id: 1 });
    // Simulasikan pengguna menekan tombol favorit restoran
    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
    // tidak ada restoran yang ganda
    expect(await FavoriteResto.getAllRestaurants()).toEqual([{ id: 1 }]);

    FavoriteResto.deleteRestaurant(1);
  });

  // menggunakan metode xit, bukan it
  xit('should not favorite a restaurant when it has no id', async () => {
    await FavoriteButtonInitiator.init({
      favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
      restaurant: {},
    });

    document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });
});
