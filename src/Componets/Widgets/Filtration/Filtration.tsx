import React, { useState } from 'react';
import { Card, Form, ListGroup, Button } from 'react-bootstrap';
import './Filtration.scss';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../../store/Action/ProductAction'; // Update this import based on your action file

const Filtration = () => {
  const dispatch = useDispatch();
  const [filters, setFiltersState] = useState({
    categories: [],
    priceRange: '',
    brands: [],
    ratings: [],
    availability: []
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    let newFilters = { ...filters as any };

    if (type === 'checkbox') {
      if (checked) {
        newFilters[name] = [...newFilters[name], value];
      } else {
        newFilters[name] = newFilters[name].filter((item: string) => item !== value);
      }
    } else if (type === 'radio') {
      newFilters[name] = value;
    }

    setFiltersState(newFilters);
  };

  const handleApplyFilters = () => {
    dispatch(setFilters(filters));
  };

  return (
    <Card className="sidebar">
      <Card.Body className='sidebar-body'>
        <Card.Title>Filters</Card.Title>
        
        <ListGroup variant="flush">
          {/* Category */}
          <ListGroup.Item className="list-group-item-dark">
            <h5 className="sidebar-title">Category</h5>
            <Form.Check className="sidebar-checkbox" type="checkbox" name="categories" value="Electronics" onChange={handleFilterChange} label="Electronics" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="categories" value="Fashion" onChange={handleFilterChange} label="Fashion" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="categories" value="Home" onChange={handleFilterChange} label="Home" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="categories" value="Books" onChange={handleFilterChange} label="Books" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="categories" value="Toys" onChange={handleFilterChange} label="Toys" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="categories" value="Sports" onChange={handleFilterChange} label="Sports" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="categories" value="Cloth" onChange={handleFilterChange} label="Cloth" />
          </ListGroup.Item>

          {/* Price Range */}
          <ListGroup.Item className="list-group-item-dark">
            <h5 className="sidebar-title">Price Range</h5>
            <Form.Check className="sidebar-radio" type="radio" name="priceRange" value="50" onChange={handleFilterChange} label="Under $50" />
            <Form.Check className="sidebar-radio" type="radio" name="priceRange" value="200" onChange={handleFilterChange} label="$50 - $200" />
            <Form.Check className="sidebar-radio" type="radio" name="priceRange" value="500" onChange={handleFilterChange} label="$200 - $500" />
            <Form.Check className="sidebar-radio" type="radio" name="priceRange" value="1000" onChange={handleFilterChange} label="Above $500" />
          </ListGroup.Item>

          {/* Brand */}
          <ListGroup.Item className="list-group-item-dark">
            <h5 className="sidebar-title">Brand</h5>
            <Form.Check className="sidebar-checkbox" type="checkbox" name="brands" value="Samsung" onChange={handleFilterChange} label="Samsung" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="brands" value="Apple" onChange={handleFilterChange} label="Apple" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="brands" value="Sony" onChange={handleFilterChange} label="Sony" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="brands" value="Nike" onChange={handleFilterChange} label="Nike" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="brands" value="Adidas" onChange={handleFilterChange} label="Adidas" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="brands" value="Puma" onChange={handleFilterChange} label="Puma" />
          </ListGroup.Item>

          {/* Rating */}
          <ListGroup.Item className="list-group-item-dark">
            <h5 className="sidebar-title">Rating</h5>
            <Form.Check className="sidebar-checkbox" type="checkbox" name="ratings" value="4" onChange={handleFilterChange} label="4 Stars & Up" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="ratings" value="3" onChange={handleFilterChange} label="3 Stars & Up" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="ratings" value="2" onChange={handleFilterChange} label="2 Stars & Up" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="ratings" value="1" onChange={handleFilterChange} label="1 Star & Up" />
          </ListGroup.Item>

          {/* Availability */}
          <ListGroup.Item className="list-group-item-dark">
            <h5 className="sidebar-title">Availability</h5>
            <Form.Check className="sidebar-checkbox" type="checkbox" name="availability" value="in-stock" onChange={handleFilterChange} label="In Stock" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="availability" value="out-of-stock" onChange={handleFilterChange} label="Out of Stock" />
          </ListGroup.Item>

          {/* Shipping Options */}
          <ListGroup.Item className="list-group-item-dark">
            <h5 className="sidebar-title">Shipping Options</h5>
            <Form.Check className="sidebar-checkbox" type="checkbox" id="free-shipping" label="Free Shipping" />
            <Form.Check className="sidebar-checkbox" type="checkbox" id="fast-shipping" label="Fast Shipping" />
            <Form.Check className="sidebar-checkbox" type="checkbox" id="international" label="International Shipping" />
          </ListGroup.Item>
        </ListGroup>

        <Button variant="primary" className="apply-filters-btn" onClick={handleApplyFilters}>Apply Filters</Button>
      </Card.Body>
    </Card>
  );
}

export default Filtration;
