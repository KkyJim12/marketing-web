import React, { useEffect, useState } from "react";
import { PDFViewer, pdf, StyleSheet, Image, View, Text, Page, Document, Font, } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import faLineChar from "../../../assets/images/fa_line_chart.png";
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
import logoDark from "../../../assets/images/pacy-pilot-main-logo.png";
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

    await loadData(newStartDate, newEndDate)
  };

  const selectStartDate = async (e) => {
    setStartDate(e.target.value)
    await loadData(e.target.value, endDate)
  }

  const selectEndDate = async (e) => {
    setEndDate(e.target.value)
    await loadData(startDate, e.target.value)
  }

  const loadData = async (startDate, endDate) => {
    setIsLoading(true);
    await getWebsites(startDate, endDate, activeWebsite);
    await getStatsByDate(startDate, endDate, activeWebsite, activePeriod);
  }

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

  const dataStaticBySources = {
    columns: !isLoading
      ? [
          {
            label: "Source",
            field: "source",
            sort: "asc",
            width: 150,
          },
        ...stats.tableHeaders.map((col) => ({
          ...col,
        })),
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

  let sessionChart = null;
  let ReportTrafficSourceDonutChart = null;
  let ReportConversionsBarChart = null;
  const exportPDF = async () => {
    try {

      sessionChart = await saveChartToImage("ReportSessionAndUserChart");
      ReportTrafficSourceDonutChart = await saveChartToImage("ReportTrafficSourceDonutChart");
      ReportConversionsBarChart = await saveChartToImage("ReportConversionsBarChart");
  
      const blob = await pdf(<MyDocument />).toBlob();
  
      const blobUrl = URL.createObjectURL(blob);
  
      const newTab = window.open(blobUrl, "_blank");

      console.log(JSON.stringify(stats.tableHeaders))
      console.log(JSON.stringify(stats.tableContents))
  
      if (!newTab) {
        console.error("ไม่สามารถเปิดแท็บใหม่ได้ (popup blocker?)");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const tableReportStyles = StyleSheet.create({
    table: {
      display: 'table',
      width: '100%',
      borderStyle: 'solid',
      borderColor: '#ddd',
      borderWidth: 1,
    },
    tableRow: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      borderBottom: '1px solid #ddd',
    },
    tableCell: {
      padding: 5,
      textAlign: 'left',
      borderRight: '1px solid #ddd',
      flex: 1,
      fontSize: 8,
      wordBreak: 'break-word',
      overflow: 'hidden',
      maxWidth: '150px',
    },
    tableHeader: {
      fontSize: 10,
      fontWeight: 'bold',
      backgroundColor: '#f2f2f2',
    },
    page: {
      padding: 20,
    },
  });

  Font.register({
    family: 'Iconic',
    src: 'https://api.pacypilot.com/font/Iconic.ttf',
  });

  const MyDocument = () => {
    return (
      <>
        <Document>
          {/* หน้า 1 */}
          <Page
            size="A4"
            style={{
              flexDirection: "column",
              backgroundColor: "#ffffff",
              paddingLeft: 30,  // ขอบซ้าย
              paddingRight: 30, // ขอบขวา
              paddingTop: 30,   // ขอบบน
              paddingBottom: 10, // ขอบล่าง
              fontFamily: 'Iconic',
            }}
          >
            {/* ส่วนหัว */}
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              {/* ส่วนหัวฝั่งซ้าย */}
              <View style={{ flex: 2, flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    width: 5,
                    backgroundColor: "#072da8",
                    marginRight: 8,
                    minHeight: 40,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Website Traffic & CTA Conversion Report
                  </Text>
                  <Text style={{ fontSize: 10 }}>
                    Domain: {websites.join(", ")}
                  </Text>
                </View>
              </View>

              {/* ส่วนหัวฝั่งขวาวันที่ */}
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <View style={{ alignItems: "flex-end" }}>
                  <Image src={logoDark} style={{ height: 26, marginBottom: 5 }} />
                </View>
                <Text style={{ fontSize: 10, marginBottom: 5 }}>
                  {moment(startDate).locale('en').format("D MMM YYYY")} - {moment(endDate).locale('en').format("D MMM YYYY")}
                </Text>
              </View>

            </View>

            {/* แถวของกล่อง 1 */}
            <View style={{ display: "flex", flexDirection: "row", alignItems: "stretch", marginBottom: 20, }}>

              {/* กล่องซ้าย */}
              <View style={{ flex: 1, padding: 10, border: "1px solid #ccc", marginRight: 10, marginLeft: 0 }}>
                <Text style={{ fontSize: 12, marginBottom: 10 }}>
                  Traffic Source (Sessions)
                </Text>
                <View
                  style={{
                    marginLeft: 0,
                    width: "100%",
                    height: 160,
                    overflow: "hidden",
                  }}
                >
                  <Image src={ReportTrafficSourceDonutChart} style={{ marginLeft:0 , paddingLeft: 0 , marginTop: 20, width: 270, height: 100 , resizeMode: "stretch",}} />
                </View>
              </View>

              {/* กล่องขวา */}
              <View style={{ flex: 1, padding: 10, flexDirection: "column", justifyContent: "space-between", height: "100%", margin: 0 }}>
                {/* ข้อความที่ด้านบน */}
                <Text style={{ fontSize: 10, }}>
                  ในช่วงวันที่ {moment(startDate).locale('en').format("D MMM YYYY")} - {moment(endDate).locale('en').format("D MMM YYYY")}  
                  มี Traffic เข้าเว็บไซต์ทั้งหมด {stats.sessionCount} sessions และ {stats.totalUserCount} Users โดยเกิด Conversion
                  จาก PacyPilot ทั้งหมด {stats.conversionCount}&nbsp;
                  Conversions คิดเป็น {(stats.conversionRate).toFixed(1)}%
                </Text>

                {/* แถวที่ 1 */}
                <View style={{ flex: 1, flexDirection: "row",  }}>
                  <View style={{ position: "relative", flex: 1, border: "1px solid #ccc", padding: 7, marginRight: 6, marginTop: 7 }}>
                    <Image
                      src={faLineChar}
                      style={{
                        width: 27,
                        height: 27,
                        position: "absolute",
                        top: 3,
                        right: 5
                      }}
                    />
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-start" }}>
                      <Text style={{ fontSize: 16, marginBottom: 0 }}>
                        {stats.sessionCount.toLocaleString()}
                      </Text>
                      <Text style={{ fontSize: 8 }}>
                        Sessions
                      </Text>
                    </View>
                  </View>

                  <View style={{ position: "relative", flex: 1, border: "1px solid #ccc", padding: 7, marginRight: 6, marginTop: 7 }}>
                    <Image
                      src={faLineChar}
                      style={{
                        width: 27,
                        height: 27,
                        position: "absolute",
                        top: 3,
                        right: 5
                      }}
                    />
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-start" }}>
                      <Text style={{ fontSize: 16, marginBottom: 0 }}>
                        {stats.totalUserCount.toLocaleString()}
                      </Text>
                      <Text style={{ fontSize: 8 }}>
                        Total Users
                      </Text>
                    </View>
                  </View>
                </View>

                {/* แถวที่ 2 */}
                <View style={{ flex: 1, flexDirection: "row", }}>
                  <View style={{ position: "relative", flex: 1, border: "1px solid #ccc", padding: 7, marginRight: 6, marginTop: 7 }}>
                    <Image
                      src={faLineChar}
                      style={{
                        width: 27,
                        height: 27,
                        position: "absolute",
                        top: 3,
                        right: 5
                      }}
                    />
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-start" }}>
                      <Text style={{ fontSize: 16, marginBottom: 0 }}>
                        {stats.conversionCount.toLocaleString()}
                      </Text>
                      <Text style={{ fontSize: 8 }}>
                        Conversions
                      </Text>
                    </View>
                  </View>

                  <View style={{ position: "relative", flex: 1, border: "1px solid #ccc", padding: 7, marginRight: 6, marginTop: 7 }}>
                    <Image
                      src={faLineChar}
                      style={{
                        width: 27,
                        height: 27,
                        position: "absolute",
                        top: 3,
                        right: 5
                      }}
                    />
                    <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-start" }}>
                      <Text style={{ fontSize: 16, marginBottom: 0 }}>
                        <Text>{(stats.conversionRate).toFixed(1)}%</Text>
                      </Text>
                      <Text style={{ fontSize: 8 }}>
                        Conversion Rate
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

            </View>

            {/* แถวของกล่อง 2 */}
            <View style={{ display: "flex", flexDirection: "row", alignItems: "stretch", marginBottom: 20 }}>

              {/* กล่องฝั่งซ้าย */}
              <View style={{ flex: 1, padding: 10, border: "1px solid #ccc", marginRight: 10, }}>
                <Text style={{ fontSize: 12, marginBottom: 10 }}>
                  Sessions and Total Users
                </Text>
                <View
                  style={{
                    width: 200,
                    height: 120,
                  }}
                >
                  <Image src={sessionChart} style={{ marginLeft:0 , paddingLeft: 0 ,width: 230, height: "100%" , resizeMode: "stretch",}} />
                </View>
              </View>

              {/* กล่องฝั่งขวา */}
              <View style={{ flex: 1, padding: 10, border: "1px solid #ccc", }}>
                <Text style={{ fontSize: 12, marginBottom: 10 }}>
                  Conversions
                </Text>
                <View
                  style={{
                    width: 200,
                    height: 120,
                  }}
                >
                  <Image src={ReportConversionsBarChart} style={{ marginLeft:0 , paddingLeft: 0 ,width: 230, height: "100%" , resizeMode: "stretch",}} />
                </View>
              </View>

            </View>

            {/* ส่วนท้าย */}
            <View style={{
                position: "absolute",
                bottom: 20,
                left: 30,
                right: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Text style={{fontSize: 10}}>Pacy Media. All right reserved</Text>
              </View>

              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={{fontSize: 10}}>pacymedia.com | support@pacymedia.com</Text>
              </View>

            </View>

          </Page>

          {/* หน้า 2 */}
          <Page
            size="A4"
            style={{
              flexDirection: "column",
              backgroundColor: "#ffffff",
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 30,
              paddingBottom: 10,
              fontFamily: "Iconic",
            }}
          >

            <Text style={{ fontSize: 14, marginBottom: 5 }}>Conversions by Source</Text>
            <Text style={{ fontSize: 10, marginBottom: 5 }}>
              นับเฉพาะ Conversions ที่เกิดจากการคลิกปุ่ม CTA ที่สร้างจาก PacyPilot
            </Text>

            {/* ตาราง Source type */}
            <View style={tableReportStyles.table}>
              {/* Header Row */}
              <View style={[tableReportStyles.tableRow, tableReportStyles.tableHeader]}>
                <Text style={{...tableReportStyles.tableCell, fontSize: 14,}}>Source</Text>
                {stats.tableHeaders.map((header, idx) => (
                  <Text key={idx} style={tableReportStyles.tableCell}>{header.label}</Text>
                ))}
              </View>

              {/* Data Rows */}
              {stats.tableContents.map((row, rowIndex) => (
                <View key={rowIndex} style={tableReportStyles.tableRow}>
                  <Text style={tableReportStyles.tableCell}>{row.source}</Text>
                  {stats.tableHeaders.map((header, colIndex) => (
                    <Text key={colIndex} style={tableReportStyles.tableCell}>
                      {row[header.field] ?? 0}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
            
            {/* ส่วนท้าย */}
            <View
              style={{
                position: "absolute",
                bottom: 20,
                left: 30,
                right: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Text style={{fontSize: 10}}>Pacy Media. All right reserved</Text>
              </View>

              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={{fontSize: 10}}>pacymedia.com | support@pacymedia.com</Text>
              </View>

            </View>

          </Page>
        </Document>
      </>
    );
  };
  const donutSeries = [
    stats?.conversionCount ?? 0,
    stats?.sessionCount ?? 0,
    stats?.totalUserCount ?? 0
  ];
  const donutOptions = {
    chart: { type: 'donut', },
    labels: ['Conversion', 'Session', 'Total User'],
    colors: ["#5b73e8", "#ec4561", "#f1b44c"],
    legend: {
      position: 'right', // ให้ label ไปอยู่ด้านขวา
      offsetX: 80,       // ขยับ legend มาทางซ้าย (เข้าใกล้วงกลม)
      offsetY: 0
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%' // ขนาดของวงกลม (ลดขนาดวงในให้แคบลง)
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 200 },
        legend: { position: 'bottom' }
      }
    }]
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
                  onChange={(e) => selectStartDate(e)}
                  id="start-date-input"
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
                  onChange={(e) => selectEndDate(e)}
                  id="end-date-input"
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
              <CardTitle className="mb-4 h4">Traffice Source (Sessions) #### For Title</CardTitle>
              <div id="">
                {!isLoading && (
                    <ReactApexChart
                      id="ReportTrafficSourceDonutChart"
                      options={donutOptions}
                      series={donutSeries}
                      height="300"
                      type="donut"
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
              <MDBDataTable 
                responsive 
                searching={true} 
                bordered 
                data={dataStaticBySources} 
                noBottomColumns 
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Stats;
