import React from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const PayButton = () => {
  return (
    <button
      className="btn btn-success waves-effect waves-light btn-sm "
      type="button"
    >
      Pay
    </button>
  );
};

const CancelButton = () => {
  return (
    <button
      className="btn btn-danger waves-effect waves-light btn-sm"
      type="button"
    >
      Cancel
    </button>
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
      label: "Order Date",
      field: "orderDate",
      sort: "asc",
      width: 270,
    },
    {
      label: "Payment Date",
      field: "paymentDate",
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
      label: "Pay",
      field: "pay",
      sort: "asc",
      width: 270,
    },
    {
      label: "Cancel",
      field: "cancel",
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
      orderDate: "15/06/2023",
      paymentDate: "-",
      status: "Wait for payment",
      pay: <PayButton />,
      cancel: <CancelButton />,
    },
    {
      id: 2,
      packageName: "Floating action button #1",
      type: "Floating action button",
      domains: 3,
      duration: 30,
      orderDate: "15/06/2023",
      paymentDate: "17/06/2023",
      status: "Payment success",
      pay: "-",
      cancel: "-",
    },
    {
      id: 3,
      packageName: "Floating action button #1",
      type: "Floating action button",
      domains: 3,
      duration: 30,
      orderDate: "15/06/2023",
      paymentDate: "-",
      status: "Order Cancel",
      pay: "-",
      cancel: "-",
    },
  ],
};

const OrderHistory = () => {
  document.title = " My Product | Marketing tool platform";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Marketing tool" breadcrumbItem="Order History" />
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardSubtitle className="mb-3">
                    List of ordered products.
                  </CardSubtitle>

                  <MDBDataTable responsive bordered data={data} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default OrderHistory;
