const initialState = {
  id: null,
  username: null,
  profilePicture: null
};

const SET_USER = "SET_USER";

export function setUser(id, username, profilePicture) {
  return {
    type: SET_USER,
    payload: { id, username, profilePicture }
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      // const { id, username, profilePicture } = payload;
      return payload;
    default:
      return state;
  }
}
