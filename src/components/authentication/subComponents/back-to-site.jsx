import leftArrow from 'src/assets/Vector (Stroke).svg';

function BackToSite() {
    return (
        <div>
            <button className='backtosite-button'>
                <img className='leftarrow-img' src={leftArrow} alt='left arrow' />
                <div className='backtosite-text'>Back to site</div>
            </button>
        </div>
    )
}

export default BackToSite;