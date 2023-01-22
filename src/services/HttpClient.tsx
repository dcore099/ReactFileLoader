import HttpCommon from "./Http-common";


const upload = (file: File, onUploadProgress: any): Promise<any> => {
    let formData = new FormData();
    formData.append("file", file);

    return HttpCommon.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
}

const getFiles = () : Promise<any> => {
    return HttpCommon.get("/files");
}




export const HttpClient =  {
    upload,
    getFiles
}