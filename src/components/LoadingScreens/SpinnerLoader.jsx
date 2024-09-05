import PropTypes from "prop-types";
import { RingLoader } from "react-spinners";
import { useSelector } from "react-redux";
const SpinnerLoader = ({ showSpinner, blurBackground }) => {
    const accentColor = useSelector((state) => state.appearance.color);
    return (
        <>
            {showSpinner && (
                <>
                    <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: "10000",
                        }}
                    >
                        <RingLoader color={accentColor === 'pink'
                                    ? 'var(--pink-accent-color)'
                                    : accentColor === 'green'
                                    ? 'var(--green-accent-color)'
                                    : accentColor === 'orange'
                                    ? 'var(--orange-accent-color)'
                                    : 'var(--primary-background-color)'} speedMultiplier={1.5} />
                    </div>
                    {blurBackground && (
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(255, 255, 255, 0.4)",
                                zIndex: "99999",
                            }}
                        ></div>
                    )}
                </>
            )}
        </>
    );
};

export default SpinnerLoader;

// Setting default values for the props of BasicLayout
SpinnerLoader.defaultProps = {
    showSpinner: false,
    blurBackground: true,
};

// Typechecking props for the BasicLayout
SpinnerLoader.propTypes = {
    showSpinner: PropTypes.bool,
    blurBackground: PropTypes.bool,
};
