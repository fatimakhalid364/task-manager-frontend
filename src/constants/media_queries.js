import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
    const expandBar = useMediaQuery({ minWidth: 1250 });
    const isBp1 = useMediaQuery({ minWidth: 1211, maxWidth: 1250 });
    const isBp2 = useMediaQuery({ minWidth: 1177, maxWidth: 1211 });
    const isBp3 = useMediaQuery({ minWidth: 1153, maxWidth: 1177 });
    const isBp4 = useMediaQuery({ minWidth: 1147, maxWidth: 1153 });
    const isBp5 = useMediaQuery({ minWidth: 1123, maxWidth: 1147 });
    const isBp6 = useMediaQuery({ minWidth: 1060, maxWidth: 1123 });
    const isBp7 = useMediaQuery({ minWidth: 998, maxWidth: 1060 });
    const isBp8 = useMediaQuery({ minWidth: 947, maxWidth: 998 });
    const isAdaptableScreen = useMediaQuery({ minWidth: 947 });
    const isSmallScreen = useMediaQuery({ maxWidth: 722 });
    const onWholeScreen = useMediaQuery({ maxWidth: 1200 });
    // const  = useMediaQuery({ maxWidth: 1147 });
    
    const isSmallerScreen = useMediaQuery({ minWidth: 659, maxWidth: 937 });
    const isMobileScreen = useMediaQuery({ minWidth: 455, maxWidth: 659 });
    const isMicroScreen = useMediaQuery({ minWidth: 359, maxWidth: 455 });

    return {
        expandBar,
        isBp1,
        isBp2,
        isBp3,
        isBp4,
        isBp5,
        isBp6,
        isBp7,
        isBp8,
        isAdaptableScreen,
        onWholeScreen,
        
        isSmallScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    };
};