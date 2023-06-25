import { useState } from "react";
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

const SubMenu = () => {
  const [backgroundColorEnable, setBackgroundColorEnable] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const onDragBackgroundColor = (color, index) => {
    let newBackgroundColor = [...backgroundColor];
    newBackgroundColor[index] = color;
    setBackgroundColor(newBackgroundColor);
  };
  const closeBackgroundColorPicker = index => {
    let newBackgroundColorEnable = [...backgroundColorEnable];
    newBackgroundColorEnable[index] = false;
    setBackgroundColorEnable(newBackgroundColorEnable);
  };

  const openBackgroundColorPicker = index => {
    let newBackgroundColorEnable = [...backgroundColorEnable];
    newBackgroundColorEnable[index] = true;
    setBackgroundColorEnable(newBackgroundColorEnable);
  };

  const subMenues = [
    { id: 1, title: "Facebook" },
    { id: 2, title: "Line" },
    { id: 3, title: "Email" },
    { id: 4, title: "Youtube" },
  ];

  const [selectedMenues, setSelectedMenues] = useState([]);

  const selectMenu = (e, index) => {
    const thisId = parseInt(e.target.value);
    if (selectedMenues.includes(thisId)) {
      const newSelectedMenues = [...selectedMenues].filter(i => i !== thisId);
      setSelectedMenues(newSelectedMenues);
      setBackgroundColor(
        backgroundColor.filter((i, idx) => {
          return idx !== index;
        })
      );
    } else {
      setBackgroundColor([...backgroundColor, "#3b82f6"]);
      setSelectedMenues([...selectedMenues, thisId]);
    }
  };

  // Custom
  const [customMenues, setCustomMenues] = useState([]);
  const [customBackgroundColorEnable, setCustomBackgroundColorEnable] =
    useState([]);
  const [customBackgroundColor, setCustomBackgroundColor] = useState([]);
  const onDragCustomBackgroundColor = (color, index) => {
    let newCustomBackgroundColor = [...customBackgroundColor];
    newCustomBackgroundColor[index] = color;
    setCustomBackgroundColor(newCustomBackgroundColor);
  };
  const closeCustomBackgroundColorPicker = index => {
    let newCustomBackgroundColorEnable = [...customBackgroundColorEnable];
    newCustomBackgroundColorEnable[index] = false;
    setCustomBackgroundColorEnable(newCustomBackgroundColorEnable);
  };

  const openCustomBackgroundColorPicker = index => {
    let newCustomBackgroundColorEnable = [...customBackgroundColorEnable];
    newCustomBackgroundColorEnable[index] = true;
    setCustomBackgroundColorEnable(newCustomBackgroundColorEnable);
  };

  const addCustomMenu = () => {
    setCustomMenues([...customMenues, { title: "Custom" }]);
    setCustomBackgroundColor([...customBackgroundColor, "#3b82f6"]);
    setCustomBackgroundColorEnable([...customBackgroundColorEnable, false]);
  };

  const removeCustomMenu = index => {
    let newCustomMenues = [...customMenues];
    newCustomMenues.splice(index, 1);
    setCustomMenues(newCustomMenues);
    let newCustomBackgroundColor = [...customBackgroundColor];
    newCustomBackgroundColor.splice(index, 1);
    setCustomBackgroundColor(newCustomBackgroundColor);
  };

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
                          id={subMenu.title}
                          value={subMenu.id}
                          onChange={e => selectMenu(e, index)}
                          checked={selectedMenues.includes(subMenu.id)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={subMenu.title}
                        >
                          {subMenu.title}
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
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardTitle>
                    {subMenues.filter(i => i.id === selectedMenu)[0].title}
                  </CardTitle>
                  <Row>
                    <Col md={2}>
                      <Label>Background color</Label>
                      <div className="d-flex gap-2">
                        <Input
                          type="text"
                          className="colorpicker-default"
                          value={backgroundColor[index]}
                          readOnly
                        />
                        <div
                          onClick={() => openBackgroundColorPicker(index)}
                          className="btn"
                          style={{
                            backgroundColor: backgroundColor[index],
                            width: 40,
                            height: 40,
                          }}
                        ></div>
                        {backgroundColorEnable[index] ? (
                          <ClickAwayListener
                            onClickAway={() =>
                              closeBackgroundColorPicker(index)
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
                                value={backgroundColor[index]}
                                onDrag={color =>
                                  onDragBackgroundColor(color, index)
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
                      ></Input>
                    </Col>
                    <Col md={3}>
                      <Label>Description</Label>
                      <Input
                        className="form-control"
                        placeholder="Description"
                      ></Input>
                    </Col>
                    <Col md={3}>
                      <Label>Destination</Label>
                      <Input
                        className="form-control"
                        placeholder="Destination"
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
                      <span>{customMenu.title}</span>
                      <Button
                        onClick={() => removeCustomMenu(index)}
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
                          value={customBackgroundColor[index]}
                          readOnly
                        />
                        <div
                          onClick={() => openCustomBackgroundColorPicker(index)}
                          className="btn"
                          style={{
                            backgroundColor: customBackgroundColor[index],
                            width: 40,
                            height: 40,
                          }}
                        ></div>
                        {customBackgroundColorEnable[index] ? (
                          <ClickAwayListener
                            onClickAway={() =>
                              closeCustomBackgroundColorPicker(index)
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
                                value={customBackgroundColor[index]}
                                onDrag={color =>
                                  onDragCustomBackgroundColor(color, index)
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
                      ></Input>
                    </Col>
                    <Col md={3}>
                      <Label>Description</Label>
                      <Input
                        className="form-control"
                        placeholder="Description"
                      ></Input>
                    </Col>
                    <Col md={3}>
                      <Label>Destination</Label>
                      <Input
                        className="form-control"
                        placeholder="Destination"
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
              className="btn btn-success"
            >
              Add Custom
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SubMenu;
