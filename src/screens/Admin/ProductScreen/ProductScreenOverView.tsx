import { stat } from "fs";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ProductModel } from "../../../Models/ProductModel";
import { deleteProduct } from "../../../store/Action/ProductAction";
import "./ProductScreenOverView.scss";
import ProductPagination from "../../../Componets/Widgets/Pagination/Pagination";

interface Props {
  setmode: any;
  setProduct: any;
}

function ProductScreenOverView({ setmode, setProduct }: Props) {
  const products = useSelector(
    (state: any) => state.productRepo.product
  ) as ProductModel[];
  const { itemsPerPage, totalPages } = useSelector(
    (state: any) => state.productRepo.pagination
  );
  const dispatch = useDispatch();

  const { pageChange } = useSelector((state: any) => state.productRepo);
// Calculate the index of the last product to display
const indexOfLastProduct = pageChange * itemsPerPage;
// Calculate the index of the first product to display
const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
// Get the products to display on the current page
const currentProducts = products.slice(
  indexOfFirstProduct,
  indexOfLastProduct
);


  const myProd = () => {};
  return (
    <div className="ProductOverViewScreen">
      <div>
        <div className="create_prod">
          <Button variant="success">Create</Button>{" "}
        </div>
        <table className="">
          <tr>
            <th className="headerTh">
              <span>ID</span>
            </th>
            <th className="headerTh">
              <span>Image</span>
            </th>
            <th className="headerTh">
              <span>Price</span>
            </th>
            <th className="headerTh">
              <span>Category</span>
            </th>
            <th className="headerTh">
              <span>Brand</span>
            </th>
            <th></th>
          </tr>

          {currentProducts.map((prod: ProductModel) => {
            return (
              <tr>
                <th>
                  <span>{prod._id}</span>
                </th>
                <th>
                  <img className="productImg" src={prod.image} />
                </th>
                <th>
                  <span>${prod.price}</span>
                </th>
                <th>
                   <span> {prod.category}</span> 
                     </th>
                <th>
                <span> 
                    {prod.brand}
                    </span> 
                </th>
                <th>
                  <div className="usersAction_div">
                    <Button
                      variant="light"
                      className="btn-sm action edit"
                      onClick={() => {
                        setmode("EditProduct");
                        setProduct(prod);
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-sm action delete"
                      onClick={() => {
                        dispatch(deleteProduct(prod._id));
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </th>
              </tr>
            );
          })}
        </table>
      </div>
      <ProductPagination/>
    </div>
  );
}

export default ProductScreenOverView;
