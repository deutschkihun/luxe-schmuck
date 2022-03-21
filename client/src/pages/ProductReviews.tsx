import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { createProductReview } from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../actions/types";
import { Rating } from "../components/Rating";
import { ProductProps, ProductReview } from "../helper/interface";
import {
  Form,
  HighlightLink,
  Message,
  ReviewContainer,
  SubmitButton,
  SubmitInput,
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
  const [reviewMsg, setReviewMsg] = useState<string>("");
  const [body, setBody] = useState<ProductReview>();

  const productReviewCreate = useSelector(
    (state: RootState) => state.productReviewCreate
  );
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  /*useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    //dispatch(listProductDetails(match.params.id));
  }, [successProductReview]);*/

  const { handleSubmit } = useForm<ProductReview>({
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<ProductReview> = (data: ProductReview) =>
    setBody(data);

  useEffect(() => {
    body &&
      dispatch(
        createProductReview(match.params.id, {
          rating,
          comment,
        })
      );

    return () => {
      setBody(undefined);
    };
  }, [body]);

  return (
    <ReviewContainer>
      <Title style={{ borderBottom: "none" }}>Create new reviews</Title>
      {errorProductReview && <Warning>{errorProductReview}</Warning>}
      {userInfo ? (
        <form style={{ maxWidth: "none" }}>
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
          <TextArea onChange={(e) => setComment(e.target.value)}></TextArea>
          {reviewMsg && <Warning>{errorProductReview}</Warning>}
          <button className="btn">SUBMIT</button>
        </form>
      ) : (
        <Warning>
          Login required
          <SubmitButton onClick={() => history.push("/login")}>
            sign in
          </SubmitButton>
        </Warning>
      )}
      <Title style={{ borderBottom: "none" }}>Reviews</Title>
      {product.reviews.length === 0 && (
        <Warning>There is no review. Please leave your reviews.</Warning>
      )}
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
    </ReviewContainer>
  );
};
