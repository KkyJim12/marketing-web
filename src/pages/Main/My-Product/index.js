import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardSubtitle, Container } from "reactstrap";
import { Link } from "react-router-dom";
import "./datatables.scss";
import { useTranslation } from "react-i18next";
import Parser from "html-react-parser";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const MyProduct = () => {
  const { t } = useTranslation();
  document.title = " My Product | Marketing tool platform";

  const [setting, setSetting] = useState([]);

  const ReNewButton = (props) => {
    if (props.status === "Expired") {
      return (
        <button
          className="btn btn-success waves-effect waves-light btn-sm"
          type="button"
        >
          {t("Re new")}
        </button>
      );
    } else {
      return <>-</>;
    }
  };

  const ManageButton = (props) => {
    if (props.status === "On going") {
      return (
        <Link to={"/my-product/" + props.id + "/manage/" + props.productId}>
          <button
            className="btn btn-info waves-effect waves-light btn-sm"
            type="button"
          >
            {t("Manage")}
          </button>
        </Link>
      );
    } else {
      return <>-</>;
    }
  };

  const initData = {
    columns: [
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
        label: "Re New",
        field: "reNew",
        sort: "asc",
        width: 270,
      },
      {
        label: "Manage",
        field: "manage",
        sort: "asc",
        width: 270,
      },
    ],
    rows: [],
  };

  const [data, setData] = useState(initData);
  const [isLoading, setIsLoading] = useState(true);

  const getMyProducts = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/my-products`,
        { headers }
      );

      const fetchData = response.data.data;
      const clonedData = initData;

      for (let i = 0; i < fetchData.length; i++) {
        const newData = {
          name: fetchData[i].name,
          type: fetchData[i].type,
          domains: fetchData[i].domains,
          duration: fetchData[i].duration,
          startDate: moment(fetchData[i].startDate).format(
            "DD/MM/YYYY, h:mm a"
          ),
          expireDate: moment(fetchData[i].endDate).format("DD/MM/YYYY, h:mm a"),
          expireIn:
            fetchData[i].status === "On going"
              ? moment(fetchData[i].endDate).fromNow()
              : "-",
          status: fetchData[i].status,
          reNew: <ReNewButton status={fetchData[i].status} />,
          manage: (
            <ManageButton
              productId={fetchData[i].productId}
              id={fetchData[i].id}
              status={fetchData[i].status}
            />
          ),
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
    const getSetting = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem("accessToken"),
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/settings`,
          { headers }
        );
        setSetting(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSetting();
  }, []);

  useEffect(() => {
    getMyProducts(); // eslint-disable-next-line
  }, [isLoading]);

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
              <Card>
                <CardBody>
                  <CardSubtitle className="mb-3">
                    List of purchased products.
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
          <Row>
            <Col md={12}>
              {setting.myProductPage && Parser(setting.myProductPage)}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MyProduct;
