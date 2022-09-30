export const createProduct = (product) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    var fileID;
    const imageData = product.imageData;
    delete product.imageData;
    firestore
      .collection("products")
      .add({
        ...product,
        imageURL: "",
      })
      .then((resp) => {
        fileID = resp.id;
        var storageRef = firebase
          .storage()
          .ref()
          .child("productImages/" + fileID);
        return storageRef.putString(imageData, "data_url");
      })
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        firestore
          .collection("products")
          .doc(fileID)
          .update({ imageURL: downloadURL });
      })
      .then(() => {
        var categoryRef = firestore
          .collection("categories")
          .doc(product.category);

        return categoryRef.update({
          count: firestore.FieldValue.increment(1),
        });
      })
      .then(() => {
        dispatch({ type: "CREATE_PRODUCT", product });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_PRODUCT_ERR", err });
      });
  };
};

export const updateProduct = (changedProduct, product) => {
  return (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    firestore
      .collection("products")
      .doc(product.id)
      .update({ ...changedProduct })
      .then(() => {
        dispatch({ type: "UPDATE_PRODUCT", product });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_PRODUCT_ERR", err });
      });
  };
};

export const updateProductImage = (product, imageData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    var storageRef = firebase
      .storage()
      .ref()
      .child("productImages/" + product.id);
    storageRef
      .putString(imageData, "data_url")
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        return firestore
          .collection("products")
          .doc(product.id)
          .update({ imageURL: downloadURL });
      })
      .then(() => {
        dispatch({ type: "UPDATE_PRODUCT_IMAGE", product });
      })
      .catch((err) => {
        dispatch({ type: "UPDATE_PRODUCT_IMAGE_ERR", err });
      });
  };
};

export const deleteProduct = (product) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    firestore
      .collection("products")
      .doc(product.id)
      .delete()
      .then(() => {
        var imageRef = firebase
          .storage()
          .ref()
          .child("productImages/" + product.id);
        return imageRef.delete();
      })
      .then(() => {
        return firestore
          .collection("categories")
          .doc(product.category)
          .update({
            count: firestore.FieldValue.increment(-1),
          });
      })
      .then(() => {
        dispatch({ type: "DELETE_PRODUCT", product });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_PRODUCT_ERR", err });
      });
  };
};

export const closeSnackbar = () => {
  return (dispatch, getState) => {
    dispatch({ type: "CLOSE_SNACKBAR_PRODUCT" });
  };
};

export const disableSubmit = () => {
  return (dispatch, getState) => {
    dispatch({ type: "DISABLE_SUBMIT_PRODUCT" });
  };
};

export const loadSpecials = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    var state = getState();
    if (state.product.specials.length === 0) {
      firestore
        .collection("products")
        .where("special", "==", true)
        .where("visibility", "==", true)
        .orderBy("discount", "desc")
        .orderBy("title", "asc")
        .get()
        .then((snapshot) => {
          return snapshot.docs.map((doc) => {
            var data = doc.data();
            return { id: doc.id, ...data };
          });
        })
        .then((specials) => {
          dispatch({ type: "LOAD_SPECIALS", specials });
        });
    }
  };
};
