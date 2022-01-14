import React, { useContext, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { Context } from '../App';
import AddView from './AddView';
import Category from './Category';

const grid = 8;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 400,
});

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  const previousItem = result[endIndex - 1];
  if (!previousItem) {
    removed.level = 1;
  } else {
    removed.level = previousItem.level + 1;
  }
  result.splice(endIndex, 0, removed);

  return result;
};

export default function CategoriesList() {
  const { categories, setCategories } = useContext(Context);
  const [editable, setEditable] = useState(false);
  const [showAddView, setShowAddView] = useState(false);

  const handleOnDragEnd = ({ source, destination }) => {
    if (!destination || (source.index === destination.index && source.droppableId === destination.droppableId)) {
      return;
    }
    setCategories(reorder(categories, source.index, destination.index));
  };

  const handleOnClickTrash = (category) => {
    setCategories(categories.filter((cat) => cat.category_id !== category.category_id));
  };
  const handleClickToEdit = () => {
    setEditable(!editable);
  };
  const handleSaveEdit = ({ category_id, name }) => {
    const cates = categories.map((cat) => {
      if (cat.category_id === category_id) {
        return { ...cat, name };
      }
      return cat;
    });
    setCategories(cates);
    setEditable(!editable);
  };

  const handleShowAddView = () => {
    setShowAddView(!showAddView);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column-reverse' }}>
      {showAddView && (
        <AddView handleShowAddView={handleShowAddView} categories={categories} setCategories={setCategories} />
      )}
      {!showAddView && (
        <>
          <button style={{ float: 'right', marginTop: '2em' }} onClick={() => handleShowAddView()}>
            <BsFillPlusSquareFill />
          </button>
          <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
            <Droppable droppableId='categories'>
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                  {categories.map((category, index) => (
                    <Draggable key={category.category_id} draggableId={category.category_id} index={index}>
                      {(draggableProvided, snapshot) => (
                        <Category
                          draggableProvided={draggableProvided}
                          snapshot={snapshot}
                          category={category}
                          handleOnClickTrash={handleOnClickTrash}
                          handleClickToEdit={handleClickToEdit}
                          editable={editable}
                          handleSaveEdit={handleSaveEdit}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
    </div>
  );
}
