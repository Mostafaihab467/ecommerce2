// src/pages/ProductImagesModal.tsx
import React from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import './AddProductSpecsModal.scss'

import { ProductModel } from "../../../../Models/ProductModel";
import { deleteProductImage } from "../../../../store/Action/ProductAction";
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
    <Modal show onHide={handleClose} size="xl" centered className="ProductImagesWidgetModal">
      <Modal.Header closeButton>
        <Modal.Title>
          <span>Product Images Gallery</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedProduct.image || selectedProduct.productimages.length > 0 ? (
          <div className="image-grid">
            {/* Main Image */}
            {selectedProduct.image && (
              <div className="image-container main-image">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  style={{ objectFit: 'contain', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <div className="overlay-icon">📸</div>
                    <div className="overlay-text">Main Image</div>
                  </div>
                </div>
                <div className="delete-icon" onClick={() => handleDelete(selectedProduct.image)}></div>
              </div>
            )}
            
            {/* Additional Images */}
            {selectedProduct.productimages.map((img: any, index: any) => (
              <div key={index} className="image-container">
                <img
                  src={img}
                  alt={`Product image ${index + 1}`}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <div className="overlay-icon">🖼️</div>
                    <div className="overlay-text">Image {index + 1}</div>
                  </div>
                </div>
                <div className="delete-icon" onClick={() => handleDelete(img)}></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📷</div>
            <div className="empty-text">No product images available</div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button className="botton" onClick={handleClose}>
          <span>Close Gallery</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );

}

export default ProductImagesModal;