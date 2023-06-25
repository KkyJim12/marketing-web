import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Nav,
  NavItem,
  NavLink,
  Card,
} from "reactstrap";
import "./datatables.scss";

import classnames from "classnames";
import Stats from "./stats";
import Customize from "./customize";
import SubMenu from "./sub-menu";

const Manage = () => {
  const [activeTab, setActiveTab] = useState("Statistic");
  document.title = " Manage | Marketing tool platform";

  function toggleCustomJustified(tab) {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }
  const [singlebtn, setSinglebtn] = useState(false);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Card>
                <Nav tabs className="nav-pills nav-justified">
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab === "Statistic",
                      })}
                      onClick={() => {
                        toggleCustomJustified("Statistic");
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="fas fa-home"></i>
                      </span>
                      <span className="d-none d-sm-block">Statistic</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab === "Button Style",
                      })}
                      onClick={() => {
                        toggleCustomJustified("Button Style");
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="far fa-user"></i>
                      </span>
                      <span className="d-none d-sm-block">Button Style</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab === "Button Setting",
                      })}
                      onClick={() => {
                        toggleCustomJustified("Button Setting");
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="far fa-envelope"></i>
                      </span>
                      <span className="d-none d-sm-block">Button Setting</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab === "Website setup",
                      })}
                      onClick={() => {
                        toggleCustomJustified("Website setup");
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="fas fa-cog"></i>
                      </span>
                      <span className="d-none d-sm-block">Website Setup</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab === "License",
                      })}
                      onClick={() => {
                        toggleCustomJustified("License");
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="fas fa-cog"></i>
                      </span>
                      <span className="d-none d-sm-block">License</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Card>
            </Col>
            <Col className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">{activeTab}</h4>

                {activeTab === "5" && (
                  <div className="page-title-right d-flex align-items-center gap-4">
                    <div>
                      <label
                        htmlFor="example-date-input"
                        className="col-form-label"
                      >
                        Start Date
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        defaultValue="2019-08-19"
                        id="example-date-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="example-date-input"
                        className="col-form-label"
                      >
                        End Date
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        defaultValue="2019-08-19"
                        id="example-date-input"
                      />
                    </div>
                    <div>
                      <label className="col-form-label">Duration</label>
                      <Dropdown
                        isOpen={singlebtn}
                        toggle={() => setSinglebtn(!singlebtn)}
                      >
                        <DropdownToggle
                          tag="button"
                          className="btn btn-info"
                          caret
                        >
                          Duration <i className="mdi mdi-chevron-down" />
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>Today</DropdownItem>
                          <DropdownItem>This Week</DropdownItem>
                          <DropdownItem>This Month</DropdownItem>
                          <DropdownItem>This Year</DropdownItem>
                          <DropdownItem>All Time</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    <div className="d-flex flex-column">
                      <label className="col-form-label">Export</label>
                      <div className="d-flex gap-2">
                        <button className="btn btn-danger" type="button">
                          PDF
                        </button>
                        <button className="btn btn-success" type="button">
                          Excel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
          {activeTab === "Statistic" ? (
            <Stats />
          ) : activeTab === "Button Style" ? (
            <Customize />
          ) : (
            <SubMenu />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Manage;
