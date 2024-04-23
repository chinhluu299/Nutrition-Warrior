const initialState = {
  message: null,
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    case "CLEAR_MESSAGE":
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
}
