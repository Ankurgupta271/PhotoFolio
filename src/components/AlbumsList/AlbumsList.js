import React, { useState } from "react";
import { toast } from "react-toastify";
import "./AlbumsList.css";

const AlbumsList = ({ albums, setCurrentAlbum, isLoading, addAlbum, deleteAlbum }) => {
  const [newAlbumName, setNewAlbumName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newAlbumName.trim()) {
      toast.error("Please enter an album name.");
      return;
    }
    addAlbum(newAlbumName);
    setNewAlbumName("");
  };

  return (
    <div className="albums-list">
      <form onSubmit={handleAdd} className="album-form">
        <input
          type="text"
          value={newAlbumName}
          onChange={(e) => setNewAlbumName(e.target.value)}
          placeholder="New Album Name"
        />
        <button type="submit">Add Album</button>
      </form>
      {isLoading ? (
        <p>Loading albums...</p>
      ) : albums.length === 0 ? (
        <p>No albums available.</p>
      ) : (
        <ul>
          {albums.map((album) => (
            <li key={album}>
              <span onClick={() => setCurrentAlbum(album)}>{album}</span>
              <button onClick={() => deleteAlbum(album)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlbumsList;