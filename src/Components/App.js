import React, { useState, useEffect } from "react";
import Modal from "./modal/Modal";
import SearchBar from "./searchBar/SearchBar";
import ImageGallery from "./imageGallery/ImageGallery";
import Button from "./button/Button";
import Spiner from "./spiner/Spiner";
import Container from "./container/Container";
import API from "../action/API"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [search, setSearch] = useState(null);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (search === null) {
      return
    } 

    async function fetchData() {
      setIsLoading(true);

      const data = await API.requestImages(search, page);

      if (data.hits.length === 0) {
        toast.warn("No results for your query");
        return;
      }

      setIsLoading(false)
      setImages((prev) => [...prev, ...data.hits])

      if (page > 1) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }}
      fetchData();
  }, [page, search])

  const loadMore = () => setPage(page + 1);

  const handleSubmit = (query) => {
    setSearch(query);
    setPage(1)
  }
  const toggleModal = (pageURL) => {
    setShowModal(!showModal);
    setImageUrl(pageURL);
  };

  return (
    <>
        <SearchBar handleSubmit={handleSubmit} />
        <Container>
          <ImageGallery images={images} toggleModal={toggleModal} />
          {showModal && (
            <Modal
              onClose={toggleModal}
              pageURL={imageUrl}
              alt={search}
            ></Modal>
          )}
          {isLoading && <Spiner />}
          {images.length > 0 && <Button loadMore={loadMore} />}
          <ToastContainer autoClose={3000} />
        </Container>
      </>
  );
}

export default App;


