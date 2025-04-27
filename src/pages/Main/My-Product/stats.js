import React, { useEffect, useState } from "react";
import { PDFViewer, pdf, Image, View, Text, Page, Document, Font } from "@react-pdf/renderer";
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
import "moment/locale/th";
import ReactEcharts from "echarts-for-react";

import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { utils, writeFile } from "xlsx";

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

  const selectActivePeriod = async (period) => {
    const newEndDate = moment().format("YYYY-MM-DD");
    const newStartDate = moment().subtract(parseInt(period.range), "days").format("YYYY-MM-DD");

    setEndDate(newEndDate);
    setStartDate(newStartDate);
    setActivePeriod(period.title);

    setIsLoading(true);
    await getWebsites(newStartDate, newEndDate, activeWebsite);
    await getStatsByDate(newStartDate, newEndDate, activeWebsite, period.title);
  };

  const getStatsByDate = async (customStartDate, customEndDate, customActiveWebsite, customPeriod) => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/stats/${productId}?startDate=${customStartDate}&endDate=${customEndDate}&period=${customPeriod}&activeWebsite=${customActiveWebsite}`,
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

      console.log(JSON.stringify(data.tableHeaders))
      console.log(JSON.stringify(data.tableContents))
      

      setStats(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getWebsites = async (customStartDate, customEndDate, customActiveWebsite) => {
    try {
      const headers = {
        Authorization: localStorage.getItem("accessToken"),
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/my-products/${id}/websites/${productId}?startDate=${customStartDate}&endDate=${customEndDate}&activeWebsite=${customActiveWebsite}`,
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
    const fetchData = async () => {
      await getWebsites(startDate, endDate, activeWebsite);
      await getStatsByDate(startDate, endDate, activeWebsite, activePeriod);
    };
    fetchData();
  }, [activeWebsite]);

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

  const reportSeries = [
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

  const conversionBarchartSeries = [
    {
      name: "Conversion",
      type: "column",
      data: !isLoading ? stats.graphData.conversions : [],
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

  const barChartOption = {
    chart: {
      type: "bar", // เพิ่ม type bar เข้าไปเลย
      stacked: false,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false, // แนวตั้ง (horizontal: true จะเป็นแนวนอน)
        columnWidth: "40%", // กำหนดความกว้างของแต่ละแท่ง
        endingShape: "rounded", // ปลายแท่งมนๆ สวยๆ
      },
    },
    dataLabels: {
      enabled: false, // ปิดเลขบนแท่ง
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"], // ขอบใส
    },
    colors: ["#5b73e8"], // สีแท่ง
    fill: {
      opacity: 1, // เติมสีเต็ม
    },
    xaxis: {
      categories: !isLoading ? stats.graphData.labels : [],
      type: "datetime",
    },
    yaxis: {
      title: {
        text: "Volume",
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => (typeof y !== "undefined" ? y.toFixed(0) : y),
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  };

  const reportOptions = {
    chart: {
      stacked: !1,
      toolbar: {
        show: !1,
      },
    },
    stroke: {
      width: 4,
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
      },
    },
    colors: ["#ec4561", "#f1b44c"],

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
  let ReportConversionsBarChart;
  const exportPDF = async () => {
    try {
      sessionChart = await saveChartToImage("ReportSessionAndUserChart");
      sourceTypesChart = await saveChartToImage("sourceTypeChart");
      ReportConversionsBarChart = await saveChartToImage("ReportConversionsBarChart");
  
      const blob = await pdf(<MyDocument />).toBlob();
  
      const blobUrl = URL.createObjectURL(blob);
  
      const newTab = window.open(blobUrl, "_blank");
  
      if (!newTab) {
        console.error("ไม่สามารถเปิดแท็บใหม่ได้ (popup blocker?)");
      }
    } catch (error) {
      console.error(error);
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

  Font.register({
    family: 'Iconic',
    src: 'https://api.pacypilot.com/font/Iconic.ttf',
  });

  const MyDocument = () => {
    return (
      <>
        <Document>
          <Page
            size="A4"
            style={{
              flexDirection: "column",
              backgroundColor: "#ffffff",
              paddingLeft: 30,  // ขอบซ้าย
              paddingRight: 30, // ขอบขวา
              paddingTop: 30,   // ขอบบน
              paddingBottom: 30, // ขอบล่าง
              fontFamily: 'Iconic',
            }}
          >
            {/* ส่วนหัวบนสุด */}
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              {/* ส่วนหัวฝั่งซ้าย */}
              <View style={{ flex: 3, flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    width: 5,
                    backgroundColor: "#3498db",
                    marginRight: 8,
                    minHeight: 40,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14 }}>
                    Website Traffic & CTA Conversion Report
                  </Text>
                  <Text style={{ fontSize: 12 }}>
                    Domain: {activeWebsite}
                  </Text>
                </View>
              </View>

              {/* ส่วนหัวฝั่งขวาวันที่ */}
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={{ fontSize: 10, marginBottom: 5 }}>
                  Date: {moment(startDate).format("DD/MM/YYYY")} - {moment(endDate).format("DD/MM/YYYY")}
                </Text>
              </View>

            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>

              {/* กล่องซ้าย */}
              <View style={{ flex: 1, padding: 10, border: "1px solid #ccc", marginRight: 20, marginLeft: 0 }}>
                <Text style={{ fontSize: 12, marginBottom: 10 }}>
                  Traffice Source (Sessions)
                </Text>
                <View
                  style={{
                    marginLeft: 0,
                    width: "100%",
                    height: 200,
                    overflow: "hidden",
                  }}
                >
                  <Image src={sourceTypesChart} style={{ width: 250, height: 250, objectFit: "contain"}} />
                </View>
              </View>

              {/* กล่องขวา */}
              <View style={{ flex: 1, padding: 10, flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                {/* ข้อความที่ด้านบน */}
                <Text style={{ fontSize: 10, }}>
                  ในช่วงวันที่ [Date RANGE] มี Traffice เข้าเว็บไซต์ทั้งหมด
                  [SESSION] sessions และ [USERS] Users โดยเกิด Conversion
                  จาก PacyPilot ทั้งหมด [CONVERSIONS] Conversions คิดเป็น
                  [CONVERSION RATE]
                </Text>
                
                {/* แถวที่ 1 */}
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flex: 1, border: "1px solid #ccc", padding: 10, marginRight: 10  }}>
                    <View style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", }}>
                      <Text style={{ fontSize: 16, marginBottom: 3 }}>
                        {stats.sessionCount}
                      </Text>
                      <Text style={{ fontSize: 10 }}>
                        Sessions
                      </Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, border: "1px solid #ccc", padding: 10, }}>
                    <View style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", }}>
                      <Text style={{ fontSize: 16, marginBottom: 3 }}>
                        {stats.totalUserCount}
                      </Text>
                      <Text style={{ fontSize: 10 }}>
                        Total Users
                      </Text>
                    </View>
                  </View>
                </View>
                
                {/* แถวที่ 2 */}
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flex: 1, border: "1px solid #ccc", padding: 10, marginRight: 10 }}>
                    <View style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", }}>
                      <Text style={{ fontSize: 16, marginBottom: 3 }}>
                        {stats.conversionCount}
                      </Text>
                      <Text style={{ fontSize: 10 }}>
                        Conversions
                      </Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, border: "1px solid #ccc", padding: 10, }}>
                    <View style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", }}>
                      <Text style={{ fontSize: 16, marginBottom: 3 }}>
                        <Text>{(stats.conversionRate).toFixed(1)}%</Text>
                      </Text>
                      <Text style={{ fontSize: 10 }}>
                        Conversion Rate
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 20 }}>

              {/* กล่องฝั่งซ้าย */}
              <View style={{ flex: 1, padding: 10, border: "1px solid #ccc", marginRight: 20, }}>
                <Text style={{ fontSize: 12, marginBottom: 10 }}>
                  Sessions and Total Users
                </Text>
                <View
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: 200,
                    height: 200,
                  }}
                >
                  <Image src={sessionChart} style={{ width: "100%", height: "100%"}} />
                </View>
              </View>

              {/* กล่องฝั่งขวา */}
              <View style={{ flex: 1, padding: 10, border: "1px solid #ccc", }}>
                <Text style={{ fontSize: 12, marginBottom: 10 }}>
                  Conversions
                </Text>
                <View
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: 200,
                    height: 200,
                  }}
                >
                  <Image src={ReportConversionsBarChart} style={{ width: "100%", height: "100%"}} />
                </View>
              </View>

            </View>

            <Text style={{ fontSize: 14, marginBottom: 5 }}>Conversions by Source</Text>
            <Text style={{ fontSize: 10, marginBottom: 5 }}>นับเฉพาะ Conversions ที่เกิดจากการคลิกปุ่ม CTA ที่สร้างจาก PacyPilot</Text>
            
            {/* หัวตาราง */}
            <View style={{
              flexDirection: "row",
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid #ccc",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: 5
            }}>
              {stats.tableHeaders.map((header, index) => (
                <Text key={index} style={{ flex: 1, padding: 5, fontSize: 10, fontWeight: "bold", textAlign: "center" }}>
                  {header.label}
                </Text>
              ))}
            </View>

            {/* ข้อมูลในแถว (rows) */}
            {stats.tableContents.map((row, rowIndex) => (
              <View key={rowIndex} style={{ flexDirection: "row", borderBottom: "1px solid #ccc", width: "100%" }}>
                {stats.tableHeaders.map((header, headerIndex) => (
                  <Text key={header.id || headerIndex} style={{ flex: 1, padding: 5, fontSize: 10, textAlign: "center" }}>
                    {row[header.field]}  {/* ข้อมูลที่ตรงกับ field ของ header */}
                  </Text>
                ))}
              </View>
            ))}

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
              <CardTitle className="mb-4 h4">Traffice Source (Sessions)</CardTitle>
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

        {/* ใช้เพื่อสำหรับออก Report เท่านั้น แต่จะ hidden ไว้ */}
        <Col className="pb-4" md={6} style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>
          <Card className="h-100">
            <CardBody>
              <CardTitle className="mb-4 h4">Session For Report</CardTitle>
              <div id="ReportSessionAndUserChart">
                {!isLoading && (
                    <ReactApexChart
                      id="ReportSessionAndUserChart"
                      options={reportOptions}
                      series={reportSeries}
                      height="339"
                      type="line"
                      className="apex-charts"
                    />
                )}
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* ใช้เพื่อสำหรับออก Report เท่านั้น แต่จะ hidden ไว้ */}
        <Col className="pb-4" md={6} style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>
          <Card className="h-100">
            <CardBody>
              <CardTitle className="mb-4 h4">Conversions Bar Chart</CardTitle>
              <div id="ReportConversionsBarChart">
                {!isLoading && (
                    <ReactApexChart
                      id="ReportConversionsBarChart"
                      options={barChartOption}
                      series={conversionBarchartSeries}
                      height="339"
                      type="bar"
                      className="apex-charts"
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
