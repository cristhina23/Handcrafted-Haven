import { useEffect, useState } from 'react';

interface ScreenSize{
    width: number | undefined;
    height: number | undefined;
}

export default function useMediaQuery(): ScreenSize {
    const [screenSize, setScreenSize] = useState<ScreenSize>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        
        function handleResize() {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        handleResize();
        window.addEventListener('resize', handleResize)
    
        return window.removeEventListener('resize', handleResize)
    },[])

    return screenSize;
}

