import apiClient from '../utils/api-client';

// 서버의 cart 장바구니에 제품과 수량을 추가
export function addToCartAPI(id, quantity) {
  return apiClient.post(`/cart/${id}`, { quantity });
}
