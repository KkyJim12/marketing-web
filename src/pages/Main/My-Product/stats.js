import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  CardSubtitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "reactstrap";
import { useParams } from "react-router-dom";
import "./datatables.scss";
import moment from "moment";

import ReactEcharts from "echarts-for-react";

import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import ReactDOM from "react-dom";

import { utils, writeFile } from "xlsx";

import { Page, Text, View, Document, Image } from "@react-pdf/renderer";

const Stats = () => {
  const periods = [
    { title: "Today", range: 0 },
    { title: "7 Days", range: 6 },
    { title: "30 Days", range: 29 },
    {
      title: "90 Days",
      range: 89,
    },
    {
      title: "Custom",
      range: 0,
    },
  ];

  const { id, productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [singlebtn, setSinglebtn] = useState(false);
  const [activePeriod, setActivePeriod] = useState("Today");
  const [websites, setWebsites] = useState([]);
  const [activeWebsite, setActiveWebsite] = useState("All");

  const selectActivePeriod = (period) => {
    setActivePeriod(period.title);
    setEndDate(moment().format("YYYY-MM-DD"));
    setStartDate(
      moment().subtract(parseInt(period.range), "days").format("YYYY-MM-DD")
    );
    setIsLoading(true);
  };

  const getStatsByDate = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/stats/${productId}?startDate=${startDate}&endDate=${endDate}&period=${activePeriod}&activeWebsite=${activeWebsite}`,
        { headers }
      );
      const data = response.data.data;

      // Bind empty table fields
      const allFields = [];

      for (let i = 0; i < data.tableContents.length; i++) {
        for (const [key, value] of Object.entries(data.tableContents[i])) {
          if (
            key !== "sessions" &&
            key !== "conversions" &&
            key !== "source" &&
            !allFields.includes(key)
          ) {
            allFields.push(key);
          }
        }
      }

      for (let j = 0; j < allFields.length; j++) {
        for (let k = 0; k < data.tableContents.length; k++) {
          if (!data.tableContents[k][allFields[j]]) {
            data.tableContents[k][allFields[j]] = 0;
          }
        }
      }

      setStats(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getWebsites = async () => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/websites/${productId}?startDate=${startDate}&endDate=${endDate}&activeWebsite=${activeWebsite}`,
        { headers }
      );
      setWebsites(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveChartToImage = async (chartId) => {
    try {
      const element = document.getElementById(chartId);
      const canvas = await html2canvas(element);
      const imageBlob = canvas.toDataURL("image/png");

      return imageBlob;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWebsites();
  }, [startDate, endDate]);

  useEffect(() => {
    getStatsByDate();
  }, [isLoading, startDate, endDate, activeWebsite]);

  const series1 = [
    {
      data: [25, 66, 41, 89, 63, 25, 44, 20, 36, 40, 54],
    },
  ];

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
  const reports = [
    {
      id: 1,
      icon: "mdi mdi-arrow-up-bold",
      title: "All Sessions",
      value: stats ? stats.sessionCount : 0,
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
      title: "Total Users",
      value: stats ? stats.totalUserCount : 0,
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
      title: "Total Conversions",
      value: stats ? stats.conversionCount : 0,
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
      title: "Conversion Rate",
      value: stats ? stats.conversionRate : 0,
      prefix: "",
      suffix: "%",
      badgeValue: "4%",
      decimal: 2,
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
    columns: !isLoading
      ? [
          {
            label: "Source",
            field: "source",
            sort: "asc",
            width: 150,
          },
          ...stats.tableHeaders,
        ]
      : [],
    rows: !isLoading ? stats.tableContents : [],
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
      data: [
        "Direct",
        "Organic Search",
        "Paid Search",
        "Social Media",
        "Others",
      ],
      textStyle: {
        color: ["#74788d"],
      },
    },
    color: ["#009CFF", "#00D6AB", "#FFC349", "#0A50FF", "#4C5F7B"],
    series: [
      {
        name: "Sessions",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: "inner",
            alignTo: "none",
            bleedMargin: 5,
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
          {
            value:
              !isLoading && stats.sourceTypes.direct
                ? stats.sourceTypes.direct.length
                : null,
            name: "Direct",
          },
          {
            value:
              !isLoading && stats.sourceTypes.organic_search
                ? stats.sourceTypes.organic_search.length
                : null,
            name: "Organic Search",
          },
          {
            value:
              !isLoading && stats.sourceTypes.paid_search
                ? stats.sourceTypes.paid_search.length
                : null,
            name: "Paid Search",
          },
          {
            value:
              !isLoading && stats.sourceTypes.social_media
                ? stats.sourceTypes.social_media.length
                : null,
            name: "Social Media",
          },
          {
            value:
              !isLoading && stats.sourceTypes.others
                ? stats.sourceTypes.others.length
                : null,
            name: "Others",
          },
        ],
      },
    ],
  };
  const series = [
    {
      name: "Conversion",
      type: "column",
      data: !isLoading ? stats.graphData.conversions : [],
    },
    {
      name: "Sessions",
      type: "line",
      data: !isLoading ? stats.graphData.sessions : [],
    },
    {
      name: "Total User",
      type: "line",
      data: !isLoading ? stats.graphData.users : [],
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
      width: [0, 4, 4],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
      },
    },
    colors: ["#5b73e8", "#ec4561", "#f1b44c"],

    fill: {
      opacity: [1, 0.8, 0.8],
      gradient: {
        inverseColors: !1,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: !isLoading ? stats.graphData.labels : [],
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

  let sessionChart;
  let sourceTypesChart;
  const exportPDF = async () => {
    try {
      sessionChart = await saveChartToImage("sessionChart");
      sourceTypesChart = await saveChartToImage("sourceTypeChart");

      ReactDOM.render(<App />, document.getElementById("root"));
    } catch (error) {
      console.log(error);
    }
  };

  const exportExcel = () => {
    //creates an empty workbook with no worksheet
    let wb = utils.book_new(), //creates a new workbook
      //coverts JSON data into a sheet
      ws = utils.json_to_sheet([]);

    let Heading = [
      ["Date: " + startDate + " to " + endDate],
      ["Website: " + activeWebsite],
      [""],
      ["All Stats"],
      ["Session: ", stats.sessionCount],
      ["Total Users: ", stats.totalUserCount],
      ["Total Conversions: ", stats.conversionCount],
      ["Conversion Rate: ", stats.conversionRate],
      [""],
      ["Session statistic by sources."],
    ];
    utils.sheet_add_aoa(ws, Heading);

    utils.sheet_add_json(ws, stats.tableContents, {
      origin: "A11",
      skipHeader: false,
    });

    ws["!cols"] = [
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
    ];

    utils.book_append_sheet(wb, ws, "Statistic", "Statistic");
    // package and release data (`writeFile` tries to write and save an XLSX file)
    writeFile(
      wb,
      "stats_" + activeWebsite + "_" + startDate + "_" + endDate + ".xlsx"
    );
  };

  const MyDocument = () => {
    return (
      <>
        <Document>
          <Page
            size="A4"
            style={{
              flexDirection: "column",
              backgroundColor: "#ffffff",
              padding: 10,
              gap: 40,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 20 }}>Statistic Report</Text>
              <View
                style={{
                  marginLeft: "auto",
                }}
              >
                <Text
                  style={{ marginLeft: "auto", fontSize: 12, marginBottom: 5 }}
                >
                  Date:
                  {" " + moment(startDate).format("DD/MM/YYYY")}-
                  {moment(endDate).format("DD/MM/YYYY")}
                </Text>

                <Text style={{ marginLeft: "auto", fontSize: 12 }}>
                  Domain: {activeWebsite}
                </Text>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  width: "25%",
                  height: 60,
                  borderRadius: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                }}
              >
                <Text style={{ fontSize: 12 }}>
                  All Sessions: {stats.sessionCount}
                </Text>
              </div>
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  width: "25%",
                  height: 60,
                  borderRadius: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                }}
              >
                <Text style={{ fontSize: 12 }}>
                  Total User: {stats.totalUserCount}
                </Text>
              </div>
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  width: "25%",
                  height: 60,
                  borderRadius: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                }}
              >
                <Text style={{ fontSize: 12 }}>
                  Total Conversion: {stats.conversionCount}
                </Text>
              </div>
              <div
                style={{
                  backgroundColor: "#f5f5f5",
                  width: "25%",
                  height: 60,
                  borderRadius: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                }}
              >
                <Text style={{ fontSize: 12 }}>
                  Conversion Rate: {stats.conversionRate}
                </Text>
              </div>
            </View>
            <View>
              <Text style={{ fontSize: 12, marginBottom: 40 }}>
                Sessions Stats Chart
              </Text>
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "80%",
                  height: 250,
                }}
              >
                <Image src={sessionChart}></Image>
              </div>
            </View>
            <View>
              <Text style={{ fontSize: 12, marginBottom: 40 }}>
                Sessions Source Type Stats
              </Text>
              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "80%",
                  height: 250,
                }}
              >
                <Image src={sourceTypesChart}></Image>
              </div>
            </View>
          </Page>
        </Document>
      </>
    );
  };

  const App = () => (
    <>
      <PDFViewer style={{ width: "100vw", height: "100vh" }}>
        <MyDocument />
      </PDFViewer>
    </>
  );

  return (
    <>
      <Row className="mb-4">
        <Col md={12}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column justify-content-center">
              <h5>Websites</h5>
              <div className="d-flex align-items-center gap-3">
                <btn
                  onClick={() => setActiveWebsite("All")}
                  className={
                    activeWebsite === "All"
                      ? "d-flex align-items-center justify-content-center px-4 py-2 btn btn-primary"
                      : "d-flex align-items-center justify-content-center px-4 py-2 btn btn-outline-primary"
                  }
                >
                  All
                </btn>
                {websites &&
                  websites.map((website) => {
                    return (
                      <button
                        key={website}
                        onClick={() => setActiveWebsite(website)}
                        className={
                          activeWebsite === website
                            ? "d-flex align-items-center justify-content-center px-4 py-2 btn btn-primary"
                            : "d-flex align-items-center justify-content-center px-4 py-2 btn btn-outline-primary"
                        }
                      >
                        {website}
                      </button>
                    );
                  })}
              </div>
            </div>
            <div className="d-flex align-items-center gap-4">
              <div>
                <label htmlFor="example-date-input" className="col-form-label">
                  Start Date
                </label>
                <input
                  disabled={activePeriod !== "Custom"}
                  className="form-control"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  id="example-date-input"
                  max={moment().format("YYYY-MM-DD")}
                />
              </div>
              <div>
                <label htmlFor="example-date-input" className="col-form-label">
                  End Date
                </label>
                <input
                  disabled={activePeriod !== "Custom"}
                  className="form-control"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  id="example-date-input"
                  max={moment().format("YYYY-MM-DD")}
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
                    className="btn btn-info d-flex gap-2 align-items-center"
                    caret
                  >
                    {activePeriod}
                    <i className="mdi mdi-chevron-down" />
                  </DropdownToggle>
                  <DropdownMenu>
                    {periods.map((period) => {
                      return (
                        <DropdownItem
                          key={period.title}
                          onClick={() => selectActivePeriod(period)}
                        >
                          {period.title}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="d-flex flex-column">
                <label className="col-form-label">Export</label>
                <div className="d-flex gap-2">
                  <button
                    onClick={exportPDF}
                    style={{
                      color: "#ffffff",
                      backgroundColor: "#778497",
                    }}
                    className="btn"
                    type="button"
                  >
                    PDF
                  </button>
                  <button
                    onClick={exportExcel}
                    style={{
                      color: "#ffffff",
                      backgroundColor: "#778497",
                    }}
                    className="btn"
                    type="button"
                  >
                    Excel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        {!isLoading &&
          reports.map((report) => {
            return (
              <Col md={6} xl={3} key={report.id}>
                <Card>
                  <CardBody>
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
                        <CountUp
                          end={!isLoading ? stats.sessionCount : 0}
                          separator=","
                          prefix=""
                        />
                      </span>
                      <span className="text-muted d-inline-block font-size-15 ms-3">
                        Sessions
                      </span>
                    </h3>
                  </li>{" "}
                  <li className="list-inline-item chart-border-left me-0">
                    <h3>
                      <span data-plugin="counterup">
                        <CountUp end={!isLoading ? stats.totalUserCount : 0} />
                      </span>
                      <span className="text-muted d-inline-block font-size-15 ms-3">
                        Users
                      </span>
                    </h3>
                  </li>{" "}
                  <li className="list-inline-item chart-border-left me-0">
                    <h3>
                      <span data-plugin="counterup">
                        <CountUp end={!isLoading ? stats.conversionCount : 0} />
                      </span>
                      <span className="text-muted d-inline-block font-size-15 ms-3">
                        Conversions
                      </span>
                    </h3>
                  </li>
                </ul>
              </div>

              <div className="mt-3">
                {!isLoading && (
                  <ReactApexChart
                    id="sessionChart"
                    options={options}
                    series={series}
                    height="339"
                    type="line"
                    className="apex-charts"
                  />
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col className="pb-4" md={6}>
          <Card className="h-100">
            <CardBody>
              <CardTitle className="mb-4 h4">Sessions</CardTitle>
              <div id="sourceTypeChart">
                {!isLoading && (
                  <ReactEcharts
                    style={{ height: "400px" }}
                    option={doughnutOption}
                  />
                )}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card>
            <CardBody>
              <CardSubtitle className="mb-3">
                List of session statistic by sources.
              </CardSubtitle>

              <MDBDataTable responsive bordered data={data} noBottomColumns />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Stats;
