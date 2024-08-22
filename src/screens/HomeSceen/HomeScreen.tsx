import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../../Componets/Widgets/Product/Product";
import { C_Product, ProductModel } from "../../Models/ProductModel";
import { useDispatch, useSelector } from "react-redux";
import Carosal from "../../Componets/Widgets/Curosal/Carosal";
import "./HomeScreen.scss"; // Import the updated styles
import ProductPagination from "../../Componets/Widgets/Pagination/Pagination";
import { SELECTED_PRODUCT } from "../../store/Action/ProductAction";

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SELECTED_PRODUCT(new C_Product("","","","","",0,0,0,0,"","",[],"")))
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

  if(currentProducts.length == 0){
    currentProducts = products.slice(-8);
  }
  return (
    <div className="home-screen">
      <Carosal products={products} />
      {products && products.length > 0 ? (
        <>
          <h1 className="text-center">Latest Products</h1>
          <Row>
            {currentProducts.map((product: ProductModel) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3} xl={3}>
                <Product item={product} />
              </Col>
            ))}
          </Row>
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
                  <Product item={products[0]} variant="recommended" />
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
