import React, { useState } from 'react';
import { Form, Button, Container, Image, Alert, FormLabel } from 'react-bootstrap';
import './AddProductScreen.scss';
import { useDispatch } from 'react-redux';
import { userAddProduct } from '../../store/Action/ProductAction';

const AddProductForm: React.FC = () => {
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        user: '',
        name: '',
        image: null as File | null,
        category: '',
        brand: '',
        description: '',
        rating: '',
        price: '',
        countInStock: '',
        removeBackground: false, // New state for remove background checkbox
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData({
            ...formData,
            image: file,
        });

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        } else {
            setImagePreview(null);
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            removeBackground: e.target.checked,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('user', formData.user);
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('category', formData.category);
        formDataToSubmit.append('brand', formData.brand);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('rating', formData.rating);
        formDataToSubmit.append('price', formData.price);
        formDataToSubmit.append('countInStock', formData.countInStock);
        formDataToSubmit.append('removeBackground', formData.removeBackground.toString());

        if (formData.image) {
            formDataToSubmit.append('image', formData.image);
        }

        console.log('FormData contents:');
        formDataToSubmit.forEach((value, key) => {
            console.log(key, value);
        });

        dispatch(userAddProduct(formDataToSubmit));
    };

    return (
        <Container className="add-product-form">
            <h2>Add Product</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUser">
                    <Form.Label>User Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="user"
                        value={formData.user}
                        onChange={handleChange}
                        placeholder="Enter user email"
                    />
                </Form.Group>

                <Form.Group controlId="formName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter product name"
                    />
                </Form.Group>

                <Form.Group controlId="formImage">
                    <Form.Label>Product Image</Form.Label>
                    <div className="image-upload-container">
                        <Form.Control
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {imagePreview && (
                            <Image src={imagePreview} alt="Preview" thumbnail className="image-preview" />
                        )}
                    </div>
                </Form.Group>

                <Form.Group controlId="formRemoveBackground">
                    <Form.Check
                        type="checkbox"
                        label="Remove Background"
                        name="removeBackground"
                        checked={formData.removeBackground}
                        onChange={handleCheckboxChange}
                        />
                          {!formData.removeBackground && (
                        <Alert variant="primary" className="mt-2">
                           Do you want to remove Image BackGround
                        </Alert>
                          )}
                    {formData.removeBackground && (
                        <Alert variant="danger" className="mt-2">
                            Warning: Removing the background may corrupt the image.
                        </Alert>
                    )}
                </Form.Group>

                <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Enter category"
                    />
                </Form.Group>

                <Form.Group controlId="formBrand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Enter brand"
                    />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter product description"
                    />
                </Form.Group>

                <Form.Group controlId="formRating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder="Enter rating"
                        min="0"
                        max="5"
                    />
                </Form.Group>

                <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                    />
                </Form.Group>

                <Form.Group controlId="formCountInStock">
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                        type="number"
                        name="countInStock"
                        value={formData.countInStock}
                        onChange={handleChange}
                        placeholder="Enter count in stock"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Product
                </Button>
            </Form>
        </Container>
    );
};

export default AddProductForm;
