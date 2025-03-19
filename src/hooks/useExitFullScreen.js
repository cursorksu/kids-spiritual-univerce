import { useEffect } from 'react';

export function useExitFullScreen(onExitCallback) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                const fullScreenElement = document.querySelector('.swiper.full-screen');
                if (fullScreenElement) {
                    fullScreenElement.classList.remove('full-screen');
                    if (typeof onExitCallback === 'function') {
                        onExitCallback();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onExitCallback]);
}