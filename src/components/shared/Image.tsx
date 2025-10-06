import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  fallbackSrc?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  fallbackSrc,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  const handleError = () => {
    if (fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      loading={loading}
      height={height}
      className={className}
      onError={handleError}
      {...rest}
    />
  );
};

export default Image;