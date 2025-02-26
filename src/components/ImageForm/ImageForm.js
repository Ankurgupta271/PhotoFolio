import { useState } from "react";
import { db, storage } from "../../firebaseInit";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ImageForm = ({ albumId, onImageAdded }) => {
  const [imageTitle, setImageTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageTitle.trim() || !imageFile) return;
    try {
      const imageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      const docRef = await addDoc(collection(db, "images"), { 
        title: imageTitle, 
        url: imageUrl, 
        albumId 
      });
      onImageAdded({ id: docRef.id, title: imageTitle, url: imageUrl });
      setImageTitle("");
      setImageFile(null);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={imageTitle}
        onChange={(e) => setImageTitle(e.target.value)}
        placeholder="Enter image title"
        required
      />
      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
        required
      />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default ImageForm;
