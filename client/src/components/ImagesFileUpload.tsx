/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone, {
  defaultClassNames,
  IFileWithMeta,
  ILayoutProps,
  IMeta,
  StatusValue,
} from "react-dropzone-uploader";
import { DropZoneContainer } from "../helper/lib";
import axios from "axios";

interface CustomBlob extends Blob {
  id: string;
  status: StatusValue;
  type: string;
  uploadedDate: string;
  percent: number;
  size: number;
  lastModifiedDate: string;
  duration?: number;
  width?: number;
  height?: number;
  videoWidth?: number;
  videoHeight?: number;
  validationError?: any;
}

interface Prop extends CustomBlob {
  readonly lastModified: number;
  readonly name: string;
  readonly webkitRelativePath: string;
}

type Props = Prop[];

export const ImagesFileUpload = (): JSX.Element => {
  const [images, setImages] = useState<IMeta[]>([]);
  useEffect(() => {
    async function upload() {
      if (images.length > 0) {
        const ig = images as Props;
        await axios.post("/api/v1/upload", ig);
      }
    }
    upload();
  }, [images]);

  const Layout = ({
    input,
    previews,
    submitButton,
    dropzoneProps,
    files,
  }: ILayoutProps) => {
    return (
      <>
        {previews}
        <div {...dropzoneProps}>{files.length >= 0 && input}</div>
        {files.length > 0 && submitButton}
      </>
    );
  };

  const CustomLayout = () => {
    const handleSubmit = (
      files: IFileWithMeta[],
      allFiles: IFileWithMeta[]
    ) => {
      setImages(files.map((f) => f.meta));
      allFiles.forEach((f) => f.remove());
    };

    return (
      <DropZoneContainer>
        <Dropzone
          //getUploadParams={getUploadParams}
          accept="image/*"
          LayoutComponent={Layout}
          onSubmit={handleSubmit}
          classNames={{ inputLabelWithFiles: defaultClassNames.inputLabel }}
          inputContent="Drop here or click me"
        />
      </DropZoneContainer>
    );
  };
  return <CustomLayout />;
};
