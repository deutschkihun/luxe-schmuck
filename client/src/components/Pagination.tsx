import React from "react";
import { Link } from "react-router-dom";
import { PaginationProps } from "../helper/interface";

export const Pagination = (props: PaginationProps): JSX.Element => {
  const { isAdmin, category, keyword, page, pages } = props;
  const redirectTo = (pageNum: number) => {
    if (isAdmin) {
      return `/admin/productlist/${pageNum}`;
    }

    if (category) {
      return `/product/category/${category}/page/${pageNum}`;
    }

    if (keyword) {
      return `/product/search/${keyword}/page/${pageNum}`;
    }

    return `/product/page/${pageNum}`;
  };

  return pages > 1 ? (
    <div className="pagination">
      {Array.from(Array(pages).keys()).map((x) => (
        <div key={x + 1} className="pagination__item">
          <Link to={redirectTo(x + 1)}>
            <div className={`${x + 1 === page ? "active" : "number"}`}>
              {x + 1}
            </div>
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
};
