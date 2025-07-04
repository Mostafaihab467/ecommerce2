import React, { useEffect, useState, ChangeEvent, FormEvent, useLayoutEffect } from "react";
import "./ProductScreen.scss";
import { C_Product, ProductModel } from "../../Models/ProductModel";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Carousel,
} from "react-bootstrap";
import Ratings from "../../Componets/Widgets/Ratings/Ratings";
import {
  AddProductImage,
  deleteProduct,
  getProductByID,
  SELECTED_PRODUCT,
} from "../../store/Action/ProductAction";
import Spinner from "../../Componets/Widgets/Spinner/Spinner";
import { Add_toCart } from "../../store/Action/cartAction";
import { IUserModel } from "../../Models/userModel";
import  {resizeImage}  from "../../Componets/Utlity/ResizieImage";
import ProductImagesModal from '../../Componets/Widgets/Modal/ProductImagesWidgetModal';

// Define the type for the component state
interface ProductScreenState {
  resizedImages: string[];
  qty: number;
  formData: {
    image: File | null;
    removeBackground: boolean;
  };
}

// Define the type for the product object from Redux store
interface RootState {
  productRepo: {
    selectedProduct: ProductModel;
  };
  user: {
    user: IUserModel;
  };
}

export const QTY = (countInStock: number): number[] => {
  let items = [];
  for (let i = 0; i < countInStock; i++) {
    items.push(i);
  }
  return items;
};

const ProductScreen: React.FC = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [resizedImages, setResizedImages] = useState<string[]>([]);
  const [qty, setQty] = useState(1); // Default to 1
  const [loading, setLoading] = useState(true); // Loading state
  const dispatch = useDispatch();
  
  const selectedProduct = useSelector(
    (state: any) => state.productRepo.selectedProduct
  ) as ProductModel;

  useEffect(() => {
    const processImages = async () => {
      try {
        setLoading(true); // Start loading

        // Process the main image
        const resizedMainImage = await resizeImage(selectedProduct.image);
        
        // Process additional images
        const resizedAdditionalImages = await Promise.all(
          selectedProduct.productimages.map(async (image) => await resizeImage(image))
        );
        
        // Set the resized images
        setResizedImages([resizedMainImage, ...resizedAdditionalImages]);
      } catch (error) {
        console.error('Error resizing image:', error);
      } finally {
        setLoading(false); // End loading
      }
    };
   
    // Only call processImages when product images are available
    if (selectedProduct.image ) {
      processImages();
    }
  }, [selectedProduct.image, selectedProduct.productimages]); // Dependencies here

  useEffect(() => {
   
    dispatch(getProductByID(id));
  }, [dispatch, id]);



  const [formData, setFormData] = useState({ image: null as File | null, removeBackground: false });
  const user = useSelector((state: any) => state.user.user) as IUserModel;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("_id", selectedProduct._id);
    formDataToSubmit.append("removeBackground", formData.removeBackground.toString());

    if (formData.image) {
      formDataToSubmit.append("image", formData.image);
     dispatch(AddProductImage(formDataToSubmit));
   
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      removeBackground: e.target.checked,
    });
  };

  

  const cartHandler = (prod: ProductModel) => {
    dispatch(Add_toCart(prod, qty));
    nav(`/cart/`);
  };

  return (
    <div className="product-screen">
      {selectedProduct._id === "" ? (
        <div className="loading-spinner">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="container">
            <Link className="back-button" to="../">
              <i className="fas fa-arrow-left"></i>
              Go Back 
            </Link>

            <div className="product-container">
              <Row>
                {/* Product Images Carousel */}
                <Col md={6} className="image-section">
                  {loading ? (
                    <div className="loading-spinner">
                      <Spinner />
                    </div>
                  ) : (
                    <Carousel>
                      {resizedImages.length > 0 && (
                        <Carousel.Item>
                          <Image
                            src={resizedImages[0]}
                            alt={selectedProduct.name}
                            fluid
                          />
                        </Carousel.Item>
                      )}
                      {resizedImages.slice(1).map((image, index) => (
                        <Carousel.Item key={index}>
                          <Image
                            src={image}
                            alt={`${selectedProduct.name} ${index}`}
                            fluid
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  )}
                </Col>

                {/* Product Details */}
                <Col md={3} className="product-details">
                  <h1 className="product-title">{selectedProduct.name}</h1>
                  
                  <div className="product-rating">
                    <Ratings
                      rating={selectedProduct.rating}
                      numReviews={selectedProduct.numReviews}
                    />
                  </div>
                  
                  <div className="product-price">
                    ${selectedProduct.price}
                  </div>
                  
                  <div className="product-description">
                    {selectedProduct.description}
                  </div>
                </Col>

                {/* Purchase Options */}
                <Col md={3} className="purchase-section">
                  <Card className="purchase-card">
                    <Card.Header>Purchase Options</Card.Header>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>${selectedProduct.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            <strong
                              className={
                                selectedProduct.countInStock > 0
                                  ? "status-in-stock"
                                  : "status-out-of-stock"
                              }
                            >
                              {selectedProduct.countInStock > 0
                                ? "In Stock"
                                : "Out of Stock"}
                            </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {selectedProduct.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Quantity:</Col>
                            <Col>
                              <Form.Control
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(parseInt(e.target.value))}
                              >
                                {QTY(selectedProduct.countInStock).map((e) => (
                                  <option key={e + 1} value={e + 1}>
                                    {e + 1}
                                  </option>
                                ))}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}
                      <ListGroup.Item>
                        <Button
                          disabled={selectedProduct.countInStock <= 0}
                          className="add-to-cart-btn"
                          type="button"
                          onClick={() => cartHandler(selectedProduct)}
                        >
                          <i className="fas fa-shopping-cart me-2"></i>
                          Add to Cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </div>

            {/* Admin Options */}
            {user._id === selectedProduct.user && (
              <div className="admin-section">
                <Card className="admin-card">
                  <Card.Header>Manage Product</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row className="align-items-center">
                        <Col xs="auto">
                          <Form onSubmit={handleSubmit} className="d-inline">
                            <Form.Control
                              type="file"
                              name="image"
                              accept="image/*"
                              onChange={handleFileChange}
                              id="file-input"
                              style={{ display: "none" }}
                            />
                            <label htmlFor="file-input" className="file-upload-label">
                              <i className="fas fa-plus"></i>
                              Add Image
                            </label>
                            <Button variant="primary" type="submit" className="admin-btn ms-2">
                              Upload
                            </Button>
                          </Form>
                        </Col>
                        <Col xs="auto">
                          <Form.Group controlId="formRemoveBackground">
                            <Form.Check
                              type="checkbox"
                              label="Remove Image Background"
                              name="removeBackground"
                              checked={formData.removeBackground}
                              onChange={handleCheckboxChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col xs="auto">
                          <Button
                            variant="primary"
                            onClick={() => nav(`/product-images/${selectedProduct._id}`)}
                            className="admin-btn ms-2"
                          >
                            <i className="fas fa-images me-2"></i>
                            View Images
                          </Button>
                        </Col>
                        <Col xs="auto">
                          <Button
                            variant="danger"
                            className="admin-btn danger"
                            onClick={() => {
                              dispatch(deleteProduct(selectedProduct._id));
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
