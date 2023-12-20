import './ProductsList.css';
import ProductCard from './ProductCard';
import useData from '../../Hook/useData';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useSearchParams } from 'react-router-dom';

const ProductsList = () => {
  const [search, setSearch] = useSearchParams();
  const category = search.get('category');
  const page = search.get('page');
  const { data, error, isLoading } = useData('/products', { params: { category, page } }, [
    category,
    page,
  ]);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  // search 파라미터에서 page값만 업데이트
  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...search]);
    setSearch({ ...currentParams, page: page });
  };

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>상품목록</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">정렬방법</option>
          <option value="price desc">가격높은순</option>
          <option value="price asc">가격낮은순</option>
          <option value="rate desc">평점높은순</option>
          <option value="rate asc">평점낮은순</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
        {data.products &&
          data.products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              image={product.images[0]}
              price={product.price}
              title={product.title}
              rating={product.reviews.rate}
              ratingCounts={product.reviews.counts}
              stock={product.stock}
            />
          ))}
        <button onClick={() => handlePageChange(2)}>페이지2</button>
      </div>
    </section>
  );
};

export default ProductsList;
