import apiClient from '../utils/api-client';

// 서버의 cart 장바구니에 제품과 수량을 추가
export function addToCartAPI(id, quantity) {
  return apiClient.post(`/cart/${id}`, { quantity });
}

// 벡엔드에서 카트정보 가져오기
export async function getCartAPI() {
  return await apiClient.get('/cart');
}

// 벡엔드에서 카트 상품 삭제
export function removeFromCartAPI(id) {
  return apiClient.patch(`/cart/remove/${id}`);
}
