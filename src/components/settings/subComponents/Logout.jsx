import { useAuth } from 'src/contexts/AuthContext.jsx';
const Logout = () => {
    const { logout } = useAuth();
    return (
        <>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '80px'}}>
           <div style={{height: '178px', width: '445px', boxShadow: '0px 2px 6px 0px #1018280F', 
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '20px',
            padding: '10px', borderRadius: '12px'}}>
            <div style={{fontSize: '20px', fontFamily: 'var(--primary-font-family)', color: 'var(--quinary-font-color)' }}>Log-Out</div>
            <div style={{fontSize: '14px', fontFamily: 'var(--primary-font-family)', color: 'var(--tertiary-font-color)'}}>Are you sure you want to log-out? Your current session will end and any un-saved progress will be lost. Your filters will reset as well.</div>
            <div className='primary-button' onClick={() => logout()} style={{backgroundColor: '#EF4444', fontFamily: 'var(--secondary-font-family)', width: '130px'}}>Log-out</div>
           </div>
        </div>
        </>
    )
}

export { Logout }