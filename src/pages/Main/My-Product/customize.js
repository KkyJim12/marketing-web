import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Label,
  Container,
  Input,
} from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import ColorPicker from "@vtaits/react-color-picker";

const Customize = () => {
  document.title = " My Product | Marketing tool platform";

  const [buttonText, setButtonText] = useState("Minible");
  const [backgroundColorEnable, setBackgroundColorEnable] = useState(false);
  const [textColorEnable, setTextColorEnable] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#3b82f6");
  const [textColor, setTextColor] = useState("#f5f5f5");
  const [buttonSize, setButtonSize] = useState(75);

  const [buttonPositionTop, setButtonPositionTop] = useState("");
  const [buttonPositionRight, setButtonPositionRight] = useState(20);
  const [buttonPositionBottom, setButtonPositionBottom] = useState(20);
  const [buttonPositionLeft, setButtonPositionLeft] = useState("");

  const onDragBackgroundColor = color => {
    setBackgroundColor(color);
  };
  const onDragTextColor = color => {
    setTextColor(color);
  };

  const handleButtonText = e => {
    setButtonText(e.target.value);
  };

  const handleButtonSize = size => {
    setButtonSize(size);
  };

  const handleButtonPosition = (t, r, b, l) => {
    setButtonPositionTop(t);
    setButtonPositionRight(r);
    setButtonPositionBottom(b);
    setButtonPositionLeft(l);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Marketing tool" breadcrumbItem="Customize" />
          <Row>
            <Col md={12}>
              {/* Pre-Built Editor */}
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
                              name="styled"
                              id="styled1"
                              value="styled1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="styled1"
                            >
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
                              name="styled"
                              id="styled2"
                              value="styled2"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="styled2"
                            >
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
                              name="styled"
                              id="styled3"
                              value="styled3"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="styled3"
                            >
                              Styled#3
                            </label>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              {/* End Pre-Built Editor */}

              {/* Button Editor */}
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-4">
                    <span>Button Editor</span>
                  </CardTitle>
                  <Row>
                    <Col md={2}>
                      <div>
                        <Label>Background color</Label>
                        <div className="d-flex gap-2">
                          <Input
                            type="text"
                            className="colorpicker-default"
                            value={backgroundColor}
                            readOnly
                          />
                          <div
                            onClick={() => {
                              setBackgroundColorEnable(!backgroundColorEnable);
                            }}
                            className="btn"
                            style={{
                              backgroundColor: backgroundColor,
                              width: 40,
                              height: 40,
                            }}
                          ></div>
                          {backgroundColorEnable ? (
                            <ColorPicker
                              style={{
                                position: "absolute",
                                right: 10,
                                marginTop: "2.8rem",
                                zIndex: 500,
                              }}
                              saturationHeight={100}
                              saturationWidth={100}
                              value={backgroundColor}
                              onDrag={onDragBackgroundColor}
                            />
                          ) : null}
                        </div>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div>
                        <Label>Text color</Label>
                        <div className="d-flex gap-2">
                          <Input
                            type="text"
                            className="colorpicker-default"
                            value={textColor}
                            readOnly
                          />
                          <div
                            onClick={() => {
                              setTextColorEnable(!textColorEnable);
                            }}
                            className="btn"
                            style={{
                              backgroundColor: textColor,
                              width: 40,
                              height: 40,
                            }}
                          ></div>
                          {textColorEnable ? (
                            <ColorPicker
                              style={{
                                position: "absolute",
                                right: 10,
                                marginTop: "2.8rem",
                                zIndex: 500,
                              }}
                              saturationHeight={100}
                              saturationWidth={100}
                              value={textColor}
                              onDrag={onDragTextColor}
                            />
                          ) : null}
                        </div>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div>
                        <Label>Text (0/100)</Label>
                        <div className="d-flex gap-2">
                          <Input
                            onChange={e => handleButtonText(e)}
                            value={buttonText}
                            type="text"
                            className="form-control"
                            placeholder="Button Text"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div className="d-flex flex-column">
                        <Label>Size</Label>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            onClick={() => handleButtonSize(50)}
                            className="btn btn-light"
                          >
                            Small
                          </button>
                          <button
                            onClick={() => handleButtonSize(75)}
                            className="btn btn-light"
                          >
                            Medium
                          </button>
                          <button
                            onClick={() => handleButtonSize(100)}
                            className="btn btn-light"
                          >
                            Large
                          </button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              {/* End Button Editor */}

              <Row>
                {/*  Position Editor */}
                <Col className="pb-4" md={8}>
                  <Card className="h-100">
                    <CardBody>
                      <CardTitle className="h4 mb-4">
                        <span>Position Editor</span>
                      </CardTitle>
                      <Row>
                        <Col md={6}>
                          <div className="d-flex flex-column">
                            <Label>Position</Label>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Basic example"
                            >
                              <button
                                onClick={() =>
                                  handleButtonPosition(20, "", "", 20)
                                }
                                className="btn btn-light"
                              >
                                Top Left
                              </button>
                              <button
                                onClick={() =>
                                  handleButtonPosition(20, 20, "", "")
                                }
                                className="btn btn-light"
                              >
                                Top Right
                              </button>
                              <button
                                onClick={() =>
                                  handleButtonPosition("", "", 20, 20)
                                }
                                className="btn btn-light"
                              >
                                Bottom Left
                              </button>
                              <button
                                onClick={() =>
                                  handleButtonPosition("", 20, 20, "")
                                }
                                className="btn btn-light"
                              >
                                Bottom Right
                              </button>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div>
                            <Label>Margin</Label>
                            <div className="d-flex gap-2">
                              <Input
                                type="number"
                                className="form-control"
                                placeholder="Top"
                              />
                              <Input
                                type="number"
                                className="form-control"
                                placeholder="Right"
                              />
                              <Input
                                type="number"
                                className="form-control"
                                placeholder="Bottom"
                              />
                              <Input
                                type="number"
                                className="form-control"
                                placeholder="Left"
                              />
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>

                {/* End Position Editor */}

                {/* Visibility Editor */}
                <Col className="pb-4" md={4}>
                  <Card className="h-100">
                    <CardBody>
                      <CardTitle className="h4 mb-4">Visibility Editor</CardTitle>
                      <Row>
                        <span>Visibility</span>
                      </Row>
                      <Row>
                        <Col md={3}>
                          <div>
                            <div className="vstack gap-2">
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="defaultCheck1"
                                  value=""
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="defaultCheck1"
                                >
                                  All
                                </label>
                              </div>
                            </div>
                          </div>
                        </Col>

                        <Col md={3}>
                          <div className="form-check">
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck1"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="defaultCheck1"
                            >
                              PC
                            </label>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className="form-check">
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck2"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="defaultCheck2"
                            >
                              Tablet
                            </label>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className="form-check">
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              id="defaultCheck2"
                              value=""
                            />
                            <label
                              className="form-check-label"
                              htmlFor="defaultCheck2"
                            >
                              Mobile
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>

                {/* End Visibility Editor */}
              </Row>
              <Row>
                <Col md={12}>
                  {/* Icon Editor */}
                  <Card>
                    <CardBody>
                      <div className="d-flex gap-4">
                        <CardTitle className="h4 mb-4">Icon</CardTitle>
                        <div className="d-flex gap-2">
                          <div className="vstack gap-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="icon"
                                id="manual"
                                value="manual"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="manual"
                              >
                                Fontawesome
                              </label>
                            </div>
                          </div>
                          <div className="vstack gap-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="icon"
                                id="upload"
                                value="upload"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="upload"
                              >
                                Upload
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Row>
                        <Col md={6}>
                          <div className="form-floating mb-3">
                            <select
                              className="form-select"
                              id="floatingSelectGrid"
                              aria-label="Floating label select example"
                            >
                              <option>Open this select menu</option>
                              <option value="1">Chat</option>
                            </select>
                            <label htmlFor="floatingSelectGrid">
                              Select Icon
                            </label>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  {/* End Icon Editor */}
                </Col>
              </Row>
            </Col>

            <button
              type="button"
              style={{
                top: buttonPositionTop,
                right: buttonPositionRight,
                bottom: buttonPositionBottom,
                left: buttonPositionLeft,
                position: "fixed",
                width: buttonSize,
                height: buttonSize,
                borderRadius: "50%",
                border: 0,
                boxShadow:
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                backgroundColor: backgroundColor,
                color: textColor,
              }}
            >
              {buttonText}
            </button>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Customize;
