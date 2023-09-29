import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Input,
  CardBody,
  CardTitle,
  Label,
  Button,
} from "reactstrap";
import ColorPicker from "@vtaits/react-color-picker";
import ClickAwayListener from "react-click-away-listener";
import { useParams } from "react-router-dom";
import axios from "axios";
import icons from "../../../assets/icons/free-fontawesome-icons.json";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Parser from "html-react-parser";

const SubMenu = () => {
  const { id, productId } = useParams();

  // Preview
  const [buttonText, setButtonText] = useState("Minible");
  const [backgroundColor, setBackgroundColor] = useState("#3b82f6");
  const [bodyColor, setBodyColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#f5f5f5");
  const [buttonSize, setButtonSize] = useState(70);

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
  const [selectedButtonStyle, setSelectedButtonStyle] =
    useState("Rounded Button");
  const [uploadedIcon, setUploadedIcon] = useState("");
  const [uploadedIconUrl, setUploadedIconUrl] = useState("");
  const [previewUploadedIcon, setPreviewUploadedIcon] = useState("");

  const closeFloatingActionButton = () => {
    if (floatingActionButton) {
      setFloatingActionButton(false);
    }
  };

  // End Preview

  const [selectedMenuErrorsResult, setSelectedMenuErrorsResult] = useState([]);
  const [customMenuErrorsResult, setCustomMenuErrorsResult] = useState([]);
  const [iconOptions, setIconOptions] = useState([]);

  const [setting, setSetting] = useState("");

  useEffect(() => {
    const getSetting = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem("accessToken"),
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/settings`,
          { headers }
        );
        setSetting(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSetting();
  }, []);

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
        setSelectedIcon(style.icon);
        setSelectedIconPrefix(style.icon.split(" ")[0]);
        setSelectedIconValue(style.icon.split(" ")[1]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const options = [];
    icons.data.map((icon) => options.push({ label: icon, value: icon }));
    setIconOptions(options);

    getButton();
  }, []);

  const validateRequests = () => {
    const selectedMenuesError = [];

    for (let i = 0; i < selectedMenues.length; i++) {
      let selectedMenuError = {};
      if (selectedMenues[i].icon === "") {
        selectedMenuError.icon = "Please select icon";
      }

      if (selectedMenues[i].textContent === "") {
        selectedMenuError.textContent = "Please type content";
      }

      if (selectedMenues[i].description === "") {
        selectedMenuError.description = "Please type description";
      }

      if (selectedMenues[i].destination === "") {
        selectedMenuError.destination = "Please type destination";
      }

      selectedMenuesError.push(selectedMenuError);
    }
    setSelectedMenuErrorsResult(selectedMenuesError);

    const customMenuesError = [];

    for (let i = 0; i < customMenues.length; i++) {
      let customMenuError = {};
      if (customMenues[i].icon === "") {
        customMenuError.icon = "Please select icon";
      }

      if (customMenues[i].textContent === "") {
        customMenuError.textContent = "Please type content";
      }

      if (customMenues[i].description === "") {
        customMenuError.description = "Please type description";
      }

      if (customMenues[i].destination === "") {
        customMenuError.destination = "Please type destination";
      }

      customMenuesError.push(customMenuError);
    }
    setCustomMenuErrorsResult(customMenuesError);
  };

  const saveButtonSetting = async () => {
    validateRequests();
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/save-button-contents/${productId}`,
        {
          contents: selectedMenues.concat(customMenues),
        },
        { headers }
      );

      toast.success("Saved");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleCustomMenuTextContent = (e, id) => {
    let index;
    for (let i = 0; i < customMenues.length; i++) {
      if (customMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newCustomMenues = [...customMenues];
    newCustomMenues[index].textContent = e.target.value;
    setCustomMenues(newCustomMenues);
  };

  const handleCustomMenuDescription = (e, id) => {
    let index;
    for (let i = 0; i < customMenues.length; i++) {
      if (customMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newCustomMenues = [...customMenues];
    newCustomMenues[index].description = e.target.value;
    setCustomMenues(newCustomMenues);
  };

  const handleCustomMenuDestination = (e, id) => {
    let index;
    for (let i = 0; i < customMenues.length; i++) {
      if (customMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newCustomMenues = [...customMenues];
    newCustomMenues[index].destination = e.target.value;
    setCustomMenues(newCustomMenues);
  };

  const handleCustomMenuClass = (e, id) => {
    let index;
    for (let i = 0; i < customMenues.length; i++) {
      if (customMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newCustomMenues = [...customMenues];
    newCustomMenues[index].class = e.target.value;
    setCustomMenues(newCustomMenues);
  };

  const handleSelectedMenuDescription = (e, id) => {
    let index;
    for (let i = 0; i < selectedMenues.length; i++) {
      if (selectedMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newSelectedMenues = [...selectedMenues];
    newSelectedMenues[index].description = e.target.value;
    setSelectedMenues(newSelectedMenues);
  };

  const handleSelectedMenuDestination = (e, id) => {
    let index;
    for (let i = 0; i < selectedMenues.length; i++) {
      if (selectedMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newSelectedMenues = [...selectedMenues];
    newSelectedMenues[index].destination = e.target.value;
    setSelectedMenues(newSelectedMenues);
  };

  const handleSelectedMenuClass = (e, id) => {
    let index;
    for (let i = 0; i < selectedMenues.length; i++) {
      if (selectedMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newSelectedMenues = [...selectedMenues];
    newSelectedMenues[index].class = e.target.value;
    setSelectedMenues(newSelectedMenues);
  };

  const onDragTextColor = (color, id) => {
    let index;
    for (let i = 0; i < selectedMenues.length; i++) {
      if (selectedMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newSelectedMenues = [...selectedMenues];
    newSelectedMenues[index].textColor = color;
    setSelectedMenues(newSelectedMenues);
  };

  const closeTextColorPicker = (id) => {
    let index;
    for (let i = 0; i < selectedMenues.length; i++) {
      if (selectedMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newSelectedMenues = [...selectedMenues];
    newSelectedMenues[index].textColorPickerEnable = false;
    setSelectedMenues(newSelectedMenues);
  };

  const openTextColorPicker = (id) => {
    let index;
    for (let i = 0; i < selectedMenues.length; i++) {
      if (selectedMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newSelectedMenues = [...selectedMenues];
    newSelectedMenues[index].textColorPickerEnable = true;
    setSelectedMenues(newSelectedMenues);
  };

  const [subMenues, setSubMenues] = useState([]);
  const [selectedMenues, setSelectedMenues] = useState([]);

  const selectMenu = (id) => {
    setSelectedMenuErrorsResult([]);
    if (
      selectedMenues.filter((selectedMenu) => selectedMenu.id === id).length > 0
    ) {
      const newSelectedMenues = selectedMenues.filter((selectedMenu) => {
        return selectedMenu.id !== id;
      });
      setSelectedMenues(newSelectedMenues);
    } else {
      const thisMenu = subMenues.filter((subMenu) => {
        return subMenu.id === id;
      })[0];

      setSelectedMenues([
        ...selectedMenues,
        {
          id: thisMenu.id,
          textColor: thisMenu.textColor,
          icon: thisMenu.icon,
          textContent: thisMenu.textContent,
          description: thisMenu.description,
          destination: thisMenu.destination,
          textColorPickerEnable: false,
        },
      ]);
    }
  };

  const uuidv4 = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  // Custom
  const [customMenues, setCustomMenues] = useState([]);

  const onDragCustomTextColor = (color, id) => {
    let index;
    for (let i = 0; i < customMenues.length; i++) {
      if (customMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newCustomMenues = [...customMenues];
    newCustomMenues[index].textColor = color;
    setCustomMenues(newCustomMenues);
  };

  const closeCustomTextColorPicker = (id) => {
    let index;
    for (let i = 0; i < customMenues.length; i++) {
      if (customMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newCustomMenues = [...customMenues];
    newCustomMenues[index].textColorPickerEnable = false;
    setCustomMenues(newCustomMenues);
  };

  const openCustomTextColorPicker = (id) => {
    let index;
    for (let i = 0; i < customMenues.length; i++) {
      if (customMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newCustomMenues = [...customMenues];
    newCustomMenues[index].textColorPickerEnable = true;
    setCustomMenues(newCustomMenues);
  };

  const addCustomMenu = () => {
    const newCustomMenu = {
      id: uuidv4(),
      label: "Custom",
      textColor: "#343a40",
      icon: "",
      textContent: "",
      description: "",
      destination: "",
      class: "",
      textColorPickerEnable: false,
    };
    setCustomMenues([...customMenues, newCustomMenu]);
  };

  const removeCustomMenu = (id) => {
    let index;
    for (let i = 0; i < customMenues.length; i++) {
      if (customMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newCustomMenues = [...customMenues];
    newCustomMenues.splice(index, 1);

    const customMenuErrors = [...customMenuErrorsResult];
    customMenuErrors.splice(index, 1);
    setCustomMenuErrorsResult(customMenuErrors);

    setCustomMenues(newCustomMenues);
  };

  const handleSelectedCustomMenuIcon = (e, id) => {
    const clonedCustomMenues = [...customMenues];
    for (let i = 0; i < clonedCustomMenues.length; i++) {
      if (clonedCustomMenues[i].id === id) {
        clonedCustomMenues[i].icon = e.value;
        clonedCustomMenues[i].iconShow = { label: e.value, value: e.value };
        break;
      }
    }

    setCustomMenues(clonedCustomMenues);
  };

  useEffect(() => {
    const getPrebuiltContents = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem("accessToken"),
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/prebuilt-contents/${productId}`,
          { headers }
        );

        setSubMenues(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getExistContents = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem("accessToken"),
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/exist-contents/${productId}`,
          { headers }
        );

        const existContents = response.data.data;
        const newSelectedMenues = [];
        const newCustomMenues = [];

        for (let i = 0; i < existContents.length; i++) {
          if (existContents[i].prebuiltContentId) {
            newSelectedMenues.push({
              id: existContents[i].prebuiltContentId,
              textColor: existContents[i].textColor,
              icon: existContents[i].icon,
              textContent: existContents[i].textContent,
              description: existContents[i].description,
              destination: existContents[i].destination,
              class: existContents[i].class,
              textColorPickerEnable: false,
            });
          } else {
            newCustomMenues.push({
              id: uuidv4(),
              textColor: existContents[i].textColor,
              icon: existContents[i].icon,
              iconShow: {
                label: existContents[i].icon,
                value: existContents[i].icon,
              },
              textContent: existContents[i].textContent,
              description: existContents[i].description,
              destination: existContents[i].destination,
              class: existContents[i].class,
              textColorPickerEnable: false,
              label: "Custom",
            });
          }
        }
        setSelectedMenues(newSelectedMenues);
        setCustomMenues(newCustomMenues);
      } catch (error) {
        console.log(error);
      }
    };

    getPrebuiltContents();
    getExistContents();
  }, []);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Container fluid>
        <Row>
          <Col md={12}>
            <Card>
              <CardBody>
                <CardTitle>Sub Menu</CardTitle>
                <Row>
                  {subMenues.map((subMenu) => {
                    return (
                      <Col key={subMenu.id} md={2}>
                        <div className="d-flex flex-column card p-4">
                          <p>Text Color: {subMenu.textColor}</p>
                          <p>Icon: {subMenu.icon}</p>
                          <p>Text: {subMenu.textContent}</p>
                          <p>Description: {subMenu.description}</p>
                          <p>Destination: {subMenu.destination}</p>
                          <p>Class: {subMenu.class}</p>
                          <Button
                            className={
                              selectedMenues.filter(
                                (selectedMenu) => selectedMenu.id === subMenu.id
                              ).length > 0
                                ? "btn btn-success w-100"
                                : "btn btn-info w-100"
                            }
                            onClick={() => selectMenu(subMenu.id)}
                          >
                            {selectedMenues.filter(
                              (selectedMenu) => selectedMenu.id === subMenu.id
                            ).length > 0
                              ? "Selected"
                              : "Select"}
                          </Button>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </CardBody>
            </Card>
          </Col>
          {selectedMenues.map((selectedMenu, index) => {
            return (
              <Col key={index} md={12}>
                <Card>
                  <CardBody>
                    <CardTitle>{selectedMenu.textContent}</CardTitle>
                    <Row>
                      <Col md={2}>
                        <Label>Text color</Label>
                        <div className="d-flex gap-2">
                          <Input
                            type="text"
                            className="colorpicker-default"
                            value={selectedMenu.textColor}
                            readOnly
                          />
                          <div
                            onClick={() => openTextColorPicker(selectedMenu.id)}
                            className="btn"
                            style={{
                              backgroundColor: selectedMenu.textColor,
                              width: 40,
                              height: 40,
                            }}
                          ></div>
                          {selectedMenu.textColorPickerEnable ? (
                            <ClickAwayListener
                              onClickAway={() =>
                                closeTextColorPicker(selectedMenu.id)
                              }
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
                                  value={selectedMenu.textColor}
                                  onDrag={(color) =>
                                    onDragTextColor(color, selectedMenu.id)
                                  }
                                />
                              </>
                            </ClickAwayListener>
                          ) : null}
                        </div>
                      </Col>

                      <Col md={2}>
                        <Label>Icon</Label>
                        <Input
                          style={{ background: "#f5f5f5" }}
                          className="form-control"
                          placeholder="Text"
                          value={selectedMenu.icon}
                          readOnly
                        ></Input>
                        {selectedMenuErrorsResult[index] && (
                          <small className="text-danger">
                            {selectedMenuErrorsResult[index].icon}
                          </small>
                        )}
                      </Col>
                      <Col md={2}>
                        <Label>Text</Label>
                        <Input
                          style={{ background: "#f5f5f5" }}
                          className="form-control"
                          placeholder="Text"
                          value={selectedMenu.textContent}
                          readOnly
                        ></Input>
                        {selectedMenuErrorsResult[index] && (
                          <small className="text-danger">
                            {selectedMenuErrorsResult[index].textContent}
                          </small>
                        )}
                      </Col>
                      <Col md={2}>
                        <Label>Description</Label>
                        <Input
                          className="form-control"
                          placeholder="Description"
                          value={selectedMenu.description}
                          onChange={(e) =>
                            handleSelectedMenuDescription(e, selectedMenu.id)
                          }
                        ></Input>
                        {selectedMenuErrorsResult[index] && (
                          <small className="text-danger">
                            {selectedMenuErrorsResult[index].description}
                          </small>
                        )}
                      </Col>
                      <Col md={2}>
                        <Label>Destination</Label>
                        <Input
                          className="form-control"
                          placeholder="Destination"
                          value={selectedMenu.destination}
                          onChange={(e) =>
                            handleSelectedMenuDestination(e, selectedMenu.id)
                          }
                        ></Input>
                        {selectedMenuErrorsResult[index] && (
                          <small className="text-danger">
                            {selectedMenuErrorsResult[index].destination}
                          </small>
                        )}
                      </Col>
                      <Col md={2}>
                        <Label>Class</Label>
                        <Input
                          className="form-control"
                          placeholder="Class"
                          value={selectedMenu.destination}
                          onChange={(e) =>
                            handleSelectedMenuClass(e, selectedMenu.id)
                          }
                        ></Input>
                        {selectedMenuErrorsResult[index] && (
                          <small className="text-danger">
                            {selectedMenuErrorsResult[index].class}
                          </small>
                        )}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Row>
          {customMenues.map((customMenu, index) => {
            return (
              <Col md={12} key={index}>
                <Card>
                  <CardBody>
                    <CardTitle>
                      <div className="d-flex justify-content-between">
                        <span>{customMenu.label}</span>
                        <Button
                          onClick={() => removeCustomMenu(customMenu.id)}
                          type="button"
                          className="btn btn-danger btn-sm"
                        >
                          Remove
                        </Button>
                      </div>
                    </CardTitle>
                    <Row>
                      <Col md={2}>
                        <Label>Text color</Label>
                        <div className="d-flex gap-2">
                          <Input
                            type="text"
                            className="colorpicker-default"
                            value={customMenu.textColor}
                            readOnly
                          />
                          <div
                            onClick={() =>
                              openCustomTextColorPicker(customMenu.id)
                            }
                            className="btn"
                            style={{
                              backgroundColor: customMenu.textColor,
                              width: 40,
                              height: 40,
                            }}
                          ></div>
                          {customMenu.textColorPickerEnable ? (
                            <ClickAwayListener
                              onClickAway={() =>
                                closeCustomTextColorPicker(customMenu.id)
                              }
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
                                  value={customMenu.textColor}
                                  onDrag={(color) =>
                                    onDragCustomTextColor(color, customMenu.id)
                                  }
                                />
                              </>
                            </ClickAwayListener>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={2}>
                        <Label>Icon</Label>

                        <Select
                          value={customMenu.iconShow}
                          onChange={(e) =>
                            handleSelectedCustomMenuIcon(e, customMenu.id)
                          }
                          options={iconOptions}
                        />

                        {customMenuErrorsResult[index] && (
                          <small className="text-danger">
                            {customMenuErrorsResult[index].icon}
                          </small>
                        )}
                      </Col>
                      <Col md={2}>
                        <Label>Text</Label>
                        <Input
                          className="form-control"
                          placeholder="Text"
                          value={customMenu.textContent}
                          onChange={(e) =>
                            handleCustomMenuTextContent(e, customMenu.id)
                          }
                        ></Input>
                        {customMenuErrorsResult[index] && (
                          <small className="text-danger">
                            {customMenuErrorsResult[index].textContent}
                          </small>
                        )}
                      </Col>
                      <Col md={2}>
                        <Label>Description</Label>
                        <Input
                          className="form-control"
                          placeholder="Description"
                          value={customMenu.description}
                          onChange={(e) =>
                            handleCustomMenuDescription(e, customMenu.id)
                          }
                        ></Input>
                        {customMenuErrorsResult[index] && (
                          <small className="text-danger">
                            {customMenuErrorsResult[index].description}
                          </small>
                        )}
                      </Col>
                      <Col md={2}>
                        <Label>Destination</Label>
                        <Input
                          className="form-control"
                          placeholder="Destination"
                          value={customMenu.destination}
                          onChange={(e) =>
                            handleCustomMenuDestination(e, customMenu.id)
                          }
                        ></Input>
                        {customMenuErrorsResult[index] && (
                          <small className="text-danger">
                            {customMenuErrorsResult[index].destination}
                          </small>
                        )}
                      </Col>
                      <Col md={2}>
                        <Label>Class</Label>
                        <Input
                          className="form-control"
                          placeholder="Class"
                          value={customMenu.class}
                          onChange={(e) =>
                            handleCustomMenuClass(e, customMenu.id)
                          }
                        ></Input>
                        {customMenuErrorsResult[index] && (
                          <small className="text-danger">
                            {customMenuErrorsResult[index].class}
                          </small>
                        )}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
          <Col md={12}>
            <div className="d-grid gap-2">
              <Button
                onClick={addCustomMenu}
                type="button"
                className="btn btn-primary"
              >
                Add Custom
              </Button>
            </div>
          </Col>
          <Col md={12}>
            <div className="d-grid gap-2 mt-2">
              <Button
                onClick={saveButtonSetting}
                type="button"
                className="btn btn-success"
              >
                Save Button Setting
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="ql-editor">
          <Col md={12}>
            {setting.buttonSettingPage && Parser(setting.buttonSettingPage)}
          </Col>
        </Row>
        <Row>
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
                  onClick={(e) =>
                    setFloatingActionButton(!floatingActionButton)
                  }
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className={
                    iconInput === "upload" && previewUploadedIcon ? "p-3" : ""
                  }
                >
                  {iconInput === "upload" && previewUploadedIcon ? (
                    <img
                      style={{
                        width: buttonSize / 2,
                        height: buttonSize / 2,
                      }}
                      src={previewUploadedIcon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      style={{
                        width: buttonSize / 2.5,
                        height: buttonSize / 2.5,
                      }}
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
                  onClick={(e) =>
                    setFloatingActionButton(!floatingActionButton)
                  }
                  type="button"
                  className="d-flex justify-content-center align-items-center gap-3"
                  style={{
                    width: "100%",
                    height: buttonSize - 10,
                    borderRadius: 9999,
                    border: 0,
                    boxShadow:
                      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    backgroundColor: backgroundColor,
                    color: textColor,
                    fontSize: 32,
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 30,
                    paddingRight: 30,
                  }}
                >
                  {iconInput === "upload" && previewUploadedIcon ? (
                    <img
                      style={{
                        width: buttonSize / 2,
                        height: buttonSize / 2,
                      }}
                      src={previewUploadedIcon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      style={{
                        width: buttonSize / 2.5,
                        height: buttonSize / 2.5,
                      }}
                      icon={[selectedIconPrefix, selectedIconValue]}
                    />
                  )}
                  <h5
                    style={{
                      fontSize: buttonSize / 3.5,
                      color: textColor,
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    {buttonText}
                  </h5>
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
                    className="px-3 py-1 d-flex justify-content-center align-items-center"
                    style={{
                      background: "white",
                      borderRadius: 10,
                      boxShadow:
                        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    }}
                  >
                    <h5
                      style={{
                        fontSize: buttonSize / 3.5,
                        marginTop: "auto",
                        marginBottom: "auto",
                      }}
                    >
                      {buttonText}
                    </h5>
                  </div>
                )}
                <button
                  onClick={(e) =>
                    setFloatingActionButton(!floatingActionButton)
                  }
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {iconInput === "upload" && previewUploadedIcon ? (
                    <img
                      style={{
                        width: buttonSize / 2,
                        height: buttonSize / 2,
                      }}
                      src={previewUploadedIcon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      style={{
                        width: buttonSize / 2.5,
                        height: buttonSize / 2.5,
                      }}
                      icon={[selectedIconPrefix, selectedIconValue]}
                    />
                  )}
                </button>
                {buttonPositionLeft && (
                  <h5
                    style={{
                      fontSize: buttonSize / 3.5,
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    {buttonText}
                  </h5>
                )}
              </div>
            ) : (
              <div
                style={{
                  float: buttonPositionRight === null ? "left" : "right",
                }}
                className="d-flex gap-2 align-items-center"
              >
                <button
                  onClick={(e) =>
                    setFloatingActionButton(!floatingActionButton)
                  }
                  type="button"
                  className="d-flex justify-content-center align-items-center gap-2"
                  style={{
                    width: "100%",
                    height: buttonSize - 10,
                    borderRadius: 9999,
                    border: 0,
                    boxShadow:
                      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    backgroundColor: "white",
                    color: textColor,
                    fontSize: 32,
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h5
                    style={{
                      color: "#374151",
                      fontSize: buttonSize / 3.5,
                      marginLeft: buttonSize / 4,
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    {buttonText}
                  </h5>
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      background: backgroundColor,
                      width: (buttonSize - 10) * 0.95,
                      height: (buttonSize - 10) * 0.95,
                      borderRadius: "50%",
                    }}
                  >
                    {iconInput === "upload" && previewUploadedIcon ? (
                      <img
                        style={{
                          width: buttonSize / 2,
                          height: buttonSize / 2,
                        }}
                        src={previewUploadedIcon}
                      />
                    ) : (
                      <FontAwesomeIcon
                        style={{
                          width: buttonSize / 2.5,
                          height: buttonSize / 2.5,
                        }}
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
                  top: buttonPositionTop
                    ? buttonSize === 50
                      ? 60
                      : buttonSize === 70
                      ? 80
                      : 100
                    : null,
                  left: buttonPositionLeft ? 0 : null,
                  bottom: buttonPositionBottom
                    ? 75 + customMenues.concat(selectedMenues).length * 75
                    : null,
                  right: buttonPositionRight
                    ? buttonSize === 50
                      ? 320
                      : buttonSize === 70
                      ? 300
                      : 280
                    : null,
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
                      fontWeight: 500,
                      fontSize: 20,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {buttonText}
                  </div>

                  <div
                    style={{
                      marginRight: buttonPositionRight
                        ? buttonPositionRight
                        : null,
                      background: bodyColor,
                      cursor: "pointer",
                      height: customMenues.concat(selectedMenues).length * 75,
                      width: "100%",
                      borderBottomLeftRadius: 15,
                      borderBottomRightRadius: 15,
                      color: "rgb(75 85 99)",
                      fontWeight: 500,
                      boxShadow:
                        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                    }}
                  >
                    {customMenues.concat(selectedMenues).map((content) => {
                      return (
                        <div
                          key={content.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            borderTop: "1px solid rgb(229 231 235)",
                            height: 75,
                          }}
                          className="py-3 px-4"
                        >
                          {content.icon && (
                            <FontAwesomeIcon
                              style={{ fontSize: 24, color: content.textColor }}
                              icon={[
                                content.icon.split(" ")[0],
                                content.icon.split(" ")[1],
                              ]}
                            />
                          )}
                          <span
                            style={{
                              fontSize: 18,
                              display: "flex",
                              alignItems: "center",
                              fontWeight: 500,
                              marginLeft: 10,
                              gap: 10,
                            }}
                          >
                            <p style={{ marginTop: 10 }}>
                              {content.textContent}
                            </p>
                            <p style={{ fontSize: 12, marginTop: 10 }}>
                              {content.description}
                            </p>
                          </span>

                          <FontAwesomeIcon
                            style={{ fontSize: 24, marginLeft: "auto" }}
                            icon={["fas", "angle-right"]}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default SubMenu;
