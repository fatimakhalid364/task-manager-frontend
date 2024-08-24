const SettingsFooter = () => {
    return (
        <div>
            <div className="settings-controls">
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
                <button className="primary-button"  style={{ width: '80px', gap: '0px' }}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default SettingsFooter;