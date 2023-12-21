import Navbar from './components/Nabvar/Navbar';
import Routing from './components/Routing/Routing';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { addToCartAPI, getCartAPI } from './services/cartServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from './contexts/UserContext';
import './App.css';

setAuthToken(localStorage.getItem('token'));

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    // findIndex는 모든 배열아이템과 비교해서 참이 있으면 그 인덱스번호를 리턴하고 없으면 -1
    const productIndex = updatedCart.findIndex((item) => item.product._id === product._id);
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }

    setCart(updatedCart);
    //벡엔드 서버에 저장하기
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success('상품 추가 성공!');
      })
      .catch((err) => {
        toast.error('상품 추가에 실패했습니다.');
      });
  };
  useEffect(() => {
    //시작시 로컬스토리지의 토큰정보를 읽어옴
    const jwt = localStorage.getItem('token');
    if (jwt == null || jwt == '') return;
    const jwtUser = jwtDecode(jwt);
    //현재 시간과 토큰종료 시간을 비교해서 만료된 토큰은 삭제한다.
    if (Date.now() >= jwtUser.exp * 1000) {
      localStorage.removeItem('token');
      location.reload();
    } else {
      setUser(jwtUser);
    }
  }, []);

  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data); //성공시 가져온 데이터를 스테이트에 저장
      })
      .catch((err) => {
        toast.error('카트 가져오기에 실패했습니다.');
      });
  };

  useEffect(() => {
    getCart(); //유저가 바뀌거나 시작시 카트정보를 가져옴
  }, [user]);
  return (
    <UserContext.Provider value={user}>
      <div className="app">
        <Navbar user={user} cartCount={cart.length} />
        <main>
          <ToastContainer position="bottom-right" />
          <Routing addToCart={addToCart} cart={cart} />
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;
