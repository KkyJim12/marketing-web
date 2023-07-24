import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClickAwayListener from "react-click-away-listener";

const FloatingActionButton = () => {
  const { id, productId } = useParams();

  const [buttonText, setButtonText] = useState("Minible");
  const [backgroundColor, setBackgroundColor] = useState("#3b82f6");
  const [bodyColor, setBodyColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#f5f5f5");
  const [buttonSize, setButtonSize] = useState(75);

  const [buttonPositionTop, setButtonPositionTop] = useState(null);
  const [buttonPositionRight, setButtonPositionRight] = useState(20);
  const [buttonPositionBottom, setButtonPositionBottom] = useState(20);
  const [buttonPositionLeft, setButtonPositionLeft] = useState(null);

  const [isPCChecked, setIsPCChecked] = useState(true);
  const [isTabletChecked, setIsTabletChecked] = useState(true);
  const [isMobileChecked, setIsMobileChecked] = useState(true);
  const [floatingActionButton, setFloatingActionButton] = useState(false);

  const [selectedIconPrefix, setSelectedIconPrefix] = useState("fas");
  const [selectedIconValue, setSelectedIconValue] = useState("message");

  const contacts = [
    { id: 1, title: "Email", icon: "fast-mail-alt" },
    { id: 2, title: "Phone", icon: "phone" },
    { id: 3, title: "Line", icon: "line" },
    { id: 4, title: "Facebook", icon: "facebook" },
    { id: 5, title: "Youtube", icon: "youtube" },
  ];

  const closeFloatingActionButton = () => {
    if (floatingActionButton) {
      setFloatingActionButton(false);
    }
  };

  useEffect(() => {
    const getButton = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/button/${productId}`
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
      setSelectedIconPrefix(style.icon.split(" ")[0]);
      setSelectedIconValue(style.icon.split(" ")[1]);
      setIsPCChecked(style.visibleOnPC);
      setIsTabletChecked(style.visibleOnTablet);
      setIsMobileChecked(style.visibleOnMobile);
    };

    getButton();
  }, []);

  return (
    <>
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
              bottom: buttonPositionBottom ? 450 + contacts.length * 10 : null,
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
                    minHeight: 300,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    color: "rgb(75 85 99)",
                    fontWeight: 500,
                    boxShadow:
                      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                  }}
                >
                  {contacts.map((contact, index) => {
                    return (
                      <div
                        key={contact.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          borderTop: "1px solid rgb(229 231 235)",
                        }}
                        className="py-3 px-4"
                      >
                        <i
                          style={{
                            fontSize: 24,
                          }}
                          className={"uil-" + contact.icon}
                        ></i>
                        <span
                          style={{
                            fontSize: 20,
                          }}
                        >
                          {contact.title}
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
    </>
  );
};

export default FloatingActionButton;
