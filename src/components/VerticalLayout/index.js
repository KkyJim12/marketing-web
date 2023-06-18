import React, { useEffect, useCallback } from "react";

import withRouter from "../Common/withRouter";
import {
  changeLayout,
  changeSidebarSize,
  showRightSidebarAction,
} from "../../store/actions";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Rightbar from "../CommonForBoth/Rightbar";

//redux
import { useSelector, useDispatch } from "react-redux";

const Layout = props => {
  const dispatch = useDispatch();

  const { isPreloader, leftSideBarType, showRightSidebar, leftSideBarTheme } =
    useSelector(state => ({
      isPreloader: state.Layout.isPreloader,
      leftSideBarType: state.Layout.leftSideBarType,
      layoutModeType: state.Layout.layoutModeType,
      layoutWidth: state.Layout.layoutWidth,
      topbarTheme: state.Layout.topbarTheme,
      sidebarSizeType: state.Layout.sidebarSizeType,
      showRightSidebar: state.Layout.showRightSidebar,
      leftSideBarTheme: state.Layout.leftSideBarTheme,
    }));

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const toggleMenuCallback = () => {
    if (leftSideBarType === "default") {
      dispatch(changeSidebarSize("condensed", isMobile));
    } else if (leftSideBarType === "condensed") {
      dispatch(changeSidebarSize("default", isMobile));
    }
  };

  //hides right sidebar on body click
  const hideRightbar = useCallback(
    event => {
      var rightbar = document.getElementById("right-bar");
      //if clicked in inside right bar, then do nothing
      if (rightbar && rightbar.contains(event.target)) {
        return;
      } else {
        //if clicked in outside of rightbar then fire action for hide rightbar
        dispatch(showRightSidebarAction(false));
      }
    },
    [dispatch]
  );
  /*
  layout  settings
  */

  const pathName = props.router.location.pathname;

  useEffect(() => {
    //init body click event fot toggle rightbar
    document.body.addEventListener("click", hideRightbar, true);

    if (isPreloader === true) {
      document.getElementById("preloader").style.display = "block";
      document.getElementById("status").style.display = "block";

      setTimeout(function () {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("status").style.display = "none";
      }, 2500);
    } else {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("status").style.display = "none";
    }
  }, [isPreloader, hideRightbar, pathName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(changeLayout("vertical"));
  }, [dispatch]);

  return (
    <React.Fragment>
      <div id="preloader">
        <div id="status">
          <div className="spinner">
            <i className="uil-shutter-alt spin-icon"></i>
          </div>
        </div>
      </div>
      <div id="layout-wrapper">
        <Header toggleMenuCallback={toggleMenuCallback} />
        <Sidebar
          theme={leftSideBarTheme}
          // type={leftSideBarType}
          isMobile={isMobile}
        />
        <div className="main-content">{props.children}</div>
      </div>
      {showRightSidebar ? <Rightbar /> : null}
    </React.Fragment>
  );
};

export default withRouter(Layout);
