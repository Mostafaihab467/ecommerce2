import React, { useState, useEffect } from "react";
import { Row, Col, Pagination } from "react-bootstrap";
import Product from "../../Componets/Widgets/Product/Product";
import { ProductModel } from "../../Models/ProductModel";
import { useSelector } from "react-redux";
import Carosal from "../../Componets/Widgets/Curosal/Carosal";
import "./HomeScreen.scss"; // Import the updated styles

function HomeScreen() {
  const products = useSelector(
    (state: any) => state.productRepo.product
  ) as ProductModel[];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {}, [products, currentPage]);

  // Determine the recommended products (e.g., first 5 products)
  const recommendedProducts = products.slice(0, 5);

  // Calculate the index of the last product to display
  const indexOfLastProduct = currentPage * itemsPerPage;
  // Calculate the index of the first product to display
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  // Get the products to display on the current page
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Pagination controls
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home-screen">
      <Carosal products={products} />
      {products && products.length > 0 ? (
        <>
          <h1 className="text">Latest Products</h1>
          <Row style={{ flex: "nowrap" }}>
            {currentProducts.map((product: ProductModel) => (
              <Col key={product._id} sm={2} md={5} lg={2} xl={3}>
                <Product item={product} />
              </Col>
            ))}
          </Row>
          {/* Pagination Controls */}
          <div className="pagination-container">
            <Pagination>
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
          {/* Recommended Products Section */}
          <div className="recommended-products">
            <h2>Recommended for You</h2>
            <Row style={{ flex: "nowrap" }}>
              {recommendedProducts.map((product: ProductModel) => (
                <Col key={product._id} sm={2} md={5} lg={2} xl={3}>
                  <Product item={product} variant="recommended" />
                </Col>
              ))}
            </Row>
          </div>
        </>
      ) : (
        <h2>No Products To Show</h2>
      )}
    </div>
  );
}

export default HomeScreen;
