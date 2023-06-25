import { Card, CardBody, CardTitle, Row, Col, Button } from "reactstrap";

const License = () => {
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>
            <div className="d-flex justify-content-between">
              <span>Attached Script</span>
              <Button type="button" className="btn btn-success">
                Re new
              </Button>
            </div>
          </CardTitle>
          <Row className="gap-2 mt-2">
            <Col md={12}>
              <p>Domain: 3</p>
              <p>Type: Floating Action Button</p>
              <p>Duration: 30 days</p>
              <p>Start Date: 25/06/2023</p>
              <p>Expire Date: 25/07/2023</p>
              <p>Expired In: 30 days</p>
              <p>Status: On Going</p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default License;
