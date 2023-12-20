import './ProductsSidebar.css';
import rocket from '../../assets/rocket.png';
import LinkWithIcon from '../Nabvar/LinkWithIcon';
import { useEffect, useState } from 'react';
import apiClient from '../../utils/api-client';

const ProductsSidebar = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient
      .get('/category')
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err.message));
  }, []);
  return (
    <aside className="products_sidebar">
      <h2>카테고리</h2>

      {error && <em className="form_error">{error}</em>}
      {categories.map((category) => (
        <LinkWithIcon
          key={category._id}
          title={category.name}
          link={`products?category=${category.name}`}
          emoji={`http://localhost:5000/category/${category.image}`}
          sidebar={true}
        />
      ))}
    </aside>
  );
};

export default ProductsSidebar;
