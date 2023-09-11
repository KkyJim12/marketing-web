import { useParams } from "react-router-dom";

import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Icon = () => {
  const { name, color, backgroundColor, size } = useParams();
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
              style={{ color: "#" + color, width: size, height: size }}
              icon={[name.split("_")[0], name.split("_")[1]]}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Icon;
