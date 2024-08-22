import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import "./ProductScreen.scss";
import { ProductModel } from "../../Models/ProductModel";
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
} from "../../store/Action/ProductAction";
import Spinner from "../../Componets/Widgets/Spinner/Spinner";
import { Add_toCart } from "../../store/Action/cartAction";
import { IUserModel } from "../../Models/userModel";
import  {resizeImage}  from "../../Componets/Utlity/ResizieImage";

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
  const { id } = useParams<{ id: string }>(); // Extract ID from params
  const [resizedImages, setResizedImages] = useState<string[]>([]);
  const [qty, setQty] = useState<number>(1); // Default to 1
  const dispatch = useDispatch();
  
  const selectedProduct = useSelector(
    (state: RootState) => state.productRepo.selectedProduct
  ) as ProductModel;

  useEffect(() => {
    const processImages = async () => {
      try {
        // Process the main image
        const resizedMainImage = await resizeImage(selectedProduct.image) as any;
        
        // Process additional images
        const resizedAdditionalImages = await Promise.all(
          selectedProduct.productimages.map(async (image) => await resizeImage(image))
        );
        
        // Set the resized images
        setResizedImages([resizedMainImage, ...resizedAdditionalImages]);
      } catch (error) {
        console.error('Error resizing image:', error);
      }
    };

    if (selectedProduct.image && selectedProduct.productimages.length > 0) {
      processImages();
    }
    dispatch(getProductByID(id));
  }, [dispatch, id, selectedProduct.image, selectedProduct.productimages]);

  const [formData, setFormData] = useState<{ image: File | null; removeBackground: boolean }>({
    image: null,
    removeBackground: false
  });

  const user = useSelector((state: RootState) => state.user.user) as IUserModel;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("_id", selectedProduct._id);
    formDataToSubmit.append("removeBackground", formData.removeBackground.toString());

    if (formData.image) {
      formDataToSubmit.append("image", formData.image);
      dispatch(AddProductImage(formDataToSubmit));
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <div>
      {selectedProduct._id === "" ? (
        <Spinner />
      ) : (
        <>
          <Link className="btn btn-light my-3" to="../">
            Go Back
          </Link>

          <Row>
            {/* Product Images Carousel */}
            <Col md={6}>
              <Carousel>
                {resizedImages.length > 0 && (
                  <Carousel.Item>
                    <Image
                      src={resizedImages[0]} // Main image
                      alt={selectedProduct.name}
                      fluid
                    />
                  </Carousel.Item>
                )}
                {resizedImages.slice(1).map((image, index) => (
                  <Carousel.Item key={index}>
                    <Image
                      src={image} // Additional images
                      alt={`${selectedProduct.name} ${index}`}
                      fluid
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>

            {/* Product Details */}
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{selectedProduct.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Ratings
                    rating={selectedProduct.rating}
                    numReviews={selectedProduct.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${selectedProduct.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {selectedProduct.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/* Purchase Options */}
            <Col md={3}>
              <Card>
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
                          style={{
                            color:
                              selectedProduct.countInStock > 0
                                ? "green"
                                : "red",
                          }}
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
                        <Col>Qty</Col>
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
                      className="btn-block"
                      type="button"
                      style={{ width: "100%" }}
                      onClick={() => cartHandler(selectedProduct)}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>

            {/* Admin Options */}
            {user._id === selectedProduct.user && ( 
              <Col xl={12}>
                <Card className="mt-4">
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
                            <label htmlFor="file-input" className="clickable-icon">
                              <i className="fas fa-plus add-icon"></i>
                            </label>
                            <Button variant="primary" type="submit" className="ms-2">
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
                            className="ms-2"
                          >
                            View Product Images
                          </Button>
                        </Col>
                        <Col xs="auto">
                          <Button
                            style={{ marginLeft: "20px" }}
                            variant="danger"
                            className="btn-sm action delete"
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
              </Col>
            )}
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
