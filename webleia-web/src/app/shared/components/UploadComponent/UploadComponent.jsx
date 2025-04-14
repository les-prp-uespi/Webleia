import React from "react";
import Dropzone from "react-dropzone";
import { DropContainer, UploadMessage } from "./styles";
import { FiUploadCloud } from "react-icons/fi";
import { useFile } from "app/shared/hooks";
import toastr from "toastr";

const UploadComponent = ({
  acceptFiles = {
    "image/jpeg": [".jpeg"],
    "image/jpg": [".jpg"],
    "image/png": [".png"],
    "application/pdf": [".pdf"],
  },
  onUpload,
  multiple,
  message,
  maxSize = 1024 * 10000,
  disabled = false,
}) => {
  const { convertBytesToMB } = useFile();
  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return (
        <UploadMessage>
          <FiUploadCloud size={50} />
          {message ||
            `Escolha um arquivo ou arraste e solte aqui até ${convertBytesToMB(
              maxSize
            )}`}
        </UploadMessage>
      );
    }

    if (isDragReject) {
      return <UploadMessage type="error">ARQUIVO NÃO SUPORTADO!</UploadMessage>;
    }

    return <UploadMessage type="success">SOLTE O ARQUIVO AQUI!</UploadMessage>;
  };

  const handleUpload = (files) => {
    const mega = 1024 * 1000;
    /*const filteredImgs = files.filter((file) => {
      const sizeMax = file.type.includes("image") ? mega : maxSize;
      if(file.size > sizeMax){
        toastr.warning(`Arquivo ${file.name} deve ter no máximo ${parseInt(sizeMax/mega)}MB`)
        return false;
      }
      return true;
    });
    onUpload?.(filteredImgs.filter((file) => file.size <= maxSize));*/
    onUpload?.(files)
  };

  return (
    <Dropzone
      accept={acceptFiles}
      multiple={multiple}
      onDropAccepted={handleUpload}
      disabled={disabled}
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isdragactive={isDragActive ? 1 : 0}
          isdragreject={isDragReject ? 1 : 0}
          disabled={disabled}
        >
          <input {...getInputProps()} />

          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  );
};

export default UploadComponent;
