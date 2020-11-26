// Store/Reducers/avatarReducer.js

const initialState = { avatar : require('../../Images/ic_tag_faces.png') }

function setAvatar(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'SET_AVATAR':

        nextState = {
          ...state,
          avatar: action.value
        }
      return nextState || state // retourne nextState si il est pas undefined, ninon on renvoie state
    default:
    return state;
  }
}

export default setAvatar
