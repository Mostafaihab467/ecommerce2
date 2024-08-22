// src/pages/ProductImagesModal.tsx
import React from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProductModel } from "../../../Models/ProductModel";
import './ProductImagesWidgetModal.scss'
import { deleteProductImage } from "../../../store/Action/ProductAction";
function ProductImagesModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const selectedProduct = useSelector(
    (state: any) => state.productRepo.selectedProduct
  ) as ProductModel;

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };
  


 
  const handleDelete =  (image: string) => {
    // Add your delete logic here
    console.log("Deleting image:", image);
    const payload = {
        image:image,
        productId: selectedProduct._id,
    }

    dispatch(deleteProductImage(payload))
  };
  return (
    <Modal  show onHide={handleClose} size="lg" centered>
      <Modal.Header className="ProductImagesWidgetModal" closeButton>
        <Modal.Title>
            <span>

            Product Images
            </span>
            </Modal.Title>
      </Modal.Header>
      <Modal.Body className="ProductImagesWidgetModal">
        <Row>
          <Col md={12} className="mb-3">
            <div style={{cursor:'pointer'}}  className="image-container">
              <img
                className="img-fluid" 
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />
              <i style={{cursor:'pointer'}}  className="fas fa-trash delete-icon" onClick={() => handleDelete(selectedProduct.image)}></i>
            </div>
          </Col>
          {selectedProduct.productimages.map((img, index) => (
            <Col md={4} key={index} className="mb-3">
              <div className="image-container">
                <img
                  className="img-fluid"
                  src={img}
                  alt={`Product image ${index + 1}`}
                />
                <i  style={{cursor:'pointer'}} className="fas fa-trash delete-icon" onClick={() => handleDelete(img)}></i>
              </div>
            </Col>
          ))}
        </Row>
      </Modal.Body>
      <Modal.Footer className="ProductImagesWidgetModal">
        <Button className="botton" variant="secondary" onClick={handleClose}>
         <span>
             Close
            </span>
        </Button>
      </Modal.Footer>
    </Modal>
  );

}

export default ProductImagesModal;
