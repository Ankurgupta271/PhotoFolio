import { useState } from "react";
import { db } from "../../firebaseInit";
import { collection, addDoc } from "firebase/firestore";

const AlbumForm = ({ onAlbumAdded, toggleForm }) => {
  const [albumName, setAlbumName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!albumName.trim()) return;

    try {
      const docRef = await addDoc(collection(db, "albums"), { name: albumName });
      onAlbumAdded({ id: docRef.id, name: albumName });
      setAlbumName("");
      toggleForm(); // Close the form after submission
    } catch (error) {
      console.error("Error adding album: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
        placeholder="Enter album name"
        required
      />
      <button type="submit">Add Album</button>
      <button type="button" onClick={toggleForm}>Cancel</button>
    </form>
  );
};

export default AlbumForm;
