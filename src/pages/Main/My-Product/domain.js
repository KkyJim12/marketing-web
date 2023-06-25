import { useState } from "react";
import { Card, CardBody, CardTitle, Row, Col, Label, Input } from "reactstrap";

const Domain = () => {
  const [domains, setDomains] = useState([1, 2, 3]);
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>Attached Script</CardTitle>
          <Row className="gap-4">
            <Col md={12}>
              <div className="d-flex gap-2">
                <Input
                  type="text"
                  readOnly
                  placeholder="Attach Script Tag"
                  value="https://marketing-cta.netlify.app/abcdef-random-123456"
                />
                <button className="btn btn-primary">Copy</button>
                <button className="btn btn-warning">Regenerate</button>
              </div>
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
