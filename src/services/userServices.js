import apiClient from '../utils/api-client';

export async function signup(user, profile) {
  //이미지도 함께 폼데이터 객체에 담아서 서버로 제출
  const body = new FormData();
  body.append('name', user.name);
  body.append('email', user.email);
  body.append('password', user.password);
  body.append('deliveryAddress', user.deliveryAddress);
  body.append('profilePic', profile);

  const { data } = await apiClient.post('/user/signup', body);
  localStorage.setItem('token', data.token);
}

export async function login(user) {
  const { data } = await apiClient.post('/user/login', user);
  localStorage.setItem('token', data.token);
}
