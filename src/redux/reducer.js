const initialState = {
  username: null,
  profilePicture: null
};

const SET_USER = "SET_USER";

export function setUser(username, profilePicture) {
  return {
    type: SET_USER,
    payload: { username, profilePicture }
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return payload;
    default:
      return state;
  }
}
