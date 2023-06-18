import React from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import product1 from "../../../assets/images/product/product-1.jpg";
import product2 from "../../../assets/images/product/product-2.jpg";
import product3 from "../../../assets/images/product/product-3.jpg";
import product4 from "../../../assets/images/product/product-4.jpg";

const products = [
  {
    id: 1,
    image: product1,
    title: "Floating action button #1",
    price: 2000,
    domains: 3,
    duration: 30,
  },
  {
    id: 2,
    image: product2,
    title: "Floating action button #2",
    price: 4000,
    domains: 4,
    duration: 50,
  },
  {
    id: 3,
    image: product3,
    title: "Floating action button #1",
    price: 3000,
    domains: 3,
    duration: 30,
  },
  {
    id: 4,
    image: product4,
    title: "Floating action button #4",
    price: 5000,
    domains: 4,
    duration: 50,
  },
];

const ECommerce = () => {
  document.title = " E-Commerce | Marketing tool platform";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Marketing tool" breadcrumbItem="E-Commerce" />
          <Row>
            {products.map(product => {
              return (
                <Col md={3}>
                  <Card>
                    <CardImg
                      top
                      className="img-fluid"
                      src={product.image}
                      alt="Card image cap"
                      style={{ height: 200, objectFit: "cover" }}
                    />
                    <CardBody>
                      <CardTitle className="h4 mt-0">{product.title}</CardTitle>
                      <CardText>
                        <span>Price: {product.price} thb/month</span>
                        <br />
                        <span>Domains: {product.domains} sites</span>
                        <br />
                        <span>Duration: {product.duration} days</span>
                      </CardText>
                      <div className="d-grid gap-2">
                        <Link
                          to="#"
                          className="btn btn-primary waves-effect waves-light"
                        >
                          Purchase
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ECommerce;
