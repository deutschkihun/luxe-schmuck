import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { createProductReview } from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../actions/types";
import { Rating } from "../components/Rating";
import { ProductProps } from "../helper/interface";
import { HighlightLink, Warning } from "../helper/lib";
import { RootState } from "../store";

interface Props {
  product: ProductProps;
}

export const ProductReviews = (props: Props): JSX.Element => {
  const { product } = props;
  const dispatch = useDispatch();
  const match = useRouteMatch<{ id: string }>();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const productReviewCreate = useSelector(
    (state: RootState) => state.productReviewCreate
  );
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    //dispatch(listProductDetails(match.params.id));
  }, [successProductReview]);

  const submitHandler = () => {
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <div className="productDetail__review">
        <h3>REVIEWS</h3>
        {product.reviews.length === 0 && <Warning>No Reviews</Warning>}
        <div>
          {product.reviews.map((review, index) => (
            <div className="productDetail__review__container" key={index}>
              <div className="productDetail__review__container__item">
                <strong>{review.name}</strong>
              </div>
              <div className="productDetail__review__container__item">
                <Rating value={review.rating} />
              </div>
              <div className="productDetail__review__container__item">
                {review.createdAt?.substring(0, 10)}
              </div>
              <div className="productDetail__review__container__item__content">
                {review.comment}
              </div>
            </div>
          ))}
        </div>
        <div className="productDetail__review__create">
          <h3>WRITE A CUSTOMER REVIEW</h3>
          {errorProductReview && <Warning>{errorProductReview}</Warning>}
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <div className="form__content">
                <div>Rating</div>
                <select placeholder="Enter name" value={rating}>
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>

              <div className="form__content__comment">
                <div>Comment</div>
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <button className="btn">SUBMIT</button>
            </form>
          ) : (
            <Warning>
              Please <HighlightLink to="/login">Sign In</HighlightLink> to write
              a review
            </Warning>
          )}
        </div>
      </div>
    </>
  );
};
