import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PageHeader from "../common/PageHeader";
import { AddBox } from "@material-ui/icons";
import AddProductForm from "./AddProductForm";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  heading: {
    padding: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  divAlign: {
    marginTop: "100px",
    marginLeft: "240px",
    backgroundColor: "#E4E4E4",
    minHeight: "calc(100vh - 100px)",
    paddingBottom: "40px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "50px",
      marginLeft: "0px",
      minHeight: "calc(100vh - 50px)",
    },
  },
  paperStyles: {
    padding: "20px",
    margin: "16px",
    backgroundColor: "#FFFFFF",
    marginBottom: "40px",
  },
}));

function AddProduct() {
  const classes = useStyles();
  return (
    <div className={classes.divAlign}>
      <PageHeader
        title={"Add Product"}
        icon={<AddBox fontSize="large" />}
        subTitle={"Add new products to the listing"}
      />
      <Paper elevation={2} className={classes.paperStyles}>
        <AddProductForm />
      </Paper>
    </div>
  );
}

export default AddProduct;
