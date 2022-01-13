import React from 'react';
import { BsTrash, BsPencil, BsList } from 'react-icons/bs';
import { useForm } from '../hooks/useForm';

const getItemStyle = (isDragging, draggableStyle, level, grid) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  paddingLeft: `${(level - 1) * 50 + 10}px`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

function Category(props) {
  const { draggableProvided, snapshot, category, handleOnClickTrash, handleClickToEdit, editable, handleSaveEdit } =
    props;

  const [value, handleInputChange] = useForm({ categoryName: category.name });
  const { categoryName } = value;

  return (
    <div
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      {...draggableProvided.dragHandleProps}
      style={getItemStyle(snapshot.isDragging, draggableProvided.draggableProps.style, category.level, 8)}
    >
      <BsList style={{ float: 'left' }} />
      {!editable && category.name}
      {editable && (
        <>
          <input name='categoryName' value={categoryName} onChange={handleInputChange} />{' '}
          <button onClick={() => handleSaveEdit({ name: categoryName, category_id: category.category_id })}>
            Save
          </button>
        </>
      )}
      <BsTrash style={{ float: 'right' }} onClick={() => handleOnClickTrash(category)} />
      <BsPencil style={{ float: 'right', marginRight: '15px' }} onClick={() => handleClickToEdit()} />
    </div>
  );
}

export default Category;
