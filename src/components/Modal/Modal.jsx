import { Component } from "react"

import styles from "./modal.module.css"

class Modal extends Component {
    render() {
        return (
            <div className={styles.overlay} >
            <div className={styles.modal}>
                <img src="" alt="" />
            </div>
            </div>
        )            
    }
}

export default Modal;