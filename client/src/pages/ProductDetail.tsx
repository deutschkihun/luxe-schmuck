import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../actions/types";
import { MatchParams } from "../helper/interface";
import { Rating } from "../components/Rating";
import { RootState } from "../store";
import { HighlightLink, Warning } from "../helper/lib";
import { LoadingView } from "../components/LoadingView";

export const ProductDetailPage = (props: MatchParams): JSX.Element => {
  const history = useHistory();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector(
    (state: RootState) => state.productDetails
  );
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector(
    (state: RootState) => state.productReviewCreate
  );
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(props.match.params.id));
  }, [dispatch, props.match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };

  const submitHandler = () => {
    dispatch(
      createProductReview(props.match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingView title={"Loading ..."} body={"please wait a moment"} />
        ) : product ? (
          <>
            <div className="productDeatil">
              <div className="productDetail__box">
                <img src={product?.image} alt={product?.productname} />
              </div>
              <div className="description-box">
                <div className="heading">{product.productname}</div>
                <Rating
                  value={product?.rating}
                  text={`${product?.numReviews} reviews`}
                />
                <div> ${product?.price} </div>
                <div className="description">
                  DESCRIPTION: {product.description}
                </div>
                <div
                  className={`${
                    (product.countInStock as number) > 0
                      ? "in-stock"
                      : "sold-out"
                  }`}
                >
                  {(product?.countInStock as number) > 0
                    ? "In Stock"
                    : "Out Of Stock"}
                </div>
                {(product.countInStock as number) > 0 && (
                  <div className="quantity">
                    <span>Qty</span>
                    <select className="select" value={qty}>
                      {Array.from(Array(product.countInStock).keys()).map(
                        (x, index) => (
                          <option key={index} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
                <button
                  className={`${
                    product.countInStock === 0 ? "disabled" : "btn"
                  }`}
                  onClick={addToCartHandler}
                >
                  ADD TO CART
                </button>
              </div>
            </div>

            <div className="productDetail__review">
              <h3>REVIEWS</h3>
              {product.reviews.length === 0 && <Warning>No Reviews</Warning>}
              <div>
                {product?.reviews.map((review, index) => (
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
                    Please <HighlightLink to="/login">Sign In</HighlightLink> to
                    write a review
                  </Warning>
                )}
              </div>
            </div>
          </>
        ) : (
          <Warning>{error as string}</Warning>
        )}
      </div>
    </>
  );
};
