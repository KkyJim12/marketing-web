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
  Toast,
  ToastBody,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const ECommerce = () => {
  const { t } = useTranslation();
  document.title = " E-Commerce | Marketing tool platform";
  const [products, setProducts] = useState([]);
  const [purchaseSuccessToasts, setPurchaseSuccessToasts] = useState([]);

  const getEcommerce = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/e-commerce`
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

  const confirmPurchase = () => {
    setProductPurchaseModal(false);
    setPurchaseSuccessToasts([...purchaseSuccessToasts, "Purchase Success."]);

    setTimeout(() => {
      closePurchaseToast(purchaseSuccessToasts.length - 1);
    }, 2000);
  };

  const closePurchaseToast = (index) => {
    const clonedData = [...purchaseSuccessToasts].filter(
      (i, idx) => idx !== index
    );
    setPurchaseSuccessToasts(clonedData);
  };

  useEffect(() => {
    getEcommerce();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div
            aria-live="polite"
            aria-atomic="true"
            className="position-relative"
          >
            <div className="toast-container position-absolute end-0 top-0 p-2 p-lg-3">
              {purchaseSuccessToasts.map((i, index) => {
                return (
                  <Toast
                    style={{
                      background: "rgb(52,195,143,0.8)",
                      cursor: "pointer",
                    }}
                    key={index}
                    className="toast fade show align-items-center text-white border-0"
                  >
                    <div className="d-flex">
                      <ToastBody>{i}</ToastBody>
                      <button
                        type="button"
                        onClick={() => closePurchaseToast(index)}
                        className="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                      ></button>
                    </div>
                  </Toast>
                );
              })}
            </div>
          </div>
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ECommerce;
