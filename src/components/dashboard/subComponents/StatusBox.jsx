const StatusBox = ({img, statusCount, statusName }) => {
    return (
        <div style={
            {display: 'flex', 
            flexDirection: 'column', 
            gap: '15px', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '140px',
            width: '254px',
            border: '1px solid var(--light-border-color)',
            borderRadius: '12px',
            backgroundColor: 'white'}}>

                <div>
                    <img src={img} />
                </div>
                <div style={{
                    fontFamily: 'var(--primary-font-family)',
                    fontWeight: '600',
                    fontSize: '24px',
                    color: 'var(--secondary-font-color)'

                }}>
                    {statusCount}
                </div>
                <div style={{
                    fontWeight: '500',
                    fontFamily: 'var(--primary-font-family)',
                    fontSize: '20px',
                    color: 'var(--quaternary-font-color)'
                }}>
                    {statusName}
                </div>
        </div>
    )
}

export default StatusBox;