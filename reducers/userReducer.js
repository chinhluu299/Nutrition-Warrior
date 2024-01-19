const initialState = {
  name: "",
  phone_number: "",
  email: "",
  address: "",
  password: "",
  profile_picture: "",
  gender: "",
  date_of_birth: "",
  daily_logs: [],
  caloric_intake_goal: 0,
  daily_protein_goal: 0,
  daily_carb_goal: 0,
  daily_fat_goal: 0,
  goal: "",
  tdee: 0,
  height: 0,
  current_weight: 0,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        name: action.payload.name,
        phone_number: action.payload.phone_number,
        email: action.payload.email,
        address: action.payload.address,
        password: action.payload.password,
        profile_picture: action.payload.profile_picture,
        gender: action.payload.gender,
        date_of_birth: action.payload.date_of_birth,
        daily_logs: action.payload.daily_logs,
        caloric_intake_goal: action.payload.caloric_intake_goal,
        daily_protein_goal: action.payload.daily_protein_goal,
        daily_carb_goal: action.payload.daily_carb_goal,
        daily_fat_goal: action.payload.daily_fat_goal,
        goal: action.payload.goal,
        tdee: action.payload.tdee,
        height: action.payload.height,
        current_weight: action.payload.current_weight,
      };
    default:
      return state;
  }
}
