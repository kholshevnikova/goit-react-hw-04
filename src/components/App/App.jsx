import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
// import ImageGallery from "../ImageGallery/ImageGallery";
// import { ColorRing } from "react-loader-spinner";
// import { getPhotos } from "../images-api";
// import { Toaster } from "react-hot-toast";
// import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
// import Modal from "react-modal";
// import ImageModal from "../ImageModal/ImageModal";

// export default function App() {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [page, setPage] = useState(1);
//   const [item, setItem] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [modalIsOpen, setIsOpen] = useState(false);

//   const customStyles = {
//     content: {
//       top: "50%",
//       left: "50%",
//       right: "auto",
//       bottom: "auto",
//       marginRight: "-50%",
//       transform: "translate(-50%, -50%)",
//     },
//   };

//   const handleSearch = (topic) => {
//     setImages([]);
//     setItem(topic);
//     setPage(1);
//   };

//   const handleLoadMore = () => {
//     // console.log("load more");
//     setPage((prevPage) => prevPage + 1);
//   };

//   useEffect(() => {
//     if (item === "") return;

//     async function getImages() {
//       try {
//         setLoading(true);
//         setError(false);
//         const data = await getPhotos(item, page);
//         setImages((prevImages) => [...prevImages, ...data.results]);
//       } catch (error) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getImages();
//   }, [page, item]);

//   const openModal = (image) => {
//     setSelectedImage(image);
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     setSelectedImage(null);
//   };

//   return (
//     <div>
//       <h1>Image Finder</h1>
//       <SearchBar onSearch={handleSearch} />
//       {error && (
//         <p>Whoops, something went wrong! Please try reloading this page!</p>
//       )}
//       {images.length > 0 && (
//         <ImageGallery items={images} onImageClick={openModal} />
//       )}
//       {loading && (
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <ColorRing />
//         </div>
//       )}
//       <Toaster />
//       {images.length > 0 && (
//         <LoadMoreBtn onClick={handleLoadMore}>Load More</LoadMoreBtn>
//       )}

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Image Modal"
//       >
//         {selectedImage && (
//           <ImageModal image={selectedImage} onRequestClose={closeModal} />
//         )}
//       </Modal>
//     </div>
//   );
// }

import ImageGallery from "../ImageGallery/ImageGallery";
import { ColorRing } from "react-loader-spinner";
import { getPhotos } from "../images-api";
import { Toaster } from "react-hot-toast";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Modal from "react-modal";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleSearch = (topic) => {
    setImages([]);
    setItem(topic);
    setPage(1);
  };

  const handleLoadMore = () => {
    // console.log("load more");
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (item === "") return;

    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        const data = await getPhotos(item, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalImages(data.total);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [page, item]);

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <h1>Image Finder</h1>
      <SearchBar onSearch={handleSearch} />
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {images.length > 0 && (
        <ImageGallery items={images} onImageClick={openModal} />
      )}
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ColorRing />
        </div>
      )}
      <Toaster />
      {images.length > 0 && images.length < totalImages && (
        <LoadMoreBtn onClick={handleLoadMore}>Load More</LoadMoreBtn>
      )}

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ImageModal onRequestClose={closeModal} />
      </Modal>
    </div>
  );
}
