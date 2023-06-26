import { Image } from '@chakra-ui/react';

function ImageComponent({ url, placeholder, onClick }) {
  console.log(url, placeholder);
  return (
    <div>
      <Image
        alt={url ? 'imagen de la cancha' : 'image_placeholder'}
        src={url}
        fallbackSrc={placeholder}
        onClick={onClick}
        style={{
          cursor: 'pointer',
          width: '300px',
          height: '200px',
          objectFit: 'fill',
        }}
      />
    </div>
  );
}

export default ImageComponent;
