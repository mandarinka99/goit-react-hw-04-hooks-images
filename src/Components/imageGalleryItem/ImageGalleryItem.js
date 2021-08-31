import { useState } from "react";
import s from "./ImageGalleryItem.module.css";
import img from "./images/loading-img.jpg";
import classNames from "classnames";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ toggleModal, webformatURL, tags, largeImageURL }) => {

  const [loaded, setLoaded] = useState(false);

  const openModal = () => toggleModal(largeImageURL);

  const handleImageLoaded = () => setLoaded(!loaded);

  const classes = classNames({
    [s.imageGalleryItemImageLoading]: true, 
    [s.active]: !loaded, 
 });

  return (
    <li className={s.imageGalleryItem}>
      <img src={img} alt="loading" className={classes} />
      <img
        src={webformatURL}
        onLoad={handleImageLoaded}
        alt={tags}
        className={s.imageGalleryItemImage}
        onClick={openModal}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  toggleModal: PropTypes.func,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
