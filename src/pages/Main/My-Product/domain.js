import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Label,
  Input,
  Modal,
  Button,
} from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Parser from "html-react-parser";

const Domain = () => {
  const { id, productId } = useParams();
  const firstLine = `<link rel="stylesheet" href="https://unpkg.com/@jsweb/font-awesome-base64/fa-all.css"/>`;
  const secondLine = `<script src='${process.env.REACT_APP_API_URL}/js/floating-action-button.js'></script>`;
  const thirdLine = `<script>generateButton("${id}")</script>`;
  const fourthLine = `<link rel="stylesheet" href="${process.env.REACT_APP_API_URL}/css/floating-action-button.css" />`;
  const [addDomainModal, setAddDomainModal] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [domains, setDomains] = useState([]);
  const [urlError, setUrlError] = useState("");
  const [maxDomain, setMaxDomain] = useState("");
  const [setting, setSetting] = useState("");

  const toggleAddDomainModal = () => {
    setAddDomainModal(!addDomainModal);
  };

  const resetError = () => {
    setUrlError("");
  };

  const copySuccess = () => {
    toast.success("Copied");
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
    const getProductDetail = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem("accessToken"),
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/product-detail/${productId}`,
          { headers }
        );

        setMaxDomain(response.data.data.domains);
      } catch (error) {
        console.log(error);
      }
    };

    getProductDetail();

    const getDomains = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem("accessToken"),
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/whitelist-domain/${productId}`,
          { headers }
        );

        console.log(response);
        setDomains(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getDomains();
  }, [isLoading]);

  const addDomain = async () => {
    resetError();
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/whitelist-domain/${productId}`,
        { url: url },
        { headers }
      );

      setIsLoading(true);
      setUrl("");
      setAddDomainModal(false);
    } catch (error) {
      console.log(error);
      setUrlError("No more domain slots.");
    }
  };

  const removeDomain = async (domainId) => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/whitelist-domain/${domainId}`,
        { headers }
      );

      console.log(response);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeAddDomainModal = () => {
    setUrlError("");
    setAddDomainModal(false);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Card>
        <CardBody>
          <CardTitle>
            <Row>
              <Col md={11}>
                <span>Attached Script</span>
              </Col>
              <Col md={1}>
                <CopyToClipboard
                  text={firstLine + secondLine + thirdLine + fourthLine}
                >
                  <button
                    type="button"
                    onClick={copySuccess}
                    className="btn btn-primary w-100"
                  >
                    Copy All
                  </button>
                </CopyToClipboard>
              </Col>
            </Row>
          </CardTitle><Row className="mt-2">
            <Col md={11}>
              <div className="d-flex gap-2 align-items-center">
                1.
                <input
                  type="text"
                  readOnly
                  placeholder="Attach Script Tag"
                  className="form-control"
                  rows="5"
                  style={{ resize: "none" }}
                  value={firstLine}
                />
              </div>
            </Col>
            <Col className="d-flex gap-2" md={1}>
              <CopyToClipboard text={firstLine}>
                <button
                  type="button"
                  onClick={copySuccess}
                  className="btn btn-primary w-100"
                >
                  Copy
                </button>
              </CopyToClipboard>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={11}>
              <div className="d-flex gap-2 align-items-center">
                2.
                <input
                  type="text"
                  readOnly
                  placeholder="Attach Script Tag"
                  className="form-control"
                  rows="5"
                  style={{ resize: "none" }}
                  value={secondLine}
                />
              </div>
            </Col>
            <Col className="d-flex gap-2" md={1}>
              <CopyToClipboard text={secondLine}>
                <button
                  type="button"
                  onClick={copySuccess}
                  className="btn btn-primary w-100"
                >
                  Copy
                </button>
              </CopyToClipboard>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={11}>
              <div className="d-flex gap-2 align-items-center">
                3.
                <input
                  type="text"
                  readOnly
                  placeholder="Attach Script Tag"
                  className="form-control"
                  rows="5"
                  style={{ resize: "none" }}
                  value={thirdLine}
                />
              </div>
            </Col>
            <Col className="d-flex gap-2" md={1}>
              <CopyToClipboard text={thirdLine}>
                <button
                  type="button"
                  onClick={copySuccess}
                  className="btn btn-primary w-100"
                >
                  Copy
                </button>
              </CopyToClipboard>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col md={11}>
              <div className="d-flex gap-2 align-items-center">
                4.
                <input
                  type="text"
                  readOnly
                  placeholder="Attach Script Tag"
                  className="form-control"
                  rows="5"
                  style={{ resize: "none" }}
                  value={fourthLine}
                />
              </div>
            </Col>
            <Col className="d-flex gap-2" md={1}>
              <CopyToClipboard text={fourthLine}>
                <button
                  type="button"
                  onClick={copySuccess}
                  className="btn btn-primary w-100"
                >
                  Copy
                </button>
              </CopyToClipboard>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle>
            <div className="d-flex justify-content-between">
              <h5>
                Domain Setup ({domains.length}/{maxDomain})
              </h5>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    toggleAddDomainModal();
                  }}
                  className="btn btn-success waves-effect waves-light"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  Add Domain
                </button>
                <Modal
                  className="modal-dialog-centered modal-lg"
                  isOpen={addDomainModal}
                  toggle={() => {
                    toggleAddDomainModal("");
                  }}
                >
                  <div className="modal-header">
                    <h5 className="modal-title mt-0" id="myModalLabel">
                      Add Domain
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setAddDomainModal(false)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Website URL"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                    {urlError && (
                      <small className="text-danger">{urlError}</small>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      onClick={addDomain}
                      type="button"
                      className="btn btn-success waves-effect waves-light"
                    >
                      Add Domain
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger waves-effect"
                      data-dismiss="modal"
                      onClick={closeAddDomainModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>
              </div>
            </div>
          </CardTitle>

          <Row className="gap-4">
            {domains.map((domain, index) => {
              return (
                <Col md={12} key={index}>
                  <div>
                    <Label>Domain {index + 1}</Label>
                    <div className="d-flex gap-3">
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Whitelist URL"
                        value={domain.url}
                      />
                      <a
                        href={"https://" + domain.url}
                        target="_blank"
                        className="btn btn-info"
                      >
                        Open
                      </a>
                      <Button
                        onClick={() => removeDomain(domain.id)}
                        className="btn btn-danger"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </CardBody>
      </Card>
      <Row className="ql-editor">
        <Col md={12}>
          {setting.websiteSetupPage && Parser(setting.websiteSetupPage)}
        </Col>
      </Row>
    </>
  );
};

export default Domain;
