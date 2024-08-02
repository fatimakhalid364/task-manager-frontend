import CancelIcon from '@mui/icons-material/Cancel';
import {
 Dialog,
 DialogActions,
 DialogContent,
 DialogTitle,
 Paper,
 Typography,
 useMediaQuery,
 useTheme,
} from "@mui/material";
import DialogContentText from '@mui/material/DialogContentText';
import { styled } from "@mui/system";
import SoftBox from 'components/SoftBox';
import SoftButton from "components/SoftButton";



const IconContainer = styled('div')`
 margin-bottom: -5px;
 margin-top: 10px;

`;

function ConfirmationDialog({ open, icon, onClose, onConfirm, title, message, buttonText, buttonColor }) {
 const theme = useTheme();
 const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
 const StyledPaper = styled(Paper)`
 border-radius: 12px;
 position: relative;
 box-shadow: 0 7px 23px 0 rgba(0, 0, 0, 0.05);
 padding: ${isSmallScreen ? '10px 10px' : '10px 30px'}; 
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: space-between;
 `;

 return (
 <SoftBox px={isSmallScreen ? 0 : 10}>
 <Dialog PaperComponent={StyledPaper} disableEscapeKeyDown={true} open={open} onClose={onClose} maxWidth={"lg"}>
 <IconContainer>
 {icon ?
 icon :
 <CancelIcon color="error" fontSize="large" sx={{ width: isSmallScreen ? '48px' : '64px', height: isSmallScreen ? '48px' : '64px' }} />}
 </IconContainer>
 <DialogTitle mb={-2} sx={{ textAlign: isSmallScreen ? 'center' : 'center' }}>
 <Typography variant={isSmallScreen ? "h6" : "h3"} fontWeight={700} color={'#495057'}>{title}</Typography>
 </DialogTitle>
 <DialogContent sx={{ textAlign: isSmallScreen ? 'center' : 'center' }}>
 <DialogContentText>
 <Typography variant={isSmallScreen ? "body3" : "body2"} fontWeight={400} color={'hashtag#6C757D'}>{message}</Typography>
 </DialogContentText>
 </DialogContent>
 <DialogActions px={isSmallScreen ? 0 : 10}>
 <SoftBox display="flex" flexDirection={isSmallScreen ? "row" : "row"} justifyContent="space-between" width="100%">
 <SoftButton size={isSmallScreen ? "small" : "large"} onClick={onClose} color="light" >
 Cancel
 </SoftButton>
 <SoftButton size={isSmallScreen ? "small" : "large"} onClick={onConfirm} color={buttonColor ? buttonColor : "error"} sx={{ marginLeft: isSmallScreen ? 0 : '50px' }}>
 {buttonText ? buttonText : "Delete"}
 </SoftButton>
 </SoftBox>
 </DialogActions>
 </Dialog>
 </SoftBox>
 );
}

export default ConfirmationDialog;

const expandBar = useMediaQuery({ minWidth: 1577 });
    const isBp1 = useMediaQuery({ minWidth: 1422, maxWidth: 1577 });
    const isBp2 = useMediaQuery({ minWidth: 1415, maxWidth: 1422 });
    const isBp3 = useMediaQuery({ minWidth: 1403, maxWidth: 1415 });
    const isBp4 = useMediaQuery({ minWidth: 1394, maxWidth: 1403 });
    const isBp5 = useMediaQuery({ minWidth: 1329, maxWidth: 1394 });
    const isBp6 = useMediaQuery({ minWidth: 1298, maxWidth: 1329 });
    const isBp7 = useMediaQuery({ minWidth: 1263, maxWidth: 1298 });
    const isAdaptableScreen = useMediaQuery({ minWidth: 1263 });
    const onWholeScreen = useMediaQuery({ minWidth: 1147, maxWidth: 1362 });
    const  = useMediaQuery({ maxWidth: 1147 });
    const isSmallScreen = useMediaQuery({ minWidth: 937, maxWidth: 1113 });
    const isSmallerScreen = useMediaQuery({ minWidth: 659, maxWidth: 937 });
    const isMobileScreen = useMediaQuery({ minWidth: 455, maxWidth: 659 });
    const isMicroScreen = useMediaQuery({ minWidth: 359, maxWidth: 455 });