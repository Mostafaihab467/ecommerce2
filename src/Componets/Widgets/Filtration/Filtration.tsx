import React, { useState } from 'react';
import { Card, Form, ListGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../../store/Action/ProductAction'; // Update this import based on your action file
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

const Filtration = () => {
  const dispatch = useDispatch();
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
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
    <Card className={`sidebar d-none d-md-block ${isRTL ? 'rtl' : 'ltr'}`}> {/* Add Bootstrap classes for hiding */}
      <Card.Body className='sidebar-body'>
        <Card.Title>{t('filters.title')}</Card.Title>
        
        <ListGroup variant="flush">
          {/* Category */}
          <ListGroup.Item className="list-group-item-dark">
            <h5 className="sidebar-title">{t('filters.category')}</h5>
            <Form.Check className="sidebar-checkbox" type="checkbox" name="categories" value="Electronics" onChange={handleFilterChange} label={t('filters.categories.electronics')} />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="categories" value="Fashion" onChange={handleFilterChange} label={t('filters.categories.fashion')} />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="categories" value="Home" onChange={handleFilterChange} label={t('filters.categories.home')} />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="categories" value="Books" onChange={handleFilterChange} label={t('filters.categories.books')} />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="categories" value="Toys" onChange={handleFilterChange} label={t('filters.categories.toys')} />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="categories" value="Sports" onChange={handleFilterChange} label={t('filters.categories.sports')} />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="categories" value="Cloth" onChange={handleFilterChange} label={t('filters.categories.cloth')} />
          </ListGroup.Item>

          {/* Price Range */}
          <ListGroup.Item className="list-group-item-dark">
            <h5 className="sidebar-title">{t('filters.priceRange')}</h5>
            <Form.Check className="sidebar-radio" type="radio" name="priceRange" value="50" onChange={handleFilterChange} label={t('filters.priceRanges.under50')} />
            <Form.Check className="sidebar-radio" type="radio" name="priceRange" value="200" onChange={handleFilterChange} label={t('filters.priceRanges.50to200')} />
            <Form.Check className="sidebar-radio" type="radio" name="priceRange" value="500" onChange={handleFilterChange} label={t('filters.priceRanges.200to500')} />
            <Form.Check className="sidebar-radio" type="radio" name="priceRange" value="1000" onChange={handleFilterChange} label={t('filters.priceRanges.above500')} />
          </ListGroup.Item>

          {/* Brand */}
          <ListGroup.Item className="list-group-item-dark">
            <h5 className="sidebar-title">{t('filters.brand')}</h5>
            <Form.Check className="sidebar-checkbox" type="checkbox" name="brands" value="Samsung" onChange={handleFilterChange} label="Samsung" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="brands" value="Apple" onChange={handleFilterChange} label="Apple" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="brands" value="Sony" onChange={handleFilterChange} label="Sony" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="brands" value="Nike" onChange={handleFilterChange} label="Nike" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="brands" value="Adidas" onChange={handleFilterChange} label="Adidas" />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="brands" value="Puma" onChange={handleFilterChange} label="Puma" />
          </ListGroup.Item>

          {/* Rating */}
          <ListGroup.Item className="list-group-item-dark">
            <h5 className="sidebar-title">{t('filters.rating')}</h5>
            <Form.Check className="sidebar-checkbox" type="checkbox" name="ratings" value="4" onChange={handleFilterChange} label={t('filters.ratings.fourStars')} />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="ratings" value="3" onChange={handleFilterChange} label={t('filters.ratings.threeStars')} />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="ratings" value="2" onChange={handleFilterChange} label={t('filters.ratings.twoStars')} />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="ratings" value="1" onChange={handleFilterChange} label={t('filters.ratings.oneStar')} />
          </ListGroup.Item>

          {/* Availability */}
          <ListGroup.Item className="list-group-item-dark">
            <h5 className="sidebar-title">{t('filters.availability')}</h5>
            <Form.Check className="sidebar-checkbox" type="checkbox" name="availability" value="in-stock" onChange={handleFilterChange} label={t('filters.availabilityOptions.inStock')} />
            <Form.Check className="sidebar-checkbox" type="checkbox" name="availability" value="out-of-stock" onChange={handleFilterChange} label={t('filters.availabilityOptions.outOfStock')} />
          </ListGroup.Item>

          {/* Shipping Options */}
          <ListGroup.Item className="list-group-item-dark">
            <h5 className="sidebar-title">{t('filters.shippingOptions')}</h5>
            <Form.Check className="sidebar-checkbox" type="checkbox" id="free-shipping" label={t('filters.shippingOptionsList.freeShipping')} />
            <Form.Check className="sidebar-checkbox" type="checkbox" id="fast-shipping" label={t('filters.shippingOptionsList.fastShipping')} />
            <Form.Check className="sidebar-checkbox" type="checkbox" id="international" label={t('filters.shippingOptionsList.internationalShipping')} />
          </ListGroup.Item>
        </ListGroup>

        <Button variant="primary" className="apply-filters-btn" onClick={handleApplyFilters}>{t('filters.applyFilters')}</Button>
      </Card.Body>
    </Card>
  );
}

export default Filtration;
