import { useMediaQuery } from 'react-responsive';
export const useResponsive = () => {
    const isAdaptableScreen = useMediaQuery({minWidth: 1113})
    const isLessScreen = useMediaQuery({ minWidth: 937, maxWidth: 1113 });
    const isSmallerScreen = useMediaQuery({ minWidth: 659, maxWidth: 937 });
    const isMobileScreen = useMediaQuery({ minWidth: 455, maxWidth: 659 });
    const isMicroScreen = useMediaQuery({ minWidth: 359, maxWidth: 455 });

    return {
        isAdaptableScreen,
        isLessScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    };
};