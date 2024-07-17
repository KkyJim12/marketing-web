import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Row, Col, Button } from "reactstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const License = () => {
  const navigate = useNavigate();
  const { id, productId } = useParams();

  const [thisProduct, setThisProduct] = useState("");
  const [domains, setDomains] = useState("");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  const reNewProduct = async (product) => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/renew-product`,
        {
          product: thisProduct,
        },
        { headers }
      );

      console.log(response.data.data);
      navigate("/order-history");
    } catch (error) {
      console.log(error);
    }
  };

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

        console.log(response.data.data);
        const product = response.data.data;
        setThisProduct(product);
        setDomains(product.domains);
        setType(product.type);
        setDuration(product.duration);
        setStartDate(product.startDate);
        setEndDate(product.endDate);
        setStatus(product.status);
      } catch (error) {
        console.log(error);
      }
    };

    getProductDetail();
  }, []);

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>
            <div className="d-flex justify-content-between">
              <h3>Detail</h3>
              <div className="d-flex gap-2 align-items-center">
                <button
                  onClick={() => reNewProduct()}
                  className="btn btn-primary text-white rounded"
                  type="button"
                >
                  Extends
                </button>
                <Link
                  className="btn btn-primary text-white rounded"
                  to="/e-commerce"
                >
                  Buy Product
                </Link>
              </div>
            </div>
          </CardTitle>
          <Row className="gap-2 mt-2">
            <Col md={12}>
              <p>Domain: {domains}</p>
              <p>Type: {type}</p>
              <p>Duration: {duration} days</p>
              <p>Start Date: {moment(startDate).format("DD/MM/YYYY")}</p>
              <p>
                Expire Date:
                {moment(endDate).format("DD/MM/YYYY")}
              </p>
              <p>
                Expired In:
                {moment(endDate).fromNow()}
              </p>
              <p>Status: {status}</p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default License;
