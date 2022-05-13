import axios from 'axios'
import React, { Component, ChangeEvent } from 'react';
import Previewer from './preview'
import TUpload from './interfaces/TUpload'
axios({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });

const PERMITTED_FILE_EXTENSIONS_REGEX = /\.(jpg|jpeg|png|gif|raw){1}$/i;

type UploadContainerState = {
    uploads: Array<TUpload>
}

type FileEventTarget = EventTarget & { files: FileList };


// component type parameters: props and state types
export default class UploadContainer extends Component<{}, UploadContainerState>{
    state: UploadContainerState

    constructor(props: Object) {
        super(props)
        this.state = {
            uploads: new Array<TUpload>()
        }
    }

    /** 
     * TODO: Force re-rernder when same file set is uploaded 
    */
    public onFileChange(event: ChangeEvent<HTMLInputElement>):void {
        const validateExtensions = () => {
            // for(let i = 0; i < event.target.files.length; i++ ){
            //     if(PERMITTED_FILE_EXTENSIONS_REGEX.test(event.target.files[i].name) === false) {
            //         return false
            //     }
            // }
            return true
        }
        // Access the FileList of the Web API for input type file:
        // See https://developer.mozilla.org/en-US/docs/Web/API/FileList
        if(validateExtensions()) {
            this.setState({ uploads: this.generateFileUploads(event.target.files) })
        }
        else{
            event.target.value = null;
            event.target.files = null;
        } 
    }

    public onFileRemove(url: string):void {
        this.setState({
            uploads: this.state.uploads.filter(upload => upload.url !== url)
        })
    }

    private generateFileUploads(files: FileList): Array<TUpload> {
        let newUploads = new Array<TUpload>()
        for (let i = 0; i < files.length; i++) {
            let url = URL.createObjectURL(files[i])
            newUploads.push(
                {
                    file: files[i],
                    progress: 0,
                    url: url,
                    removeSelf: () => this.onFileRemove(url),
                }
            )
        }
        return newUploads;
    }

    private onFileUpload():void {
        // Create a new request to send each file to server
        for (let i = 0; i < this.state.uploads.length; i++) {
            let file = this.state.uploads[i].file;
            const formData = new FormData();
            formData.append(file.name, file, file.name);
            
            axios.post(
                "/api/upload", 
                formData,
                {   // Update the upload state for each file when progress has been made
                    onUploadProgress: (progressEvent) => 
                    {
                        let progressValue = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        this.setState((state) => {
                            state.uploads[i].progress = progressValue;
                            return state;
                        })
                    }
                }
            )
            .then(result => console.log(`accepted ${file.name}`, result))
            .catch(rejected => console.log(`rejected ${file.name}`, rejected));
        }
    }

    render(): React.ReactNode {
        return (
            <div>
                <div>
                    <input type="file" onChange={(event) => this.onFileChange(event)} multiple />
                    <button onClick={() => this.onFileUpload()}>
                        Upload
                    </button>
                </div>
                <div>
                    {<Previewer key={"previewer"} uploads={this.state.uploads}></Previewer>}
                </div>
            </div>
        )
    }
}