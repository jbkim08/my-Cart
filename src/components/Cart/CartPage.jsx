import './CartPage.css';
import remove from '../../assets/remove.png';
import user from '../../assets/user.webp';
import Table from '../Common/Table';
import QuantityInput from '../SingleProduct/QuantityInput';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import CartContext from '../../contexts/CartContext';
import { checkoutAPI } from '../../services/orderServices';
import { toast } from 'react-toastify';

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0); //배송비 제외한 전체 합계
  const userObj = useContext(UserContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);
  const checkout = () => {
    const oldCart = [...cart];
    setCart([]); //장바구니 비우기 (모두 삭제)
    checkoutAPI()
      .then(() => {
        toast.success('주문 성공!');
      })
      .catch(() => {
        toast.error('체크아웃 중 에러발생!');
        setCart(oldCart); //복구
      });
  };
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setSubTotal(total);
  }, [cart]);
  return (
    <section className="align_center cart_page">
      <div className="align_center user_info">
        <img src={`http://localhost:5000/profile/${userObj?.profilePic}`} alt="user profile" />
        <div>
          <p className="user_name">{userObj?.name}</p>
          <p className="user_email">{userObj?.email}</p>
        </div>
      </div>

      <Table headings={['상품', '가격', '구매수량', '총 금액', '상품삭제']}>
        <tbody>
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.price.toLocaleString('ko-KR')} 원</td>
              <td className="align_center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={updateCart}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>{(quantity * product.price).toLocaleString('ko-KR')} 원</td>
              <td onClick={() => removeFromCart(product._id)}>
                <img src={remove} alt="remove icon" className="cart_remove_icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <table className="cart_bill">
        <tbody>
          <tr>
            <td>총 금액</td>
            <td>{subTotal.toLocaleString('ko-KR')} 원</td>
          </tr>
          <tr>
            <td>배송비</td>
            <td>3,000 원</td>
          </tr>
          <tr className="cart_bill_final">
            <td>결재금액</td>
            <td>{(subTotal + 3000).toLocaleString('ko-KR')} 원</td>
          </tr>
        </tbody>
      </table>

      <button onClick={checkout} className="search_button checkout_button">
        결재하기
      </button>
    </section>
  );
};

export default CartPage;
