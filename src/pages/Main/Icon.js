import { useParams } from "react-router-dom";

import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Icon = () => {
  const { name, color, backgroundColor } = useParams();
  return (
    <>
      <Row>
        <Col md={12}>
          <div
            style={{
              width: 200,
              height: 200,
              backgroundColor: "#" + backgroundColor,
            }}
          >
            <FontAwesomeIcon
              style={{ color: "#" + color, width: 35, height: 35 }}
              icon={[name.split("-")[0], name.split("-")[1]]}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Icon;
