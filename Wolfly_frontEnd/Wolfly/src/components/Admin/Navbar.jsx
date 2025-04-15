import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 999,
    background: "#ffffff",
    width: "100%",
    padding: "1.5rem 1rem 1rem 1rem",
    boxShadow:
      "1px 1px 2px rgba(0, 0, 0, 0.1), 2px 2px 4px rgba(0, 0, 0, 0.2), 4px 4px 8px rgba(0, 0, 0, 0.3)",
  },

  menuIcon: {
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "block",
      fontSize: "2rem",
      "& svg": {
        fontSize: "2rem",
        "&:hover": {
          color: "#ed1c24",
        },
      },
      "&:hover": {
        transform: "scale(1.1)",
      },
    },
  },

  dashboardHead: {
    fontSize: "2rem",
    fontWeight: 900,
    color: "black",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      marginBottom: "0.5rem",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "1.8rem",
      marginBottom: 0,
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "1.5rem",
      fontSize: "1.8rem",
    },
  },

  contactButton: {
    padding: "10px 30px",
    borderRadius: "20px",
    boxShadow: "0px 2px 8px 0px #0000000a",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "16px",
    color: "#fff",
    letterSpacing: "1px",
    background: "#414141",
    transition: "background-color 0.3s",
    marginRight: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      padding: "8px 14px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "14px",
      padding: "7px 15px",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    "&:hover": {
      background: "#ed1c24",
    },
  },

  headerBottom__logo_main: {
    height: "3.5rem",
    alignSelf: "center",
    paddingLeft: "25px",
    "& img": {
      height: "100%",
      width: "auto",
    },
  },
}));

const Navbar = ({ toggleHandler }) => {
  const classes = useStyles();

  return (
    <nav className={classes.navbar}>
      <IconButton className={classes.menuIcon} onClick={toggleHandler}>
        <MenuIcon fontSize="2rem" />
      </IconButton>

      <div className={classes.dashboardHead}>
        <Link
          to="/admin/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={logo}
            alt="logo"
            className={classes.headerBottom__logo_main}
          />
        </Link>
      </div>

      <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
        <Button className={classes.contactButton}>Contact Us</Button>
      </Link>
    </nav>
  );
};

export default Navbar;
