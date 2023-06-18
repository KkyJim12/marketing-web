import React from "react";
import { Row, Col, Container } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useTranslation } from "react-i18next";

const Info = () => {
  document.title = " Info | Marketing tool platform";
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={t("Platform Name")} breadcrumbItem={t("Info")} />
          <Row>
            <Col md={12}></Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Info;
