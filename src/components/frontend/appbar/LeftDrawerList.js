import React from "react";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(1),
  },
}));

const itemList1 = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Shop by Category",
    link: "/categories",
  },
  {
    name: "All Offers",
    link: "/deals",
  },
];

const itemList2 = [
  {
    name: "My Account",
    link: "/account",
  },
  {
    name: "About us",
    link: "/aboutus",
  },
];

function LeftDrawerList(props) {
  const classes = useStyles();
  return (
    <List>
      {itemList1.map(({ name, link }, idx) => {
        return (
          <ListItem
            component={Link}
            to={link}
            key={idx}
            button
            onClick={props.onClick}
          >
            <ListItemText className={classes.itemRoot} primary={name} />
          </ListItem>
        );
      })}
      <Divider className={classes.divider} />
      {itemList2.map(({ name, link }, idx) => {
        return (
          <ListItem
            component={Link}
            to={link}
            key={idx}
            button
            onClick={props.onClick}
          >
            <ListItemText className={classes.itemRoot} primary={name} />
          </ListItem>
        );
      })}
    </List>
  );
}

export default LeftDrawerList;
