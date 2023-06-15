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

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

const Info = () => {
  document.title = " My Product | Marketing tool platform"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Marketing tool" breadcrumbItem="Info" />
          <Row>
            <Col md={12}></Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Info
