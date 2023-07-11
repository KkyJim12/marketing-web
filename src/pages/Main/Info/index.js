import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axios from "axios";
import Parser from "html-react-parser";

const Info = () => {
  document.title = " Info | Marketing tool platform";
  const { t } = useTranslation();
  const { id } = useParams();

  const [page, setPage] = useState("");

  useEffect(() => {
    const getPage = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/pages/${id}`
        );

        setPage(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPage();
  }, [id]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={t("Platform Name")} breadcrumbItem={page.name} />
          <Row>
            <Col md={12}>{page.content && Parser(page.content)}</Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Info;
