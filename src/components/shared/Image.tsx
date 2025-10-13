import { useState, useEffect } from 'react';
import fallbackImg from '../../assets/banner1.jpg';

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
  fallbackSrc = fallbackImg,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setError(false);
  }, [src]);

  const handleError = () => {
    if (!error) {
      setError(true);
      setImgSrc(fallbackImg);
    }
  };

  return (
    <img
      key={imgSrc}
      src={imgSrc || fallbackSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={className}
      onError={handleError}
      {...rest}
    />
  );
};

export default Image;
