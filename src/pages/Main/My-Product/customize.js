import React from "react"
import { MDBDataTable } from "mdbreact"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
} from "reactstrap"
import { Link } from "react-router-dom"
import "./datatables.scss"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

const PreBuilt = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle className="h4 mb-4">Pre-Built</CardTitle>

        <Row>
          <Col md={1}>
            <div>
              <h5 className="font-size-14 mb-3">
                <button
                  className="btn-rounded waves-effect waves-light btn btn-primary"
                  type="button"
                >
                  Contact
                </button>
              </h5>
              <div className="vstack gap-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="option2"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    Styled#1
                  </label>
                </div>
              </div>
            </div>
          </Col>
          <Col md={1}>
            <div>
              <h5 className="font-size-14 mb-3">
                <button
                  className="btn-rounded waves-effect waves-light btn btn-success"
                  type="button"
                >
                  Contact
                </button>
              </h5>
              <div className="vstack gap-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="option2"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    Styled#2
                  </label>
                </div>
              </div>
            </div>
          </Col>
          <Col md={1}>
            <div>
              <h5 className="font-size-14 mb-3">
                <button
                  className="btn-rounded waves-effect waves-light btn btn-danger"
                  type="button"
                >
                  Contact
                </button>
              </h5>
              <div className="vstack gap-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    value="option2"
                  />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    Styled#3
                  </label>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const CSSEditor = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle className="h4 mb-4">
          <div className="d-flex justify-content-between">
            <span>CSS Editor</span>
            <div className="d-flex">
              <button class="waves-effect waves-light btn btn-success">
                Copy
              </button>
              <button class="waves-effect waves-light btn btn-danger">
                Reset
              </button>
            </div>
          </div>
        </CardTitle>

        <Row>
          <Col md={12}>
            <textarea
              className="form-control"
              placeholder="Generated CSS"
              rows="10"
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const Customize = () => {
  document.title = " My Product | Marketing tool platform"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Marketing tool" breadcrumbItem="Customize" />
          <Row>
            <Col md={12}>
              <PreBuilt />
              <CSSEditor />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Customize
