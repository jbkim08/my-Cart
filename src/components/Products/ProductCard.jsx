import './ProductCard.css';
import star from '../../assets/white-star.png';
import basket from '../../assets/basket.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import CartContext from '../../contexts/CartContext';
import UserContext from '../../contexts/UserContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  return (
    <article className="product_card">
      <div className="product_image">
        <Link to={`/product/${product?._id}`}>
          <img src={`http://localhost:5000/products/${product?.images[0]}`} alt="product image" />
        </Link>
      </div>

      <div className="product_details">
        <h3 className="product_price">{product?.price.toLocaleString('ko-KR')} 원</h3>
        <p className="product_title">{product?.title}</p>

        <footer className="align_center product_info_footer">
          <div className="align_center">
            <p className="align_center product_rating">
              <img src={star} alt="star" /> {product?.reviews.rate}
            </p>
            <p className="product_review_count">{product?.reviews.counts}</p>
          </div>
          {/* 로그인유저이며 스톡에 제품이 있을경우에만 장바구니 담기 표시 */}
          {user && product?.stock > 0 && (
            <button onClick={() => addToCart(product, 1)} className="add_to_cart">
              <img src={basket} alt="basket button" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
