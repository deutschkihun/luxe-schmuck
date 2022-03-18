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
import { multipartConfig } from "../helper/utils";

interface CustomBlob extends Blob {
  id: string;
  status: StatusValue;
  type: string; // MIME type, example: `image/*`
  uploadedDate: string; // ISO string
  percent: number;
  size: number; // bytes
  lastModifiedDate: string; // ISO string
  previewUrl?: string; // from URL.createObjectURL
  duration?: number; // seconds
  width?: number;
  height?: number;
  videoWidth?: number;
  videoHeight?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationError?: any;
}

interface newProps extends CustomBlob {
  readonly lastModified: number;
  readonly name: string;
  readonly webkitRelativePath: string;
}

/*interface Props {
  file: IMeta;
}*/

export const ImagesFileUpload = (): JSX.Element => {
  const [images, setImages] = useState<IMeta[]>([]);

  useEffect(() => {
    async function upload() {
      if (images.length > 0) {
        const formData = new FormData();
        images.map(async (image) => {
          const ig = image as newProps;
          console.log(ig);
          formData.append("image", ig);
          await axios.post("/api/v1/upload", formData, multipartConfig);
        });
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

    /*const getUploadParams = (props: Props) => {
      const body = new FormData();
      body.append("customFile", props.file);
      body.append("type", "normal");
      return { url: uploadUrl, body };
    };

    const getUploadParams: IDropzoneProps['getUploadParams'] = () => {
      return { url: 'https://httpbin.org/post' }
    }*/

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
