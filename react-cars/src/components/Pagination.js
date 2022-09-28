import PropTypes from 'prop-types';
function Pagination({currentPage, totalPages, onPageChange}){

    let pages = Array.from({length: totalPages}, (_, i) => i + 1)

    function onPageChangeHandler(p){
        onPageChange(p)
    }

    return (
        <nav aria-label="Pagination">
            <ul className="pagination pagination-light mb-0">
                {currentPage-1 > 0 &&
                    <>
                        <li className="page-item">
                            <button className="page-link" onClick={()=>onPageChangeHandler(1)}><i className="fi-chevrons-left"></i></button>
                        </li>
                        <li className="page-item">
                            <button className="page-link" onClick={()=>onPageChangeHandler(currentPage-1)}><i className="fi-chevron-left"></i></button>
                        </li>
                    </>}
                <li className="page-item d-sm-none text-nowrap"><span className="page-link page-link-static">{currentPage} / {totalPages}</span></li>
                {pages.map((page, index)=>{
                    if(page==currentPage){
                        return <li key={index} className="page-item active d-none d-sm-block" aria-current="page"><span className="page-link">{page}<span className="visually-hidden">(current)</span></span></li>
                    }else if(currentPage-3<page && currentPage+3>page){
                        return <li key={index} className="page-item d-none d-sm-block"><button className="page-link" onClick={()=>onPageChangeHandler(page)}>{page}</button></li>
                    }
                })}
                {currentPage < totalPages && 
                    <>
                        <li className="page-item d-none d-sm-block">
                            <button className="page-link" onClick={()=>onPageChangeHandler(currentPage+1)}><i className="fi-chevron-right"></i></button>
                        </li>
                        <li className="page-item d-none d-sm-block">
                            <button className="page-link" onClick={()=>onPageChangeHandler(totalPages)}><i className="fi-chevrons-right"></i></button>
                        </li>
                    </>}
            </ul>
        </nav>
    )
}

export default Pagination

Pagination.defaultProps = {
    currentPage: 1,
    count: 0,
    links: {},
    perPage:0,
    totalPages:1,
}

Pagination.propTypes={
    currentPage: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    links: PropTypes.object.isRequired,
    perPage:PropTypes.number.isRequired,
    totalPages:PropTypes.number.isRequired,
}
