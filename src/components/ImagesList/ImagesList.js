import { useState, useEffect } from "react";
import { db } from "../../firebaseInit";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import "./ImagesList.css";

const ImagesList = ({ currentAlbum, setCurrentAlbum, newimageDetails, setNewimageDetails }) => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "albums", currentAlbum, "images"),
      (snapshot) => {
        const imageData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImages(imageData);
        setLoading(false);
      },
      (error) => {
        console.error("Fetch images error:", error.message);
        toast.error("Failed to load images: " + error.message);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [currentAlbum]);

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      toast.error("Please enter a title and URL.");
      return;
    }
    const imageData = { title, url, createdAt: new Date().toISOString() };
    try {
      const docRef = await addDoc(collection(db, "albums", currentAlbum, "images"), imageData);
      const newImage = { id: docRef.id, ...imageData };
      setNewimageDetails(newImage); // Update parent state
      setTitle("");
      setUrl("");
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Add image error:", error.message, error.code);
      toast.error(`Failed to upload image: ${error.message}`);
    }
  };

  return (
    <div className="images-list">
      <button onClick={() => setCurrentAlbum(null)} className="back-btn">
        Back to Albums
      </button>
      <h2>{currentAlbum}</h2>
      <form onSubmit={handleAddImage} className="image-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Image Title"
        />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Image URL"
        />
        <button type="submit">Upload Image</button>
      </form>
      {loading ? (
        <p>Loading images...</p>
      ) : images.length === 0 ? (
        <p>No images in this album.</p>
      ) : (
        <div className="image-grid">
          {images.map((image) => (
            <div key={image.id} className="image-item">
              <img src={image.url} alt={image.title} />
              <p>{image.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagesList;