import apiClient from './api-client';

//axios의 헤더에 토큰을 미리 추가해서 모든 요청시 적용됨
const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete apiClient.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
