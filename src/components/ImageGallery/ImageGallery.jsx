import { Component } from "react";

import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";

import Searchbar from "./Searchbar/Searchbar";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";

import { searchImages } from "api/images";

import styles from './image-gallery.module.css'

class ImageGallery extends Component { 
    state = {
        search: "",
        hits: [],
        loading: false,
        error: null,
        page: 1,
    }

    async componentDidUpdate(prevProps, prevState) {
        const { search, page } = this.state;
        if (search && (search !== prevState.search || page !== prevState.page)) {
            this.fetchImages();
        }
    }

    async fetchImages() {
        const { search, page } = this.state;
            try {
                this.setState({
                loading: true,
            })
                const { data } = await searchImages(search, page);

                this.setState(({hits}) => ({
                    hits: data.hits?.length ? [...hits, ...data.hits] : hits,
                }))
            }
            catch(error) {
                this.setState({
                    error: error.message,
                })
            }
            finally {
                this.setState({
                    loading: false,
                })
            }
    }

    handleSearch = ({ search }) => {
        this.setState({
            search,
            hits: [],
            page: 1,
        })
    }

    loadMore = () => {
        this.setState(({ page }) => ({ page: page + 1 }));
    }

    render() {
        const { handleSearch, loadMore} = this;
        const { hits, loading, error } = this.state;
        
        const isImages = Boolean(hits.length);
        
        return (
            <>
                <Searchbar onSubmit={handleSearch} />
                {error && <p>{error}</p>}
                {loading && <p>...Loading</p>}
                {isImages && (  <ul className={styles.imageGallery}>
                                    <ImageGalleryItem items={hits} />
                                </ul>)}
                {isImages && <div className={styles.loadMoreWrapper}>
                                <Button onClick={loadMore} type="button">Load more</Button>
                </div>}
                <Modal/>
            </>
            
        )
    }
}

export default ImageGallery;