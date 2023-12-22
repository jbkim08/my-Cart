import apiClient from '../utils/api-client';

//체크아웃 요청
export function checkoutAPI() {
  return apiClient.post('/order/checkout');
}
