import React from "react"
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  Container,
} from "reactstrap"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

import img1 from "../../../assets/images/small/img-1.jpg"

const products = [
  {
    id: 1,
    title: "Floating action button #1",
    price: 3000,
    domains: 3,
    duration: 30,
  },
  {
    id: 2,
    title: "Floating action button #2",
    price: 4000,
    domains: 4,
    duration: 50,
  },
  {
    id: 3,
    title: "Floating action button #1",
    price: 3000,
    domains: 3,
    duration: 30,
  },
  {
    id: 3,
    title: "Floating action button #2",
    price: 4000,
    domains: 4,
    duration: 50,
  },
  {
    id: 5,
    title: "Floating action button #1",
    price: 3000,
    domains: 3,
    duration: 30,
  },
  {
    id: 6,
    title: "Floating action button #2",
    price: 4000,
    domains: 4,
    duration: 50,
  },
  {
    id: 7,
    title: "Floating action button #1",
    price: 3000,
    domains: 3,
    duration: 30,
  },
  {
    id: 8,
    title: "Floating action button #2",
    price: 4000,
    domains: 4,
    duration: 50,
  },
]

const ProductCard = props => {
  return (
    <Card>
      <CardImg top className="img-fluid" src={img1} alt="Card image cap" />
      <CardBody>
        <CardTitle className="h4 mt-0">{props.title}</CardTitle>
        <CardText>
          <span>Price: {props.price} thb/month</span>
          <br />
          <span>Domains: {props.domains} sites</span>
          <br />
          <span>Duration: {props.duration} days</span>
        </CardText>
        <div className="d-grid gap-2">
          <Link to="#" className="btn btn-primary waves-effect waves-light">
            Purchase
          </Link>
        </div>
      </CardBody>
    </Card>
  )
}

const ECommerce = () => {
  document.title = " E-Commerce | Marketing tool platform"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Marketing tool" breadcrumbItem="E-Commerce" />
          <Row>
            {products.map(product => {
              return (
                <Col md={3}>
                  <ProductCard
                    title={product.title}
                    price={product.price}
                    domains={product.domains}
                    duration={product.duration}
                  />
                </Col>
              )
            })}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ECommerce
