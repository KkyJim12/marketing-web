import React from "react";
import { Row, Col, Container } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const Info = () => {
  document.title = " My Product | Marketing tool platform";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Marketing tool" breadcrumbItem="Info" />
          <Row>
            <Col md={12}></Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Info;
