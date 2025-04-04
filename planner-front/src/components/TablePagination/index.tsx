import { Dispatch, SetStateAction} from 'react';
import { Pagination } from 'react-bootstrap';
import "./style.css";

interface Props{
    totalPages: number,
    page: number,
    setPage: Dispatch<SetStateAction<number>>;
}

const TablePagination: React.FC<Props> = ({ totalPages, page, setPage }) => {
    
    const addPaginationItem = (pageNumber: number, isActive: boolean = false) => (
      <Pagination.Item
        key={pageNumber}
        active={isActive}
        onClick={() => setPage(pageNumber - 1)}
      >
        {pageNumber}
      </Pagination.Item>
    );

    const generatePaginationItems = () => {
        const items: React.ReactElement[] = [];
    
        if (totalPages <= 1) {
          return items;
        }
    
        items.push(<Pagination.First key="first" disabled={ page === 0 } onClick={() => setPage(0)} />);
        items.push(<Pagination.Prev key="prev" disabled={ page === 0 } onClick={() => setPage(page > 1 ? page - 1 : 0)} />);
    
        if (totalPages <= 5) {
          for (let i = 1; i <= totalPages; i++) {
            items.push(addPaginationItem(i, i === page + 1));
          }
        } else {
          const firstVisiblePage = Math.max(1, Math.min(page - 1, totalPages - 4));
          const lastVisiblePage = Math.min(totalPages, firstVisiblePage + 4);

          if (firstVisiblePage > 1) {
            items.push(<Pagination.Ellipsis key="ellipsis-first" />);
          }
    
          for (let i = firstVisiblePage; i <= lastVisiblePage; i++) {
            items.push(addPaginationItem(i, i === page + 1));
          }
    
          if (lastVisiblePage < totalPages) {
            items.push(<Pagination.Ellipsis key="ellipsis-last" />);
          }
        }
    
        items.push(<Pagination.Next key="next" disabled={(page + 1) === totalPages} onClick={() => setPage((page + 1) < totalPages ? page + 1 : totalPages - 1)} />);
        items.push(<Pagination.Last key="last" disabled={(page + 1) === totalPages} onClick={() => setPage(totalPages - 1)} />);
    
        return items;
    };
    
    return (
        <Pagination className="justify-content-center custom-pagination">
            {generatePaginationItems()}
        </Pagination>
    );
};

export default TablePagination;