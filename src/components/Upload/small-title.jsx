import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SmallTitleForm = ({ blogPostId }) => {
  const [smallTitles, setSmallTitles] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newParagraph, setNewParagraph] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingParagraph, setEditingParagraph] = useState('');

  // Fetch small titles on component mount
  useEffect(() => {
    const fetchSmallTitles = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/blog-posts/${blogPostId}/small-titles`);
        setSmallTitles(response.data);
      } catch (error) {
        console.error("Error fetching small titles:", error);
      }
    };

    fetchSmallTitles();
  }, [blogPostId]);

  // Handle input change for new title and paragraph
  const handleNewTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleNewParagraphChange = (e) => {
    setNewParagraph(e.target.value);
  };

  // Handle adding a new small title
  const handleAddTitle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/small-titles', {
        title: newTitle,
        paragraph: newParagraph,
        blog_post_id: blogPostId,
      });
      setSmallTitles([...smallTitles, response.data]);
      setNewTitle('');
      setNewParagraph('');
    } catch (error) {
      console.error("Error adding small title:", error);
    }
  };

  // Handle editing an item
  const handleEditItem = (item) => {
    setEditingItem(item.id);
    setEditingTitle(item.title);
    setEditingParagraph(item.paragraph);
  };

  // Handle updating an edited item
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/small-titles/${editingItem}`, {
        title: editingTitle,
        paragraph: editingParagraph,
      });
      setSmallTitles(smallTitles.map(item => item.id === editingItem ? response.data : item));
      setEditingItem(null);
      setEditingTitle('');
      setEditingParagraph('');
    } catch (error) {
      console.error("Error updating small title:", error);
    }
  };

  // Handle deleting an item
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/small-titles/${id}`);
      setSmallTitles(smallTitles.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting small title:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center">Small Titles</h3>
      <form onSubmit={handleAddTitle} className="mb-4">
        <div className="input-group mb-3">
          <input
            type="text"
            value={newTitle}
            onChange={handleNewTitleChange}
            required
            className="form-control"
            placeholder="Small Title"
          />
          <input
            type="text"
            value={newParagraph}
            onChange={handleNewParagraphChange}
            required
            className="form-control"
            placeholder="Paragraph"
          />
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>

      <ul className="list-group">
        {smallTitles.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingItem === item.id ? (
              <form onSubmit={handleUpdateItem} className="d-flex">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  required
                  className="form-control me-2"
                  placeholder="Edit Title"
                />
                <input
                  type="text"
                  value={editingParagraph}
                  onChange={(e) => setEditingParagraph(e.target.value)}
                  required
                  className="form-control me-2"
                  placeholder="Edit Paragraph"
                />
                <button type="submit" className="btn btn-success">Update</button>
              </form>
            ) : (
              <>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.paragraph}</p>
                </div>
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

export default SmallTitleForm;
