export const initialState = {
  bg: true,
  user: -1,
  token: null,
  id: null,
  showModal: false,
  showLogoutMessage: false,
  jobIdModal: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_BG":
      return {
        ...state,
        bg: action.bg,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN_AND_ID":
      return {
        ...state,
        token: action.token,
        id: action.id,
      };
    case "SHOW_MODAL":
      return {
        ...state,
        showModal: !state.showModal,
      };
    case "SET_LOGOUT_MESSAGE":
      return {
        ...state,
        showLogoutMessage: false,
      };
    case "JOB_ID_MODAL":
      return {
        ...state,
        jobIdModal: action.jobId,
      };
    case "RESET_STATE":
      return {
        bg: true,
        user: -1,
        token: null,
        id: null,
        showModal: false,
        showLogoutMessage: true,
        jobIdModal: null,
      };
    default:
      return state;
  }
};

export default reducer;
