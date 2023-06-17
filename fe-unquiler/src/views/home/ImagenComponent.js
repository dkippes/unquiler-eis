import {useEffect, useState} from "react";

function ImageComponent({ url, placeholder, onClick }) {
    const [imageExists, setImageExists] = useState(null);

    useEffect(() => {
        const verifyImage = () => {
            const img = new Image();
            img.onload = () => {
                setImageExists(true);
            };
            img.onerror = () => {
                setImageExists(false);
            };
            img.src = url;
        };

        verifyImage();
    }, [url]);

    return (
        <div>
            {imageExists ? (
                <img
                    src={url}
                    alt="Imagen cargada correctamente"
                    onClick={onClick}
                    style={{
                        cursor: 'pointer',
                        width: '300px',
                        height: '200px',
                        objectFit: 'contain',
                    }}
                />
            ) : (
                <img
                    src={placeholder}
                    alt="Placeholder"
                    onClick={onClick}
                    style={{
                        cursor: 'pointer',
                        width: '300px',
                        height: '200px',
                        objectFit: 'contain',
                    }}
                />
            )}
        </div>
    );
}

export default ImageComponent;