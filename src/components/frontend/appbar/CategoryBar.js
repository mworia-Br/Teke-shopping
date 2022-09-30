import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import PincodeDialog from "./PincodeDialog";
import { connect } from "react-redux";

import { loadCategories } from "../../../store/actions/categoryActions";
import { configs } from "../../../config/configs";

const useStyles = makeStyles((theme) => ({
  catBarRoot: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: "2px",
    paddingBottom: "2px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: "0px",
      paddingBottom: "0px",
      height: "36px",
    },
  },
  catDelivery: {
    background: "url(/imgs/location-on.svg) left center no-repeat",
    backgroundSize: "24px",
    padding: " 0 10px 0 30px",
    height: "auto",
    color: theme.palette.primary.main,
    fontSize: "12px",
    cursor: "pointer",
  },
  pincode: {
    display: "block",
    fontWeight: 600,
    fontSize: "14px",
    [theme.breakpoints.down("xs")]: {
      display: "inline",
    },
  },
  category: {
    fontWeight: 600,
    fontSize: "14px",
    paddingLeft: "18px",
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
}));

function CategoryBar(props) {
  const classes = useStyles();
  const catLimit = configs.maxCategoriesOnBar;
  useEffect(() => {
    props.loadCategories();
  }, []);

  return (
    <div className={classes.catBarRoot}>
      <PincodeDialog />
      <Hidden xsDown>
        {props.categories &&
          props.categories.map((category, idx) => {
            if (idx < catLimit) {
              return (
                <Link
                  key={category.id}
                  className={classes.category}
                  to={"/category/" + category.id}
                >
                  {category.title}
                </Link>
              );
            } else {
              return <div />;
            }
          })}
        {props.categories && props.categories.length > catLimit && (
          <Link className={classes.category} to="/categories">
            Others
          </Link>
        )}
      </Hidden>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.category.categories,
  };
};
const matchDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(loadCategories()),
  };
};
export default connect(mapStateToProps, matchDispatchToProps)(CategoryBar);
