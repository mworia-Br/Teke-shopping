import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Hidden,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  orderDiv: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    border: "1px solid rgba(111,114,132,.25)",
    borderRadius: theme.shape.borderRadius,
    position: "relative",
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.01)",
    },
  },
  status: {
    color: "rgba(0,0,0,.5)",
    fontSize: 14,
    fontWeight: 600,
  },
  total: {
    color: "rgba(0,0,0,.5)",
    fontSize: 14,
    textAlign: "right",
    fontWeight: 600,
  },
  statusVal: {
    color: "#000000",
    fontSize: 18,
    fontWeight: 700,
  },
  totalVal: {
    color: "#000000",
    fontSize: 18,
    textAlign: "right",
    fontWeight: 700,
  },
  title: {
    color: "#000000",
    fontSize: 12,
    fontWeight: 500,
    marginTop: 4,
  },
  quantity: {
    color: "rgba(0,0,0,.8)",
    fontSize: 10,
    fontWeight: 500,
  },
  unitP: {
    fontSize: 12,
    color: "#000000",
    fontWeight: 500,
    textAlign: "right",
  },
  itemGrid: {
    marginTop: theme.spacing(1),
  },
  btnsGrid: {
    marginTop: theme.spacing(1),
  },
  orderBtn: {
    fontSize: 14,
    textTransform: "none",
    margin: 4,
    width: "100%",
    height: 36,
    lineHeight: 1,
  },
  itemDiv: {
    display: "contents",
  },
  moreDiv: {
    color: "rgba(0,0,0,.8)",
    fontSize: 12,
    fontWeight: 700,
    padding: 4,
  },
  dialog: {
    minWidth: 300,
  },
}));

const getItems = (cart) => {
  const items = [];
  if (!cart) return items;
  const citems = cart.split("|");
  citems.forEach((c) => {
    const sc = c.split(";");
    if (sc.length === 5)
      items.push({
        name: sc[0],
        quantity: parseInt(sc[1]),
        price: sc[2],
        variant: sc[3],
      });
  });
  return items;
};

const getItemsCount = (cart) => {
  return cart.split("|").length;
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OrderCard({ order, cancelOrder }) {
  const classes = useStyles();
  const maxCount = 3;
  const [openAlert, setOpenAlert] = useState(false);

  const handleClickOpen = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpenAlert(false);
  };

  const handleCancelYes = () => {
    cancelOrder(order.id);
    handleClose();
  };

  return (
    <div className={classes.orderDiv}>
      <Grid container>
        <Grid item xs={6}>
          <div className={classes.status}>Order Status</div>
          <div className={classes.statusVal}>
            {order.deliverd && "Delivered"}
            {order.cancelled && "Cancelled"}
            {!order.deliverd && !order.cancelled && "Shipping"}
          </div>
        </Grid>
        <Grid item xs={6} container justify="flex-end">
          <div className={classes.total}>
            Order Total ({getItemsCount(order.cart)} items)
          </div>
          <div className={classes.totalVal}>₹ {order.amount} </div>
        </Grid>
        <Grid item container className={classes.itemGrid} xs={12} sm={9}>
          {getItems(order.cart).map((item, idx) => {
            if (idx === maxCount) {
              return (
                <Grid container justify="center">
                  <Grid className={classes.moreDiv} item xs="auto">
                    + {getItemsCount(order.cart) - maxCount} more
                  </Grid>
                </Grid>
              );
            } else if (idx <= maxCount - 1) {
              return (
                <div className={classes.itemDiv} key={idx}>
                  <Grid item xs={10}>
                    <div className={classes.title}>
                      {item.name} ({item.variant})
                    </div>
                    <div className={classes.quantity}>
                      Quantity: {item.quantity}{" "}
                    </div>
                  </Grid>
                  <Grid item xs={2} container justify="flex-end">
                    <div className={classes.unitP}>₹ {item.price} </div>
                  </Grid>
                </div>
              );
            }
          })}
        </Grid>
        <Hidden xsDown>
          <Grid
            item
            xs={3}
            className={classes.btnsGrid}
            container
            justify="flex-end"
          >
            <Grid item xs={8}>
              <Button
                component={Link}
                to="/aboutus"
                color="primary"
                className={classes.orderBtn}
                variant="contained"
              >
                Need Help
              </Button>
              <Button
                onClick={handleClickOpen}
                className={classes.orderBtn}
                variant="outlined"
                disabled={order.deliverd || order.cancelled}
              >
                Cancel Order
              </Button>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
      <Hidden smUp>
        <Grid className={classes.btnsGrid} container justify="space-around">
          <Grid item xs="auto">
            <Button
              component={Link}
              to="/aboutus"
              color="primary"
              className={classes.orderBtn}
              variant="contained"
            >
              Need Help
            </Button>
          </Grid>
          <Grid item xs="auto">
            <Button
              onClick={handleClickOpen}
              disabled={order.deliverd || order.cancelled}
              className={classes.orderBtn}
              variant="outlined"
            >
              Cancel Order
            </Button>
          </Grid>
        </Grid>
      </Hidden>
      <Dialog
        open={openAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className={classes.dialog}>Alert!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure to cancel order ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelYes} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OrderCard;
