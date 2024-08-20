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

  return (
    <div className="ProductOverViewScreen">
      <div>
        <div className="create_prod">
          <Button variant="success">Create</Button>{" "}
        </div>
        <table>
          <thead>
            <tr>
              <th className="headerTh"><span>ID</span></th>
              <th className="headerTh"><span>Image</span></th>
              <th className="headerTh"><span>Price</span></th>
              <th className="headerTh"><span>Category</span></th>
              <th className="headerTh"><span>Brand</span></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((prod: ProductModel) => (
              <tr key={prod._id}>
                <td data-label="ID"><span>{prod._id}</span></td>
                <td data-label="Image"><img className="productImg" src={prod.image} alt={prod._id} /></td>
                <td data-label="Price"><span>${prod.price}</span></td>
                <td data-label="Category"><span>{prod.category}</span></td>
                <td data-label="Brand"><span>{prod.brand}</span></td>
                <td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ProductPagination />
    </div>
  );
}

export default ProductScreenOverView;
