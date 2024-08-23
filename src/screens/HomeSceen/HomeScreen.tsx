import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../../Componets/Widgets/Product/Product";
import { C_Product, ProductModel } from "../../Models/ProductModel";
import { useDispatch, useSelector } from "react-redux";
import Carosal from "../../Componets/Widgets/Curosal/Carosal";
import "./HomeScreen.scss"; // Import the updated styles
import ProductPagination from "../../Componets/Widgets/Pagination/Pagination";
import { SELECTED_PRODUCT } from "../../store/Action/ProductAction";
import { FaTh, FaList } from 'react-icons/fa';
interface HomeScreenProps {
  onPageChange: (pageNumber: number) => void;
}

function HomeScreen({ onPageChange }: HomeScreenProps) {
  const products = useSelector(
    (state: any) => state.productRepo.product
  ) as ProductModel[];
  const { itemsPerPage, totalPages } = useSelector(
    (state: any) => state.productRepo.pagination
  );

  const { pageChange } = useSelector((state: any) => state.productRepo);
  const [view, setView] = useState('grid');  // Default view is grid
  // Adjust as needed
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SELECTED_PRODUCT(new C_Product("", "", "", "", "", 0, 0, 0, 0, "", "", [], "")))
    if (products.length > 0) {
      // Shuffle the products array
      const shuffleArray = (array: ProductModel[]) => {
        let currentIndex = array.length,
          randomIndex;
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ];
        }
        return array;
      };

      // Shuffle and set the products

    }
  }, [products]);

  // Calculate the index of the last product to display
  const indexOfLastProduct = pageChange * itemsPerPage;
  // Calculate the index of the first product to display
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  // Get the products to display on the current page
  var currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  ).sort();

  if (currentProducts.length == 0) {
    currentProducts = products.slice(-8);
  }
  return (
    <div className="home-screen">
      {/* View Switcher */}
      <div className="view-switcher">
        <button
          className={`view-switcher-button ${view === 'grid' ? 'active' : ''}`}
          onClick={() => setView('grid')}
        >
          <FaTh />
        </button>
        <button
          className={`view-switcher-button ${view === 'list' ? 'active' : ''}`}
          onClick={() => setView('list')}
        >
          <FaList />
        </button>
      </div>

      <Carosal products={products} />
      {products && products.length > 0 ? (
        <>
          <h1 className="text-center">Latest Products</h1>
          {view === 'list' ?
            <Row>
              {currentProducts.map((product) => (
                <Col
                  key={product._id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={3}
                  className={`product-col ${view === 'list' ? 'list-view' : 'grid-view'}`}
                >
                  <Product grid={view} item={product} />

                </Col>
              ))}
            </Row>
            : <Col xl={4}>

              {currentProducts.map((product) => (
                <Product grid={view}  item={product} />
              ))}
            </Col>}
          {/* Pagination Controls */}
          <div className="pagination-container">
            <ProductPagination />
          </div>
          {/* Recommended Products Section */}
          <div className="recommended-products mt-4">
            <h2 className="text-center">Recommended for You</h2>
            <Row>
              {products.length > 0 && (
                <Col key={products[0]._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Product grid={view} item={products[0]} variant="recommended" />
                </Col>
              )}
            </Row>
          </div>
        </>
      ) : (
        <h2 className="text-center">No Products To Show</h2>
      )}
    </div>
  );
}

export default HomeScreen;
