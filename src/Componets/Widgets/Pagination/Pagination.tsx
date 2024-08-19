import React from "react";
import { Row, Col, Pagination } from "react-bootstrap";
import { HANDEL_PAGE_CHANGE } from "../../../store/Action/ProductAction";
import { useDispatch, useSelector } from "react-redux";

function ProductPagination() {
  const dispatch = useDispatch();
  const { pageChange } = useSelector((state: any) => state.productRepo);
  const { itemsPerPage, totalPages } = useSelector(
    (state: any) => state.productRepo.pagination
  );

  return (
    <Pagination>
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === pageChange}
          onClick={() => {
            dispatch(HANDEL_PAGE_CHANGE(index + 1));
          }}
        >
          {index + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
}

export default ProductPagination;
