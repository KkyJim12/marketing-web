import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, Row, Col, Label, Input } from "reactstrap";

const Domain = () => {
  const { id, productId } = useParams();
  const domains = [1, 2, 3];
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
                  value={`<script data-main="${process.env.REACT_APP_API_URL}/js/scripts/main.js" src="${process.env.REACT_APP_API_URL}/js/scripts/require.js"></script>`}
                />
              </div>
            </Col>
            <Col className="d-flex gap-2" md={1}>
              <button className="btn btn-primary">Copy</button>
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
                  value={`<script src='${process.env.REACT_APP_API_URL}/js/floating-action-button.js'></script>`}
                />
              </div>
            </Col>
            <Col className="d-flex gap-2" md={1}>
              <button className="btn btn-primary">Copy</button>
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
                  value={`<script>generateButton("${id}")</script>`}
                />
              </div>
            </Col>
            <Col className="d-flex gap-2" md={1}>
              <button className="btn btn-primary">Copy</button>
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
