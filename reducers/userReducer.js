const initialState = {
  id: "",
  name: "",
  phone_number: "",
  email: "",
  address: "",
  password: "",
  profile_picture: "",
  gender: "",
  date_of_birth: "",
  daily_logs: [],
  goal: "",
  first_login: true,
  caloric_intake_goal: "0",
  daily_protein_goal: "0",
  daily_carb_goal: "0",
  daily_fat_goal: "0",
  tdee: "0",
  height: "0",
  current_weight: "0",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_USER_DAILY_LOG":
      return {
        ...state,
        user: {
          ...state.user,
          daily_logs: action.payload.dailyLogs,
        },
      };
    case "UPDATE_USER":
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        phone_number: action.payload.phone_number,
        email: action.payload.email,
        address: action.payload.address,
        password: action.payload.password,
        profile_picture: action.payload.profile_picture,
        gender: action.payload.gender,
        date_of_birth: action.payload.date_of_birth,
        daily_logs: action.payload.daily_logs,
        caloric_intake_goal: action.payload.caloric_intake_goal + "",
        daily_protein_goal: action.payload.daily_protein_goal + "",
        daily_carb_goal: action.payload.daily_carb_goal + "",
        daily_fat_goal: action.payload.daily_fat_goal + "",
        goal: action.payload.goal,
        tdee: action.payload.tdee + "",
        height: action.payload.height + "",
        current_weight: action.payload.current_weight + "",
        first_login: action.payload.first_login,
        current_weight: action.payload.current_weight,
        caloric_remain: action.payload.caloric_remain,
        protein_remain: action.payload.protein_remain,
        carb_remain: action.payload.carb_remain,
        fat_remain: action.payload.fat_remain,
      };
    case "UPDATE_USER_MACRO":
      return {
        ...state,
        caloric_intake_goal: action.payload.caloric_intake_goal,
        daily_protein_goal: action.payload.daily_protein_goal,
        daily_carb_goal: action.payload.daily_carb_goal,
        daily_fat_goal: action.payload.daily_fat_goal,
        goal: action.payload.goal,
        tdee: action.payload.tdee,
        first_login: action.payload.first_login,
      };
    case "CLEAR_USER":
      return {
        id: "",
        name: "",
        phone_number: "",
        email: "",
        address: "",
        password: "",
        profile_picture: "",
        gender: "",
        date_of_birth: "",
        daily_logs: [],
        goal: "",
        first_login: "",
        caloric_intake_goal: "0",
        daily_protein_goal: "0",
        daily_carb_goal: "0",
        daily_fat_goal: "0",
        tdee: "0",
        height: "0",
        current_weight: "0",
        caloric_remain: "0",
        protein_remain: "0",
        carb_remain: "0",
        fat_remain: "0",
      };
    default:
      return state;
  }
}
