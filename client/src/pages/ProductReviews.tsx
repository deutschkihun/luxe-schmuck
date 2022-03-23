import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import {
  createProductReview,
  listProductDetails,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../actions/types";
import { LoadingView } from "../components/LoadingView";
import { ProductProps } from "../helper/interface";
import {
  Button,
  Message,
  ReviewContainer,
  SubmitButton,
  TextArea,
  Title,
  Warning,
} from "../helper/lib";
import { RootState } from "../store";

interface Props {
  product: ProductProps;
}

export const ProductReviews = (props: Props): JSX.Element => {
  const { product } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch<{ id: string }>();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const productReviewCreate = useSelector(
    (state: RootState) => state.productReviewCreate
  );
  const {
    loading,
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      console.log(rating, comment);
      setComment("");
      setRating(0);
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      dispatch(listProductDetails(match.params.id));
    }
  }, [successProductReview]);

  useEffect(() => {
    if (loading) {
      setComment("");
      setRating(0);
    }
  }, [loading]);

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
      {loading ? (
        <LoadingView
          title={"Loading ..."}
          body={"We are processing the requested work."}
        />
      ) : (
        <>
          <ReviewContainer>
            <Title style={{ borderBottom: "none" }}>Create new reviews</Title>
            {errorProductReview && <Warning>{errorProductReview}</Warning>}
            {userInfo ? (
              <form style={{ maxWidth: "none" }} onSubmit={submitHandler}>
                <Message>Rating</Message>
                <select
                  placeholder="Enter name"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                >
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
                <Message>Comment</Message>
                <TextArea
                  onChange={(e) => setComment(e.target.value)}
                ></TextArea>
                <Button type="button" onClick={submitHandler}>
                  SUBMIT
                </Button>
              </form>
            ) : (
              <Warning>
                Login required
                <SubmitButton onClick={() => history.push("/login")}>
                  sign in
                </SubmitButton>
              </Warning>
            )}
          </ReviewContainer>
          <Title style={{ borderBottom: "none" }}>Reviews</Title>
          {product?.reviews?.length === 0 ? (
            <Warning style={{ textAlign: "center" }}>
              There is no review. Please leave your reviews.
            </Warning>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">EMAIL</th>
                  <th scope="col">RATING</th>
                  <th scope="col">DATE</th>
                  <th scope="col">COMMENT</th>
                </tr>
              </thead>
              <tbody>
                {product?.reviews?.map((review, index) => (
                  <tr key={index}>
                    <td>{review.email}</td>
                    <td>{review.rating}</td>
                    <td>{review.createdAt?.substring(0, 10)}</td>
                    <td>{review.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </>
  );
};
