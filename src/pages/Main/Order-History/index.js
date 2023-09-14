import React, { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardSubtitle,
  Container,
  Modal,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Parser from "html-react-parser";

const OrderHistory = () => {
  document.title = " Order History | Marketing tool platform";
  const { t } = useTranslation();
  const [setting, setSetting] = useState([]);

  const PayButton = (props) => {
    if (
      props.status === "Wait for payment" ||
      props.status === "Wait for checking"
    ) {
      return (
        <button
          onClick={() => {
            toggleMakePaymentModal(props.order);
          }}
          className="btn btn-success waves-effect waves-light btn-sm "
          type="button"
        >
          {t("Pay")}
        </button>
      );
    } else {
      return <p>-</p>;
    }
  };

  const CancelButton = (props) => {
    if (props.status === "Wait for payment") {
      return (
        <button
          onClick={() => cancelOrder(props.id)}
          className="btn btn-danger waves-effect waves-light btn-sm"
          type="button"
        >
          {t("Cancel")}
        </button>
      );
    } else {
      return <p>-</p>;
    }
  };

  const cancelOrder = async (id) => {
    const headers = {
      Authorization: localStorage.getItem("accessToken"),
    };
    await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/user/orders/${id}/cancel`,
      "",
      { headers }
    );

    setIsLoading(true);
  };

  const ViewButton = (props) => {
    if (props.status === "Wait for checking" || props.status === "Success") {
      return (
        <button
          onClick={() => toggleViewSlipModal(props.image)}
          className="btn btn-info waves-effect waves-light btn-sm "
          type="button"
        >
          {t("View")}
        </button>
      );
    } else {
      return <>-</>;
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
        label: "Price",
        field: "price",
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
        label: "View",
        field: "view",
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

      const fetchData = response.data.data;
      const clonedData = initData;

      for (let i = 0; i < fetchData.length; i++) {
        const newData = {
          invoiceId:
            fetchData[i].id.substring(0, 4) +
            "..." +
            fetchData[i].id.substring(
              fetchData[i].id.length - 5,
              fetchData[i].id.length - 1
            ),
          name: fetchData[i].name,
          type: fetchData[i].type,
          price: fetchData[i].price,
          domains: fetchData[i].domains,
          duration: fetchData[i].duration,
          orderDate: moment(fetchData[i].createdAt).format(
            "DD/MM/YYYY, h:mm a"
          ),
          view: (
            <ViewButton
              status={fetchData[i].status}
              image={fetchData[i].image}
            />
          ),
          paymentDate: fetchData[i].paymentDate
            ? moment(fetchData[i].paymentDate).format("DD/MM/YYYY, h:mm a")
            : "-",
          status: fetchData[i].status,
          pay: <PayButton order={fetchData[i]} status={fetchData[i].status} />,
          cancel: (
            <CancelButton id={fetchData[i].id} status={fetchData[i].status} />
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

  const [makePaymentModal, setMakePaymentModal] = useState(false);
  const [toggleOrder, setToggleOrder] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [imageUrl, setImageUrl] = useState("");

  const toggleMakePaymentModal = (order) => {
    resetImageUpload();
    setMakePaymentModal(!makePaymentModal);
    setToggleOrder(order);
  };

  const resetImageUpload = () => {
    setSelectedFile();
    setPreview();
    setImageUrl("");
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const uploadSlip = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);

    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/images`,
        formData,
        { headers }
      );

      setImageUrl(response.data.data);
    } catch (error) {}
  };

  const openUploadInput = () => {
    document.getElementById("uploadInput").click();
  };

  const confirmMakePayment = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/user/orders/${toggleOrder.id}/make-payment`,
        { image: imageUrl },
        { headers }
      );

      toggleMakePaymentModal("");

      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const [viewSlipModal, setViewSlipModal] = useState(false);
  const [slipImage, setSlipImage] = useState("");
  const toggleViewSlipModal = (imageUrl) => {
    console.log(imageUrl);
    setViewSlipModal(!viewSlipModal);
    setSlipImage(imageUrl);
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
            <Modal
              isOpen={makePaymentModal}
              toggle={() => {
                toggleMakePaymentModal("");
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                  Make Payment
                </h5>
                <button
                  type="button"
                  onClick={() => {
                    setMakePaymentModal(false);
                  }}
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Bank: Kasikorn Bank</p>
                <p>Account Number: 0561768552</p>
                <p>Account Name: Piyakarn Nimmakulvirut</p>
                <p>Amount: {toggleOrder.price}</p>
                <div className="d-grid gap-2">
                  {preview ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        style={{ height: 200, objectFit: "cover" }}
                        src={preview}
                        alt="preview"
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        height: 200,
                        border: "dashed",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: "#f2f2f2",
                        fontWeight: 500,
                      }}
                    >
                      Image
                    </div>
                  )}
                  <button
                    onClick={openUploadInput}
                    className="btn btn-primary"
                    type="button"
                  >
                    Upload Slip
                  </button>
                  <input
                    onChange={uploadSlip}
                    id="uploadInput"
                    type="file"
                    style={{ visibility: "hidden" }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={confirmMakePayment}
                  type="button"
                  className="btn btn-success waves-effect waves-light"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toggleMakePaymentModal("");
                  }}
                  className="btn btn-danger waves-effect"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </Modal>
            <Modal
              isOpen={viewSlipModal}
              toggle={() => {
                toggleViewSlipModal("");
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                  View Slip
                </h5>
                <button
                  type="button"
                  onClick={() => {
                    setViewSlipModal(false);
                  }}
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{ width: 300, objectFit: "cover" }}
                    src={slipImage}
                    alt="slip"
                  />
                </div>
              </div>
            </Modal>
          </Row>
          <Row className="ql-editor">
            <Col md={12}>
              {setting.orderHistoryPage && Parser(setting.orderHistoryPage)}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default OrderHistory;
