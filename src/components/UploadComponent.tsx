import { useState, useEffect } from "react";
import { HttpClient } from "../services/HttpClient";
import Ifile from "../types/Ifile";


export const UploadComponent = () => {
    const [currentFile, setCurrentFile] = useState<File>();
    const [progress, setProgress] = useState<number>();
    const [message, setMessage] = useState<string>("");
    const [fileInfos, setFileInfos] = useState<Array<Ifile>>([]);

    const selectFile  = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setCurrentFile(selectedFiles?.[0]);
        setProgress(0);
    }

    const upload = () => {
        setProgress(0);
        if (!currentFile) return;

        HttpClient.upload(currentFile, (event: any) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        }).then((response) => {
            setMessage(response.data.message);
            return HttpClient.getFiles();
        }).then((files) => {
            setFileInfos(files.data);
        }).catch((err) => {
            setProgress(0);
            setMessage("error: " + err.data.message);
            setCurrentFile(undefined);
        })

        /*
        useEffect(() => {
            HttpClient.getFiles().then((response) => {
                setFileInfos(response.data);
            });
        }, []);
        */

    }



    return (
        <div>
            <div className="row">
                <div className="col-8">
                    <label className="btn btn-default p-0">
                        <input type="file" onChange={selectFile} />
                    </label>
                </div>

                <div className="col-4">
                    <button
                        className="btn btn-success btn-sm"
                        disabled={!currentFile}
                        onClick={upload}
                    >
                        Upload
                    </button>
                </div>
            </div>

            {currentFile && (
                <div className="progress my-3">
                    <div
                        className="progress-bar progress-bar-info"
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: progress + "%" }}
                    >
                        {progress}%
                    </div>
                </div>
            )}

            {message && (
                <div className="alert alert-secondary mt-3" role="alert">
                    {message}
                </div>
            )}

            <div className="card mt-3">
                <div className="card-header">List of Files</div>
                <ul className="list-group list-group-flush">
                    {fileInfos &&
                        fileInfos.map((file, index) => (
                            <li className="list-group-item" key={index}>
                                <a href={file.url}>{file.name}</a>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}