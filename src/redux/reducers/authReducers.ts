interface State {
  result: boolean;
}

interface Action {
  type: string;
  payload: any;
}

const initialState = {
  result: false,
};

const authReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'AUTH_SET_AUTHENTICATED':
      return { ...state, ...action.payload };
    case 'AUTH_GET_USER':
      return { ...state, ...action.payload };

    case 'AUTH_CEHCK_AUTHENTICATED':
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default authReducer;
