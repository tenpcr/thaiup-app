
  interface State {
    result: string
  }

  interface Action {
    type: string,
    payload: any
  }

  const initialState = {
    result: 'en',
  };
  
  const appReducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
      case 'LANGUAGE':
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  
  export default appReducer;