// Store/Reducers/

const initialState = { favoritesFilm : [] }

function toggleFavorite(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
      if (favoriteFilmIndex !== -1) {
        // si il est dans les favoris, on le supprime.
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter((item, index) => index !== favoriteFilmIndex)
        }
      }
      else {
        // si il est pas dans les favoris, on l'ajoute.
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value]
        }
      }
      return nextState || state // retourne nextState si il est pas undefined, ninon on renvoie state
    default:
    return state;
  }
}

export default toggleFavorite
