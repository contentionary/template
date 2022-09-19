import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  height: number | string;
  width: number | string;
  className?: string;
  hidden?: boolean;
  style?: object;
  layout?: "fixed" | "responsive" | "fill" | "intrinsic" | undefined;
  objectFit?: any;
  onClick?: Function;
}
const ImageComponent = ({
  src,
  alt,
  height,
  width,
  className,
  hidden,
  style,
  layout,
  onClick,
  objectFit,
  ...rest
}: Props): JSX.Element => {
  return (
    <Image
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={className}
      hidden={hidden}
      style={style}
      layout={layout}
      objectFit={objectFit}
      onClick={(e) => onClick && onClick(e)}
      {...rest}
    />
  );
};

export default ImageComponent;
