import React, { useState } from "react";
import Navigation from "../common/navigation/Navigation";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPetDetails from "../../api/pet/fetchPetDetails";
import "../detail/Detail.css";

function Detail() {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPetDetails);
  const [mainImage, setMainImage] = useState(null);

  if (results.isError) {
    return <h1>Something went wrong</h1>;
  }

  if (results.isLoading) {
    return <h1>Loading data...</h1>;
  }

  const pet = results.data;
 
  if (!pet) {
    return <h1>No pet found</h1>;
  }
  if (!mainImage && pet.images.length > 0) {
    setMainImage(pet.images[0]);
  }

  return (
    <div>
      <Navigation />
      <div className="image-container">
        <div className="card">
          <div className="info">
            <h1>{pet.name}</h1>
            <h2>
              {pet.animal} - {pet.breed} - {pet.city} {pet.state}
            </h2>
            <h3>{pet.description}</h3>
          </div>
          <div className="btn-group">
            <button className="btn-adopt">Adopt {pet.name}</button>
            <button className="btn-donate">Donate</button>
          </div>
        </div>
        <img className="image" src={mainImage} alt={pet.name} />
        <div className="image-carousel">
          {pet.images.map((petImage, index) => (
            <button
              key={index}
              className="image-button"
              onClick={() => setMainImage(petImage)}
            >
              <img className="image" src={petImage} alt={pet.name} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Detail;
