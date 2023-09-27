import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import icons from "../../../assets/icons/free-fontawesome-icons.json";
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
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";

const Customize = () => {
  document.title = " My Product | Marketing tool platform";

  const { id, productId } = useParams();

  const buttonStyles = [
    "Rounded Button",
    "Rounded Button With Text",
    "Long Rounded Button#1",
    "Long Rounded Button#2",
  ];

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
  const [selectedIconShow, setSelectedIconShow] = useState({
    label: "fas message",
    value: "fas message",
  });

  const [prebuiltButtons, setPrebuiltButtons] = useState([]);

  const [contents, setContents] = useState([]);

  const [uploadedIcon, setUploadedIcon] = useState("");
  const [uploadedIconUrl, setUploadedIconUrl] = useState("");
  const [previewUploadedIcon, setPreviewUploadedIcon] = useState("");

  const [selectedButtonStyle, setSelectedButtonStyle] =
    useState("Rounded Button");

  const [iconOptions, setIconOptions] = useState([]);

  useEffect(() => {
    const options = [];
    icons.data.map((icon) => options.push({ label: icon, value: icon }));
    setIconOptions(options);
  }, []);

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

        setSelectedButtonStyle(style.buttonStyle);
        setBackgroundColor(style.backgroundColor);
        setBodyColor(style.bodyColor);
        setTextColor(style.textColor);
        setButtonText(style.textContent);
        setButtonSize(style.size);
        setButtonPositionTop(style.top);
        setButtonPositionRight(style.right);
        setButtonPositionBottom(style.bottom);
        setButtonPositionLeft(style.left);
        setIsPCChecked(style.visibleOnPC);
        setIsTabletChecked(style.visibleOnTablet);
        setIsMobileChecked(style.visibleOnMobile);

        setIconInput(style.iconType);

        if (style.iconType === "upload") {
          setUploadedIconUrl(style.icon);
          setPreviewUploadedIcon(style.icon);
        } else {
          setSelectedIconShow({ label: style.icon, value: style.icon });
          setSelectedIcon(style.icon);
          setSelectedIconPrefix(style.icon.split(" ")[0]);
          setSelectedIconValue(style.icon.split(" ")[1]);
        }
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

  useEffect(() => {
    if (!uploadedIcon) {
      setPreviewUploadedIcon(undefined);
      return;
    }
    // create the preview
    const objectUrl = URL.createObjectURL(uploadedIcon);
    setPreviewUploadedIcon(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedIcon]);

  const handleUploadIcon = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setUploadedIcon(undefined);
      return;
    }

    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/images`,
        formData,
        { headers }
      );
      setUploadedIconUrl(response.data.data);
    } catch (error) {
      console.log(error);
    }

    setUploadedIcon(e.target.files[0]);
  };

  const saveButtonStyle = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/save-button/${productId}`,
        {
          buttonStyle: selectedButtonStyle,
          backgroundColor: backgroundColor,
          bodyColor: bodyColor,
          textColor: textColor,
          textContent: buttonText,
          size: buttonSize,
          top: buttonPositionTop,
          right: buttonPositionRight,
          bottom: buttonPositionBottom,
          left: buttonPositionLeft,
          iconType: iconInput,
          icon:
            iconInput === "font-awesome"
              ? selectedIconPrefix + " " + selectedIconValue
              : uploadedIconUrl,
          visibleOnPC: isPCChecked,
          visibleOnTablet: isTabletChecked,
          visibleOnMobile: isMobileChecked,
        },
        { headers }
      );

      console.log(response);
      toast.success("Saved");
    } catch (error) {
      console.log(error);
    }
  };

  const selectPrebuiltButton = (style) => {
    setSelectedButtonStyle(style.buttonStyle);
    setBackgroundColor(style.backgroundColor);
    setBodyColor(style.bodyColor);
    setTextColor(style.textColor);
    setButtonSize(style.size);
    setButtonPositionTop(style.top);
    setButtonPositionRight(style.right);
    setButtonPositionBottom(style.bottom);
    setButtonPositionLeft(style.left);
    setIconInput(style.iconType);
    setIsPCChecked(style.visibleOnPC);
    setIsTabletChecked(style.visibleOnTablet);
    setIsMobileChecked(style.visibleOnMobile);

    setIconInput(style.iconType);

    if (style.iconType === "upload") {
      setUploadedIconUrl(style.icon);
      setPreviewUploadedIcon(style.icon);
    } else {
      setSelectedIcon(style.icon);
      setSelectedIconPrefix(style.icon.split(" ")[0]);
      setSelectedIconValue(style.icon.split(" ")[1]);
    }
  };

  const handleSelectedIcon = (e) => {
    const splitIcon = e.value.split(" ");
    setSelectedIconShow({ label: e.value, value: e.value });
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

  const selectButtonStyle = (buttonStyle) => {
    setSelectedButtonStyle(buttonStyle);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle className="h4 mb-4">
                <span>Button Styles</span>
              </CardTitle>
              <Row>
                {buttonStyles.map((buttonStyle) => {
                  return (
                    <Col md={2}>
                      <div className="d-flex flex-column gap-2">
                        <Label>{buttonStyle}</Label>
                        <Button
                          onClick={() => selectButtonStyle(buttonStyle)}
                          type="button"
                          className={
                            buttonStyle === selectedButtonStyle
                              ? "btn btn-success"
                              : "btn btn-info"
                          }
                        >
                          {buttonStyle === selectedButtonStyle
                            ? "Selected"
                            : "Choose this style"}
                        </Button>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col md={12}>
          <h6>Pre-built Buttons</h6>
          <Row className="mt-4">
            {prebuiltButtons.map((button) => {
              return (
                <Col key={button.id} md={2}>
                  <Card>
                    <CardBody>
                      <CardTitle className="d-flex justify-content-center">
                        {button.buttonStyle === "Rounded Button" ? (
                          <div
                            style={{ float: "right" }}
                            className="d-flex gap-2 align-items-center"
                          >
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
                                fontSize:
                                  button.iconType === "upload" && button.icon
                                    ? ""
                                    : 32,
                              }}
                              className={
                                button.iconType === "upload" && button.icon
                                  ? "p-3"
                                  : ""
                              }
                            >
                              {button.iconType === "upload" && button.icon ? (
                                <img
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                  }}
                                  src={button.icon}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={[
                                    button.icon.split(" ")[0],
                                    button.icon.split(" ")[1],
                                  ]}
                                />
                              )}
                            </button>
                          </div>
                        ) : button.buttonStyle === "Long Rounded Button#1" ? (
                          <div
                            style={{
                              float: button.right === null ? "left" : "right",
                            }}
                            className="d-flex gap-2 align-items-center"
                          >
                            <button
                              type="button"
                              className="d-flex justify-content-center align-items-center gap-3 px-4"
                              style={{
                                width: "100%",
                                height: button.size,
                                borderRadius: 9999,
                                border: 0,
                                boxShadow:
                                  "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                                backgroundColor: button.backgroundColor,
                                color: button.textColor,
                                fontSize: 32,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {button.iconType === "upload" && button.icon ? (
                                <img
                                  style={{
                                    width: 35,
                                    height: 35,
                                  }}
                                  src={button.icon}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={[
                                    button.icon.split(" ")[0],
                                    button.icon.split(" ")[1],
                                  ]}
                                />
                              )}
                              <h5 style={{ color: button.textColor }}>
                                {button.textContent}
                              </h5>
                            </button>
                          </div>
                        ) : button.buttonStyle ===
                          "Rounded Button With Text" ? (
                          <div
                            style={{
                              float: button.right === null ? "left" : "right",
                              whiteSpace: "nowrap",
                            }}
                            className="d-flex gap-2 align-items-center"
                          >
                            {button.right && (
                              <div
                                className="px-3 py-2 d-flex justify-content-center align-items-center"
                                style={{
                                  background: "white",
                                  borderRadius: 10,
                                  boxShadow:
                                    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                                }}
                              >
                                <h5>{button.textContent}</h5>
                              </div>
                            )}
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
                              {button.iconType === "upload" && button.icon ? (
                                <img
                                  style={{
                                    width: 35,
                                    height: 35,
                                  }}
                                  src={button.icon}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={[
                                    button.icon.split(" ")[0],
                                    button.icon.split(" ")[1],
                                  ]}
                                />
                              )}
                            </button>
                            {button.left && <h5>{button.textContent}</h5>}
                          </div>
                        ) : (
                          <div
                            style={{
                              float: button.right === null ? "left" : "right",
                            }}
                            className="d-flex gap-2 align-items-center"
                          >
                            <button
                              type="button"
                              className="d-flex justify-content-center align-items-center gap-3 px-2"
                              style={{
                                width: "100%",
                                height: button.size,
                                borderRadius: 9999,
                                border: 0,
                                boxShadow:
                                  "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                                backgroundColor: "white",
                                color: button.textColor,
                                fontSize: 32,
                                whiteSpace: "nowrap",
                              }}
                            >
                              <h5
                                style={{
                                  color: "#374151",
                                }}
                              >
                                {button.textContent}
                              </h5>
                              <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                  background: button.backgroundColor,
                                  width: button.size * 0.9,
                                  height: button.size * 0.9,
                                  borderRadius: "50%",
                                }}
                              >
                                {button.iconType === "upload" && button.icon ? (
                                  <img
                                    style={{
                                      width: 35,
                                      height: 35,
                                    }}
                                    src={button.icon}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    icon={[
                                      button.icon.split(" ")[0],
                                      button.icon.split(" ")[1],
                                    ]}
                                  />
                                )}
                              </div>
                            </button>
                          </div>
                        )}
                      </CardTitle>
                      <Row>
                        <Col className="mt-2" md={12}>
                          <p>Background Color: {button.backgroundColor}</p>
                          <p>Text Color: {button.textColor}</p>
                          <p>
                            Icon:{" "}
                            {button.iconType === "font-awesome"
                              ? button.icon
                              : "uploaded Icon"}
                          </p>
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
                            onClick={(e) => setIconInput("font-awesome")}
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
                            onClick={(e) => setIconInput("upload")}
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
                          <Select
                            value={selectedIconShow}
                            onChange={(e) => handleSelectedIcon(e)}
                            options={iconOptions}
                          />
                        </div>
                      ) : (
                        <div className="form-floating mb-3">
                          {previewUploadedIcon && (
                            <div className="d-flex justify-content-center mb-3">
                              <img
                                style={{ height: 100 }}
                                src={previewUploadedIcon}
                              />
                            </div>
                          )}
                          <button
                            className="btn-rounded waves-effect waves-light btn btn-primary w-100"
                            type="button"
                            onClick={openIconUploadInput}
                          >
                            Upload
                          </button>
                          <input
                            onChange={handleUploadIcon}
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
                          onClick={(e) => setIsPCChecked(!isPCChecked)}
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
                          onClick={(e) => setIsTabletChecked(!isTabletChecked)}
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
                          onClick={(e) => setIsMobileChecked(!isMobileChecked)}
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
          {selectedButtonStyle === "Rounded Button" ? (
            <div
              style={{ float: "right" }}
              className="d-flex gap-2 align-items-center"
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
                  fontSize:
                    iconInput === "upload" && previewUploadedIcon ? "" : 32,
                }}
                className={
                  iconInput === "upload" && previewUploadedIcon ? "p-3" : ""
                }
              >
                {iconInput === "upload" && previewUploadedIcon ? (
                  <img
                    style={{
                      width: 35,
                      height: 35,
                    }}
                    src={previewUploadedIcon}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={[selectedIconPrefix, selectedIconValue]}
                  />
                )}
              </button>
            </div>
          ) : selectedButtonStyle === "Long Rounded Button#1" ? (
            <div
              style={{
                float: buttonPositionRight === null ? "left" : "right",
              }}
              className="d-flex gap-2 align-items-center"
            >
              <button
                onClick={(e) => setFloatingActionButton(!floatingActionButton)}
                type="button"
                className="d-flex justify-content-center align-items-center gap-3 px-4"
                style={{
                  width: "100%",
                  height: buttonSize,
                  borderRadius: 9999,
                  border: 0,
                  boxShadow:
                    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                  backgroundColor: backgroundColor,
                  color: textColor,
                  fontSize: 32,
                  whiteSpace: "nowrap",
                }}
              >
                {iconInput === "upload" && previewUploadedIcon ? (
                  <img
                    style={{
                      width: 35,
                      height: 35,
                    }}
                    src={previewUploadedIcon}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={[selectedIconPrefix, selectedIconValue]}
                  />
                )}
                <h5 style={{ color: textColor }}>{buttonText}</h5>
              </button>
            </div>
          ) : selectedButtonStyle === "Rounded Button With Text" ? (
            <div
              style={{
                float: buttonPositionRight === null ? "left" : "right",
                whiteSpace: "nowrap",
              }}
              className="d-flex gap-2 align-items-center"
            >
              {buttonPositionRight && (
                <div
                  className="px-3 py-2 d-flex justify-content-center align-items-center"
                  style={{
                    background: "white",
                    borderRadius: 10,
                    boxShadow:
                      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                  }}
                >
                  <h5>{buttonText}</h5>
                </div>
              )}
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
                {iconInput === "upload" && previewUploadedIcon ? (
                  <img
                    style={{
                      width: 35,
                      height: 35,
                    }}
                    src={previewUploadedIcon}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={[selectedIconPrefix, selectedIconValue]}
                  />
                )}
              </button>
              {buttonPositionLeft && <h5>{buttonText}</h5>}
            </div>
          ) : (
            <div
              style={{
                float: buttonPositionRight === null ? "left" : "right",
              }}
              className="d-flex gap-2 align-items-center"
            >
              <button
                onClick={(e) => setFloatingActionButton(!floatingActionButton)}
                type="button"
                className="d-flex justify-content-center align-items-center gap-3 px-2"
                style={{
                  width: "100%",
                  height: buttonSize,
                  borderRadius: 9999,
                  border: 0,
                  boxShadow:
                    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                  backgroundColor: "white",
                  color: textColor,
                  fontSize: 32,
                  whiteSpace: "nowrap",
                }}
              >
                <h5
                  style={{
                    color: "#374151",
                  }}
                >
                  {buttonText}
                </h5>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    background: backgroundColor,
                    width: buttonSize * 0.9,
                    height: buttonSize * 0.9,
                    borderRadius: "50%",
                  }}
                >
                  {iconInput === "upload" && previewUploadedIcon ? (
                    <img
                      style={{
                        width: 35,
                        height: 35,
                      }}
                      src={previewUploadedIcon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={[selectedIconPrefix, selectedIconValue]}
                    />
                  )}
                </div>
              </button>
            </div>
          )}
          {floatingActionButton && (
            <div
              style={{
                position: "relative",
                top: buttonPositionTop ? 90 : null,
                left: buttonPositionLeft ? 0 : null,
                bottom: buttonPositionBottom ? 75 + contents.length * 75 : null,
                right: buttonPositionRight ? 300 : null,
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
                    width: 350,
                    fontWeight: 600,
                    fontSize: 20,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {buttonText}
                </div>

                <ClickAwayListener onClickAway={closeFloatingActionButton}>
                  <div
                    style={{
                      marginRight: buttonPositionRight
                        ? buttonPositionRight
                        : null,
                      background: bodyColor,
                      cursor: "pointer",
                      height: contents.length * 75,
                      width: "100%",
                      borderBottomLeftRadius: 15,
                      borderBottomRightRadius: 15,
                      color: "rgb(75 85 99)",
                      fontWeight: 500,
                      boxShadow:
                        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    }}
                  >
                    {contents.map((content) => {
                      return (
                        <div
                          key={content.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            borderTop: "1px solid rgb(229 231 235)",
                            color: content.textColor,
                          }}
                          className="py-3 px-4"
                        >
                          {content.icon && (
                            <FontAwesomeIcon
                              style={{ fontSize: 16 }}
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
                          <i
                            style={{
                              fontSize: 24,
                              marginLeft: "auto",
                            }}
                            className="uil-angle-right"
                          ></i>
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
