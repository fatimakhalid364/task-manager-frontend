import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useResponsive } from 'src/constants/media_queries';

const SettingsFooter = ({
    handleSave,
    isBlueClicked, 
    handleBlueClick, 
    isPinkClicked, 
    handlePinkClick, 
    isOrangeClicked, 
    handleOrangeClick,
    isGreenClicked, 
    handleGreenClick,
}) => {
    const { isAdaptableScreen, isMicroScreen } = useResponsive();
    const accentColor = useSelector((state) => state.appearance.color);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    return (
        <div>
            <div className="settings-controls" style={{justifyContent: isMicroScreen ? 'space-between' : 'flex-end',
                marginLeft: isMicroScreen ? '4px' : '10px'
            }}>
                <button
                    className="filter-button"
                    style={{
                        width: '120px',
                        backgroundColor: 'var(--neutral-background-color)',
                        border: '1px solid var(--field-border-color)',
                        color: 'var(--tertiary-font-color)',
                    }}
                >
                    Discard
                </button>
                <button className="primary-button hover-effect-btn"  style={{ 
                    width: '80px', 
                    gap: '0px', 
                    backgroundColor: accentColor === 'pink' ? 'var(--pink-accent-color)' : accentColor === 'green' ? 'var(--green-accent-color)' : accentColor === 'orange' ? 'var(--orange-accent-color)' : 'var(--primary-background-color)', 
                    }}
                    onClick={handleSave}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default SettingsFooter;