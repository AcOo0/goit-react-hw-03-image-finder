import styles from './image-gallery-item.module.css'

const ImageGalleryItem = ({ items }) => {
    const elements = items.map(({
            id,
            webformatURL,
            tags,
            }) => <li key={id} className={styles.imageGalleryItem}>
                <img className={styles.imageGalleryItemImage} src={webformatURL} alt={tags} loading="lazy" />
        </li>);
    return elements;
}

export default ImageGalleryItem;