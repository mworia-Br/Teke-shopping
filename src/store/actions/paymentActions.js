import axios from "axios";
//import { v4 as uuid } from "uuid/";
import { configs } from "../../config/configs";
import { firestore } from "../../config/firebaseConfig";
import { clearCart } from "./cartActions";

const calcTPrice = (items) => {
  if (!items && items.length === 0) return 0;
  var res = 0;
  items.forEach((item) => {
    res += item.quantity * item.totalPrice;
  });
  return res;
};

const serializeItems = (items) => {
  var cart = [];

  items.forEach((item) => {
    cart.push(
      item.title +
        ";" +
        item.quantity +
        ";" +
        item.totalPrice +
        ";" +
        item.unit +
        ";" +
        item.id
    );
  });
  return cart.join("|");
};

export const createOrder = (cod) => async (dispatch, getState) => {
  const state = getState();

  dispatch({ type: "PAYMENT_START" });

  var amount = calcTPrice(state.cart.items);
  var cartData = serializeItems(state.cart.items);
  if (state.firebase.auth.uid) {
    try {
      const options = {
        amount: amount,
        order_data: cartData,
        user_id: state.firebase.auth.uid,
        user_name: state.firebase.profile.name,
        delivery: state.firebase.profile.delivery,
        pincode: state.firebase.profile.pincode,
        pnum: state.firebase.profile.pNum,
        cod: cod,
      };
      var amount = amount;
      var order_data = cartData;
      var user_id = state.firebase.auth.uid;
      var user_name = state.firebase.profile.name;
      var address = state.firebase.profile.delivery;
      var pincode = state.firebase.profile.pincode;
      var pnum = state.firebase.profile.pNum;
      var cod = cod; 

      //var ordersRef = firestore.collection(`orders`);
      //var docname = uuid();

      await firestore.collection("orders").add({
        user_id: user_id,
        user_name: user_name,
        payment_id: "",
        cart: order_data,
        deliverd: false,
        amount: amount,
        completed: true,
        address: address,
        pincode: pincode,
        pnum: pnum,
        cod: true,
        cancelled: false,
        time: new Date(),
      });
      var cod = cod;
      const res = await axios.post(
        configs.functionsURL + "/create_order",
        options
      );
      if (cod) {
        dispatch({
          type: "COD_DONE",
        });
        dispatch(clearCart());
      } else {
        dispatch({
          type: "COD_DONE",
        });
        dispatch(clearCart());
      }
    } catch (err) {
      dispatch({
        type: "ORDER_ID_NOT_GEN",
        err: err,
      });
    }
  }
};

export const verifyOrder = (
  razorpay_signature,
  razorpay_order_id,
  razorpay_payment_id
) => async (dispatch, getState) => {
  const state = getState();
  if (state.firebase.auth.uid) {
    try {
      const options = {
        razorpay_signature,
        razorpay_order_id,
        razorpay_payment_id,
      };
      const res = await axios.post(
        configs.functionsURL + "/verify_order",
        options
      );
      dispatch({
        type: "TRANS_VERIFIED",
        payload: res.data,
      });
      dispatch(clearCart());
    } catch (err) {
      dispatch({
        type: "TRANS_NOT_VERIFIED",
        err: err,
      });
    }
  }
};

export const resetPaymentState = () => {
  return (dispatch) => {
    dispatch({ type: "RESET_PAY_STATE" });
  };
};

export const cancelOrder = (orderID) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("orders")
      .doc(orderID)
      .update({
        cancelled: true,
      })
      .then(() => {
        dispatch({ type: "CANCEL_SUCCESS", orderID: orderID });
      })
      .catch((err) => {
        dispatch({ type: "CANCEL_ERR", err: err });
      });
  };
};

export const deliveredOrder = (orderID) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("orders")
      .doc(orderID)
      .update({
        deliverd: true,
      })
      .then(() => {
        dispatch({ type: "DELIVERED_SUCCESS", orderID: orderID });
      })
      .catch((err) => {
        dispatch({ type: "DELIVERED_ERR", err: err });
      });
  };
};
