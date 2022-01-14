import React, { useState } from 'react';
import { Col, Container, Dropdown, DropdownButton, FormControl, InputGroup, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from '../hooks/useForm';

export default function AddView(props) {
  const { handleShowAddView, categories, setCategories } = props;

  const [combo, setCombo] = useState();
  const [value, handleInputChange] = useForm({ name: '' });
  const { categoryName } = value;

  const handleChange = (categoryId) => {
    setCombo(categoryId);
  };

  const handleSave = () => {
    if (!combo) {
      const newCategory = [{ name: value.name, category_id: uuidv4(), level: 0 }];
      setCategories([...newCategory, ...categories]);
      handleShowAddView();
      return;
    }
    let idx = -1;
    let parentCategory;
    categories.forEach((category, index) => {
      if (category.category_id === combo) {
        parentCategory = category;
        idx = index;
      }
    });
    if (parentCategory.level > 5) {
      Swal.fire('Error', 'Is not possible to add a category with level greater than 5', 'error');
      handleShowAddView();
      return;
    }
    let newCategories = [...categories];
    newCategories.splice(idx + 1, 0, { name: value.name, category_id: uuidv4(), level: parentCategory.level + 1 });
    setCategories([...newCategories]);
    handleShowAddView();
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Add Category</h1>
          <div>
            <DropdownButton id='dropdown-basic-button' title={!combo ? 'Parent Category' : combo}>
              <Dropdown.Item value='' onClick={() => handleChange('')}>
                Root
              </Dropdown.Item>
              {categories.map((category) => (
                <Dropdown.Item
                  key={category.category_id}
                  value={category.category_id}
                  onClick={() => handleChange(category.category_id)}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
          <InputGroup className='mb-3'>
            <InputGroup.Text id='inputGroup-sizing-default'>Name</InputGroup.Text>
            <FormControl
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              name='name'
              id='name'
              onChange={handleInputChange}
              value={categoryName}
            />
          </InputGroup>

          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => handleShowAddView()}>Back</button>
            <button onClick={() => handleSave()}>Save</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
