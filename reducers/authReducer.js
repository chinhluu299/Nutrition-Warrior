const initialState = {
  accessToken: "",
  refreshToken: "",
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        user: action.payload.user,
      };
    case "REFRESH":
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    case "LOGIN":
      return {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        accessToken: "",
        refreshToken: "",
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
