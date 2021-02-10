import { ADD_EMAIL, ADD_PASSWORD } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL:
    return { ...state, email: action.email };
  case ADD_PASSWORD:
    return { ...state, password: action.password };
  default:
    return state;
  }
}
