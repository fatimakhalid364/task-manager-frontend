import DefaultComps from "src/components/defaultcomps/defaultcomps";



function DefaultPage({ children}){

    return (
        <div>
            <DefaultComps />
            <div className='changing-component-div'>
                {children}
            </div>
        </div>
    )
};

export default DefaultPage;