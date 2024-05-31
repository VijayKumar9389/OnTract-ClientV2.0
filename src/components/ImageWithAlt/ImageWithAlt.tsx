import React, { useState, useEffect } from 'react';
import { FaBox } from 'react-icons/fa6';
import axios from 'axios';

const ImageWithFallback: React.FC<{ imageName: string | null }> = ({ imageName }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!imageName) return;

        // Get the base URL from environment variables
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

        if (!API_BASE_URL) {
            throw new Error("VITE_API_BASE_URL is not defined");
        }

        const fetchImageUrl = async (): Promise<void> => {
            try {
                const endpoint: string = `${API_BASE_URL}/api/images/${imageName}`;
                const response = await axios.get(endpoint);
                if (response.status === 200) {
                    const data = response.data;
                    setImageUrl(data.url);
                } else {
                    throw new Error('Failed to fetch image URL');
                }
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };

        fetchImageUrl()
            .then(() => console.log('Image URL fetched successfully'));

        // Cleanup function
        return (): void => {
            setImageUrl(null); // Reset image URL on component unmount
        };
    }, [imageName]);

    if (!imageUrl) {
        return <div className="placeholder-image"><FaBox /></div>;
    }

    return <img src={imageUrl} crossOrigin="anonymous" alt="Image" />;
};

export default ImageWithFallback;
