import './ProductsSidebar.css';
import LinkWithIcon from '../Nabvar/LinkWithIcon';
import useData from '../../Hook/useData';

const ProductsSidebar = () => {
  const { data: categories, error } = useData('category');
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
