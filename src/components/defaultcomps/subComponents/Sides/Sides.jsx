import Logo from "src/components/defaultcomps/subComponents/Sides/subComponents/Logo";
import Routes from "src/components/defaultcomps/subComponents/Sides/subComponents/Routes/Routes";
import Priority from "src/components/defaultcomps/subComponents/Sides/subComponents/Priority/Priority";
import 'src/components/defaultcomps/subComponents/Sides/subComponents/sides.css';

function Sides({clickfunction}){
    return (
        <div className='tasks-page-side'>
            <Logo />
            <Routes clickfunction = {clickfunction} />
            <Priority />
        </div>
    )
}

export default Sides;