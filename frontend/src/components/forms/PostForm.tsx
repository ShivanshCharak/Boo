import React, { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import fileUpload from "../../assets/file-upload(1).svg";

interface EncodedFile {
  fileName: string;
  data: string;
}

function FileUploader({ fieldChange, mediaUrl }: any) {
  const [encodedFile, setEncodedFile] = useState<EncodedFile | null>(null);
  const [file, setFile] = useState<FileWithPath[]>([]);
  const [fileUrl, setFileUrl] = useState<string | undefined>();

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      const fileToUpload = acceptedFiles[0];
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(fileToUpload));

      // Call convertToBase64 here
      const base64Data: string = await convertToBase64(fileToUpload);
      setEncodedFile({
        fileName: fileToUpload.name,
        data: base64Data
      });
    },
    [fieldChange]
  );

  useEffect(() => {
    if (encodedFile) {
      sendEncodedImage(encodedFile);
    }
  }, [encodedFile]);

  const sendEncodedImage = (encodedFile: EncodedFile) => {
    fetch("http://localhost:3000/upload/Image", {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(encodedFile)
    });
  };

  function convertToBase64(file: File):Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = (error) => reject(error);
    });
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/png, image/jpeg, image/svg+xml",
});

  return (
    <div {...getRootProps()} className="flex rounded-lg justify-center items-center bg-dark-4 mt-10">
      <input {...getInputProps()} />
      {fileUrl ? (
        <div className="flex flex-col">
          <img src={fileUrl} alt="Preview" className="cursor-pointer p-10" />
          <span className="cursor-pointer text-slate-400 text-center mb-10">Click again to replace</span>
        </div>
      ) : (
        <div className="h-[440px] flex items-center flex-col justify-center">
          <p className="mb-4 text-slate-400">Drag & Drop or Click to Upload</p>
          <img src={fileUpload} alt="Upload Icon" />
          <p className="text-slate-400">PNG, JPG, SVG Allowed</p>
          <button className="bg-dark-2 p-3 rounded-lg mt-3">Select from Computer</button>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
