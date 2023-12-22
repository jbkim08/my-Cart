import { useContext, useState } from 'react';
import QuantityInput from './QuantityInput';
import './SingleProductPage.css';
import { useParams } from 'react-router-dom';
import useData from '../../Hook/useData';
import Loader from '../Common/Loader';
import CartContext from '../../contexts/CartContext';
import UserContext from '../../contexts/UserContext';

const SingleProductPage = () => {
  // 처음 시작 이미지 번호는 0 => productImage1
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const user = useContext(UserContext);
  const { id } = useParams();
  const { data: product, error, isLoading } = useData(`/products/${id}`);
  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <Loader />}
      {product._id && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/products/${image}`}
                  alt={product.title}
                  className={selectedImage === index ? 'selected_image' : ''}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
            {/* 오른쪽 큰 이미지  */}
            <img
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt={product.title}
              className="single_product_display"
            />
          </div>

          <div className="single_product_details">
            <h1 className="single_product_title">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">￦ {product.price.toLocaleString('ko-KR')} 원</p>

            {user && (
              <>
                <h2 className="quantity_title">구매개수:</h2>
                <div className="align_center quantity_input">
                  <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    stock={product.stock}
                  />
                </div>

                <button
                  onClick={() => addToCart(product, quantity)}
                  className="search_button add_cart"
                >
                  장바구니 추가
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
