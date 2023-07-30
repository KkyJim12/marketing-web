import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Label,
  Input,
  Button,
} from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Domain = () => {
  const { id, productId } = useParams();
  const firstLine = `<script data-main="${process.env.REACT_APP_API_URL}/js/scripts/main.js" src="${process.env.REACT_APP_API_URL}/js/scripts/require.js"></script>`;
  const secondLine = `<script src='${process.env.REACT_APP_API_URL}/js/floating-action-button.js'></script>`;
  const thirdLine = `<script>generateButton("${id}")</script>`;
  const domains = [];
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>Attached Script</CardTitle>
          <Row>
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
                <button className="btn btn-primary">Copy</button>
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
                <button className="btn btn-primary">Copy</button>
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
                <button className="btn btn-primary">Copy</button>
              </CopyToClipboard>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle>Domain Setup</CardTitle>
          <Row className="gap-4">
            {domains.map((domain, index) => {
              return (
                <Col md={12}>
                  <div>
                    <Label>Domain {index + 1}</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Whitelist URL"
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default Domain;
