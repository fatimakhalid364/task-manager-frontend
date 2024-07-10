import 'src/components/maindiv/main_div.css';

function MainDiv({ children }) {
    return (
        <main className='changing-component-div'>
            <div className='changing-component'>
                {children}
            </div>
        </main>
    )
}

export default MainDiv;