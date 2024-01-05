import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  Container,
  Modal,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Parser from "html-react-parser";
import { useNavigate } from "react-router-dom";

const ECommerce = () => {
  const { t } = useTranslation();
  document.title = " E-Commerce | Marketing tool platform";
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [setting, setSetting] = useState([]);

  const getEcommerce = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/e-commerce`,
        { headers }
      );
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [productPurchaseModal, setProductPurchaseModal] = useState(false);
  const [toggleProduct, setToggleProduct] = useState("");

  const togglePurchaseModal = (product) => {
    setProductPurchaseModal(!productPurchaseModal);
    setToggleProduct(product);
  };

  const confirmPurchase = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/e-commerce/${toggleProduct.id}`,
        "",
        { headers }
      );
      console.log(response);

      setProductPurchaseModal(false);
      navigate("/order-history");
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

    getEcommerce();
    getSetting();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={t("Platform Name")}
            breadcrumbItem={t("E-Commerce")}
          />
          <Row>
            {products.map((product) => {
              return (
                <Col key={product.id} md={3}>
                  <Card>
                    <CardImg
                      top
                      className="img-fluid"
                      src={product.image}
                      alt="Card image cap"
                      style={{ height: 200, objectFit: "cover" }}
                    />
                    <CardBody>
                      <CardTitle className="h4 mt-0">{product.title}</CardTitle>
                      <CardText>
                        <h5 style={{ fontWeight: 600 }}>{product.name}</h5>
                        <span>Price: {product.price} thb/month</span>
                        <br />
                        <span>Domains: {product.domains} sites</span>
                        <br />
                        <span>Duration: {product.duration} days</span>
                      </CardText>
                      <div className="d-grid gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            togglePurchaseModal(product);
                          }}
                          className="btn btn-primary waves-effect waves-light"
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          {t("Purchase")}
                        </button>

                        <Modal
                          isOpen={productPurchaseModal}
                          toggle={() => {
                            togglePurchaseModal("");
                          }}
                        >
                          <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myModalLabel">
                              Confirm Purchase Product
                            </h5>
                            <button
                              type="button"
                              onClick={() => {
                                setProductPurchaseModal(false);
                              }}
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <h5>{toggleProduct.name}</h5>
                            <p>Type: {toggleProduct.type}</p>
                            <p>Domains: {toggleProduct.domains}</p>
                            <p>Duration: {toggleProduct.duration}</p>
                          </div>
                          <div className="modal-footer">
                            <button
                              onClick={confirmPurchase}
                              type="button"
                              className="btn btn-success waves-effect waves-light"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                togglePurchaseModal("");
                              }}
                              className="btn btn-danger waves-effect"
                              data-dismiss="modal"
                            >
                              Cancel
                            </button>
                          </div>
                        </Modal>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <Row className="ql-editor">
            <Col md={12}>
              {setting.eCommercePage && Parser(setting.eCommercePage)}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ECommerce;
