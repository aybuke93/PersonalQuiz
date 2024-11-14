import React, { useContext } from "react";

import {UserContext} from "./UserContext";

export default function Results({ element, artwork }) {
  // reference the context for the "name".
  const {name}=useContext(UserContext)

  return (
    <div>
      <p>
        <strong>{name}</strong>, your element is: {element}
      </p>
      {artwork ? (
        <div className="artwork">
          <h2>{element} Image</h2>
          <img 
            src={artwork.urls?.regular} 
            alt={artwork.alt_description || "No description available"} 
            style={{ width: '500px', height: 'auto' }} 
          />
          <p>Photo by {artwork.user?.name || "Unknown Artist"}</p>
        </div>
      ) : (
        <p>No artwork found.</p>
      )}
    </div>
  );
}