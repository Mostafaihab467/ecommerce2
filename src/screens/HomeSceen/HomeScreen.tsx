// src/screens/HomeSceen/HomeScreen.tsx
import React, { useState, useEffect } from "react";
import { Row, Col, Pagination } from "react-bootstrap";
import Product from "../../Componets/Widgets/Product/Product";
import { ProductModel } from "../../Models/ProductModel";
import { useDispatch, useSelector } from "react-redux";
import Carosal from "../../Componets/Widgets/Curosal/Carosal";
import "./HomeScreen.scss"; // Import the updated styles
import { HANDEL_PAGE_CHANGE, SET_CURRENT_PAGE } from "../../store/Action/ProductAction";

interface HomeScreenProps {
  onPageChange: (pageNumber: number) => void;
}

function HomeScreen({ onPageChange }: HomeScreenProps) {
  const products = useSelector((state: any) => state.productRepo.product) as ProductModel[];
  const { currentPage, itemsPerPage, totalPages ,oldCache} = useSelector((state: any) => state.productRepo.pagination);
  const [shuffledProducts, setShuffledProducts] = useState<ProductModel[]>([]);
  const { pageChange} = useSelector((state: any) => state.productRepo);

const dispatch = useDispatch()
 
  useEffect(() => {
    if (products.length > 0) { 
      // Shuffle the products array
      const shuffleArray = (array: ProductModel[]) => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
      };

      // Shuffle and set the products
      setShuffledProducts(shuffleArray([...products]));
    }
  }, [products]);

  // Calculate the index of the last product to display
  const indexOfLastProduct = pageChange * itemsPerPage;
  // Calculate the index of the first product to display
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  // Get the products to display on the current page
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

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
                  active={index + 1 === pageChange}
                  onClick={() => {
                    dispatch(HANDEL_PAGE_CHANGE(index + 1))
                  }}
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
              {products.length > 0 && (
               <Col key={products[0]._id} sm={2} md={5} lg={2} xl={3}>
               <Product item={products[0]} variant="recommended" />
             </Col>
           )}
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
