// components/LoadingSpinner.tsx
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <DotLottieReact
                src="https://lottie.host/f2804e54-3d72-4338-a5a9-ab04ddf13494/P2qiRRLxNs.json"
                loop
                autoplay
                className="w-[150px] h-[150px]"
            />
        </div>
    );
};

export default LoadingSpinner;
