import React, { FC, useRef, useState } from "react";
import "./FileUploader.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import _ from "lodash/fp";
import { faExpand } from "@fortawesome/free-solid-svg-icons/faExpand";

const KILO_BYTES_PER_BYTE = 1024;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5000000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

type FileUploaderProps = {
  updateFilesCb: (files: File[]) => void;
  maxFileSizeInBytes?: number;
  multiple: boolean;
  label: string;
  accept: string;
};

const FileUploader: FC<FileUploaderProps> = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef(null);
  const [files, setFiles] = useState({});

  const handleUploadBtnClick = () => {
    // @ts-ignore
    fileInputField.current.click();
  };

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  return (
    <>
      <section className="fileContainer">
        <label className="inputLabel">{label}</label>
        <p className="dragAndDropText">Drag and drop your files anywhere or</p>
        <button className="uploadFileBtn" onClick={handleUploadBtnClick}>
          <i className="fas fa-file-upload" />
          <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
        </button>
        <input
          className="formField"
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        />
      </section>
      {!_.isEmpty(files) && (
        <article className="formPreviewContainer">
          <span>To Upload</span>
          <section className="previewList">
            {Object.keys(files).map((fileName, index) => {
              let file = files[fileName];
              let isImageFile = file.type.split("/")[0] === "image";
              return (
                <section className="previewContainer" key={fileName}>
                  <div>
                    {isImageFile && (
                      <img
                        className="imagePreview"
                        src={URL.createObjectURL(file)}
                        alt={`file preview ${index}`}
                      />
                    )}
                    <div className="fileMetaData">
                      <span>{file.name}</span>
                      {/*Todo not done*/}
                      {/*<i className="expand">*/}
                      {/*  <FontAwesomeIcon*/}
                      {/*    icon={faExpand}*/}
                      {/*    className="icon-fontAwesome"*/}
                      {/*  />*/}
                      {/*</i>*/}
                      <aside>
                        <span>{convertBytesToKB(file.size)} kb</span>

                        <i
                          className="removeFileIcon"
                          onClick={() => removeFile(fileName)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="icon-fontAwesome"
                          />
                        </i>
                      </aside>
                    </div>
                  </div>
                </section>
              );
            })}
          </section>
        </article>
      )}
    </>
  );
};

export default FileUploader;
