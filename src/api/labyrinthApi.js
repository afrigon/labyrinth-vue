import Vue from 'vue';

const host = 'https://labyrinth-api.herokuapp.com';

const signIn = signinData => {
  return Vue.axios.post(`${host}/api/users/signin`, signinData);
};

const getMaze = level => {
  return Vue.axios.get(`${host}/maze/${level}`);
};

const fetchCurrentUser = () => {
  return Vue.axios.get(`${host}/api/users/current`);
};

export default { signIn, fetchCurrentUser, getMaze };
