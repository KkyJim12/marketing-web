import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import icons from "./free-icon.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClickAwayListener from "react-click-away-listener";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Label,
  Input,
  Button,
} from "reactstrap";
import ColorPicker from "@vtaits/react-color-picker";
import "@vtaits/react-color-picker/dist/index.css";

const Customize = () => {
  document.title = " My Product | Marketing tool platform";

  const { id, productId } = useParams();

  const [buttonText, setButtonText] = useState("Minible");
  const [backgroundColorEnable, setBackgroundColorEnable] = useState(false);
  const [bodyColorEnable, setBodyColorEnable] = useState(false);
  const [textColorEnable, setTextColorEnable] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#3b82f6");
  const [bodyColor, setBodyColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#f5f5f5");
  const [buttonSize, setButtonSize] = useState(75);

  const [buttonPositionTop, setButtonPositionTop] = useState(null);
  const [buttonPositionRight, setButtonPositionRight] = useState(20);
  const [buttonPositionBottom, setButtonPositionBottom] = useState(20);
  const [buttonPositionLeft, setButtonPositionLeft] = useState(null);

  const [iconInput, setIconInput] = useState("font-awesome");
  const [isPCChecked, setIsPCChecked] = useState(true);
  const [isTabletChecked, setIsTabletChecked] = useState(true);
  const [isMobileChecked, setIsMobileChecked] = useState(true);
  const [floatingActionButton, setFloatingActionButton] = useState(false);

  const [selectedIconPrefix, setSelectedIconPrefix] = useState("fas");
  const [selectedIconValue, setSelectedIconValue] = useState("message");
  const [selectedIcon, setSelectedIcon] = useState("fas message");

  const [prebuiltButtons, setPrebuiltButtons] = useState([]);

  const [contents, setContents] = useState([]);

  useEffect(() => {
    const getPrebuiltButtons = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem("accessToken"),
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/prebuilt-buttons/${productId}`,
          { headers }
        );

        console.log(response.data.data);

        setPrebuiltButtons(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getButton = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem("accessToken"),
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/button/${productId}`,
          { headers }
        );

        const style = response.data.data;

        setBackgroundColor(style.backgroundColor);
        setBodyColor(style.bodyColor);
        setTextColor(style.textColor);
        setButtonText(style.textContent);
        setButtonSize(style.size);
        setButtonPositionTop(style.top);
        setButtonPositionRight(style.right);
        setButtonPositionBottom(style.bottom);
        setButtonPositionLeft(style.left);
        setSelectedIcon(style.icon);
        setSelectedIconPrefix(style.icon.split(" ")[0]);
        setSelectedIconValue(style.icon.split(" ")[1]);
        setIsPCChecked(style.visibleOnPC);
        setIsTabletChecked(style.visibleOnTablet);
        setIsMobileChecked(style.visibleOnMobile);
      } catch (error) {
        console.log(error);
      }
    };

    const getContents = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem("accessToken"),
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/contents/${productId}`,
          { headers }
        );

        console.log(response);
        setContents(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPrebuiltButtons();
    getButton();
    getContents();
  }, []);

  const saveButtonStyle = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/save-button/${productId}`,
        {
          backgroundColor: backgroundColor,
          bodyColor: bodyColor,
          textColor: textColor,
          textContent: buttonText,
          size: buttonSize,
          top: buttonPositionTop,
          right: buttonPositionRight,
          bottom: buttonPositionBottom,
          left: buttonPositionLeft,
          iconType: "font-awesome",
          icon: selectedIconPrefix + " " + selectedIconValue,
          visibleOnPC: isPCChecked,
          visibleOnTablet: isTabletChecked,
          visibleOnMobile: isMobileChecked,
        },
        { headers }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const selectPrebuiltButton = (style) => {
    setBackgroundColor(style.backgroundColor);
    setBodyColor(style.bodyColor);
    setTextColor(style.textColor);
    setButtonSize(style.size);
    setButtonPositionTop(style.top);
    setButtonPositionRight(style.right);
    setButtonPositionBottom(style.bottom);
    setButtonPositionLeft(style.left);
    setIconInput(style.iconType);
    setSelectedIcon(style.icon);
    setSelectedIconPrefix(style.icon.split(" ")[0]);
    setSelectedIconValue(style.icon.split(" ")[1]);
    setIsPCChecked(style.visibleOnPC);
    setIsTabletChecked(style.visibleOnTablet);
    setIsMobileChecked(style.visibleOnMobile);
  };

  const handleSelectedIcon = (e) => {
    const splitIcon = e.target.value.split(" ");
    setSelectedIconPrefix(splitIcon[0]);
    setSelectedIconValue(splitIcon[1]);
  };

  const handlePositionTop = (e) => {
    setButtonPositionTop(parseInt(e.target.value));
  };

  const handlePositionRight = (e) => {
    setButtonPositionRight(parseInt(e.target.value));
  };

  const handlePositionBottom = (e) => {
    setButtonPositionBottom(parseInt(e.target.value));
  };

  const handlePositionLeft = (e) => {
    setButtonPositionLeft(parseInt(e.target.value));
  };

  const onDragBackgroundColor = (color) => {
    setBackgroundColor(color);
  };

  const onDragBodyColor = (color) => {
    setBodyColor(color);
  };

  const onDragTextColor = (color) => {
    setTextColor(color);
  };

  const handleButtonText = (e) => {
    setButtonText(e.target.value);
  };

  const handleButtonSize = (size) => {
    setButtonSize(size);
  };

  const handleButtonPosition = (t, r, b, l) => {
    setButtonPositionTop(t);
    setButtonPositionRight(r);
    setButtonPositionBottom(b);
    setButtonPositionLeft(l);
  };

  const closeBackgroundColorPicker = () => {
    setBackgroundColorEnable(false);
  };

  const closeBodyColorPicker = () => {
    setBodyColorEnable(false);
  };

  const closeTextColorPicker = () => {
    setTextColorEnable(false);
  };

  const closeFloatingActionButton = () => {
    if (floatingActionButton) {
      setFloatingActionButton(false);
    }
  };

  const openIconUploadInput = () => {
    document.getElementById("iconUploadInput").click();
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <h6>Pre-built Buttons</h6>
          <Row className="mt-4">
            {prebuiltButtons.map((button) => {
              return (
                <Col key={button.id} md={2}>
                  <Card>
                    <CardBody>
                      <CardTitle className="d-flex justify-content-center">
                        <button
                          type="button"
                          style={{
                            width: button.size,
                            height: button.size,
                            borderRadius: "50%",
                            border: 0,
                            boxShadow:
                              "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                            backgroundColor: button.backgroundColor,
                            color: button.textColor,
                            fontSize: 32,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={[
                              button.icon.split(" ")[0],
                              button.icon.split(" ")[1],
                            ]}
                          />
                        </button>
                      </CardTitle>
                      <Row>
                        <Col className="mt-2" md={12}>
                          <p>Background Color: {button.backgroundColor}</p>
                          <p>Text Color: {button.textColor}</p>
                          <p>Icon: {button.icon}</p>
                          <p>Size: {button.size}</p>
                        </Col>
                      </Row>
                      <div className="d-grid gap-2">
                        <Button
                          onClick={() => selectPrebuiltButton(button)}
                          type="button"
                          className="btn btn-success"
                        >
                          Select
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col md={12}>
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
                        <ClickAwayListener
                          onClickAway={closeBackgroundColorPicker}
                        >
                          <>
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
                          </>
                        </ClickAwayListener>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col md={2}>
                  <div>
                    <Label>Body color</Label>
                    <div className="d-flex gap-2">
                      <Input
                        type="text"
                        className="colorpicker-default"
                        value={bodyColor}
                        readOnly
                      />
                      <div
                        onClick={() => {
                          setBodyColorEnable(!bodyColorEnable);
                        }}
                        className="btn"
                        style={{
                          backgroundColor: bodyColor,
                          width: 40,
                          height: 40,
                        }}
                      ></div>
                      {bodyColorEnable ? (
                        <ClickAwayListener onClickAway={closeBodyColorPicker}>
                          <>
                            <ColorPicker
                              style={{
                                position: "absolute",
                                right: 10,
                                marginTop: "2.8rem",
                                zIndex: 500,
                              }}
                              saturationHeight={100}
                              saturationWidth={100}
                              value={bodyColor}
                              onDrag={onDragBodyColor}
                            />
                          </>
                        </ClickAwayListener>
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
                        <ClickAwayListener onClickAway={closeTextColorPicker}>
                          <>
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
                          </>
                        </ClickAwayListener>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col md={3}>
                  <div>
                    <Label>Text</Label>
                    <div className="d-flex gap-2">
                      <Input
                        onChange={handleButtonText}
                        value={buttonText}
                        type="text"
                        className="form-control"
                        placeholder="Button Text"
                      />
                    </div>
                  </div>
                </Col>
                <Col md={3}>
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
            <Col className="pb-4" md={12}>
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
                              handleButtonPosition(20, null, null, 20)
                            }
                            className="btn btn-light"
                          >
                            Top Left
                          </button>
                          <button
                            onClick={() =>
                              handleButtonPosition(20, 20, null, null)
                            }
                            className="btn btn-light"
                          >
                            Top Right
                          </button>
                          <button
                            onClick={() =>
                              handleButtonPosition(null, null, 20, 20)
                            }
                            className="btn btn-light"
                          >
                            Bottom Left
                          </button>
                          <button
                            onClick={() =>
                              handleButtonPosition(null, 20, 20, null)
                            }
                            className="btn btn-light"
                          >
                            Bottom Right
                          </button>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="d-flex gap-2">
                        <div className="">
                          <Label>Top</Label>
                          <Input
                            type="number"
                            className={
                              buttonPositionTop === null
                                ? "form-control bg-light"
                                : "form-control"
                            }
                            placeholder="Top"
                            onChange={handlePositionTop}
                            value={
                              buttonPositionTop === null
                                ? ""
                                : buttonPositionTop
                            }
                            disabled={buttonPositionTop === null}
                          />
                        </div>
                        <div className="">
                          <Label>Right</Label>
                          <Input
                            type="number"
                            className={
                              buttonPositionRight === null
                                ? "form-control bg-light"
                                : "form-control"
                            }
                            placeholder="Right"
                            onChange={handlePositionRight}
                            value={
                              buttonPositionRight === null
                                ? ""
                                : buttonPositionRight
                            }
                            disabled={buttonPositionRight === null}
                          />
                        </div>
                        <div className="">
                          <Label>Bottom</Label>
                          <Input
                            type="number"
                            className={
                              buttonPositionBottom === null
                                ? "form-control bg-light"
                                : "form-control"
                            }
                            placeholder="Bottom"
                            onChange={handlePositionBottom}
                            value={
                              buttonPositionBottom === null
                                ? ""
                                : buttonPositionBottom
                            }
                            disabled={buttonPositionBottom === null}
                          />
                        </div>
                        <div className="">
                          <Label>Left</Label>
                          <Input
                            type="number"
                            className={
                              buttonPositionLeft === null
                                ? "form-control bg-light"
                                : "form-control"
                            }
                            placeholder="Left"
                            onChange={handlePositionLeft}
                            value={
                              buttonPositionLeft === null
                                ? ""
                                : buttonPositionLeft
                            }
                            disabled={buttonPositionLeft === null}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            {/* End Position Editor */}
          </Row>
          <Row>
            <Col md={6}>
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
                            onChange={(e) => setIconInput("font-awesome")}
                            checked={iconInput === "font-awesome"}
                          />
                          <label className="form-check-label" htmlFor="manual">
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
                            onChange={(e) => setIconInput("upload")}
                            checked={iconInput === "upload"}
                          />
                          <label className="form-check-label" htmlFor="upload">
                            Upload
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Row>
                    <Col md={12}>
                      {iconInput === "font-awesome" ? (
                        <div className="form-floating mb-3">
                          <select
                            className="form-select"
                            id="floatingSelectGrid"
                            aria-label="Floating label select example"
                            onChange={handleSelectedIcon}
                            value={selectedIcon}
                          >
                            {icons &&
                              icons.data.map((icon, index) => {
                                return (
                                  <option key={index} value={icon}>
                                    {icon}
                                  </option>
                                );
                              })}
                          </select>
                          <label htmlFor="floatingSelectGrid">
                            Select Icon ({icons.data.length})
                          </label>
                        </div>
                      ) : (
                        <div className="form-floating mb-3">
                          <button
                            className="btn-rounded waves-effect waves-light btn btn-primary  w-100"
                            type="button"
                            onClick={openIconUploadInput}
                          >
                            Upload
                          </button>
                          <input
                            id="iconUploadInput"
                            className="d-none"
                            type="file"
                          />
                        </div>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              {/* End Icon Editor */}
            </Col>
            {/* Visibility Editor */}
            <Col className="pb-4" md={6}>
              <Card className="h-100">
                <CardBody>
                  <CardTitle className="h4 mb-4">Visibility Editor</CardTitle>
                  <Row>
                    <span>Visibility</span>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <div className="form-check">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          id="defaultCheck1"
                          checked={isPCChecked}
                          onChange={(e) => setIsPCChecked(!isPCChecked)}
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
                          checked={isTabletChecked}
                          onChange={(e) => setIsTabletChecked(!isTabletChecked)}
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
                          checked={isMobileChecked}
                          onChange={(e) => setIsMobileChecked(!isMobileChecked)}
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
              <div className="d-grid gap-2">
                <Button
                  onClick={saveButtonStyle}
                  type="button"
                  className="btn btn-success"
                >
                  Save Button Style
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
        <div
          style={{
            top: buttonPositionTop,
            right: buttonPositionRight,
            bottom: buttonPositionBottom,
            left: buttonPositionLeft,
            position: "fixed",
            width: buttonSize,
            height: buttonSize,
            zIndex: 99999,
          }}
        >
          <button
            onClick={(e) => setFloatingActionButton(!floatingActionButton)}
            type="button"
            style={{
              width: buttonSize,
              height: buttonSize,
              borderRadius: "50%",
              border: 0,
              boxShadow:
                "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              backgroundColor: backgroundColor,
              color: textColor,
              fontSize: 32,
            }}
          >
            {selectedIconValue && (
              <FontAwesomeIcon icon={[selectedIconPrefix, selectedIconValue]} />
            )}
          </button>
          {floatingActionButton && (
            <div
              style={{
                position: "relative",
                top: buttonPositionTop ? 10 : null,
                left: buttonPositionLeft ? 10 : null,
                bottom: buttonPositionBottom
                  ? 150 + contents.length * 65
                  : null,
                right: buttonPositionRight ? 280 : null,
              }}
            >
              <div
                style={{
                  position: "absolute",
                }}
              >
                <div
                  style={{
                    backgroundColor: backgroundColor,
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingRight: 20,
                    paddingLeft: 20,
                    color: textColor,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    minWidth: 350,
                    fontWeight: 600,
                    fontSize: 20,
                  }}
                >
                  {buttonText}
                </div>

                <ClickAwayListener onClickAway={closeFloatingActionButton}>
                  <div
                    style={{
                      background: bodyColor,
                      cursor: "pointer",
                      height: 65 * contents.length,
                      borderBottomLeftRadius: 15,
                      borderBottomRightRadius: 15,
                      color: "rgb(75 85 99)",
                      fontWeight: 500,
                      boxShadow:
                        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    }}
                  >
                    {contents.map((content, index) => {
                      return (
                        <div
                          key={content.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            borderTop: "1px solid rgb(229 231 235)",
                          }}
                          className="py-3 px-4"
                        >
                          {content.icon && (
                            <FontAwesomeIcon
                              icon={[
                                content.icon.split(" ")[0],
                                content.icon.split(" ")[1],
                              ]}
                            />
                          )}
                          <span
                            style={{
                              fontSize: 20,
                            }}
                          >
                            {content.textContent}
                          </span>
                          <FontAwesomeIcon
                            style={{ marginLeft: "auto" }}
                            icon={["fas", "chevron-right"]}
                          />
                        </div>
                      );
                    })}
                  </div>
                </ClickAwayListener>
              </div>
            </div>
          )}
        </div>
      </Row>
    </>
  );
};

export default Customize;
