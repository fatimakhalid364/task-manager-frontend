import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import SpinnerLoader from "src/components/spinLoader/SpinnerLoader";
import { errorToast, successToast } from "src/components/toasters/toast";
import { Screen } from "src/constants/constants";
import {
  forgotPassThunk,
  signinThunk,
  signupThunk,
} from "src/store/thunks/authThunks";
import { encryptObjectValues } from "src/utils/encryptionUtil";
import {
  validateResetForm,
  validateSetForm,
  validateSignin,
  validateSignup,
} from "src/utils/validators";
import SubmitButton from "./submit-button";

interface UserAccount {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface InputFieldsProps {
  currentScreen: Screen;
}

const CssTextField = styled((props) => <TextField {...props} />)(
  ({ theme }) => ({
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: `1px solid #3B8AFF`,
      },
      "&.Mui-focused fieldset": {
        border: `2px solid #3B8AFF`,
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #D1D5DB",
      },
      width: "494px",
      height: "40px",
      borderRadius: "8px",
      padding: "10px",
      "& input": {
        padding: "10px",
      },
      "& input::placeholder": {
        fontFamily: "DM Sans",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "16px",
        color: "#9CA3AF",
        width: "474px",
        height: "16px",
      },
    },
  })
);

const LabelTypography = styled(Typography)(({ theme }) => ({
  fontFamily: "DM Sans",
  fontWeight: 500,
  fontSize: theme.typography.body2.fontSize,
  lineHeight: theme.typography.body1.lineHeight,
  color: "#1F2937",
  width: "494px",
  height: "16px",
}));

const InputFields: FC<InputFieldsProps> = ({ currentScreen }) => {
  const dispatch = useDispatch();
  const [userAccount, setUserAccount] = useState<UserAccount>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [checked, setChecked] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUserAccount((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const getValidationFunction = () => {
    switch (currentScreen) {
      case Screen.SIGNUP:
        return validateSignup(userAccount, checked);
      case Screen.SIGNIN:
        return validateSignin(userAccount);
      case Screen.SET_PASS:
        return validateSetForm(userAccount);
      case Screen.FORGOT_PASS:
        return validateResetForm(userAccount);
      default:
        return false;
    }
  };

  const handleButtonClick = async () => {
    const validation = getValidationFunction();
    const encryptedObj = encryptObjectValues(userAccount);

    if (validation) {
      try {
        let thunkToDispatch;
        switch (currentScreen) {
          case Screen.SIGNUP:
            thunkToDispatch = signupThunk(encryptedObj);
            break;
          case Screen.SIGNIN:
            thunkToDispatch = signinThunk(encryptedObj);
            break;
          case Screen.FORGOT_PASS:
            thunkToDispatch = forgotPassThunk(encryptedObj);
            break;
          default:
            break;
        }

        if (thunkToDispatch) {
          setSpinner(true);
          const response = await dispatch(thunkToDispatch).unwrap();
          setSpinner(false);
          successToast(response.message, "authentication-pages-success");
        }
      } catch (error) {
        setSpinner(false);
        errorToast((error as Error).message, "authentication-pages-error");
      }
    } else {
      console.error("Validation failed for the current screen.");
    }
  };

  return (
    <div>
      <SpinnerLoader showSpinner={spinner} />
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {currentScreen === Screen.SIGNUP && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <LabelTypography variant='body1' gutterBottom>
                Name
              </LabelTypography>
              <CssTextField
                placeholder='Enter your name'
                variant='outlined'
                name='name'
                value={userAccount.name}
                onChange={handleInputChange}
              />
            </div>
          </Grid>
        )}
        {currentScreen !== Screen.SET_PASS && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <LabelTypography variant='body1' gutterBottom>
                Email
              </LabelTypography>
              <CssTextField
                placeholder='Enter your email'
                variant='outlined'
                name='email'
                value={userAccount.email}
                onChange={handleInputChange}
              />
            </div>
          </Grid>
        )}
        {currentScreen !== Screen.FORGOT_PASS && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <LabelTypography variant='body1' gutterBottom>
                Password
              </LabelTypography>
              <CssTextField
                placeholder='Enter your password'
                variant='outlined'
                name='password'
                value={userAccount.password}
                onChange={handleInputChange}
                type='password'
              />
            </div>
          </Grid>
        )}
        {(currentScreen === Screen.SIGNUP ||
          currentScreen === Screen.SET_PASS) && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <LabelTypography variant='body1' gutterBottom>
                Confirm Password
              </LabelTypography>
              <CssTextField
                placeholder='Confirm your password'
                variant='outlined'
                name='confirmPassword'
                value={userAccount.confirmPassword}
                onChange={handleInputChange}
                type='password'
              />
            </div>
          </Grid>
        )}
        {(currentScreen === Screen.SIGNUP ||
          currentScreen === Screen.SIGNIN) && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: currentScreen === Screen.SIGNUP ? "center" : null,
            }}
          >
            <div
              className='checkbox'
              style={{
                marginLeft: currentScreen === Screen.SIGNIN ? "25.6%" : null,
              }}
            >
              <input
                type='checkbox'
                id='checkbox'
                name='checkbox'
                checked={checked}
                onChange={handleCheckboxChange}
              />
              {currentScreen === Screen.SIGNUP ? (
                <label htmlFor='checkbox'>
                  I agree to the{" "}
                  <a href='/terms-and-services'>Terms & Conditions</a>
                </label>
              ) : currentScreen === Screen.SIGNIN ? (
                <label htmlFor='checkbox'>Remember Me</label>
              ) : null}
            </div>
            {currentScreen === Screen.SIGNIN && (
              <div className='forgot-password-text'>
                <a href='/authentication/forgot-password'>Forgot password?</a>
              </div>
            )}
          </Grid>
        )}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SubmitButton
            currentScreen={currentScreen}
            handleSubmit={handleButtonClick}
            disabled={currentScreen === Screen.SIGNUP && !checked}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default InputFields;
