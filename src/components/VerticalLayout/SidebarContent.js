import PropTypes from "prop-types";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import withRouter from "../Common/withRouter";
import { Link, useLocation } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = (props) => {
  const [upperPages, setUpperPages] = useState([]);
  const [middlePages, setMiddlePages] = useState([]);
  const [lowerPages, setLowerPages] = useState([]);

  useEffect(() => {
    const getPages = async () => {
      try {
        const headers = {
          Authorization: localStorage.getItem("accessToken"),
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/user/pages`,
          { headers }
        );
        const pages = response.data.data;

        const newUpperPages = [];
        const newMiddlePages = [];
        const newLowerPages = [];

        for (let i = 0; i < pages.length; i++) {
          if (pages[i].sortType === "upper") {
            newUpperPages.push(pages[i]);
            continue;
          } else if (pages[i].sortType === "middle") {
            newMiddlePages.push(pages[i]);
            continue;
          } else {
            newLowerPages.push(pages[i]);
          }
        }

        setUpperPages(newUpperPages);
        setMiddlePages(newMiddlePages);
        setLowerPages(newLowerPages);
      } catch (error) {
        console.log(error);
      }
    };

    getPages(); // eslint-disable-next-line
  }, []);
  // const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      // scrollElement(item);
      return false;
    }
    // scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  // useEffect(() => {
  //   ref.current.recalculate();
  // }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu]);

  // function scrollElement(item) {
  //   if (item) {
  //     const currentPosition = item.offsetTop;
  //     if (currentPosition > window.innerHeight) {
  //       ref.current.getScrollElement().scrollTop = currentPosition - 300;
  //     }
  //   }
  // }
  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>

            {upperPages.map((upperPage) => {
              if (upperPage.sub_pages.length) {
                return (
                  <li key={upperPage.id} className="">
                    <Link to={`/info/${upperPage.name}/${upperPage.id}`}>
                      <i className={upperPage.icon}></i>
                      <span>{upperPage.name}</span>
                    </Link>
                    <ul className="sub-menu">
                      {upperPage.sub_pages.map((sub_page) => {
                        return (
                          <li>
                            <Link to={`/info/${sub_page.name}/${sub_page.id}`}>
                              <i className={sub_page.icon}></i>
                              <span>{sub_page.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              } else {
                return (
                  <li key={upperPage.id}>
                    <Link to={`/info/${upperPage.name}/${upperPage.id}`}>
                      <i className={upperPage.icon}></i>
                      <span>{upperPage.name}</span>
                    </Link>
                  </li>
                );
              }
            })}

            <li>
              <Link to="/e-commerce">
                <i className="uil-shopping-cart"></i>
                <span>{props.t("E-Commerce")}</span>
              </Link>
            </li>

            {middlePages.map((middlePage) => {
              if (middlePage.sortValue === 1) {
                if (middlePage.sub_pages.length) {
                  return (
                    <li key={middlePage.id} className="">
                      <Link to={`/info/${middlePage.name}/${middlePage.id}`}>
                        <i className={middlePage.icon}></i>
                        <span>{middlePage.name}</span>
                      </Link>
                      <ul className="sub-menu">
                        {middlePage.sub_pages.map((sub_page) => {
                          return (
                            <li>
                              <Link
                                to={`/info/${sub_page.name}/${sub_page.id}`}
                              >
                                <i className={sub_page.icon}></i>
                                <span>{sub_page.name}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                } else {
                  return (
                    <li key={middlePage.id}>
                      <Link to={`/info/${middlePage.name}/${middlePage.id}`}>
                        <i className={middlePage.icon}></i>
                        <span>{middlePage.name}</span>
                      </Link>
                    </li>
                  );
                }
              } else {
                return <></>;
              }
            })}

            <li>
              <Link to="/my-product">
                <i className="uil-apps"></i>
                <span>{props.t("My Products")}</span>
              </Link>
            </li>

            {middlePages.map((middlePage) => {
              if (middlePage.sortValue === 2) {
                if (middlePage.sub_pages.length) {
                  return (
                    <li key={middlePage.id} className="">
                      <Link to={`/info/${middlePage.name}/${middlePage.id}`}>
                        <i className={middlePage.icon}></i>
                        <span>{middlePage.name}</span>
                      </Link>
                      <ul className="sub-menu">
                        {middlePage.sub_pages.map((sub_page) => {
                          return (
                            <li>
                              <Link
                                to={`/info/${sub_page.name}/${sub_page.id}`}
                              >
                                <i className={sub_page.icon}></i>
                                <span>{sub_page.name}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                } else {
                  return (
                    <li key={middlePage.id}>
                      <Link to={`/info/${middlePage.name}/${middlePage.id}`}>
                        <i className={middlePage.icon}></i>
                        <span>{middlePage.name}</span>
                      </Link>
                    </li>
                  );
                }
              } else {
                return <></>;
              }
            })}

            <li>
              <Link to="/order-history">
                <i className="uil-invoice"></i>
                <span>{props.t("Order History")}</span>
              </Link>
            </li>

            {lowerPages.map((lowerPage) => {
              if (lowerPage.sub_pages.length) {
                return (
                  <li key={lowerPage.id} className="">
                    <Link to={`/info/${lowerPage.name}/${lowerPage.id}`}>
                      <i className={lowerPage.icon}></i>
                      <span>{lowerPage.name}</span>
                    </Link>
                    <ul className="sub-menu">
                      {lowerPage.sub_pages.map((sub_page) => {
                        return (
                          <li>
                            <Link to={`/info/${sub_page.name}/${sub_page.id}`}>
                              <i className={sub_page.icon}></i>
                              <span>{sub_page.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              } else {
                return (
                  <li key={lowerPage.id}>
                    <Link to={`/info/${lowerPage.name}/${lowerPage.id}`}>
                      <i className={lowerPage.icon}></i>
                      <span>{lowerPage.name}</span>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
