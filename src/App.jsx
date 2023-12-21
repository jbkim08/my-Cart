import Navbar from './components/Nabvar/Navbar';
import Routing from './components/Routing/Routing';
import './App.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const addToCart = (product, quantity) => {
    setCart([...cart, { product, quantity }]);
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
  return (
    <div className="app">
      <Navbar user={user} cartCount={cart.length} />
      <main>
        <Routing addToCart={addToCart} />
      </main>
    </div>
  );
}

export default App;
