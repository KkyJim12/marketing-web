import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useTranslation } from "react-i18next";
import axios from "axios";

const OrderHistory = () => {
  document.title = " Order History | Marketing tool platform";
  const { t } = useTranslation();

  const PayButton = () => {
    const { t } = useTranslation();
    return (
      <button
        className="btn btn-success waves-effect waves-light btn-sm "
        type="button"
      >
        {t("Pay")}
      </button>
    );
  };

  const CancelButton = (props) => {
    const { t } = useTranslation();
    return (
      <button
        onClick={() => cancelOrder(props.id)}
        className="btn btn-danger waves-effect waves-light btn-sm"
        type="button"
      >
        {t("Cancel")}
      </button>
    );
  };

  const cancelOrder = async (id) => {
    const headers = {
      Authorization: localStorage.getItem("accessToken"),
    };

    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/user/orders/${id}/cancel`,
      "",
      { headers }
    );

    console.log(response);

    setIsLoading(true);
  };

  const initData = {
    columns: [
      {
        label: "Invoice ID",
        field: "invoiceId",
        sort: "asc",
        width: 150,
      },
      {
        label: "Package Name",
        field: "name",
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
    rows: [],
  };

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(initData);

  const getOrders = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/orders`,
        { headers }
      );

      console.log(response);

      const fetchData = response.data.data;
      const clonedData = initData;

      for (let i = 0; i < fetchData.length; i++) {
        const newData = {
          invoiceId: fetchData[i].id,
          name: fetchData[i].name,
          type: fetchData[i].type,
          domains: fetchData[i].domains,
          duration: fetchData[i].duration,
          orderDate: fetchData[i].createdAt,
          paymentDate: "-",
          status: fetchData[i].status,
          pay: <PayButton id={fetchData[i].id} />,
          cancel: <CancelButton id={fetchData[i].id} />,
        };

        clonedData.rows.push(newData);
      }

      setData(clonedData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders(); // eslint-disable-next-line
  }, [isLoading]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={t("Platform Name")}
            breadcrumbItem={t("Order History")}
          />
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardSubtitle className="mb-3">
                    List of ordered products.
                  </CardSubtitle>

                  {isLoading === false && (
                    <MDBDataTable
                      responsive
                      bordered
                      data={data}
                      noBottomColumns
                    />
                  )}
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
