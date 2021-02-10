export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_PASSWORD = 'ADD_PASSWORD';
export const addEmailAction = (email) => ({ type: ADD_EMAIL, email });
export const addPasswordAction = (password) => ({ type: ADD_PASSWORD, password });
