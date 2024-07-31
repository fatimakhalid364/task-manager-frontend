import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
    const expandBar = useMediaQuery({ minWidth: 854 });
    const isBp1 = useMediaQuery({ minWidth: 1422, maxWidth: 1577 });
    const isBp2 = useMediaQuery({ minWidth: 1415, maxWidth: 1422 });
    const isBp3 = useMediaQuery({ minWidth: 1403, maxWidth: 1415 });
    const isBp4 = useMediaQuery({ minWidth: 1394, maxWidth: 1403 });
    const isBp5 = useMediaQuery({ minWidth: 1329, maxWidth: 1394 });
    const isBp6 = useMediaQuery({ minWidth: 1298, maxWidth: 1329 });
    const isBp7 = useMediaQuery({ minWidth: 1263, maxWidth: 1298 });
    const isAdaptableScreen = useMediaQuery({ minWidth: 1263 });
    const onWholeScreen = useMediaQuery({ minWidth: 1147, maxWidth: 1362 });
    const onWholeScreen1 = useMediaQuery({ maxWidth: 1147 });
    const isSmallScreen = useMediaQuery({ minWidth: 937, maxWidth: 1113 });
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
        isAdaptableScreen,
        onWholeScreen,
        onWholeScreen1,
        isSmallScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    };
};