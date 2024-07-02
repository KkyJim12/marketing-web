import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
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
import Domain from "./domain";
import License from "./license";

const Manage = () => {
  const [activeTab, setActiveTab] = useState("Statistic");

  function toggleCustomJustified(tab) {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }

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
              </div>
            </Col>
          </Row>
          {activeTab === "Statistic" ? (
            <Stats />
          ) : activeTab === "Button Style" ? (
            <Customize />
          ) : activeTab === "Button Setting" ? (
            <SubMenu />
          ) : activeTab === "Website setup" ? (
            <Domain />
          ) : (
            <License />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Manage;
