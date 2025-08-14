interface State {
  result: any;
}

interface Action {
  type: string;
  payload: any;
}

const initialState: State = {
  result: {},
};

const userReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'USER_PROFILE':
       return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userReducer;