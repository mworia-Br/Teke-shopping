import productReducer from "./productReducer";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import bannerReducer from "./bannerReducer";
import cartReducer from "./cartReducer";
import locationReducer from "./locationReducer";
import paymentReducer from "./paymentReducer";
import searchReducer from "./searchReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
  banner: bannerReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  cart: cartReducer,
  location: locationReducer,
  auth: authReducer,
  payment: paymentReducer,
  search: searchReducer,
});

export default rootReducer;
