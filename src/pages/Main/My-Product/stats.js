import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  CardSubtitle,
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "reactstrap";
import "./datatables.scss";

import ReactEcharts from "echarts-for-react";

import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { MDBDataTable } from "mdbreact";

const Stats = () => {
  document.title = " Stats | Marketing tool platform";

  const [singlebtn, setSinglebtn] = useState(false);
  const series = [
    {
      name: "Percentage",
      type: "column",
      data: [30, 40, 50, 20, 25, 60, 70],
    },
    {
      name: "Sessions",
      type: "area",
      data: [100, 120, 130, 150, 125, 180, 200],
    },
    {
      name: "Conversions",
      type: "line",
      data: [30, 48, 65, 30, 31, 120, 140],
    },
  ];

  const options = {
    chart: {
      stacked: !1,
      toolbar: {
        show: !1,
      },
    },
    stroke: {
      width: [0, 2, 4],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
      },
    },
    colors: ["#5b73e8", "#dfe2e6", "#f1b44c"],

    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: !1,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: [
      "01/01/2003",
      "02/01/2003",
      "03/01/2003",
      "04/01/2003",
      "05/01/2003",
      "06/01/2003",
      "07/01/2003",
    ],
    markers: {
      size: 0,
    },

    xaxis: {
      type: "datetime",
    },
    yaxis: {
      title: {
        text: "Volume",
      },
    },
    tooltip: {
      shared: !0,
      intersect: !1,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + "";
          }
          return y;
        },
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  const options1 = {
    fill: {
      colors: ["#5b73e8"],
    },
    chart: {
      width: 70,
      sparkline: {
        enabled: !0,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },
    labels: [1, 2, 3, 4, 5, 6, 7],
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    tooltip: {
      fixed: {
        enabled: !1,
      },
      x: {
        show: !1,
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
      marker: {
        show: !1,
      },
    },
  };

  const series1 = [
    {
      data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54],
    },
  ];

  const reports = [
    {
      id: 1,
      icon: "mdi mdi-arrow-up-bold",
      title: "Sessions",
      value: 200,
      prefix: "",
      suffix: "",
      badgeValue: "2.65%",
      decimal: 0,
      charttype: "bar",
      chartheight: 40,
      chartwidth: 70,
      color: "success",
      desc: "since last week",
      series: series1,
      options: options1,
    },
    {
      id: 2,
      icon: "mdi mdi-arrow-down-bold",
      title: "Conversions",
      value: 150,
      prefix: "",
      suffix: "",
      badgeValue: "4%",
      decimal: 0,
      charttype: "bar",
      chartheight: 40,
      chartwidth: 70,
      color: "danger",
      desc: "since last week",
      series: series1,
      options: options1,
    },
    {
      id: 3,
      icon: "mdi mdi-arrow-down-bold",
      title: "Conversions",
      value: 150,
      prefix: "",
      suffix: "",
      badgeValue: "4%",
      decimal: 0,
      charttype: "bar",
      chartheight: 40,
      chartwidth: 70,
      color: "danger",
      desc: "since last week",
      series: series1,
      options: options1,
    },
    {
      id: 4,
      icon: "mdi mdi-arrow-down-bold",
      title: "Conversions",
      value: 150,
      prefix: "",
      suffix: "",
      badgeValue: "4%",
      decimal: 0,
      charttype: "bar",
      chartheight: 40,
      chartwidth: 70,
      color: "danger",
      desc: "since last week",
      series: series1,
      options: options1,
    },
  ];

  const data = {
    columns: [
      {
        label: "Source",
        field: "source",
        sort: "asc",
        width: 150,
      },
      {
        label: "Sessions",
        field: "session",
        sort: "asc",
        width: 270,
      },
      {
        label: "Line",
        field: "line",
        sort: "asc",
        width: 270,
      },
      {
        label: "Mobile",
        field: "mobile",
        sort: "asc",
        width: 270,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 270,
      },
      {
        label: "Lead From",
        field: "leadFrom",
        sort: "asc",
        width: 270,
      },
      {
        label: "Facebook",
        field: "facebook",
        sort: "asc",
        width: 270,
      },
    ],
    rows: [
      {
        source: "Direct",
        session: 30,
        line: 40,
        mobile: 50,
        email: 100,
        leadFrom: 30,
        facebook: 50,
      },
      {
        source: "Organic Search",
        session: 30,
        line: 40,
        mobile: 50,
        email: 100,
        leadFrom: 30,
        facebook: 50,
      },
      {
        source: "Paid Search",
        session: 30,
        line: 40,
        mobile: 50,
        email: 100,
        leadFrom: 30,
        facebook: 50,
      },
      {
        source: "Social Media",
        session: 30,
        line: 40,
        mobile: 50,
        email: 100,
        leadFrom: 30,
        facebook: 50,
      },
      {
        source: "Total",
        session: 30,
        line: 40,
        mobile: 50,
        email: 100,
        leadFrom: 30,
        facebook: 50,
      },
    ],
  };

  const doughnutOption = {
    toolbox: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      x: "left",
      data: ["Direct", "Organic Search", "Paid Search", "Social Media"],
      textStyle: {
        color: ["#74788d"],
      },
    },
    color: ["#02a499", "#f8b425", "#ec4561", "#38a4f8", "#3c4ccf"],
    series: [
      {
        name: "Sessions",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center",
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "22",
              fontWeight: "bold",
            },
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: [
          { value: 335, name: "Direct" },
          { value: 310, name: "Organic Search" },
          { value: 234, name: "Paid Search" },
          { value: 135, name: "Social Media" },
        ],
      },
    ],
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Stats</h4>

                <div className="page-title-right d-flex align-items-center gap-4">
                  <div>
                    <label
                      htmlFor="example-date-input"
                      className="col-form-label"
                    >
                      Start Date
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      defaultValue="2019-08-19"
                      id="example-date-input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="example-date-input"
                      className="col-form-label"
                    >
                      End Date
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      defaultValue="2019-08-19"
                      id="example-date-input"
                    />
                  </div>
                  <div>
                    <label className="col-form-label">Duration</label>
                    <Dropdown
                      isOpen={singlebtn}
                      toggle={() => setSinglebtn(!singlebtn)}
                    >
                      <DropdownToggle
                        tag="button"
                        className="btn btn-info"
                        caret
                      >
                        Duration <i className="mdi mdi-chevron-down" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Today</DropdownItem>
                        <DropdownItem>This Week</DropdownItem>
                        <DropdownItem>This Month</DropdownItem>
                        <DropdownItem>This Year</DropdownItem>
                        <DropdownItem>All Time</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            {reports.map(report => {
              return (
                <Col md={6} xl={3}>
                  <Card>
                    <CardBody>
                      <div className="float-end mt-2">
                        <ReactApexChart
                          options={report.options}
                          series={report.series}
                          type={report.charttype}
                          height={report.chartheight}
                          width={report.chartwidth}
                        />
                      </div>
                      <div>
                        <h4 className="mb-1 mt-1">
                          <span>
                            <CountUp
                              end={report.value}
                              separator=","
                              prefix={report.prefix}
                              suffix={report.suffix}
                              decimals={report.decimal}
                            />
                          </span>
                        </h4>
                        <p className="text-muted mb-0">{report.title}</p>
                      </div>
                      <p className="text-muted mt-3 mb-0">
                        <span className={"text-" + report.color + " me-1"}>
                          <i className={report.icon + " me-1"}></i>
                          {report.badgeValue}
                        </span>{" "}
                        {report.desc}
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col className="pb-4" md={6}>
              <Card className="h-100">
                <CardBody>
                  <CardTitle className="mb-4 h4">Sessions</CardTitle>
                  <div className="mt-1">
                    <ul className="list-inline main-chart mb-0">
                      <li className="list-inline-item chart-border-left me-0 border-0">
                        <h3 className="text-primary">
                          <span>
                            <CountUp end={200} separator="," prefix="" />
                          </span>
                          <span className="text-muted d-inline-block font-size-15 ms-3">
                            Users
                          </span>
                        </h3>
                      </li>{" "}
                      <li className="list-inline-item chart-border-left me-0">
                        <h3>
                          <span data-plugin="counterup">
                            <CountUp end={120} />
                          </span>
                          <span className="text-muted d-inline-block font-size-15 ms-3">
                            Conversions
                          </span>
                        </h3>
                      </li>{" "}
                      <li className="list-inline-item chart-border-left me-0">
                        <h3>
                          <span data-plugin="counterup">
                            <CountUp end={60} decimals={1} suffix="%" />
                          </span>
                          <span className="text-muted d-inline-block font-size-15 ms-3">
                            Conversions Ratio
                          </span>
                        </h3>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-3">
                    <ReactApexChart
                      options={options}
                      series={series}
                      height="339"
                      type="line"
                      className="apex-charts"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="pb-4" md={6}>
              <Card className="h-100">
                <CardBody>
                  <CardTitle className="mb-4 h4">Sessions</CardTitle>
                  <ReactEcharts
                    style={{ height: "400px" }}
                    option={doughnutOption}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody>
                  <CardSubtitle className="mb-3">
                    List of purchased products.
                  </CardSubtitle>

                  <MDBDataTable responsive bordered data={data} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Stats;
