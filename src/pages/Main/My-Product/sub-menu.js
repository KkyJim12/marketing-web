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
import icons from "./free-icon.json";

const SubMenu = () => {
  const { id, productId } = useParams();

  const saveButtonSetting = () => {
    console.log(selectedMenues);
    console.log(customMenues);
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

  const onDragBackgroundColor = (color, id) => {
    let index;
    for (let i = 0; i < selectedMenues.length; i++) {
      if (selectedMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newSelectedMenues = [...selectedMenues];
    newSelectedMenues[index].backgroundColor = color;
    setSelectedMenues(newSelectedMenues);
  };

  const closeBackgroundColorPicker = (id) => {
    let index;
    for (let i = 0; i < selectedMenues.length; i++) {
      if (selectedMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newSelectedMenues = [...selectedMenues];
    newSelectedMenues[index].backgroundColorPickerEnable = false;
    setSelectedMenues(newSelectedMenues);
  };

  const openBackgroundColorPicker = (id) => {
    let index;
    for (let i = 0; i < selectedMenues.length; i++) {
      if (selectedMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newSelectedMenues = [...selectedMenues];
    newSelectedMenues[index].backgroundColorPickerEnable = true;
    setSelectedMenues(newSelectedMenues);
  };

  const [subMenues, setSubMenues] = useState([]);
  const [selectedMenues, setSelectedMenues] = useState([]);

  const selectMenu = (id, index) => {
    const thisId = id;
    let isChecked = false;

    for (let i = 0; i < selectedMenues.length; i++) {
      if (selectedMenues[i].id === thisId) {
        isChecked = true;
        break;
      }
    }
    if (isChecked) {
      const clonedSelectedMenues = [...selectedMenues];
      const newSelectedMenues = clonedSelectedMenues.filter((i) => {
        return i.id !== thisId;
      });
      setSelectedMenues(newSelectedMenues);
    } else {
      const thisMenu = subMenues.filter((i) => {
        return i.id === thisId;
      });
      setSelectedMenues([
        ...selectedMenues,
        {
          id: thisMenu[0].id,
          backgroundColor: thisMenu[0].backgroundColor,
          icon: thisMenu[0].icon,
          textContent: thisMenu[0].textContent,
          description: thisMenu[0].description,
          destination: thisMenu[0].destination,
          backgroundColorPickerEnable: false,
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

  const onDragCustomBackgroundColor = (color, id) => {
    let index;
    for (let i = 0; i < customMenues.length; i++) {
      if (customMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newCustomMenues = [...customMenues];
    newCustomMenues[index].backgroundColor = color;
    setCustomMenues(newCustomMenues);
  };

  const closeCustomBackgroundColorPicker = (id) => {
    let index;
    for (let i = 0; i < customMenues.length; i++) {
      if (customMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newCustomMenues = [...customMenues];
    newCustomMenues[index].backgroundColorPickerEnable = false;
    setCustomMenues(newCustomMenues);
  };

  const openCustomBackgroundColorPicker = (id) => {
    let index;
    for (let i = 0; i < customMenues.length; i++) {
      if (customMenues[i].id === id) {
        index = i;
        break;
      }
    }

    const newCustomMenues = [...customMenues];
    newCustomMenues[index].backgroundColorPickerEnable = true;
    setCustomMenues(newCustomMenues);
  };

  const addCustomMenu = () => {
    const newCustomMenu = {
      id: uuidv4(),
      label: "Custom",
      backgroundColor: "#3b82f6",
      icon: "",
      textContent: "",
      description: "",
      destination: "",
      backgroundColorPickerEnable: false,
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
    setCustomMenues(newCustomMenues);
  };

  useEffect(() => {
    const getPrebuiltContents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/prebuilt-contents/${productId}`
        );

        setSubMenues(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getPrebuiltContents();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardTitle>Sub Menu</CardTitle>
              <Row>
                {subMenues.map((subMenu, index) => {
                  return (
                    <Col key={subMenu.id} md={1}>
                      <div className="form-check">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          id={subMenu.id}
                          value={subMenu.id}
                          onClick={() => selectMenu(subMenu.id, index)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={subMenu.id}
                        >
                          {subMenu.textContent}
                        </label>
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
                      <Label>Background color</Label>
                      <div className="d-flex gap-2">
                        <Input
                          type="text"
                          className="colorpicker-default"
                          value={selectedMenu.backgroundColor}
                          readOnly
                        />
                        <div
                          onClick={() =>
                            openBackgroundColorPicker(selectedMenu.id)
                          }
                          className="btn"
                          style={{
                            backgroundColor: selectedMenu.backgroundColor,
                            width: 40,
                            height: 40,
                          }}
                        ></div>
                        {selectedMenu.backgroundColorPickerEnable ? (
                          <ClickAwayListener
                            onClickAway={() =>
                              closeBackgroundColorPicker(selectedMenu.id)
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
                                value={selectedMenu.backgroundColor}
                                onDrag={(color) =>
                                  onDragBackgroundColor(color, selectedMenu.id)
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
                        value={selectedMenu.icon}
                        className="form-control"
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
            <Col md={12}>
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
                      <Label>Background color</Label>
                      <div className="d-flex gap-2">
                        <Input
                          type="text"
                          className="colorpicker-default"
                          value={customMenu.backgroundColor}
                          readOnly
                        />
                        <div
                          onClick={() =>
                            openCustomBackgroundColorPicker(customMenu.id)
                          }
                          className="btn"
                          style={{
                            backgroundColor: customMenu.backgroundColor,
                            width: 40,
                            height: 40,
                          }}
                        ></div>
                        {customMenu.backgroundColorPickerEnable ? (
                          <ClickAwayListener
                            onClickAway={() =>
                              closeCustomBackgroundColorPicker(customMenu.id)
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
                                value={customMenu.backgroundColor}
                                onDrag={(color) =>
                                  onDragCustomBackgroundColor(
                                    color,
                                    customMenu.id
                                  )
                                }
                              />
                            </>
                          </ClickAwayListener>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={2}>
                      <Label>Icon</Label>
                      <select className="form-control">
                        <option>Select Icon</option>
                        <option>User</option>
                      </select>
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
  );
};

export default SubMenu;
