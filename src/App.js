import { useState, useReducer, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import AlbumsList from './components/AlbumsList/AlbumsList';
import ImagesList from './components/ImagesList/ImagesList';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc
} from "firebase/firestore";
import { db } from "./firebaseInit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [albums, dispatch] = useReducer(reducer, { titles: [] });
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newimageDetails, setNewimageDetails] = useState(null);

  function reducer(state, action) {
    const { payload } = action;
    switch (action.type) {
      case "ADD":        
        return { titles: [payload.data, ...state.titles] };
      case "GET":
        payload.setIsLoading(false);
        return { titles: payload.albums };
      case "DELETE":
        return { titles: state.titles.filter(title => title !== payload.data) };
      default:
        return state;
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "albums"), (snapshot) => {
      const albums = snapshot.docs.map((doc) => doc.id);
      dispatch({ type: "GET", payload: { albums, setIsLoading } });
    }, (error) => {
      console.error("Snapshot error:", error.message);
      toast.error("Failed to fetch albums: " + error.message);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addAlbum = async (data) => {
    if (!data || typeof data !== "string" || !data.trim()) {
      toast.error("Please enter a valid album name.");
      return;
    }
    if (albums.titles.includes(data)) {
      toast.error("Album already exists.");
      return;
    }
    try {
      console.log("Attempting to add album:", data); // Debug
      await setDoc(doc(db, "albums", data), { imagesInfo: [] });
      dispatch({ type: "ADD", payload: { data } });
      toast.success("Album created successfully!");
    } catch (error) {
      console.error("Add album error:", error.message, error.code);
      toast.error(`Failed to add album: ${error.message}`);
    }
  };

  const deleteAlbum = async (data) => {
    try {
      await deleteDoc(doc(db, "albums", data));
      dispatch({ type: "DELETE", payload: { data } });
      toast.success("Album deleted successfully!");
    } catch (error) {
      console.error("Delete album error:", error.message);
      toast.error("Failed to delete album: " + error.message);
    }
  };

  return (
    <div className='app'>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      {currentAlbum ? (
        <ImagesList
          currentAlbum={currentAlbum}
          setCurrentAlbum={setCurrentAlbum}
          newimageDetails={newimageDetails}
          setNewimageDetails={setNewimageDetails}
        />
      ) : (
        <AlbumsList
          setCurrentAlbum={setCurrentAlbum}
          albums={albums.titles}
          isLoading={isLoading}
          addAlbum={addAlbum}
          deleteAlbum={deleteAlbum}
        />
      )}
    </div>
  );
}

export default App;