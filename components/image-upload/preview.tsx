import styles from './preview.module.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TUpload from './interfaces/TUpload'

// Declare types for props and state
export default class Previewer extends Component<{ uploads: Array<TUpload> }, {}> {

    renderUploads(): Array<React.ReactNode> {
        return this.props.uploads.map(e => {
            return (<div key={`container-${e.url}`} className={styles.imagePreviewContainer}>
                        <button name={e.url} className={styles.uploadCancel} onClick={(mouseEvent) => e.removeSelf(mouseEvent)}>x</button>
                        <img className={styles.uploadContent} src={e.url} />
                        <progress className={`${styles.uploadContent} ${styles.uploadProgressBar}`} value={e.progress} max="100" />
                    </div>
                    )
                }
        )
    }

    render(): React.ReactNode {
        return (
            <div className={styles.uploadPreviewContainer}>
                {this.renderUploads()}
            </div>
        )
    }
}