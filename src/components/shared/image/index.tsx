import React, { Fragment } from "react";
//
import Image, { ImageProps } from "next/image";

interface ImageComponentProps extends ImageProps {
  fallback?: string;
  debug?: string;
  alt: string;
}

const ImageComponent = (props: ImageComponentProps) => {
  const [loading, setLoading] = React.useState(true);
  const [onErrorSrc, setOnErrorSrc] = React.useState<string | undefined>(
    undefined
  );

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    fallback = "/images/failed.svg"
  ) => {
    e?.currentTarget?.src !== fallback && setOnErrorSrc(fallback);
  };

  return (
    <Fragment>
      <Image
        {...props}
        alt={props.alt}
        src={
          loading === true
            ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88h8AAs0B5QWO2loAAAAASUVORK5CYII="
            : onErrorSrc || props.src
        }
        onError={(e) => handleImageError(e, props.fallback)}
        onLoadingComplete={() => !props.debug && setLoading(false)}
      />
    </Fragment>
  );
};

export default ImageComponent;
