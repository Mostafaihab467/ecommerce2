import React, { useState, ChangeEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ProductSpec } from '../../../Models/ProductModel';

// Define a type for the specification
interface Spec {
  key: string;
  value: string;
}

interface AddProductSpecsModalProps {
  show: boolean;
  handleClose: () => void;
  setFormData:(data:any)=>void
  formData:any
}

const AddProductSpecsModal: React.FC<AddProductSpecsModalProps> = ({ show, handleClose ,setFormData,formData}) => {
  const [specs, setSpecs] = useState<Spec[]>([{ key: '', value: '' }]);
  
  const handleChange = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...specs];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    setSpecs(newSpecs);
  };

  const handleAddInput = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const handleSubmit = () => {
    setFormData({...formData,'productsSecs':JSON.stringify(specs)})
    
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Product Specifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {specs.map((spec, index) => (
          <div key={index} className="mb-3">
            <Form.Group controlId={`formKey${index}`}>
              <Form.Label>Key</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter key"
                value={spec.key}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, 'key', e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId={`formValue${index}`}>
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter value"
                value={spec.value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, 'value', e.target.value)}
              />
            </Form.Group>
          </div>
        ))}
        <Button variant="secondary" onClick={handleAddInput}>
          Add Another
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductSpecsModal;
