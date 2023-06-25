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
} from "reactstrap";
import ColorPicker from "@vtaits/react-color-picker";
import ClickAwayListener from "react-click-away-listener";

const SubMenu = () => {
  const [backgroundColorEnable, setBackgroundColorEnable] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#3b82f6");
  const onDragBackgroundColor = color => {
    setBackgroundColor(color);
  };
  const closeBackgroundColorPicker = () => {
    setBackgroundColorEnable(false);
  };
  const subMenues = [
    { id: 1, title: "Facebook" },
    { id: 2, title: "Line" },
    { id: 3, title: "Email" },
    { id: 4, title: "Youtube" },
  ];

  const [selectedMenues, setSelectedMenues] = useState([1, 2]);

  const selectMenu = e => {
    const thisId = parseInt(e.target.value);
    if (selectedMenues.includes(thisId)) {
      const newSelectedMenues = [...selectedMenues].filter(i => i !== thisId);
      setSelectedMenues(newSelectedMenues);
    } else {
      setSelectedMenues([...selectedMenues, thisId]);
    }
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
                          onChange={selectMenu}
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
        {selectedMenues.map(selectedMenu => {
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
    </Container>
  );
};

export default SubMenu;
