import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
//import { PayPalButton } from "react-paypal-button-v2";
import { useHistory, useRouteMatch } from "react-router";
import { RootState } from "../store";

export const OrderPage = (): JSX.Element => {
  const match = useRouteMatch<{ id: string }>();
  const orderId = match.params.id;
  const history = useHistory();
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  /*const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;*/

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  /*if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }*/

  /*useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/congig/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      setSdkReady(true);
    }
  }, [dispatch, order, orderId, userInfo, history]);*/

  return <div>hello</div>;
};
