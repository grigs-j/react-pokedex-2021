import React from "react";

const Pagination = ({ gotoPrevPage, gotoNextPage }) => {
    return (
        <div>
            {gotoNextPage && <button onClick={gotoNextPage}>next 12</button>}
            {gotoPrevPage && (
                <button onClick={gotoPrevPage}>previous 12</button>
            )}
        </div>
    );
};

export default Pagination;
