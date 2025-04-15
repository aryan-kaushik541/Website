import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Admin/Navbar";
import Sidebar from "./Admin/Sidebar";
import { useHistory } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";
import { useAlert } from "react-alert";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { getAdminProducts } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import { clearErrors } from "../../actions/errorAction";

import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

import ProductImg from "../../assets/product-bg.jpg";
import ordersImg from "../../assets/orders-bg.jpg";
import usersImg from "../../assets/users-bg.jpg";

import { ShoppingCart, AssignmentInd, People, BarChart } from "@material-ui/icons";

Highcharts3D(Highcharts);

const useStyles = makeStyles((theme) => ({
  dashboard: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    width: "100%",
    gap: "1rem",
    overflow: "hidden",
    margin: 0,
    padding: 0,
  },
  firstBox: {
    width: "20%",
    margin: "0rem",
    height: "fit-content",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    display: "block",
    [theme.breakpoints.down("999")]: {
      display: "none",
    },
  },

  toggleBox: {
    width: "16rem",
    margin: "0rem",
    height: "fit-content",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    display: "block",
    zIndex: "100",
    position: "absolute",
    top: "58px",
    left: "17px",
  },
  secondBox: {
    width: "75%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyContent: "center",
    [theme.breakpoints.down("999")]: {
      width: "100%",
    },
  },
  navBar: {
    margin: "0rem",
  },
  summaryCard: {
    display: "flex",
    justifyContent: "center",
    color: "white",
    width: "100%",
    height: "15rem",
    gap: "1rem",
    margin: "1rem 0 0 0",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      height: "20rem",
      alignItems: "center",
      marginTop: "7rem !important",
    },
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#414141",
    margin: "0 1rem ",
    width: "30%",
    height: "10rem",

    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    transition: "transform 0.2s ease-in-out",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.1) !important",
      backgroundColor: "#ed1c24 ",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, black) !important",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "32% !important",
      marginBottom: "1rem !important",
      padding: "1rem 2rem ! important",
    },
    [theme.breakpoints.down("sm")]: {
      width: "85% !important",
      marginBottom: "1rem !important",
      padding: "2rem 2rem ! important",
    },
    [theme.breakpoints.down("xs")]: {
      width: "85%",

      padding: "1.2rem",
      margin: "0   auto",
      marginBottom: "1rem",
      "&:hover": {
        transform: "scale(1.05) !important",
      },
    },
  },
  textContainer: {
    marginTop: "0.5rem",
    textAlign: "center",
    color: "white",
    textShadow: "1px 1px 2px black",
  },
  heading: {
    fontSize: "20px",
    fontWeight: 800,
    marginBottom: "0.5rem",
    textShadow: "1px 1px 2px black",
    [theme.breakpoints.down("md")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "22px",
    },
  },
  number: {
    fontSize: "1.5rem",
    fontWeight: 500,
    textShadow: "1px 1px 2px black",
  },
  headerContent: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    color: "white",

    [theme.breakpoints.down("md")]: {
      "& svg": {
        fontSize: "2rem",
      },
    },

    [theme.breakpoints.down("sm")]: {
      "& svg": {
        fontSize: "3rem",
      },
    },
  },
  revenue: {
    width: "100%",
    height: "fit-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "-2.5rem auto 0",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      marginTop: "5rem !important",
    },
  },
  doughnutChart: {
    height: "fit-content",
    width: "42%",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    padding: "1rem 2rem",
    margin: "0 1rem",
    [theme.breakpoints.down("md")]: {
      width: "30%",
      padding: "1rem 3rem",
      ".highcharts-background": {
        height: "350px !important",
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "85%",
      padding: "2rem",
      marginTop: "2rem",
    },

    [theme.breakpoints.down("xs")]: {
      width: "85%",
      marginBottom: "1rem",
      padding: "1.2rem",
    },
  },
  revnueContainer: {
    width: "42%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 1rem",
    height: "400px",
    backgroundColor: "black",
    borderRadius: "5px",
    padding: "1rem 2rem",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    transition: "background-color 0.3s",

    [theme.breakpoints.down("sm")]: {
      width: "85% !important",
      padding: "1rem",
      height: "250px",
    },

    [theme.breakpoints.down("md")]: {
      width: "30%",
      padding: "1rem 3rem",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "1rem",
      width: "85% !important",
      padding: "2rem !important",
      height: "250px",
    },

    [theme.breakpoints.down("xs")]: {
      width: "85%",
      marginBottom: "1rem",
      padding: "1rem !important",
    },
  },
  lineChart: {
    width: "90%",
    height: "fit-content",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    padding: "2rem",
    margin: "1rem auto",

    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },

    [theme.breakpoints.down("xs")]: {
      width: "85%",
      marginBottom: "1rem",
      padding: "1.2rem",
    },
  },
}));

function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const { products, loading, error } = useSelector((state) => state.products);
  const { orders, error: ordersError } = useSelector(
    (state) => state.allOrders
  );
  const { users, error: usersError } = useSelector((state) => state.allUsers);
  const alert = useAlert();

  const outOfStockCount = useMemo(() => {
    return products?.filter((p) => p.stock === 0).length || 0;
  }, [products]);

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (ordersError) {
      alert.error(ordersError);
      dispatch(clearErrors());
    }
    if (usersError) {
      alert.error(usersError);
      dispatch(clearErrors());
    }
  }, [dispatch, error, ordersError, usersError, alert]);

  const options = {
    chart: {
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
      },
    },
    title: {
      text: "Product Stock Overview",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        depth: 35,
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Products",
        data: [
          ["In Stock", products.length - outOfStockCount],
          {
            name: "Out of Stock",
            y: outOfStockCount,
            sliced: true,
            selected: true,
          },
        ],
      },
    ],
  };

  return (
    <>
      <MetaData title="Admin Dashboard" />
      {loading ? (
        <Loader />
      ) : (
        <div className={classes.dashboard}>
          <div className={classes.firstBox}>
            <Sidebar />
          </div>

          <div className={classes.secondBox}>
            <Navbar />

            <div className={classes.summaryCard}>
              <div
                className={classes.cardContainer}
                onClick={() => history.push("/admin/products")}
              >
                <div className={classes.headerContent}>
                  <ShoppingCart />
                  <div className={classes.textContainer}>
                    <Typography className={classes.heading}>Products</Typography>
                    <Typography className={classes.number}>
                      {products.length}
                    </Typography>
                  </div>
                </div>
              </div>

              <div
                className={classes.cardContainer}
                onClick={() => history.push("/admin/orders")}
              >
                <div className={classes.headerContent}>
                  <AssignmentInd />
                  <div className={classes.textContainer}>
                    <Typography className={classes.heading}>Orders</Typography>
                    <Typography className={classes.number}>
                      {orders.length}
                    </Typography>
                  </div>
                </div>
              </div>

              <div
                className={classes.cardContainer}
                onClick={() => history.push("/admin/users")}
              >
                <div className={classes.headerContent}>
                  <People />
                  <div className={classes.textContainer}>
                    <Typography className={classes.heading}>Users</Typography>
                    <Typography className={classes.number}>
                      {users.length}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.revenue}>
              <div className={classes.doughnutChart}>
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div>

              <div className={classes.revnueContainer}>
                <Typography className={classes.heading}>Revenue</Typography>
                <BarChart style={{ fontSize: "2rem" }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
