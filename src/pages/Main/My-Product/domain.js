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
          <Row className="gap-4">
            <Col md={12}>
              <div className="d-flex gap-2">
                <textarea
                  type="text"
                  readOnly
                  placeholder="Attach Script Tag"
                  className="form-control"
                  rows="5"
                  style={{ resize: "none" }}
                  value={`<script src='http://localhost:8080/js/floating-action-button.js'></script><script>generateButton("${id}")</script>`}
                ></textarea>
              </div>
              <Col className="mt-2 d-flex gap-2" md={12}>
                <button className="btn btn-primary">Copy</button>
                <button className="btn btn-warning">Regenerate</button>
              </Col>
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
