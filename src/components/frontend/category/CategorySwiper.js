import React, { useEffect } from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import CategoryHomePaper from "./CategoryHomePaper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadCategories } from "../../../store/actions/categoryActions";
import { configs } from "../../../config/configs";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
    "& .swiper-button-prev, .swiper-button-next": {
      color: theme.palette.primary.main,
      height: 22,
      width: 16,
    },
    "& .swiper-button-prev::after, .swiper-button-next::after": {
      fontSize: 30,
      [theme.breakpoints.down("sm")]: {
        fontSize: 0,
      },
    },
  },
  titleSpan: {
    color: theme.palette.primary.main,
    fontSize: "1.5rem",
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  white: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  viewall: {
    float: "right",
    color: configs.viewall,
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      fontWeight: 600,
    },
  },
  swiperRoot: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
    "& .swiper-button-prev, .swiper-button-next": {
      color: theme.palette.primary.main,
      height: 22,
      width: 16,
    },
    "& .swiper-button-prev::after, .swiper-button-next::after": {
      fontSize: 30,
      [theme.breakpoints.down("sm")]: {
        fontSize: 0,
      },
    },
    "& .swiper-slide": {
      width: "auto",
      marginRight: 10,
    },
  },
  spacer: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
    },
  },
}));

function CategorySwiper(props) {
  const classes = useStyles();

  useEffect(() => {
    props.loadCategories();
  }, []);

  return (
    <div className={classes.white}>
      <span className={classes.titleSpan}>Top Categories</span>
      <Button component={Link} to="/categories" className={classes.viewall}>
        View All
      </Button>

      {!props.categories.length && (
        <Skeleton
          variant="rect"
          height={200}
          width={200}
          className={classes.spacer}
        />
      )}

      {props.categories && (
        <Swiper
          className={classes.swiperRoot}
          slidesPerView={"auto"}
          navigation
          height={300}
        >
          {props.categories.map((cate) => (
            <SwiperSlide key={cate.id}>
              <CategoryHomePaper
                title={cate.title}
                url={cate.imageURL}
                categoryId={cate.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
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

export default connect(mapStateToProps, matchDispatchToProps)(CategorySwiper);
