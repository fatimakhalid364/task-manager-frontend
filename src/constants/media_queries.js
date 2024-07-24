import { useMediaQuery } from 'react-responsive';
export const useResponsive = () => {
    const isBiggerScreen = useMediaQuery({ minWidth: 1448 });
    const isBigScreen = useMediaQuery({ minWidth: 1198, maxWidth: 1448 });
    const isLessScreen = useMediaQuery({ minWidth: 937, maxWidth: 1198 });
    const isSmallerScreen = useMediaQuery({ minWidth: 659, maxWidth: 937 });
    const isMobileScreen = useMediaQuery({ minWidth: 455, maxWidth: 659 });
    const isMicroScreen = useMediaQuery({ minWidth: 359, maxWidth: 455 });

    return {
        isBiggerScreen,
        isBigScreen,
        isLessScreen,
        isSmallerScreen,
        isMobileScreen,
        isMicroScreen,
    };
};