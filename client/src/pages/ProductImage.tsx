import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { ProductProps } from "../helper/interface";

interface Props {
  product: ProductProps;
}

export const ProductImage = (props: Props): JSX.Element => {
  const { product } = props;
  const [images, setImages] = useState<
    { original: string; thumbnail: string }[]
  >([{ original: "", thumbnail: "" }]);

  useEffect(() => {
    if (product?.image) {
      const item = [];
      item.push({
        original: `${window.location.origin}${product.image}`,
        thumbnail: `${window.location.origin}${product.image}`,
      });
      setImages(item);
    }
  }, [product]);
  return (
    <div>
      <ImageGallery items={images} />;
    </div>
  );
};
