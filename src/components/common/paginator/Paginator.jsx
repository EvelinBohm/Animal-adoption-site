import "./Paginator.css";


const Paginator =({totalPages, currentPage, handlePageChange})=>{

return(
    <div>
        <span>Pages: </span>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`list-page-button ${
              index + 1 === currentPage ? "list-active" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
)

};

export default Paginator;