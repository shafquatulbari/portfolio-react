import React, { useState, useRef, useEffect, memo } from "react";

const LazyImage = memo(
  ({
    src,
    alt,
    className = "",
    placeholder = null,
    onLoad = () => {},
    ...props
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef();

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(imgRef.current);
          }
        },
        { threshold: 0.1 }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }, []);

    const handleLoad = () => {
      setIsLoaded(true);
      onLoad();
    };

    return (
      <div ref={imgRef} className={`relative ${className}`} {...props}>
        {placeholder && !isLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse rounded" />
        )}
        {isInView && (
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleLoad}
            loading="lazy"
          />
        )}
      </div>
    );
  }
);

LazyImage.displayName = "LazyImage";

export default LazyImage;
