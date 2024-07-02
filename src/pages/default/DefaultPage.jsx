import DefaultComps from "src/components/defaultcomps/defaultcomps";



function DefaultPage({ children}){

    return (
        <div>
            <DefaultComps />
            <main className='changing-component-div'>
                {children}
            </main>
        </div>
    )
};

export default DefaultPage;