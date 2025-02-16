import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const AddCategoryAndBrand = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [engines, setEngines] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedGeneration, setSelectedGeneration] = useState(null);
  const [selectedEngine, setSelectedEngine] = useState(null);

  const [newCategory, setNewCategory] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newModel, setNewModel] = useState("");
  const [newGeneration, setNewGeneration] = useState("");
  const [newEngine, setNewEngine] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch categories on load
  useEffect(() => {
    fetchCategories();
  }, []);
  // UPload image

  // Handle the image upload when user selects a file
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Upload the image to Cloudinary
  const uploadImage = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "vtec-chiptuning"); // Use your preset name here

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dd7enl4lj/image/upload",
        formData
      );
      setImageUrl(res.data.secure_url); // Set the image URL after successful upload
      console.log("Uploaded Image URL:", res.data.secure_url); // Debugging the response
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/vehicle/categories"
      );
      setCategories(response.data);
    } catch (error) {
      alert("Error fetching categories");
    }
  };

  // Fetch brands based on selected category
  useEffect(() => {
    if (selectedCategory) {
      fetchBrands(selectedCategory);
    } else {
      setBrands([]);
    }
  }, [selectedCategory]);

  const fetchBrands = async (categoryId) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/vehicle/brands",
        {
          params: { category_id: categoryId },
        }
      );
      setBrands(response.data);
    } catch (error) {
      alert("Error fetching brands");
    }
  };

  // Fetch models based on selected brand
  useEffect(() => {
    if (selectedBrand) {
      fetchModels(selectedBrand);
    } else {
      setModels([]);
    }
  }, [selectedBrand]);

  const fetchModels = async (brandId) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/vehicle/models",
        {
          params: { brand_id: brandId },
        }
      );
      setModels(response.data);
    } catch (error) {
      alert("Error fetching models");
    }
  };

  // Fetch generations based on selected model
  useEffect(() => {
    if (selectedModel) {
      fetchGenerations(selectedModel);
    } else {
      setGenerations([]);
    }
  }, [selectedModel]);

  const fetchGenerations = async (modelId) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/vehicle/generations",
        {
          params: { model_id: modelId },
        }
      );
      setGenerations(response.data);
    } catch (error) {
      alert("Error fetching generations");
    }
  };

  // Fetch engines based on selected generation
  useEffect(() => {
    if (selectedGeneration) {
      fetchEngines(selectedGeneration);
    } else {
      setEngines([]);
    }
  }, [selectedGeneration]);

  const fetchEngines = async (generationId) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/vehicle/engines",
        {
          params: { generation_id: generationId },
        }
      );
      setEngines(response.data);
    } catch (error) {
      alert("Error fetching engines");
    }
  };

  // Toggle Active Status for Category
  // Toggle Active Status for Category
  // Toggle Active Status for Category
  const toggleActiveStatus = async (categoryId) => {
    try {
      // Send the request to toggle the active status
      const response = await axios.put(
        `http://127.0.0.1:8000/api/toggle-active/categories/${categoryId}`
      );

      // Get the updated data from the response
      const { updated_category, all_categories } = response.data;

      // Update the categories with the returned list
      setCategories(all_categories);

      // Display an alert in German
      const statusMessage = updated_category.is_active
        ? `Die Kategorie "${updated_category.category_name}" wurde aktiviert.`
        : `Die Kategorie "${updated_category.category_name}" wurde deaktiviert.`;
      alert(statusMessage);
    } catch (error) {
      console.error("Error toggling category status:", error);
      alert("Fehler beim Umschalten des Kategoriezustands.");
    }
  };

  // Toggle Active Status for Brand
  const toggleActiveStatusBrand = async (brandId) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/toggle-active/brands/${brandId}`
      );
      const { updated_brand } = response.data;

      // Update the brand in the state
      setBrands((prevBrands) =>
        prevBrands.map((brand) =>
          brand.id === updated_brand.id ? updated_brand : brand
        )
      );

      // Alert in German
      const statusMessage = updated_brand.is_active
        ? `Die Marke "${updated_brand.name}" wurde aktiviert.`
        : `Die Marke "${updated_brand.name}" wurde deaktiviert.`;
      alert(statusMessage);
    } catch (error) {
      console.error("Error toggling brand status:", error);
      alert("Fehler beim Umschalten des Markenstatus.");
    }
  };
  // Toggle Active Status for Model
  const toggleActiveStatusModel = async (modelId) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/toggle-active/models/${modelId}`
      );
      const { updated_model } = response.data;

      // Update the model in the state
      setModels((prevModels) =>
        prevModels.map((model) =>
          model.id === updated_model.id ? updated_model : model
        )
      );

      // Alert in German
      const statusMessage = updated_model.is_active
        ? `Das Modell "${updated_model.name}" wurde aktiviert.`
        : `Das Modell "${updated_model.name}" wurde deaktiviert.`;
      alert(statusMessage);
    } catch (error) {
      console.error("Error toggling model status:", error);
      alert("Fehler beim Umschalten des Modellzustands.");
    }
  };

  // Toggle Active Status for Generation
  const toggleActiveStatusGeneration = async (generationId) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/toggle-active/generations/${generationId}`
      );
      const { updated_generation } = response.data;

      // Update the generation in the state
      setGenerations((prevGenerations) =>
        prevGenerations.map((generation) =>
          generation.id === updated_generation.id
            ? updated_generation
            : generation
        )
      );

      // Alert in German
      const statusMessage = updated_generation.is_active
        ? `Die Generation "${updated_generation.name}" wurde aktiviert.`
        : `Die Generation "${updated_generation.name}" wurde deaktiviert.`;
      alert(statusMessage);
    } catch (error) {
      console.error("Error toggling generation status:", error);
      alert("Fehler beim Umschalten des Generationenzustands.");
    }
  };

  // Toggle Active Status for Engine
  const toggleActiveStatusEngine = async (engineId) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/toggle-active/engines/${engineId}`
      );
      const { updated_engine } = response.data;

      // Update the engine in the state
      setEngines((prevEngines) =>
        prevEngines.map((engine) =>
          engine.id === updated_engine.id ? updated_engine : engine
        )
      );

      // Alert in German
      const statusMessage = updated_engine.is_active
        ? `Der Motor "${updated_engine.name}" wurde aktiviert.`
        : `Der Motor "${updated_engine.name}" wurde deaktiviert.`;
      alert(statusMessage);
    } catch (error) {
      console.error("Error toggling engine status:", error);
      alert("Fehler beim Umschalten des Motorzustands.");
    }
  };

  // Add a new category
  // Add a new category
  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!newCategory) {
      alert("Please enter a category name");
      return;
    }

    if (!imageUrl) {
      alert("Please upload an image first");
      return;
    }

    try {
      // Send category data including image URL
      const response = await axios.post(
        "http://127.0.0.1:8000/api/vehicle/categories",
        {
          category_name: newCategory,
          category_image: imageUrl,
        }
      );

      // Update categories in the state
      setCategories([...categories, response.data]);

      // Clear the input fields and image
      setNewCategory("");
      setImageUrl("");
      alert("Category added successfully!");
    } catch (error) {
      alert("Error adding category");
    }
  };

  // Add a new brand
  const handleAddBrand = async (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      alert("Please select a category first");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/vehicle/brands",
        {
          brand_name: newBrand,
          category_id: selectedCategory,
        }
      );
      setBrands([...brands, response.data]);
      alert("Brand added successfully");
      setNewBrand("");
    } catch (error) {
      alert("Error adding brand");
    }
  };

  // Add a new model
  const handleAddModel = async (e) => {
    e.preventDefault();
    if (!selectedBrand) {
      alert("Please select a brand first");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/vehicle/models",
        {
          model_name: newModel,
          brand_id: selectedBrand,
        }
      );
      setModels([...models, response.data]);
      alert("Model added successfully");
      setNewModel("");
    } catch (error) {
      alert("Error adding model");
    }
  };

  // Add a new generation
  const handleAddGeneration = async (e) => {
    e.preventDefault();
    if (!selectedModel) {
      alert("Please select a model first");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/vehicle/generations",
        {
          generation_name: newGeneration,
          model_id: selectedModel,
        }
      );
      setGenerations([...generations, response.data]);
      alert("Generation added successfully");
      setNewGeneration("");
    } catch (error) {
      alert("Error adding generation");
    }
  };

  // Add a new engine
  const handleAddEngine = async (e) => {
    e.preventDefault();
    if (!selectedGeneration) {
      alert("Please select a generation first");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/vehicle/engines",
        {
          engine_name: newEngine,
          generation_id: selectedGeneration,
        }
      );
      setEngines([...engines, response.data]);
      alert("Engine added successfully");
      setNewEngine("");
    } catch (error) {
      alert("Error adding engine");
    }
  };

  return (
    <div className="container">
      <h2>Add New Category</h2>
      {/* Upload Image */}
      <div>
        <h3>Upload Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="form-control mb-2"
        />
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Category Preview"
            style={{ width: "100px", marginTop: "10px" }}
            width={75}
            height={75}
          />
        )}
      </div>

      {/* Upload Button */}
      <div>
        <button onClick={uploadImage} className="btn btn-primary">
          Upload Image
        </button>
      </div>
      {/* Add Category */}
      <div>
        <h3>Category</h3>
        <form onSubmit={handleAddCategory}>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category Name"
            className="form-control mb-2"
          />
          <button type="submit" className="btn btn-primary">
            Add Category
          </button>
        </form>
      </div>

      <hr />

      {/* Select Category */}
      <div>
        <h3>Select Category</h3>
        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="form-select mb-2"
        >
          <option >Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>

        {selectedCategory && (
          <button
            onClick={() => toggleActiveStatus(selectedCategory)} // Pass the category ID
            className={`btn ${
              categories.find(
                (category) => category.id === Number(selectedCategory)
              )?.is_active === 1
                ? "btn-danger"
                : "btn-success"
            }`}
          >
            {categories.find(
              (category) => category.id === Number(selectedCategory)
            )?.is_active === 1
              ? "Deactivate"
              : "Activate"}
          </button>
        )}
      </div>

      <hr />

      {/* Add Brand */}
      <div>
        <h3>Brand</h3>
        <form onSubmit={handleAddBrand}>
          <input
            type="text"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
            placeholder="New Brand Name"
            className="form-control mb-2"
          />
          <button type="submit" className="btn btn-primary">
            Add Brand
          </button>
        </form>
      </div>

      <hr />
      <div>
        <h3>Select Brand</h3>
        <select
          value={selectedBrand || ""}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="form-select mb-2"
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        {selectedBrand && (
          <button
            onClick={() => toggleActiveStatusBrand(selectedBrand)}
            className={`btn ${
              brands.find((brand) => brand.id === Number(selectedBrand))
                ?.is_active
                ? "btn-danger"
                : "btn-success"
            }`}
          >
            {brands.find((brand) => brand.id === Number(selectedBrand))
              ?.is_active
              ? "Deactivate"
              : "Activate"}
          </button>
        )}
      </div>

      <hr />

      {/* Add Model */}
      <div>
        <h3>Model</h3>
        <form onSubmit={handleAddModel}>
          <input
            type="text"
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
            placeholder="New Model Name"
            className="form-control mb-2"
          />
          <button type="submit" className="btn btn-primary">
            Add Model
          </button>
        </form>
      </div>

      <hr />

      {/* Select Model */}
      <div>
        <h3>Select Model</h3>
        <select
          value={selectedModel || ""}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="form-select mb-2"
        >
          <option value="">Select Model</option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
        {selectedModel && (
          <button
            onClick={() => toggleActiveStatusModel(selectedModel)}
            className={`btn ${
              models.find((model) => model.id === Number(selectedModel))
                ?.is_active === 1
                ? "btn-danger"
                : "btn-success"
            }`}
          >
            {models.find((model) => model.id === Number(selectedModel))
              ?.is_active === 1
              ? "Deactivate"
              : "Activate"}
          </button>
        )}
      </div>

      <hr />

      {/* Add Generation */}
      <div>
        <h3>Generation</h3>
        <form onSubmit={handleAddGeneration}>
          <input
            type="text"
            value={newGeneration}
            onChange={(e) => setNewGeneration(e.target.value)}
            placeholder="New Generation Name"
            className="form-control mb-2"
          />
          <button type="submit" className="btn btn-primary">
            Add Generation
          </button>
        </form>
      </div>

      <hr />

      {/* Select Generation */}
      <div>
        <h3>Select Generation</h3>
        <select
          value={selectedGeneration || ""}
          onChange={(e) => setSelectedGeneration(e.target.value)}
          className="form-select mb-2"
        >
          <option value="">Select Generation</option>
          {generations.map((generation) => (
            <option key={generation.id} value={generation.id}>
              {generation.name}
            </option>
          ))}
        </select>
        {selectedGeneration && (
          <button
            onClick={() => toggleActiveStatusGeneration(selectedGeneration)}
            className={`btn ${
              generations.find(
                (generation) => generation.id === Number(selectedGeneration)
              )?.is_active === 1
                ? "btn-danger"
                : "btn-success"
            }`}
          >
            {generations.find(
              (generation) => generation.id === Number(selectedGeneration)
            )?.is_active === 1
              ? "Deactivate"
              : "Activate"}
          </button>
        )}
      </div>

      <hr />

      {/* Add Engine */}
      <div>
        <h3>Engine</h3>
        <form onSubmit={handleAddEngine}>
          <input
            type="text"
            value={newEngine}
            onChange={(e) => setNewEngine(e.target.value)}
            placeholder="New Engine Name"
            className="form-control mb-2"
          />
          <button type="submit" className="btn btn-primary">
            Add Engine
          </button>
        </form>
      </div>

      <hr />

      {/* Select Engine */}
      {/* Select Engine */}
      <div>
        <h3>Select Engine</h3>
        <select
          value={selectedEngine || ""}
          onChange={(e) => setSelectedEngine(e.target.value)}
          className="form-select mb-2"
        >
          <option value="">Select Engine</option>
          {engines.map((engine) => (
            <option key={engine.id} value={engine.id}>
              {engine.name}
            </option>
          ))}
        </select>
        {selectedEngine && (
          <div className="mt-2">
            <button
              onClick={() => toggleActiveStatusEngine(selectedEngine)}
              className={`btn ${
                engines.find((engine) => engine.id === Number(selectedEngine))
                  ?.is_active === 1
                  ? "btn-danger"
                  : "btn-success"
              }`}
            >
              {engines.find((engine) => engine.id === Number(selectedEngine))
                ?.is_active === 1
                ? "Deactivate"
                : "Activate"}
            </button>
            <a
              href={`/admin/car/new-car/${selectedEngine}`}
              className="btn btn-primary ms-2"
            >
              Neues Auto erstellen
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCategoryAndBrand;
