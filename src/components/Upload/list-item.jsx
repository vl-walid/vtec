import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListItemForm = ({ blogPostId }) => {
  const [listItems, setListItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  // Fetch list items on component mount
  useEffect(() => {
    const fetchListItems = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/blog-posts/${blogPostId}/list-items`);
        setListItems(response.data);
      } catch (error) {
        console.error("Error fetching list items:", error);
      }
    };

    fetchListItems();
  }, [blogPostId]);

  // Handle input change for new item
  const handleNewItemChange = (e) => {
    setNewItem(e.target.value);
  };

  // Handle adding a new list item
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/list-items', {
        list_content: newItem,
        blog_post_id: blogPostId,
      });
      setListItems([...listItems, response.data]);
      setNewItem('');
    } catch (error) {
      console.error("Error adding list item:", error);
    }
  };

  // Handle editing an item
  const handleEditItem = (item) => {
    setEditingItem(item.id);
    setEditingContent(item.list_content);
  };

  // Handle updating an edited item
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/list-items/${editingItem}`, {
        list_content: editingContent,
      });
      setListItems(listItems.map(item => item.id === editingItem ? response.data : item));
      setEditingItem(null);
      setEditingContent('');
    } catch (error) {
      console.error("Error updating list item:", error);
    }
  };

  // Handle deleting an item
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/list-items/${id}`);
      setListItems(listItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting list item:", error);
    }
  };

  return (
    <div>
      <h3>List Items</h3>
      <form onSubmit={handleAddItem} className="mb-3">
        <input
          type="text"
          value={newItem}
          onChange={handleNewItemChange}
          required
          className="form-control"
          placeholder="Add new list item"
        />
        <button type="submit" className="btn btn-primary mt-2">Add Item</button>
      </form>

      <ul className="list-group">
        {listItems.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingItem === item.id ? (
              <form onSubmit={handleUpdateItem} className="d-flex">
                <input
                  type="text"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  required
                  className="form-control me-2"
                />
                <button type="submit" className="btn btn-success">Update</button>
              </form>
            ) : (
              <>
                <span>{item.list_content}</span>
                <div>
                  <button className="btn btn-warning me-2" onClick={() => handleEditItem(item)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDeleteItem(item.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListItemForm;
