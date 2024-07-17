import PropTypes from "prop-types"
import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import withRouter from "../Common/withRouter"

//i18n
import { withTranslation } from "react-i18next"
import SidebarContent from "./SidebarContent"

import logoSm from "../../assets/images/pacy-logo-square.png"
import logoDark from "../../assets/images/pacy-pilot-main-logo.png"
import logoLight from "../../assets/images/logo-light.png"

const Sidebar = props => {
  function tToggle() {
    var body = document.body
    var windowSize = document.documentElement.clientWidth

    body.classList.toggle("vertical-collpsed")
    body.classList.toggle("sidebar-enable")

    if (windowSize > 991) {
      body.getAttribute("data-sidebar-size") === "sm"
        ? body.setAttribute("data-sidebar-size", "lg")
        : body.setAttribute("data-sidebar-size", "sm")
    }
  }

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/e-commerce" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="28" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="" height="25" />
            </span>
          </Link>

          <Link to="/e-commerce" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoSm} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoLight} alt="" height="20" />
            </span>
          </Link>
        </div>
        <button
          onClick={() => {
            tToggle()
          }}
          type="button"
          className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
        >
          <i className="fa fa-fw fa-bars"></i>
        </button>
        <div className="sidebar-menu-scroll">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
      </div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  type: PropTypes.string,
}

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)))
