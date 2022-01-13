import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm';

export default function AddView(props) {
  const { handleShowAddView, categories, setCategories } = props;

  const [combo, setCombo] = useState('');
  const [value, handleInputChange] = useForm({ name: '' });
  const { categoryName } = value;

  const handleChange = (event) => {
    setCombo(event.target.value);
  };

  const handleSave = () => {
    if (!combo) {
      const newCategory = [{ name: value.name, category_id: '123', level: 0 }];
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
    newCategories.splice(idx + 1, 0, { name: value.name, category_id: '123', level: parentCategory.level + 1 });
    setCategories([...newCategories]);
    handleShowAddView();
  };

  return (
    <div>
      <h1>Add Category</h1>
      <div>
        <label htmlFor='categories' style={{ marginRight: '5px' }}>
          Padre
        </label>
        <select id='categories' value={combo} onChange={handleChange}>
          <option value=''>root</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor='name' style={{ marginRight: '5px' }}>
          name
        </label>
        <input name='name' id='name' onChange={handleInputChange} value={categoryName} />
      </div>
      <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => handleShowAddView()}>Back</button>
        <button onClick={() => handleSave()}>Save</button>
      </div>
    </div>
  );
}
