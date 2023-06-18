import React from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import { Link } from "react-router-dom";
import "./datatables.scss";
import { useTranslation } from "react-i18next";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const CustomizeButton = () => {
  const { t } = useTranslation();
  return (
    <Link to="/my-product/1/customize">
      <button
        className="btn btn-warning waves-effect waves-light btn-sm"
        type="button"
      >
        {t("Customize")}
      </button>
    </Link>
  );
};

const ViewStatsButton = () => {
  const { t } = useTranslation();
  return (
    <Link to="/my-product/1/stats">
      <button
        className="btn btn-info waves-effect waves-light btn-sm"
        type="button"
      >
        {t("View Stats")}
      </button>
    </Link>
  );
};

const data = {
  columns: [
    {
      label: "Package Name",
      field: "packageName",
      sort: "asc",
      width: 150,
    },
    {
      label: "Type",
      field: "type",
      sort: "asc",
      width: 270,
    },
    {
      label: "Domains",
      field: "domains",
      sort: "asc",
      width: 270,
    },
    {
      label: "Duration",
      field: "duration",
      sort: "asc",
      width: 270,
    },
    {
      label: "Start Date",
      field: "startDate",
      sort: "asc",
      width: 270,
    },
    {
      label: "Expire Date",
      field: "expireDate",
      sort: "asc",
      width: 270,
    },
    {
      label: "Expire In",
      field: "expireIn",
      sort: "asc",
      width: 270,
    },
    {
      label: "Status",
      field: "status",
      sort: "asc",
      width: 270,
    },
    {
      label: "Customize",
      field: "customize",
      sort: "asc",
      width: 270,
    },
    {
      label: "View Stats",
      field: "viewStats",
      sort: "asc",
      width: 270,
    },
  ],
  rows: [
    {
      id: 1,
      packageName: "Floating action button #1",
      type: "Floating action button",
      domains: 3,
      duration: 30,
      startDate: "15/06/2023",
      expireDate: "15/07/2023",
      expireIn: "30 days",
      status: "On going",
      customize: <CustomizeButton />,
      viewStats: <ViewStatsButton />,
    },
  ],
};

const DataTable = () => {
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardSubtitle className="mb-3">
            List of purchased products.
          </CardSubtitle>

          <MDBDataTable responsive bordered data={data} />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

const MyProduct = () => {
  const { t } = useTranslation();
  document.title = " My Product | Marketing tool platform";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={t("Platform Name")}
            breadcrumbItem={t("My Products")}
          />
          <Row>
            <Col md={12}>
              <DataTable />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MyProduct;
