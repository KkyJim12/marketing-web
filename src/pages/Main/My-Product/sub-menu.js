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

const SubMenu = () => {
  const { id, productId } = useParams();

  const [selectedMenuErrorsResult, setSelectedMenuErrorsResult] = useState([]);
  const [customMenuErrorsResult, setCustomMenuErrorsResult] = useState([]);

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
        clonedCustomMenues[i].icon = e.target.value;
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
              textColorPickerEnable: false,
            });
          } else {
            newCustomMenues.push({
              id: uuidv4(),
              textColor: existContents[i].textColor,
              icon: existContents[i].icon,
              textContent: existContents[i].textContent,
              description: existContents[i].description,
              destination: existContents[i].destination,
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
                      <Col key={subMenu.id} md={1}>
                        <div className="d-flex gap-2 align-items-center">
                          <Button
                            className={
                              selectedMenues.filter(
                                (selectedMenu) => selectedMenu.id === subMenu.id
                              ).length > 0
                                ? "btn btn-success"
                                : "btn btn-info"
                            }
                            onClick={() => selectMenu(subMenu.id)}
                          >
                            {selectedMenues.filter(
                              (selectedMenu) => selectedMenu.id === subMenu.id
                            ).length > 0
                              ? "Selected"
                              : "Select"}
                          </Button>
                          <p>{subMenu.textContent}</p>
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
                      <Col md={3}>
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
                      <Col md={3}>
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
                        <select
                          onChange={(e) =>
                            handleSelectedCustomMenuIcon(e, customMenu.id)
                          }
                          className="form-control"
                          value={customMenu.icon}
                        >
                          <option>Select Icon</option>
                          {icons &&
                            icons.data.map((icon, index) => {
                              return (
                                <option key={index} value={icon}>
                                  {icon}
                                </option>
                              );
                            })}
                        </select>

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
                      <Col md={3}>
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
                      <Col md={3}>
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
      </Container>
    </>
  );
};

export default SubMenu;
