import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router"; // Import useRouter for navigation
import Link from "next/link";
import Image from "next/image";


const MyCar = () => {
  const router = useRouter(); // Initialize useRouter for navigation
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [engines, setEngines] = useState([]);
  const [ecus, setEcUs] = useState([]); // Store ECUs based on engine selection
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedGeneration, setSelectedGeneration] = useState(null);
  const [selectedEngine, setSelectedEngine] = useState(null);
  const [selectedEcu, setSelectedEcu] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null); // Store selected car details for navigation

  const [isLoading, setIsLoading] = useState(false);
  const isSelectionComplete =
    selectedCategory &&
    selectedBrand &&
    selectedModel &&
    selectedGeneration &&
    selectedEngine &&
    selectedEcu;

  // Fetch Categories
// Fetch Categories
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/vehicle/categories-activate"
      );
      const data = response.data;

      // Define the custom order for categories
      const customOrder = [
        "Autos", "LKW", "Transporter", "Pick-ups", "Wohnmobile", "Traktoren"
      ];

      // First, map the categories in the custom order if they exist in the fetched data
      const orderedCategories = customOrder
        .map(categoryName => 
          data.find(category => category.category_name === categoryName)
        )
        .filter(Boolean); // Filter out undefined if any categories are missing

      // Then, find any categories that weren't in the custom order
      const remainingCategories = data.filter(category => 
        !customOrder.includes(category.category_name)
      );

      // Concatenate both arrays: ordered categories first, followed by the remaining categories
      const finalCategories = [...orderedCategories, ...remainingCategories];

      setCategories(finalCategories); // Update state with the final ordered categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchCategories();
}, []);

  // Fetch Brands based on selected Category
  useEffect(() => {
    const fetchBrands = async () => {
      if (selectedCategory !== null) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            "http://127.0.0.1:8000/api/vehicle/brands-activate",
            {
              params: { category_id: selectedCategory },
            }
          );
      
          setBrands(response.data);
        } catch (error) {
          console.error("Error fetching brands:", error.response ? error.response.data : error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setBrands([]);
      }
    };

    fetchBrands();
  }, [selectedCategory]);

  // Fetch Models based on selected Brand
  useEffect(() => {
    const fetchModels = async () => {
      if (selectedBrand !== null) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            "http://127.0.0.1:8000/api/vehicle/models-activate",
            {
              params: { brand_id: selectedBrand },
            }
          );
          
          setModels(response.data);
        } catch (error) {
          console.error("Error fetching models:", error.response ? error.response.data : error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setModels([]);
      }
    };

    fetchModels();
  }, [selectedBrand]);

  // Fetch Generations based on selected Model
  useEffect(() => {
    const fetchGenerations = async () => {
      if (selectedModel !== null) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `http://127.0.0.1:8000/api/vehicle/generations-activate`,
            {
              params: { model_id: selectedModel },
            }
          );
       
          setGenerations(response.data);
        } catch (error) {
          console.error("Error fetching generations:", error.response ? error.response.data : error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setGenerations([]);
      }
    };

    fetchGenerations();
  }, [selectedModel]);

  // Fetch Engines based on selected Generation
  useEffect(() => {
    const fetchEngines = async () => {
      if (selectedGeneration !== null) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `http://127.0.0.1:8000/api/vehicle/engines-activate`,
            {
              params: { generation_id: selectedGeneration },
            }
          );
         
          setEngines(response.data);
        } catch (error) {
          console.error("Error fetching engines:", error.response ? error.response.data : error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setEngines([]);
      }
    };

    fetchEngines();
  }, [selectedGeneration]);

  // Fetch ECUs based on selected Engine
  useEffect(() => {
    const fetchEcUs = async () => {
      if (selectedEngine !== null) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            "http://127.0.0.1:8000/api/vehicle/ecus-activate", // Endpoint to fetch vehicles by engine ID
            {
              params: { engine_id: selectedEngine },
            }
          );
          const sortedEcUs = response.data; // Assume the response is already sorted
          setEcUs(sortedEcUs);
        } catch (error) {
          console.error("Error fetching ECUs:", error.response ? error.response.data : error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setEcUs([]); // Reset ECUs if no engine is selected
      }
    };

    fetchEcUs();
  }, [selectedEngine]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedModel(null); // Reset model selection
    setModels([]); // Clear models when brand changes
    setSelectedGeneration(null); // Reset generation selection
    setGenerations([]); // Clear generations when brand changes
    setSelectedEngine(null); // Reset engine selection
    setEngines([]); // Clear engines when brand changes
    setSelectedEcu(null); // Reset ECU selection
    setEcUs([]); // Clear ECUs when brand changes
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
    setSelectedGeneration(null); // Reset generation selection
    setGenerations([]); // Clear generations when model changes
    setSelectedEngine(null); // Reset engine selection
    setEngines([]); // Clear engines when model changes
    setSelectedEcu(null); // Reset ECU selection
    setEcUs([]); // Clear ECUs when model changes
  };

  const handleGenerationChange = (e) => {
    setSelectedGeneration(e.target.value);
  };

  const handleEngineChange = (e) => {
    setSelectedEngine(e.target.value);
  };

  const handleEcuChange = (e) => {
    const selectedEcuId = e.target.value;
    setSelectedEcu(selectedEcuId);
    // Find the selected car from the ECUs
    const selectedCar = ecus.find((ecu) => ecu.id.toString() === selectedEcuId); // Ensure comparison is done correctly
    setSelectedCar(selectedCar); // Store selected car details
    if (selectedCar) {
      localStorage.setItem("selectedVehicleName", selectedCar.full_name); // Save selected vehicle ID to localStorage
      console.log(selectedCar.id); // Log the selected vehicle ID directly
      console.log("Final localStorage contents:"); // Log header for clarity
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`${key}: ${value}`); // Log each item in localStorage
      }
    }
  };




  return (
    <section className="call-action section-padding sub-bg bg-img" style={{ backgroundImage: `url("/img/patrn.svg")`, marginTop: "-100px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-9">
            <div className="content sm-mb30">
              <h2 className="color-font">
                Konfigurator <br />
              </h2>
            </div>
          </div>
        </div>
   

<div className="row">
  {categories.map((category) => (
    <div key={category.id} className="col-sm-6 col-md-4 col-lg-2 valign mb-5 mt-5">
      <div className="d-flex flex-column align-items-center">
        <Image
          src={`/img/${category.category_name.toLowerCase().replace(" ", "-")}.png`}
          alt={`${category.category_name} Icon`}
          className="img-fluid"
          width={75} 
          height={75} 
        />
        <div
          className={`butn bord curve wow fadeInUp ${selectedCategory === category.id ? "selected" : ""}`}
          data-wow-delay=".5s"
          onClick={() => setSelectedCategory(category.id)}
        >
          <span>{category.category_name === "Traktoren" ? "Agrar" : category.category_name}</span>
        </div>
      </div>
    </div>
  ))}
</div>


        {/* Brand Selection */}
        <div className="row mt-40">
          <div className="col-lg-4 col-md-6 col-12 mb-3 position-relative">
            <select
              className="form-select border-radius-custom"
              value={selectedBrand || ""}
              onChange={handleBrandChange}
              disabled={!selectedCategory}
            >
              <option value="" disabled selected hidden>
                Marke ausw&auml;hlen
              </option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {/* Model Selection */}
          <div className="col-lg-4 col-md-6 col-12 mb-3 position-relative">
            <select
              className="form-select border-radius-custom"
              value={selectedModel || ""}
              onChange={handleModelChange}
              disabled={!selectedBrand}
            >
              <option value="" disabled selected hidden>
                Modell ausw&auml;hlen
              </option>
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          {/* Generation Selection */}
          <div className="col-lg-4 col-md-6 col-12 mb-3 position-relative">
            <select
              className="form-select border-radius-custom"
              value={selectedGeneration || ""}
              onChange={handleGenerationChange}
              disabled={!selectedModel}
            >
              <option value="" disabled selected hidden>
                Generation ausw&auml;hlen
              </option>
              {generations.map((generation) => (
                <option key={generation.id} value={generation.id}>
                  {generation.name}
                </option>
              ))}
            </select>
          </div>

          {/* Engine Selection */}
          <div className="col-lg-4 col-md-6 col-12 mb-3 position-relative">
            <select
              className="form-select border-radius-custom"
              value={selectedEngine || ""}
              onChange={handleEngineChange}
              disabled={!selectedGeneration}
            >
              <option value="" disabled selected hidden>
                Motor ausw&auml;hlen
              </option>
              {engines.map((engine) => (
                <option key={engine.id} value={engine.id}>
                  {engine.name}
                </option>
              ))}
            </select>
          </div>

          {/* ECU Selection */}
          <div className="col-lg-4 col-md-6 col-12 mb-3 position-relative">
            <select
              className="form-select border-radius-custom"
              value={selectedEcu || ""}
              onChange={handleEcuChange}
              disabled={!selectedEngine || ecus.length === 0}
            >
              <option value="" disabled selected hidden>
                ECU ausw&auml;hlen
              </option>
              {ecus.map((ecu) => (
                <option key={ecu.id} value={ecu.id}>
                  {ecu.ecu} {/* Assuming ECU object has full_name */}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Button to go to car details */}
        <div className="row">
          <div className="col-md-12 text-center">
          <Link legacyBehavior href={`/chiptuning/${selectedCar ? selectedCar.id : ''}`}>
              <a
                className={`butn dark ${!isSelectionComplete ? "disabled" : ""}`}
                style={{ pointerEvents: isSelectionComplete ? 'auto' : 'none' }} // Disable link if selection is incomplete
              >
                <span>Go to Car Details</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyCar;
