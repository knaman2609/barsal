import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function CustomSelect({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options[value];

  return (
    <div className="custom-select" ref={ref}>
      <button
        type="button"
        className="custom-select__toggle"
        onClick={() => setIsOpen((o) => !o)}
      >
        {selected.question}
        <span className={`arrow ${isOpen ? "open" : ""}`}>▾</span>
      </button>
      {isOpen && (
        <div className="custom-select__menu">
          {options.map((opt, i) => (
            <div
              key={i}
              className={
                "custom-select__item" +
                (i === value ? " custom-select__item--active" : "")
              }
              onClick={() => {
                onChange(i);
                setIsOpen(false);
              }}
            >
              {opt.question}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Mock data for the charts
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "PREPAID ORDERS : PER CATEGORY",
      color: "#f0f0f0",
      font: {
        size: 16,
        family: "'Courier New', Courier, monospace",
      },
      align: "start",
      padding: {
        bottom: 10,
      },
    },
    subtitle: {
      display: true,
      text: "JULY VS JUNE",
      color: "#f0f0f0",
      font: {
        size: 12,
        family: "'Courier New', Courier, monospace",
      },
      align: "end",
      padding: {
        bottom: 30,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#f0f0f0",
      },
      grid: {
        color: "rgba(240, 240, 240, 0.1)",
      },
    },
    y: {
      ticks: {
        color: "#f0f0f0",
      },
      grid: {
        color: "rgba(240, 240, 240, 0.1)",
      },
    },
  },
};

const conversionFunnelData = {
  labels: ["Leads", "Contacted", "Demo", "Won"],
  datasets: [
    {
      label: "Conversion Funnel",
      data: [1000, 800, 500, 200],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const revenueData = {
  labels: ["Cards", "UPI", "Netbanking", "COD", "Others"],
  datasets: [
    {
      label: "Revenue",
      data: [4000, 3000, 2000, 1000, 500],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const leadSourceData = {
  labels: ["Organic", "Paid", "Referral", "Direct"],
  datasets: [
    {
      label: "Lead Source",
      data: [400, 300, 200, 100],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const marketingChannelData = {
  labels: ["Google Ads", "Facebook", "SEO", "Email", "Affiliates"],
  datasets: [
    {
      label: "Marketing Channel Performance",
      data: [250, 200, 300, 150, 100],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const dailyTrendData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Success Rate",
      data: [95, 96, 94, 97, 98, 96, 95],
      borderColor: "#8FBC8F",
      tension: 0.1,
    },
  ],
};

const paymentMethodSRData = {
  labels: ["Cards", "UPI", "Netbanking", "COD"],
  datasets: [
    {
      label: "Success Rate",
      data: [92, 98, 95, 99],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const topRegionsData = {
  labels: ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "Uttar Pradesh"],
  datasets: [
    {
      label: "Sales",
      data: [50000, 45000, 40000, 35000, 30000],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const cardRevenueData = {
  labels: ["Credit Card", "Debit Card"],
  datasets: [
    {
      label: "Revenue",
      data: [2500, 1500],
      backgroundColor: ["#f0f0f0", "#b0b0b0"],
    },
  ],
};

const userConversionData = {
  labels: ["New Users", "Returning Users"],
  datasets: [
    {
      label: "Conversion Rate",
      data: [15, 25],
      backgroundColor: ["#f0f0f0", "#b0b0b0"],
    },
  ],
};

const dropOffRateData = {
  labels: ["Leads -> Contacted", "Contacted -> Demo", "Demo -> Won"],
  datasets: [
    {
      label: "Drop-off Rate",
      data: [20, 22.5, 60],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const conversionRateStageData = {
  labels: ["Leads", "Contacted", "Demo", "Won"],
  datasets: [
    {
      label: "Conversion Rate",
      data: [100, 80, 50, 20],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const funnelComparisonData = {
  labels: ["Leads", "Contacted", "Demo", "Won"],
  datasets: [
    {
      label: "This Month",
      data: [1000, 800, 500, 200],
      borderColor: "#8FBC8F",
      tension: 0.1,
    },
    {
      label: "Last Month",
      data: [1100, 850, 550, 220],
      borderColor: "#ADD8E6",
      tension: 0.1,
    },
  ],
};

const upiAppData = {
  labels: ["Google Pay", "PhonePe", "Paytm"],
  datasets: [
    {
      label: "Usage",
      data: [500, 400, 300],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const industryConversionData = {
  labels: ["Your Rate", "Industry Average"],
  datasets: [
    {
      label: "Conversion Rate",
      data: [20, 15],
      backgroundColor: ["#8FBC8F", "#ADD8E6"],
      barThickness: 20,
    },
  ],
};

const paidChannelROIData = {
  labels: ["Google Ads", "Facebook Ads"],
  datasets: [
    {
      label: "ROI",
      data: [4.5, 3.8],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const cpaData = {
  labels: ["Google Ads", "Facebook", "SEO", "Email"],
  datasets: [
    {
      label: "Cost Per Acquisition",
      data: [500, 600, 200, 100],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const clvData = {
  labels: ["Email", "SEO", "Google Ads", "Facebook"],
  datasets: [
    {
      label: "Customer Lifetime Value",
      data: [5000, 4000, 3000, 2500],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const roasTrendData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "ROAS",
      data: [3.5, 3.8, 4.0, 4.2, 4.5, 4.3],
      borderColor: "#8FBC8F",
      tension: 0.1,
    },
  ],
};

const topCampaignsRoasData = {
  labels: [
    "Campaign A",
    "Campaign B",
    "Campaign C",
    "Campaign D",
    "Campaign E",
  ],
  datasets: [
    {
      label: "ROAS",
      data: [5.0, 4.8, 4.5, 4.2, 4.0],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const failureReasonsData = {
  labels: [
    "Insufficient Funds",
    "Incorrect CVV",
    "Expired Card",
    "Network Error",
  ],
  datasets: [
    {
      label: "Count",
      data: [400, 300, 200, 100],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const failurePaymentMethodData = {
  labels: ["Netbanking", "Credit Card", "Debit Card", "UPI"],
  datasets: [
    {
      label: "Failure Count",
      data: [500, 400, 200, 134],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const netSalesByCategoryData = {
  labels: ["Electronics", "Fashion", "Home Goods", "Books"],
  datasets: [
    {
      label: "Net Sales",
      data: [5000000, 3000000, 2000000, 1000000],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const netSalesTrendData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Net Sales",
      data: [10, 12, 11, 13, 15, 14, 16, 17, 18, 20, 22, 21].map(
        (v) => v * 100000
      ),
      borderColor: "#8FBC8F",
      tension: 0.1,
    },
  ],
};

const prepaidPaymentMethodsData = {
  labels: ["Credit Card", "Debit Card", "UPI", "Wallets"],
  datasets: [
    {
      label: "Sales",
      data: [4000000, 3000000, 2500000, 500000],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const salesForecastData = {
  labels: ["Q3", "Q4", "Q1 (Next Year)"],
  datasets: [
    {
      label: "Sales Forecast",
      data: [18000000, 20000000, 22000000],
      borderColor: "#8FBC8F",
      tension: 0.1,
    },
  ],
};

const topAovProductsData = {
  labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
  datasets: [
    {
      label: "AOV Contribution",
      data: [150, 120, 100, 90, 80],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const quarterlyGmvData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "GMV",
      data: [12000000, 13000000, 15000000, 18000000],
      borderColor: "#8FBC8F",
      tension: 0.1,
    },
  ],
};

const codRegionsData = {
  labels: ["Delhi", "Mumbai", "Bangalore", "Chennai"],
  datasets: [
    {
      label: "COD Sales",
      data: [800000, 700000, 500000, 345678],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const weeklyOrderTrendData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "This Week",
      data: [150, 160, 170, 180, 200, 250, 230],
      borderColor: "#8FBC8F",
      tension: 0.1,
    },
    {
      label: "Last Week",
      data: [140, 155, 165, 170, 180, 220, 210],
      borderColor: "#ADD8E6",
      tension: 0.1,
    },
  ],
};

const topCitiesMaharashtraData = {
  labels: ["Mumbai", "Pune", "Nagpur"],
  datasets: [
    {
      label: "Sales",
      data: [20000, 15000, 10000],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const regionSalesMarketingData = {
  labels: ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "Uttar Pradesh"],
  datasets: [
    {
      label: "Sales",
      data: [50000, 45000, 40000, 35000, 30000],
      borderColor: "#8FBC8F",
      tension: 0.1,
      yAxisID: "y",
    },
    {
      label: "Marketing Spend",
      data: [5000, 4000, 3500, 3000, 2500],
      borderColor: "#ADD8E6",
      tension: 0.1,
      yAxisID: "y1",
    },
  ],
};

const repeatPurchaseRateData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Repeat Purchase Rate",
      data: [15, 18, 20, 22, 25, 24],
      borderColor: "#8FBC8F",
      tension: 0.1,
    },
  ],
};

const newVsReturningCustomersData = {
  labels: ["New Customers", "Returning Customers"],
  datasets: [
    {
      label: "Count",
      data: [1234, 2345],
      backgroundColor: ["#f0f0f0", "#b0b0b0"],
    },
  ],
};

const pgSuccessRateData = {
  labels: ["Razorpay", "PayU", "Stripe"],
  datasets: [
    {
      label: "Success Rate",
      data: [98, 95, 99],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const abandonedCartTrendData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Abandoned Carts",
      data: [100, 120, 110, 130, 150, 140, 160],
      borderColor: "#8FBC8F",
      tension: 0.1,
    },
  ],
};

const deviceSalesData = {
  labels: ["iOS", "Android", "Desktop"],
  datasets: [
    {
      label: "Sales",
      data: [4000000, 5000000, 3345678],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const avgOrdersPerCustomerSegmentData = {
  labels: ["New", "Returning", "VIP"],
  datasets: [
    {
      label: "Avg. Orders",
      data: [1.2, 3.5, 8.0],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const topProductsByCategoryData = {
  labels: ["Electronics", "Fashion", "Home Goods"],
  datasets: [
    {
      label: "Smartphone",
      data: [800, 0, 0],
      backgroundColor: "#f0f0f0",
    },
    {
      label: "T-Shirt",
      data: [0, 600, 0],
      backgroundColor: "#d3d3d3",
    },
    {
      label: "Sofa",
      data: [0, 0, 400],
      backgroundColor: "#a9a9a9",
    },
  ],
};

const lowStockAlertsData = {
  labels: ["Wireless Mouse", "Bluetooth Speaker", "External Hard Drive"],
  datasets: [
    {
      label: "Stock Level",
      data: [5, 8, 10],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const shippingRulePerformanceData = {
  labels: ["Standard", "Express", "Free Shipping"],
  datasets: [
    {
      label: "Orders",
      data: [8000, 2000, 2345],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const topPerformingCampaignsData = {
  labels: ["Summer Sale", "Diwali Dhamaka", "New Year Bonanza"],
  datasets: [
    {
      label: "ROAS",
      data: [6, 5.5, 5],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const highRiskPincodesData = {
  labels: ["110001", "400001", "560001"],
  datasets: [
    {
      label: "Risk Score",
      data: [8, 7, 6],
      backgroundColor: "#f0f0f0",
      barThickness: 20,
    },
  ],
};

const topCustomersData = [
  { name: "John Doe", purchases: 25 },
  { name: "Jane Smith", purchases: 22 },
  { name: "Peter Jones", purchases: 20 },
  { name: "Mary Johnson", purchases: 18 },
  { name: "David Williams", purchases: 15 },
  { name: "Chris Brown", purchases: 14 },
  { name: "Emily Davis", purchases: 12 },
  { name: "Michael Miller", purchases: 11 },
  { name: "Sarah Wilson", purchases: 10 },
  { name: "James Taylor", purchases: 9 },
];

const topProductsData = [
  { name: "Smartphone", sales: 1500 },
  { name: "Laptop", sales: 1200 },
  { name: "Headphones", sales: 1000 },
  { name: "Smartwatch", sales: 800 },
  { name: "Tablet", sales: 700 },
  { name: "Camera", sales: 600 },
  { name: "Gaming Console", sales: 500 },
  { name: "Bluetooth Speaker", sales: 400 },
  { name: "External Hard Drive", sales: 300 },
  { name: "Wireless Mouse", sales: 200 },
];

const lowStockProductsData = [
  { name: "Wireless Mouse", stock: 5 },
  { name: "Bluetooth Speaker", stock: 8 },
  { name: "External Hard Drive", stock: 10 },
];

const ValueDisplay = ({ value, label }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      textAlign: "center",
      padding: "20px",
    }}
  >
    <div style={{ fontSize: "1.5em", lineHeight: "1.5" }}>{value}</div>
    {label && (
      <div style={{ fontSize: "1.2em", marginTop: "10px" }}>{label}</div>
    )}
  </div>
);

const TableDisplay = ({ data, columns }) => (
  <table
    style={{ width: "100%", color: "#f0f0f0", borderCollapse: "collapse" }}
  >
    <thead>
      <tr>
        {columns.map((col) => (
          <th
            key={col.key}
            style={{
              borderBottom: "1px solid #555",
              padding: "10px",
              textAlign: "left",
            }}
          >
            {col.title}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {columns.map((col) => (
            <td
              key={col.key}
              style={{ borderBottom: "1px solid #555", padding: "10px" }}
            >
              {row[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const Placeholder = ({ text }) => (
  <ValueDisplay value={text || "Coming Soon"} />
);

const FormDisplay = ({ fields, buttonText, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        color: "#f0f0f0",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {fields.map((field) => (
        <div
          key={field.name}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            id={field.name}
            onChange={handleChange}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #555",
              backgroundColor: "#2a2a2a",
              color: "#f0f0f0",
            }}
          />
        </div>
      ))}
      <button
        type="submit"
        style={{
          padding: "10px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {buttonText}
      </button>
    </form>
  );
};

const ConversionFunnelChart = () => (
  <Bar data={conversionFunnelData} options={chartOptions} />
);
const RevenueChart = () => <Bar data={revenueData} options={chartOptions} />;
const LeadSourceChart = () => (
  <Bar data={leadSourceData} options={chartOptions} />
);
const MarketingChannelChart = () => (
  <Bar data={marketingChannelData} options={chartOptions} />
);
const DailyTrendChart = () => (
  <Line
    data={dailyTrendData}
    options={{
      ...chartOptions,
      scales: {
        ...chartOptions.scales,
        y: { ...chartOptions.scales.y, beginAtZero: false },
      },
    }}
  />
);
const PaymentMethodSRChart = () => (
  <Bar data={paymentMethodSRData} options={chartOptions} />
);
const TopRegionsChart = () => (
  <Bar data={topRegionsData} options={chartOptions} />
);
const CardRevenueChart = () => (
  <Bar data={cardRevenueData} options={chartOptions} />
);
const UserConversionChart = () => (
  <Bar data={userConversionData} options={chartOptions} />
);
const DropOffRateChart = () => (
  <Bar data={dropOffRateData} options={chartOptions} />
);
const ConversionRateStageChart = () => (
  <Bar data={conversionRateStageData} options={chartOptions} />
);
const FunnelComparisonChart = () => (
  <Line data={funnelComparisonData} options={chartOptions} />
);
const UpiAppChart = () => <Bar data={upiAppData} options={chartOptions} />;
const IndustryConversionChart = () => (
  <Bar data={industryConversionData} options={chartOptions} />
);
const PaidChannelROIChart = () => (
  <Bar data={paidChannelROIData} options={chartOptions} />
);
const CpaChart = () => <Bar data={cpaData} options={chartOptions} />;
const ClvChart = () => <Bar data={clvData} options={chartOptions} />;
const RoasTrendChart = () => (
  <Line data={roasTrendData} options={chartOptions} />
);
const TopCampaignsRoasChart = () => (
  <Bar data={topCampaignsRoasData} options={chartOptions} />
);
const FailureReasonsChart = () => (
  <Bar data={failureReasonsData} options={chartOptions} />
);
const FailurePaymentMethodChart = () => (
  <Bar data={failurePaymentMethodData} options={chartOptions} />
);
const NetSalesByCategoryChart = () => (
  <Bar data={netSalesByCategoryData} options={chartOptions} />
);
const NetSalesTrendChart = () => (
  <Line data={netSalesTrendData} options={chartOptions} />
);
const PrepaidPaymentMethodsChart = () => (
  <Bar data={prepaidPaymentMethodsData} options={chartOptions} />
);
const SalesForecastChart = () => (
  <Line data={salesForecastData} options={chartOptions} />
);
const TopAovProductsChart = () => (
  <Bar data={topAovProductsData} options={chartOptions} />
);
const QuarterlyGmvChart = () => (
  <Line data={quarterlyGmvData} options={chartOptions} />
);
const CodRegionsChart = () => (
  <Bar data={codRegionsData} options={chartOptions} />
);
const WeeklyOrderTrendChart = () => (
  <Line data={weeklyOrderTrendData} options={chartOptions} />
);
const TopCitiesMaharashtraChart = () => (
  <Bar data={topCitiesMaharashtraData} options={chartOptions} />
);
const RegionSalesMarketingChart = () => (
  <Line
    data={regionSalesMarketingData}
    options={{
      ...chartOptions,
      scales: {
        ...chartOptions.scales,
        y: { type: "linear", display: true, position: "left" },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          grid: { drawOnChartArea: false },
        },
      },
    }}
  />
);
const RepeatPurchaseRateChart = () => (
  <Line data={repeatPurchaseRateData} options={chartOptions} />
);
const NewVsReturningCustomersChart = () => (
  <Bar data={newVsReturningCustomersData} options={chartOptions} />
);
const PgSuccessRateChart = () => (
  <Bar data={pgSuccessRateData} options={chartOptions} />
);
const AbandonedCartTrendChart = () => (
  <Line data={abandonedCartTrendData} options={chartOptions} />
);
const DeviceSalesChart = () => (
  <Bar data={deviceSalesData} options={chartOptions} />
);
const AvgOrdersPerCustomerSegmentChart = () => (
  <Bar data={avgOrdersPerCustomerSegmentData} options={chartOptions} />
);
const TopProductsByCategoryChart = () => (
  <Bar
    data={topProductsByCategoryData}
    options={{
      ...chartOptions,
      scales: {
        ...chartOptions.scales,
        x: { stacked: true },
        y: { stacked: true },
      },
    }}
  />
);
const LowStockAlertsChart = () => (
  <Bar data={lowStockAlertsData} options={chartOptions} />
);
const ShippingRulePerformanceChart = () => (
  <Bar data={shippingRulePerformanceData} options={chartOptions} />
);
const TopPerformingCampaignsChart = () => (
  <Bar data={topPerformingCampaignsData} options={chartOptions} />
);
const HighRiskPincodesChart = () => (
  <Bar data={highRiskPincodesData} options={chartOptions} />
);

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeFollowUp, setActiveFollowUp] = useState(null);
  const conversionRate =
    (conversionFunnelData.datasets[0].data[3] /
      conversionFunnelData.datasets[0].data[0]) *
    100;

  const followUpQuestions = [
    {
      question: "What is the conversion rate at each stage?",
      answer: <ConversionRateStageChart />,
    },
    {
      question: "How does the funnel compare to last month?",
      answer: (
        <ValueDisplay
          value={
            "This month's overall conversion rate is 20%, which is a 5% decrease from last month's 25%."
          }
        />
      ),
    },
    {
      question: "Which marketing channels are driving the most conversions?",
      answer: <MarketingChannelChart />,
    },
    {
      question: "What is the drop-off rate between each stage?",
      answer: <DropOffRateChart />,
    },
  ];

  const tabs = [
    {
      question: "What is my conversion funnel?",
      chart: <ConversionFunnelChart />,
      voice: "Let’s walk through your conversion funnel step by step.",
      followUp: [
        {
          question: "Can you break down the steps in my conversion funnel?",
          answer: (
            <ValueDisplay
              value={"Your funnel: 1,000 visits → 200 sign-ups → 50 purchases."}
            />
          ),
          voice:
            "Your funnel shows 1,000 visits, 200 sign-ups, and 50 purchases.",
        },
      ],
    },
    {
      question:
        "How much revenue did I process through Cards/UPI/Netbanking/COD/Others?",
      chart: <RevenueChart />,
      voice: "Here’s how your total revenue splits across payment methods.",
      followUp: [
        {
          question: "What is the revenue from credit cards vs debit cards?",
          answer: (
            <ValueDisplay
              value={"Credit card revenue: ₹2,500; Debit card revenue: ₹1,500."}
            />
          ),
          voice: "Credit cards generated ₹2,500 and debit cards ₹1,500.",
        },
        {
          question: "Which UPI app is used the most?",
          answer: <UpiAppChart />,
          voice: "Take a look at which UPI app users favor most.",
        },
      ],
    },
    {
      question: "What is my conversion rate?",
      chart: (
        <ValueDisplay
          value={`Your overall conversion rate is ${conversionRate.toFixed(
            2
          )}%.`}
        />
      ),
      voice: "Here’s your current overall conversion rate.",
      followUp: [
        {
          question: "How does this compare to the industry average?",
          answer: (
            <ValueDisplay
              value={"Your 20% rate is 5% above the 15% industry average."}
            />
          ),
          voice:
            "Your conversion rate of 20% is 5% above the industry norm of 15%.",
        },
        {
          question: "What is the conversion rate for new vs returning users?",
          answer: (
            <ValueDisplay value={"New users: 15%; Returning users: 25%."} />
          ),
          voice: "New users convert at 15%, and returning users at 25%.",
        },
      ],
    },
    {
      question: "What is the source of my leads?",
      chart: <LeadSourceChart />,
      voice: "Let’s see where your leads originate.",
      followUp: [
        {
          question: "Which paid channel has the highest ROI?",
          answer: (
            <ValueDisplay
              value={"Google Ads ROI: 4.5x; Facebook Ads ROI: 3.8x."}
            />
          ),
          voice: "Google Ads returns 4.5x and Facebook Ads 3.8x.",
        },
        {
          question: "What is the conversion rate from organic search?",
          answer: <ValueDisplay value={"Organic search converts at 18%."} />,
          voice: "Conversions from organic search stand at 18%.",
        },
      ],
    },
    {
      question: "Can you provide marketing channel performance?",
      chart: <MarketingChannelChart />,
      voice: "Here’s an overview of each marketing channel’s performance.",
      followUp: [
        {
          question: "What is the cost per acquisition for each channel?",
          answer: <CpaChart />,
          voice: "This chart details CPA for all channels.",
        },
        {
          question: "Which channel has the highest customer lifetime value?",
          answer: <ClvChart />,
          voice: "See which channel drives the highest CLV.",
        },
      ],
    },
    {
      question: "What is my ROAS?",
      chart: <ValueDisplay value={"Your ROAS is 4.5x."} />,
      voice: "Let’s review your Return on Ad Spend.",
      followUp: [
        {
          question: "How has ROAS trended over the last 6 months?",
          answer: <RoasTrendChart />,
          voice: "Here’s how ROAS has evolved in six months.",
        },
        {
          question: "What is the ROAS for my top 5 campaigns?",
          answer: <TopCampaignsRoasChart />,
          voice: "This chart shows ROAS for your top five campaigns.",
        },
      ],
    },
    {
      question: "What is my SR?",
      chart: <ValueDisplay value={"Your success rate is 85%."} />,
      voice: "Reviewing your overall success rate.",
      followUp: [
        {
          question: "What is the success rate for international payments?",
          answer: (
            <ValueDisplay value={"International payments succeed at 75%."} />
          ),
          voice: "International transactions have a 75% success rate.",
        },
        {
          question: "Which payment gateway has the highest success rate?",
          answer: <ValueDisplay value={"Stripe succeeds at 99%."} />,
          voice: "Stripe leads with a 99% success rate.",
        },
      ],
    },
    {
      question: "How many failed transactions did I have?",
      chart: <ValueDisplay value={"You had 1,234 failed transactions."} />,
      voice: "Here’s your failed transaction count.",
      followUp: [
        {
          question: "What are the top reasons for transaction failure?",
          answer: <FailureReasonsChart />,
          voice: "This chart shows the main failure reasons.",
        },
        {
          question: "Which payment method has the most failures?",
          answer: <FailurePaymentMethodChart />,
          voice: "This chart shows which method fails most often.",
        },
      ],
    },
    {
      question: "What is the daily trend for transaction success rates?",
      chart: <DailyTrendChart />,
      voice: "Here’s the daily trend of success rates.",
      followUp: [
        {
          question: "What was the success rate last Tuesday?",
          answer: (
            <ValueDisplay value={"Last Tuesday’s success rate was 96%."} />
          ),
          voice: "Last Tuesday, you achieved 96% success.",
        },
        {
          question: "Why was the success rate low on Wednesday?",
          answer: (
            <ValueDisplay value={"A gateway issue lowered Wednesday’s rate."} />
          ),
          voice: "A payment gateway issue caused Wednesday’s dip.",
        },
      ],
    },
    {
      question: "What is the SR for different payment methods?",
      chart: <PaymentMethodSRChart />,
      voice: "Here’s success rate by payment method.",
      followUp: [
        {
          question: "Why is the success rate for Netbanking lower than others?",
          answer: (
            <ValueDisplay
              value={"Netbanking drops due to extra workflow steps."}
            />
          ),
          voice: "Netbanking’s multiple steps cause lower success.",
        },
        {
          question: "What is the success rate for EMI payments?",
          answer: <ValueDisplay value={"EMI payment success stands at 90%."} />,
          voice: "EMI payments succeed 90% of the time.",
        },
      ],
    },
    {
      question: "What is the breakdown of payment methods?",
      chart: <RevenueChart />,
      voice: "Here’s how payments break down by method.",
      followUp: [
        {
          question: "What percentage of payments are made via mobile devices?",
          answer: <ValueDisplay value={"70% of payments come from mobile."} />,
          voice: "Seventy percent of transactions occur on mobile.",
        },
        {
          question: "How has the use of UPI grown over the last year?",
          answer: (
            <ValueDisplay value={"UPI usage is up 50% year-over-year."} />
          ),
          voice: "UPI use grew by 50% compared to last year.",
        },
      ],
    },
    {
      question: "How many orders were placed?",
      chart: <ValueDisplay value={"12,345 orders were placed."} />,
      voice: "Total orders placed in period: 12,345.",
      followUp: [
        {
          question: "What is the trend of orders over the last 7 days?",
          answer: <WeeklyOrderTrendChart />,
          voice: "This chart shows order counts over the past week.",
        },
        {
          question: "How many orders were placed during peak hours?",
          answer: (
            <ValueDisplay value={"4,000 orders occurred between 6–9 PM."} />
          ),
          voice: "Peak hours (6–9 PM) saw 4,000 orders.",
        },
      ],
      voice: "We recorded 12,345 orders during the selected period.",
    },
    {
      question: "What are my net sales?",
      chart: (
        <ValueDisplay
          value={"₹1,23,45,678 net sales."}
          label="After returns and discounts."
        />
      ),
      voice: "Your net sales total ₹1,23,45,678.",
      followUp: [
        {
          question: "What is the breakdown of net sales by category?",
          answer: <NetSalesByCategoryChart />,
          voice: "Here’s net sales by category.",
        },
        {
          question: "How have net sales trended over the last year?",
          answer: <NetSalesTrendChart />,
          voice: "This chart shows net sales over the past year.",
        },
      ],
    },
    {
      question: "What are my prepaid sales?",
      chart: <ValueDisplay value={"₹1,00,00,000 in prepaid sales."} />,
      voice: "Your prepaid sales sum to ₹1 crore.",
      followUp: [
        {
          question: "What is the breakdown of prepaid sales by payment method?",
          answer: <PrepaidPaymentMethodsChart />,
          voice: "This chart breaks down prepaid by method.",
        },
        {
          question: "What is the ratio of prepaid to COD sales?",
          answer: <ValueDisplay value={"Ratio prepaid:COD is 4:1."} />,
          voice: "Prepaid to COD ratio stands at four to one.",
        },
      ],
    },
    {
      question: "What's the forecast for sales based on historical data?",
      chart: <SalesForecastChart />,
      voice: "Here’s your sales forecast based on past trends.",
      followUp: [
        {
          question: "What factors were considered in this forecast?",
          answer: (
            <ValueDisplay
              value={"Factors: seasonality, trends, historical data."}
            />
          ),
          voice: "Forecast factors include seasonality and history.",
        },
        {
          question: "How accurate have previous forecasts been?",
          answer: (
            <ValueDisplay value={"Historic forecasts were within 5% error."} />
          ),
          voice: "Past forecasts averaged a 5% margin of error.",
        },
      ],
    },
    {
      question: "What is AOV?",
      chart: (
        <ValueDisplay
          value={"₹1,000 average order value."}
          label="Avg spent per order."
        />
      ),
      voice: "Your average order value is ₹1,000.",
      followUp: [
        {
          question: "Which products contribute the most to AOV?",
          answer: <TopAovProductsChart />,
          voice: "This chart shows top contributors to AOV.",
        },
        {
          question: "How does AOV differ for new vs returning customers?",
          answer: <ValueDisplay value={"New: ₹800; Returning: ₹1,200."} />,
          voice: "New buyers spend ₹800; returning spend ₹1,200.",
        },
      ],
    },
    {
      question: "What is my GMV?",
      chart: (
        <ValueDisplay
          value={"₹1,50,00,000 gross merchandise value."}
          label="Total merchandise sold."
        />
      ),
      voice: "Your GMV totals ₹1.5 crore.",
      followUp: [
        {
          question: "How has GMV grown quarterly?",
          answer: <QuarterlyGmvChart />,
          voice: "Here’s quarterly GMV growth.",
        },
        {
          question: "What is the difference between GMV and Net Sales?",
          answer: (
            <ValueDisplay value={"GMV minus returns equals Net Sales."} />
          ),
          voice: "Net Sales is GMV minus discounts and returns.",
        },
      ],
    },
    {
      question: "What are my COD sales?",
      chart: <ValueDisplay value={"₹23,45,678 COD sales."} />,
      voice: "Your Cash on Delivery sales total ₹23,45,678.",
      followUp: [
        {
          question: "Which regions have the highest COD sales?",
          answer: <CodRegionsChart />,
          voice: "This map shows COD sales by region.",
        },
        {
          question: "What is the COD to prepaid ratio?",
          answer: <ValueDisplay value={"COD:Prepaid is 1:4."} />,
          voice: "The COD to prepaid ratio stands at one to four.",
        },
      ],
    },
    {
      question:
        "How many orders did I receive this week compared to last week?",
      chart: <WeeklyOrderTrendChart />,
      voice: "Comparing this week’s and last week’s orders.",
      followUp: [
        {
          question: "What was the percentage change in orders?",
          answer: <ValueDisplay value={"Orders increased by 15%."} />,
          voice: "Orders rose by 15% versus last week.",
        },
        {
          question: "Which day had the highest number of orders this week?",
          answer: <ValueDisplay value={"Saturday with 250 orders."} />,
          voice: "Saturday saw the highest orders at 250.",
        },
      ],
    },
    {
      question: "What regions have the highest sales?",
      chart: <TopRegionsChart />,
      voice: "Here are your top regions by sales.",
      followUp: [
        {
          question: "What are the top 3 cities in Maharashtra by sales?",
          answer: <TopCitiesMaharashtraChart />,
          voice: "These are Maharashtra’s top three cities by revenue.",
        },
        {
          question:
            "How does marketing spend correlate with sales in these regions?",
          answer: <RegionSalesMarketingChart />,
          voice: "This chart correlates ad spend with regional sales.",
        },
      ],
    },
    {
      question: "Which regions are we getting the most orders from?",
      chart: <TopRegionsChart />,
      voice: "Here’s your order volume by region.",
      followUp: [
        {
          question: "What is the AOV for each of these regions?",
          answer: (
            <ValueDisplay
              value={"Maharashtra: ₹1,200; Karnataka: ₹1,100; Delhi: ₹1,000."}
            />
          ),
          voice:
            "Regional AOV: Maharashtra ₹1,200; Karnataka ₹1,100; Delhi ₹1,000.",
        },
        {
          question: "Which products are most popular in these regions?",
          answer: (
            <ValueDisplay
              value={
                "Maharashtra: Electronics; Karnataka: Fashion; Delhi: Home Goods."
              }
            />
          ),
          voice:
            "Top regional products: Electronics in Maharashtra, Fashion in Karnataka, Home Goods in Delhi.",
        },
      ],
    },
    {
      question: "How many customers made a repeat purchase?",
      chart: <ValueDisplay value={"2,345 repeat customers."} />,
      voice: "You have 2,345 repeat buyers.",
      followUp: [
        {
          question: "What is the repeat purchase rate?",
          answer: <ValueDisplay value={"Repeat purchase rate is 19%."} />,
          voice: "Your repeat purchase rate sits at 19%.",
        },
        {
          question:
            "How has the repeat purchase rate trended over the last 6 months?",
          answer: <RepeatPurchaseRateChart />,
          voice: "This chart shows your repeat rate trend.",
        },
      ],
    },
    {
      question:
        "Identify my top 10 most loyal customers based on purchase frequency?",
      chart: (
        <TableDisplay
          data={topCustomersData}
          columns={[
            { key: "name", title: "Customer Name" },
            { key: "purchases", title: "Purchases" },
          ]}
        />
      ),
      voice: "Here are your ten most loyal customers by frequency.",
      followUp: [
        {
          question: "What is the average lifetime value of these customers?",
          answer: <ValueDisplay value={"Average LTV is ₹15,000."} />,
          voice: "Their average lifetime value is ₹15,000.",
        },
        {
          question: "Which products do they purchase most often?",
          answer: <ValueDisplay value={"Smartphones, Laptops, Headphones."} />,
          voice: "They mostly buy Smartphones, Laptops, and Headphones.",
        },
      ],
    },
    {
      question: "How many new customers did I acquire?",
      chart: <ValueDisplay value={"1,234 new customers."} />,
      voice: "Your new customer count is 1,234.",
      followUp: [
        {
          question: "What is the breakdown of new vs returning customers?",
          answer: <NewVsReturningCustomersChart />,
          voice: "This chart differentiates new versus returning customers.",
        },
        {
          question: "What is the customer acquisition cost (CAC)?",
          answer: <ValueDisplay value={"CAC is ₹500."} />,
          voice: "Your average CAC is ₹500 per customer.",
        },
      ],
    },
    {
      question:
        "Which payment gateway is performing best in terms of success rates this month?",
      chart: <PgSuccessRateChart />,
      voice: "Here’s this month’s gateway success comparison.",
      followUp: [
        {
          question: "What is the transaction volume for each gateway?",
          answer: (
            <ValueDisplay
              value={"Razorpay: 10,000; PayU: 8,000; Stripe: 5,000."}
            />
          ),
          voice: "Volumes: Razorpay 10,000; PayU 8,000; Stripe 5,000.",
        },
        {
          question:
            "How does the cost per transaction compare for each gateway?",
          answer: (
            <ValueDisplay value={"Razorpay:2%; PayU:2.2%; Stripe:2.5%."} />
          ),
          voice: "Costs: Razorpay 2%; PayU 2.2%; Stripe 2.5%.",
        },
      ],
    },
    {
      question:
        "How many abandoned carts did I have and what's their estimated value?",
      chart: <ValueDisplay value={"5,678 abandoned carts worth ₹56,78,000."} />,
      voice: "You have 5,678 abandoned carts totaling ₹56.78L.",
      followUp: [
        {
          question:
            "What is the trend of abandoned carts over the last 7 days?",
          answer: <AbandonedCartTrendChart />,
          voice: "This chart shows abandoned cart trend over a week.",
        },
        {
          question:
            "What are the most common products found in abandoned carts?",
          answer: <ValueDisplay value={"Smartphones, T-shirts, Books."} />,
          voice: "Common abandoned items: Smartphones, T-shirts, Books.",
        },
      ],
    },
    {
      question: "iOS/Android - Device specific data",
      chart: <DeviceSalesChart />,
      voice: "Here’s sales data by device type.",
      followUp: [
        {
          question: "What is the conversion rate for each device type?",
          answer: <ValueDisplay value={"iOS:25%; Android:20%; Desktop:15%."} />,
          voice: "Conversion: iOS 25%; Android 20%; Desktop 15%.",
        },
        {
          question: "What is the AOV for each device type?",
          answer: (
            <ValueDisplay
              value={"iOS:₹1,200; Android:₹1,000; Desktop:₹1,500."}
            />
          ),
          voice: "AOV by device: iOS ₹1,200; Android ₹1,000; Desktop ₹1,500.",
        },
      ],
    },
    {
      question:
        "What is my Avg. number of orders per customer in a given period",
      chart: <ValueDisplay value={"2.5 orders per customer."} />,
      voice: "Your average orders per customer is 2.5.",
      followUp: [
        {
          question: "How does this vary by customer segment?",
          answer: <AvgOrdersPerCustomerSegmentChart />,
          voice: "This chart shows orders per customer by segment.",
        },
        {
          question: "What is the time between repeat purchases?",
          answer: <ValueDisplay value={"45 days on average."} />,
          voice: "The average repeat purchase interval is 45 days.",
        },
      ],
    },
    {
      question: "What are my top 10 most bought products?",
      chart: (
        <TableDisplay
          data={topProductsData}
          columns={[
            { key: "name", title: "Product Name" },
            { key: "sales", title: "Sales" },
          ]}
        />
      ),
      voice: "Here are your top ten best-selling products.",
      followUp: [
        {
          question: "What is the category breakdown of these top products?",
          answer: <TopProductsByCategoryChart />,
          voice: "This chart categorizes your top sellers.",
        },
        {
          question:
            "Which of these products are most frequently purchased together?",
          answer: (
            <ValueDisplay
              value={"Smartphone & Headphones; Laptop & Wireless Mouse."}
            />
          ),
          voice:
            "Frequently paired items: Smartphone with Headphones, Laptop with Mouse.",
        },
      ],
    },
    {
      question: "Which products are running low on stock?",
      chart: (
        <TableDisplay
          data={lowStockProductsData}
          columns={[
            { key: "name", title: "Product Name" },
            { key: "stock", title: "Stock" },
          ]}
        />
      ),
      voice: "Here are the items low in stock.",
      followUp: [
        {
          question:
            "What is the estimated date for when these products will be out of stock?",
          answer: (
            <ValueDisplay
              value={
                "Mouse: in 5 days; Speaker: in 8 days; Hard Drive: in 10 days."
              }
            />
          ),
          voice:
            "Out-of-stock estimates: Mouse in 5 days, Speaker in 8, Hard Drive in 10.",
        },
        {
          question: "Can you set up a low stock alert for these products?",
          answer: <LowStockAlertsChart />,
          voice: "This chart lets you configure low-stock alerts.",
        },
      ],
    },
    {
      question: "What are my current shipping rules?",
      chart: <ValueDisplay value={"Standard: ₹50; Express: ₹100."} />,
      voice: "Your shipping rules overview.",
      followUp: [
        {
          question: "How many orders are using each shipping method?",
          answer: <ShippingRulePerformanceChart />,
          voice: "This chart shows order counts by shipping method.",
        },
        {
          question: "Can I create a new shipping rule?",
          answer: (
            <FormDisplay
              fields={[
                { name: "ruleName", label: "Rule Name", type: "text" },
                { name: "cost", label: "Cost", type: "number" },
              ]}
              buttonText="Create Rule"
              onSubmit={(data) =>
                alert(
                  `Created new shipping rule: ${data.ruleName} with cost ${data.cost}`
                )
              }
            />
          ),
          voice: "Use this form to add a new shipping rule.",
        },
      ],
    },
    {
      question: "Can you block COD for certain pincodes?",
      chart: (
        <FormDisplay
          fields={[
            {
              name: "pincodes",
              label: "Pincodes (comma-separated)",
              type: "text",
            },
          ]}
          buttonText="Block Pincodes"
          onSubmit={(data) =>
            alert(`Blocked COD for pincodes: ${data.pincodes}`)
          }
        />
      ),
      voice: "Enter pincodes to disable COD.",
      followUp: [
        {
          question: "What is the list of currently blocked pincodes?",
          answer: <ValueDisplay value={"110001, 400001, 560001."} />,
          voice: "Blocked pincodes: 110001, 400001, 560001.",
        },
        {
          question: "Can I unblock a pincode?",
          answer: (
            <FormDisplay
              fields={[{ name: "pincode", label: "Pincode", type: "text" }]}
              buttonText="Unblock Pincode"
              onSubmit={(data) => alert(`Unblocked pincode: ${data.pincode}`)}
            />
          ),
          voice: "Use this form to unblock a pincode.",
        },
      ],
    },
    {
      question: "Can you block COD for certain customer numbers/emails?",
      chart: (
        <FormDisplay
          fields={[
            {
              name: "customers",
              label: "Customer Numbers/Emails (comma-separated)",
              type: "text",
            },
          ]}
          buttonText="Block Customers"
          onSubmit={(data) =>
            alert(`Blocked COD for customers: ${data.customers}`)
          }
        />
      ),
      voice: "Enter customer IDs to disable COD.",
      followUp: [
        {
          question: "What is the list of currently blocked customers?",
          answer: <ValueDisplay value={"test@example.com, 9876543210."} />,
          voice: "Blocked customers: test@example.com, 9876543210.",
        },
        {
          question: "Can I unblock a customer?",
          answer: (
            <FormDisplay
              fields={[
                {
                  name: "customer",
                  label: "Customer Number/Email",
                  type: "text",
                },
              ]}
              buttonText="Unblock Customer"
              onSubmit={(data) => alert(`Unblocked customer: ${data.customer}`)}
            />
          ),
          voice: "Use this form to unblock a customer.",
        },
      ],
    },
    {
      question: "What are the high risk pincodes?",
      chart: <HighRiskPincodesChart />,
      voice: "Here’s the list of high-risk pincodes.",
      followUp: [
        {
          question: "Why are these pincodes considered high risk?",
          answer: (
            <ValueDisplay value={"High rates of COD returns and fraud."} />
          ),
          voice: "They’re flagged due to elevated returns and fraud rates.",
        },
        {
          question: "Can I add a new pincode to the high-risk list?",
          answer: (
            <FormDisplay
              fields={[{ name: "pincode", label: "Pincode", type: "text" }]}
              buttonText="Add to High-Risk"
              onSubmit={(data) => alert(`Added ${data.pincode} to high-risk.`)}
            />
          ),
          voice: "Enter a pincode to add to high-risk.",
        },
      ],
    },
    {
      question: "Create a shipping rule basis cart value",
      chart: (
        <FormDisplay
          fields={[
            { name: "cartValue", label: "Cart Value", type: "number" },
            { name: "shippingCost", label: "Shipping Cost", type: "number" },
          ]}
          buttonText="Create Rule"
          onSubmit={(data) =>
            alert(
              `Shipping rule: cart > ${data.cartValue} gets cost ${data.shippingCost}`
            )
          }
        />
      ),
      voice: "Configure cart-based shipping rules here.",
      followUp: [
        {
          question: "What are the existing cart value-based rules?",
          answer: <ValueDisplay value={"Free shipping over ₹500."} />,
          voice: "Current rule: free shipping for orders above ₹500.",
        },
        {
          question: "Can I edit an existing rule?",
          answer: (
            <FormDisplay
              fields={[
                { name: "ruleId", label: "Rule ID", type: "text" },
                { name: "newCost", label: "New Cost", type: "number" },
              ]}
              buttonText="Edit Rule"
              onSubmit={(data) =>
                alert(`Edited rule ${data.ruleId} to new cost ${data.newCost}`)
              }
            />
          ),
          voice: "Use this form to update a cart rule.",
        },
      ],
    },
    {
      question: "Create a shipping rule basis product",
      chart: (
        <FormDisplay
          fields={[
            { name: "product", label: "Product", type: "text" },
            { name: "shippingCost", label: "Shipping Cost", type: "number" },
          ]}
          buttonText="Create Rule"
          onSubmit={(data) =>
            alert(`Rule: product ${data.product} ships at ${data.shippingCost}`)
          }
        />
      ),
      voice: "Set product-specific shipping rates here.",
      followUp: [
        {
          question: "What are the existing product-based rules?",
          answer: <ValueDisplay value={"Free shipping on electronics."} />,
          voice: "Current product rule: electronics ship free.",
        },
        {
          question: "Can I apply a rule to a whole category?",
          answer: (
            <FormDisplay
              fields={[
                { name: "category", label: "Category", type: "text" },
                {
                  name: "shippingCost",
                  label: "Shipping Cost",
                  type: "number",
                },
              ]}
              buttonText="Apply Rule"
              onSubmit={(data) =>
                alert(`Applied ${data.category} rule at ${data.shippingCost}`)
              }
            />
          ),
          voice: "Use this to apply rules by category.",
        },
      ],
    },
    {
      question: "Create a shipping basis pincode/regions",
      chart: (
        <FormDisplay
          fields={[
            {
              name: "pincodes",
              label: "Pincodes/Regions (comma-separated)",
              type: "text",
            },
            { name: "shippingCost", label: "Shipping Cost", type: "number" },
          ]}
          buttonText="Create Rule"
          onSubmit={(data) =>
            alert(`Shipping for ${data.pincodes} set at ${data.shippingCost}`)
          }
        />
      ),
      voice: "Configure region-based shipping here.",
      followUp: [
        {
          question: "What are the existing region-based rules?",
          answer: <ValueDisplay value={"Express shipping for metros."} />,
          voice: "Current region rule: metros get express shipping.",
        },
        {
          question: "Can I set different rates for different states?",
          answer: (
            <FormDisplay
              fields={[
                { name: "state", label: "State", type: "text" },
                {
                  name: "shippingCost",
                  label: "Shipping Cost",
                  type: "number",
                },
              ]}
              buttonText="Set Rate"
              onSubmit={(data) =>
                alert(
                  `State ${data.state} shipping set at ${data.shippingCost}`
                )
              }
            />
          ),
          voice: "Enter state-specific shipping costs here.",
        },
      ],
    },
    {
      question: "Can you configure partial payment offer?",
      chart: (
        <FormDisplay
          fields={[
            { name: "offerName", label: "Offer Name", type: "text" },
            { name: "percentage", label: "Percentage", type: "number" },
          ]}
          buttonText="Configure Offer"
          onSubmit={(data) =>
            alert(`Configured ${data.offerName} at ${data.percentage}%`)
          }
        />
      ),
      voice: "Set up partial payment offers here.",
      followUp: [
        {
          question: "What are the active partial payment offers?",
          answer: <ValueDisplay value={"50% advance on all orders."} />,
          voice: "Current partial offer: 50% advance.",
        },
        {
          question: "Can I set a validity period for the offer?",
          answer: (
            <FormDisplay
              fields={[
                { name: "offerName", label: "Offer Name", type: "text" },
                { name: "startDate", label: "Start Date", type: "date" },
                { name: "endDate", label: "End Date", type: "date" },
              ]}
              buttonText="Set Validity"
              onSubmit={(data) =>
                alert(
                  `Validity for ${data.offerName}: ${data.startDate} to ${data.endDate}`
                )
              }
            />
          ),
          voice: "Use this form to specify offer dates.",
        },
      ],
    },
    {
      question: "Can you create a static offer for UPI?",
      chart: (
        <FormDisplay
          fields={[
            { name: "offerName", label: "Offer Name", type: "text" },
            { name: "discount", label: "Discount", type: "number" },
          ]}
          buttonText="Create Offer"
          onSubmit={(data) =>
            alert(
              `UPI offer ${data.offerName} created with ${data.discount}% off`
            )
          }
        />
      ),
      voice: "Configure a static UPI discount here.",
      followUp: [
        {
          question: "What are the active UPI offers?",
          answer: <ValueDisplay value={"10% off on all UPI payments."} />,
          voice: "Active UPI offer: 10% off.",
        },
        {
          question: "Can I limit the offer to a specific UPI app?",
          answer: (
            <FormDisplay
              fields={[
                { name: "offerName", label: "Offer Name", type: "text" },
                { name: "upiApp", label: "UPI App", type: "text" },
              ]}
              buttonText="Limit Offer"
              onSubmit={(data) =>
                alert(`Limited ${data.offerName} to ${data.upiApp}`)
              }
            />
          ),
          voice: "Use this to restrict an offer to a UPI app.",
        },
      ],
    },
    {
      question: "What was my sales growth year-over-year?",
      chart: <ValueDisplay value={"25% YOY growth."} />,
      voice: "Here’s your year-over-year sales growth.",
      followUp: [
        {
          question: "What was the sales growth for the top 5 categories?",
          answer: (
            <ValueDisplay
              value={
                "Electronics 30%, Fashion 20%, Home 15%, Books 10%, Sports 5%."
              }
            />
          ),
          voice:
            "Top category growth: Electronics 30%, Fashion 20%, Home 15%, Books 10%, Sports 5%.",
        },
        {
          question: "How does this compare to the industry average growth?",
          answer: <ValueDisplay value={"You’re 10% above industry average."} />,
          voice: "You outperform the industry by 10%.",
        },
      ],
    },
    {
      question: "What are my order details for XYZ order",
      chart: <ValueDisplay value={"Order XYZ: 2 items, total ₹2,500."} />,
      voice: "Here are details for Order XYZ.",
      followUp: [
        {
          question: "What is the payment status for this order?",
          answer: <ValueDisplay value={"Paid."} />,
          voice: "Order XYZ is marked as Paid.",
        },
        {
          question: "What is the shipping status for this order?",
          answer: <ValueDisplay value={"Shipped."} />,
          voice: "Order XYZ has been Shipped.",
        },
      ],
    },
    {
      question: "What are my details for XYZ Transaction",
      chart: <ValueDisplay value={"Transaction XYZ successful: ₹2,500."} />,
      voice: "Here are details for Transaction XYZ.",
      followUp: [
        {
          question: "Which payment method was used for this transaction?",
          answer: <ValueDisplay value={"Credit Card."} />,
          voice: "Transaction XYZ used a Credit Card.",
        },
        {
          question: "What is the associated order ID?",
          answer: <ValueDisplay value={"ABC-123."} />,
          voice: "The related order ID is ABC-123.",
        },
      ],
    },
    {
      question:
        "Can you provide order analytics for the currently configured offers?",
      chart: (
        <ValueDisplay value={"Offer 'DIWALI10' used 500 times; AOV ₹1,200."} />
      ),
      voice: "Here’s analytics for current offers.",
      followUp: [
        {
          question: "What is the total revenue generated from this offer?",
          answer: <ValueDisplay value={"₹6,00,000."} />,
          voice: "This offer generated ₹6,00,000.",
        },
        {
          question: "How many new customers used this offer?",
          answer: <ValueDisplay value={"150."} />,
          voice: "150 new customers used this offer.",
        },
      ],
    },
    {
      question:
        "Can you initiate a refund basis order ID XYZ (Can be platform/breeze)",
      chart: (
        <FormDisplay
          fields={[{ name: "orderId", label: "Order ID", type: "text" }]}
          buttonText="Initiate Refund"
          onSubmit={(data) =>
            alert(`Refund initiated for order ${data.orderId}`)
          }
        />
      ),
      voice: "Enter an order ID to process a refund.",
      followUp: [
        {
          question: "What is the refund policy?",
          answer: <ValueDisplay value={"30-day return policy."} />,
          voice: "Our policy: 30-day returns on all items.",
        },
        {
          question: "Can I process a partial refund?",
          answer: (
            <FormDisplay
              fields={[
                { name: "orderId", label: "Order ID", type: "text" },
                { name: "amount", label: "Amount", type: "number" },
              ]}
              buttonText="Process Partial Refund"
              onSubmit={(data) =>
                alert(
                  `Partial refund of ${data.amount} for order ${data.orderId}`
                )
              }
            />
          ),
          voice: "Use this form for partial refunds.",
        },
      ],
    },
    {
      question: "What are my refund analytics for the past 5 days?",
      chart: <ValueDisplay value={"123 refunds totaling ₹1,23,000."} />,
      voice: "Here are refund stats for the last five days.",
      followUp: [
        {
          question: "What are the top reasons for refunds?",
          answer: (
            <ValueDisplay value={"Damaged, wrong item, change of mind."} />
          ),
          voice: "Top refund reasons: damaged, incorrect item, change of mind.",
        },
        {
          question: "Which products have the highest refund rate?",
          answer: <ValueDisplay value={"Smartphones and laptops."} />,
          voice: "Highest refund rates on Smartphones and Laptops.",
        },
      ],
    },
    {
      question:
        "Can you bifurcate sales/SR basis payment method. Provide more analytics like debit card, VPA, QR code",
      chart: (
        <ValueDisplay
          value={
            "Sales - Debit Card:₹30L, VPA:₹25L, QR:₹10L; SR - Debit:95%, VPA:97%, QR:99%."
          }
        />
      ),
      voice: "Here’s sales and success by method.",
      followUp: [
        {
          question: "What is the success rate for VPA payments?",
          answer: <ValueDisplay value={"97%."} />,
          voice: "VPA payments succeed at 97%.",
        },
        {
          question:
            "What is the average transaction value for QR code payments?",
          answer: <ValueDisplay value={"₹500."} />,
          voice: "Average QR transaction value: ₹500.",
        },
      ],
    },
    {
      question: "Can you help with configuring Custom Payment Options for me?",
      chart: (
        <FormDisplay
          fields={[{ name: "optionName", label: "Option Name", type: "text" }]}
          buttonText="Configure"
          onSubmit={(data) => alert(`Configured ${data.optionName}`)}
        />
      ),
      voice: "Configure custom payment options below.",
      followUp: [
        {
          question: "What are the existing custom payment options?",
          answer: <ValueDisplay value={"Bank Transfer, EMI."} />,
          voice: "Active custom options: Bank Transfer, EMI.",
        },
        {
          question: "Can I remove a custom payment option?",
          answer: (
            <FormDisplay
              fields={[
                { name: "optionName", label: "Option Name", type: "text" },
              ]}
              buttonText="Remove"
              onSubmit={(data) => alert(`Removed ${data.optionName}`)}
            />
          ),
          voice: "Use this to remove a custom option.",
        },
      ],
    },
    {
      question:
        "Can you please change the breeze checkout button skinning/colour?",
      chart: (
        <FormDisplay
          fields={[{ name: "color", label: "Color", type: "text" }]}
          buttonText="Change Color"
          onSubmit={(data) => alert(`Changed color to ${data.color}`)}
        />
      ),
      voice: "Enter a hex code to restyle the checkout button.",
      followUp: [
        {
          question: "What is the current color of the checkout button?",
          answer: <ValueDisplay value={"#007bff."} />,
          voice: "Current button color is #007bff.",
        },
        {
          question: "Can I revert to the default color?",
          answer: (
            <FormDisplay
              fields={[]}
              buttonText="Revert to Default"
              onSubmit={() => alert("Reverted to default.")}
            />
          ),
          voice: "Click to reset to the default skin.",
        },
      ],
    },
    {
      question:
        "How many people applied my offer XYZ during checkout? (Give as a percentage of total orders)",
      chart: <ValueDisplay value={"15% of orders used offer XYZ."} />,
      voice: "Here’s uptake for offer XYZ.",
      followUp: [
        {
          question: "What was the total discount given for this offer?",
          answer: <ValueDisplay value={"₹75,000."} />,
          voice: "Total discount: ₹75,000.",
        },
        {
          question: "How did this offer impact the conversion rate?",
          answer: (
            <ValueDisplay value={"Users with offer converted 5% more."} />
          ),
          voice: "Offer users converted at a rate 5% higher.",
        },
      ],
    },
    {
      question: "How many carts used offers?",
      chart: <ValueDisplay value={"3,456 carts used offers."} />,
      voice: "Total carts with offers: 3,456.",
      followUp: [
        {
          question: "What is the most frequently used offer?",
          answer: <ValueDisplay value={"DIWALI10."} />,
          voice: "Most used offer: DIWALI10.",
        },
        {
          question: "What is the total value of discounts applied?",
          answer: <ValueDisplay value={"₹3,45,600."} />,
          voice: "Total discounts sum to ₹3,45,600.",
        },
      ],
    },
    {
      question:
        "How does offer affect their AOV and likelihood to purchase again?",
      chart: <ValueDisplay value={"AOV w/ offer: ₹1,200; w/o: ₹1,000."} />,
      voice: "Offer impact on AOV comparison.",
      followUp: [
        {
          question:
            "What is the repeat purchase rate for customers who used an offer?",
          answer: <ValueDisplay value={"30%."} />,
          voice: "Offer customers repeat at 30%.",
        },
        {
          question: "Which offer has the highest impact on AOV?",
          answer: <ValueDisplay value={"BOGO offers raise AOV most."} />,
          voice: "BOGO increases average order value the most.",
        },
      ],
    },
    {
      question:
        "What is our Average Order Value (AOV) for first-time customers versus returning customers in the last quarter?",
      chart: <ValueDisplay value={"First: ₹900; Returning: ₹1,100."} />,
      voice: "Quarterly AOV for new vs returning customers.",
      followUp: [
        {
          question: "What is the AOV for VIP customers?",
          answer: <ValueDisplay value={"VIP: ₹2,500."} />,
          voice: "VIP customers have an AOV of ₹2,500.",
        },
        {
          question:
            "How has the AOV for first-time customers changed over the last year?",
          answer: <ValueDisplay value={"Up 10% year-over-year."} />,
          voice: "First-time AOV rose 10% year-over-year.",
        },
      ],
    },
    {
      question: "Can you disable PayU as a PG",
      chart: (
        <FormDisplay
          fields={[]}
          buttonText="Disable PayU"
          onSubmit={() => alert("PayU disabled.")}
        />
      ),
      voice: "Click to disable PayU gateway.",
      followUp: [
        {
          question: "What are the currently active payment gateways?",
          answer: <ValueDisplay value={"Razorpay, Stripe."} />,
          voice: "Active gateways: Razorpay and Stripe.",
        },
        {
          question: "Can I re-enable PayU later?",
          answer: (
            <FormDisplay
              fields={[]}
              buttonText="Enable PayU"
              onSubmit={() => alert("PayU enabled.")}
            />
          ),
          voice: "Click here to re-enable PayU.",
        },
      ],
    },
    {
      question: "What were the peak sales hours?",
      chart: <ValueDisplay value={"6 PM–9 PM peak sales."} />,
      voice: "Your peak sales occur between 6 and 9 PM.",
      followUp: [
        {
          question: "How do peak hours differ on weekends vs weekdays?",
          answer: (
            <ValueDisplay value={"Weekends: 8–11 PM; Weekdays: 6–9 PM."} />
          ),
          voice: "Weekends 8–11 PM; weekdays 6–9 PM are peak.",
        },
        {
          question: "What is the AOV during peak hours?",
          answer: <ValueDisplay value={"₹1,100."} />,
          voice: "Peak-hour AOV averages ₹1,100.",
        },
      ],
    },
    {
      question: "Can you configure Surcharge on COD?",
      chart: (
        <FormDisplay
          fields={[
            { name: "surcharge", label: "Surcharge (%)", type: "number" },
          ]}
          buttonText="Configure Surcharge"
          onSubmit={(data) => alert(`Surcharge set at ${data.surcharge}%`)}
        />
      ),
      voice: "Set COD surcharge percentage here.",
      followUp: [
        {
          question: "What is the current surcharge on COD orders?",
          answer: <ValueDisplay value={"None."} />,
          voice: "There’s currently no COD surcharge.",
        },
        {
          question: "Can I apply surcharge on a percentage basis?",
          answer: (
            <FormDisplay
              fields={[
                { name: "percentage", label: "Percentage", type: "number" },
              ]}
              buttonText="Apply Percentage Surcharge"
              onSubmit={(data) =>
                alert(`${data.percentage}% surcharge applied.`)
              }
            />
          ),
          voice: "Use this to set percentage-based surcharge.",
        },
      ],
    },
    {
      question: "What is the average sell through rate of the products?",
      chart: <ValueDisplay value={"75% sell-through rate."} />,
      voice: "Your products sell through at 75% on average.",
      followUp: [
        {
          question: "Which category has the highest sell through rate?",
          answer: <ValueDisplay value={"Electronics."} />,
          voice: "Electronics lead in sell-through rate.",
        },
        {
          question: "How does this compare to the industry average?",
          answer: <ValueDisplay value={"10% above industry average."} />,
          voice: "You outperform industry by 10% in sell-through.",
        },
      ],
    },
    {
      question: "What products have the highest sell through rate?",
      chart: <ValueDisplay value={"Smartphones & Laptops."} />,
      voice: "Smartphones and Laptops top sell-through.",
      followUp: [
        {
          question: "What is the sell through rate for these products?",
          answer: <ValueDisplay value={"Smartphones: 90%; Laptops: 85%."} />,
          voice: "Smartphones 90%, Laptops 85% sell-through.",
        },
        {
          question:
            "How can I improve the sell through rate for other products?",
          answer: (
            <ValueDisplay
              value={"Try promotions, bundles, better visibility."}
            />
          ),
          voice: "Boost through promotions, bundling, and visibility.",
        },
      ],
    },
    {
      question: "Which landing page is most visited by users first?",
      chart: <ValueDisplay value={"Homepage."} />,
      voice: "Your homepage is the top landing page.",
      followUp: [
        {
          question: "What is the bounce rate for the homepage?",
          answer: <ValueDisplay value={"40%."} />,
          voice: "The homepage bounce rate is 40%.",
        },
        {
          question:
            "Which marketing channel drives the most traffic to the homepage?",
          answer: <ValueDisplay value={"Organic Search."} />,
          voice: "Organic search drives the highest traffic.",
        },
      ],
    },
    {
      question:
        "How many orders were serviced through Standard, Express or any other shipping method?",
      chart: <ValueDisplay value={"Standard: 10,000; Express: 2,345."} />,
      voice: "Order counts by shipping method.",
      followUp: [
        {
          question:
            "What is the average delivery time for each shipping method?",
          answer: (
            <ValueDisplay value={"Standard: 5–7 days; Express: 1–2 days."} />
          ),
          voice: "Delivery times: Standard 5–7 days; Express 1–2 days.",
        },
        {
          question: "What is the cost of each shipping method?",
          answer: <ValueDisplay value={"Standard: ₹50; Express: ₹100."} />,
          voice: "Shipping costs: Standard ₹50; Express ₹100.",
        },
      ],
    },
    {
      question:
        "How many products do I currently have in my store? Active/inactive?",
      chart: <ValueDisplay value={"Active:500; Inactive:50."} />,
      voice: "Product inventory: 500 active, 50 inactive.",
      followUp: [
        {
          question: "What are the top 5 inactive products?",
          answer: <ValueDisplay value={"F, G, H, I, J."} />,
          voice: "Top inactive: F, G, H, I, J.",
        },
        {
          question: "Can I get a list of all active products?",
          answer: <ValueDisplay value={"Check your email for the list."} />,
          voice: "We’ve emailed your full active product list.",
        },
      ],
    },
    {
      question:
        "How many of my orders are fulfilled? How many unfulfilled? How many partially fulfilled?",
      chart: (
        <ValueDisplay
          value={"Fulfilled:11,000; Unfulfilled:1,000; Partial:345."}
        />
      ),
      voice: "Order fulfillment status overview.",
      followUp: [
        {
          question: "What are the top reasons for unfulfilled orders?",
          answer: <ValueDisplay value={"Out of stock, invalid address."} />,
          voice: "Top unfulfilled reasons: stockouts and bad addresses.",
        },
        {
          question: "What is the average fulfillment time?",
          answer: <ValueDisplay value={"2 days."} />,
          voice: "Average fulfillment time is two days.",
        },
      ],
    },
    {
      question: "What has been the reach and impact of my campaigns?",
      chart: <ValueDisplay value={"Reach:1M; Conversions:10k."} />,
      voice: "Campaigns reached one million and converted ten thousand.",
      followUp: [
        {
          question: "What was the cost per conversion?",
          answer: <ValueDisplay value={"₹50."} />,
          voice: "Cost per conversion is ₹50.",
        },
        {
          question: "Which campaign had the highest reach?",
          answer: <ValueDisplay value={"Summer Sale."} />,
          voice: "The Summer Sale campaign reached the most people.",
        },
      ],
    },
    {
      question: "Can you comment on the effectives of campaign XYZ?",
      chart: <ValueDisplay value={"ROAS 5x."} />,
      voice: "Campaign XYZ achieved 5x ROAS.",
      followUp: [
        {
          question: "What was the conversion rate for this campaign?",
          answer: <ValueDisplay value={"10%."} />,
          voice: "XYZ converted at 10%.",
        },
        {
          question: "How did this campaign perform on different platforms?",
          answer: <ValueDisplay value={"Google 6x; Facebook 4x."} />,
          voice: "ROAS: Google 6x, Facebook 4x.",
        },
      ],
    },
    {
      question: "Which is the best performing adset?",
      chart: <ValueDisplay value={"Summer Sale."} />,
      voice: "Your top adset is Summer Sale.",
      followUp: [
        {
          question: "What is the ROAS for this adset?",
          answer: <ValueDisplay value={"6x."} />,
          voice: "It yields a 6x ROAS.",
        },
        {
          question: "Which ad creative performed the best in this adset?",
          answer: <ValueDisplay value={"Video with dog."} />,
          voice: "The dog-themed video drove the best results.",
        },
      ],
    },
    {
      question: "How much amount have I spent on the ads?",
      chart: <ValueDisplay value={"₹5,00,000."} />,
      voice: "Your total ad spend is ₹5,00,000.",
      followUp: [
        {
          question: "What is the breakdown of ad spend by platform?",
          answer: <ValueDisplay value={"Google ₹3L; Facebook ₹2L."} />,
          voice: "Spend: Google ₹3L, Facebook ₹2L.",
        },
        {
          question: "How has ad spend trended over the last 6 months?",
          answer: <ValueDisplay value={"Up 10% monthly."} />,
          voice: "Ad spend grew 10% each month.",
        },
      ],
    },
    {
      question: "How many campaigns did I run in the last 6 months?",
      chart: <ValueDisplay value={"12 campaigns."} />,
      voice: "You ran twelve campaigns recently.",
      followUp: [
        {
          question: "What was the average ROAS across all campaigns?",
          answer: <ValueDisplay value={"4.2x."} />,
          voice: "Average campaign ROAS: 4.2x.",
        },
        {
          question: "Which campaign had the highest conversion rate?",
          answer: <ValueDisplay value={"Diwali Dhamaka."} />,
          voice: "Diwali Dhamaka led in conversion rate.",
        },
      ],
    },
    {
      question: "Which campaign has the highest spend but lowest ROAS?",
      chart: <ValueDisplay value={"Winter Sale: ₹1L spend; ROAS 1.5x."} />,
      voice: "Identify high-spend low-ROAS campaigns.",
      followUp: [
        {
          question: "What was the spend and ROAS for this campaign?",
          answer: <ValueDisplay value={"Spent ₹1L; ROAS 1.5x."} />,
          voice: "It spent ₹1L and returned 1.5x.",
        },
        {
          question: "What were the target demographics for this campaign?",
          answer: <ValueDisplay value={"Males 18–24 in Delhi."} />,
          voice: "It targeted Delhi males aged 18–24.",
        },
      ],
    },
    {
      question:
        "Show me the checkout behavior of customers who came from our Instagram ads versus those from Google Search",
      chart: (
        <ValueDisplay
          value={"Google AOV ₹1,200 & 15% conversion vs Instagram ₹800 & 10%."}
        />
      ),
      voice: "Here’s checkout behavior by source.",
      followUp: [
        {
          question: "What is the AOV for each group?",
          answer: <ValueDisplay value={"Instagram ₹800; Google ₹1,200."} />,
          voice: "AOV: Instagram ₹800; Google ₹1,200.",
        },
        {
          question: "What is the conversion rate for each group?",
          answer: <ValueDisplay value={"Instagram 10%; Google 15%."} />,
          voice: "Conversion: Instagram 10%; Google 15%.",
        },
      ],
    },
    {
      question: "Are new users converting better or returning users?",
      chart: <ValueDisplay value={"Returning users convert 2x better."} />,
      voice: "Compare new vs returning conversion.",
      followUp: [
        {
          question: "What is the AOV for new vs returning users?",
          answer: <ValueDisplay value={"New ₹800; Returning ₹1,200."} />,
          voice: "AOV: New ₹800; Returning ₹1,200.",
        },
        {
          question: "What is the repeat purchase rate?",
          answer: <ValueDisplay value={"19%."} />,
          voice: "Overall repeat rate: 19%.",
        },
      ],
    },
    {
      question: "What time of day are ads converting best?",
      chart: <ValueDisplay value={"8–10 PM."} />,
      voice: "Peak ad conversion hours: 8–10 PM.",
      followUp: [
        {
          question: "How does this differ by platform?",
          answer: <ValueDisplay value={"Google 7–9 PM; Facebook 9–11 PM."} />,
          voice: "Google 7–9 PM; Facebook 9–11 PM.",
        },
        {
          question: "What is the AOV for conversions during these hours?",
          answer: <ValueDisplay value={"₹1,300."} />,
          voice: "Peak-hour AOV: ₹1,300.",
        },
      ],
    },
    {
      question: "Suggest the top 3 performing campaigns I should scale.",
      chart: <TopPerformingCampaignsChart />,
      voice: "Here are your three best campaigns to scale.",
      followUp: [
        {
          question: "What is the ROAS for each of these campaigns?",
          answer: (
            <ValueDisplay value={"Summer:6x; Diwali:5.5x; New Year:5x."} />
          ),
          voice: "ROAS: Summer 6x; Diwali 5.5x; New Year 5x.",
        },
        {
          question: "What is the budget for each of these campaigns?",
          answer: (
            <ValueDisplay value={"Summer ₹50k; Diwali ₹75k; New Year ₹60k."} />
          ),
          voice: "Budgets: Summer ₹50k; Diwali ₹75k; New Year ₹60k.",
        },
      ],
    },
    {
      question: "Compare Google vs Meta performance last 7 days",
      chart: <ValueDisplay value={"Google 4x ROAS; Meta 3.5x."} />,
      voice: "Last week’s Google vs Meta performance.",
      followUp: [
        {
          question: "What is the ad spend for each platform?",
          answer: <ValueDisplay value={"Google ₹50k; Meta ₹40k."} />,
          voice: "Spend: Google ₹50k; Meta ₹40k.",
        },
        {
          question: "What is the conversion rate for each platform?",
          answer: <ValueDisplay value={"Google 12%; Meta 10%."} />,
          voice: "Conversion: Google 12%; Meta 10%.",
        },
      ],
    },
    {
      question: "What is my CAC through ad campaign",
      chart: <ValueDisplay value={"₹500 CAC."} />,
      voice: "Your ad CAC is ₹500.",
      followUp: [
        {
          question: "How does CAC vary by campaign?",
          answer: <ValueDisplay value={"Summer ₹400; Winter ₹800."} />,
          voice: "Summer CAC ₹400; Winter CAC ₹800.",
        },
        {
          question: "What is the lifetime value to CAC ratio?",
          answer: <ValueDisplay value={"3:1."} />,
          voice: "Your LTV:CAC ratio is 3:1.",
        },
      ],
    },
    {
      question:
        "Get me the details of my campaigns in breeze, which are live and what are they?",
      chart: <ValueDisplay value={"Live: Summer Sale, Monsoon Magic."} />,
      voice: "Listing live campaigns in Breeze.",
      followUp: [
        {
          question: "What is the budget for each of these campaigns?",
          answer: <ValueDisplay value={"Summer ₹50k; Monsoon ₹40k."} />,
          voice: "Budgets: Summer ₹50k; Monsoon ₹40k.",
        },
        {
          question: "When are these campaigns scheduled to end?",
          answer: (
            <ValueDisplay value={"Summer:2025-08-31; Monsoon:2025-09-30."} />
          ),
          voice: "End dates: Summer Aug 31, 2025; Monsoon Sept 30, 2025.",
        },
      ],
    },
    {
      question:
        "Enable/Disable the payment method for a specific payment gateway.",
      chart: (
        <FormDisplay
          fields={[
            { name: "paymentMethod", label: "Payment Method", type: "text" },
            { name: "gateway", label: "Payment Gateway", type: "text" },
            { name: "action", label: "Enable/Disable", type: "text" },
          ]}
          buttonText="Submit"
          onSubmit={(data) =>
            alert(`${data.action}d ${data.paymentMethod} for ${data.gateway}`)
          }
        />
      ),
      voice: "Toggle gateway payment methods here.",
      followUp: [
        {
          question:
            "What are the currently enabled payment methods for Razorpay?",
          answer: <ValueDisplay value={"Credit, Debit, UPI."} />,
          voice: "Razorpay active methods: Credit, Debit, UPI.",
        },
        {
          question: "Can I set transaction limits for a payment method?",
          answer: (
            <FormDisplay
              fields={[
                {
                  name: "paymentMethod",
                  label: "Payment Method",
                  type: "text",
                },
                { name: "limit", label: "Limit", type: "number" },
              ]}
              buttonText="Set Limit"
              onSubmit={(data) =>
                alert(`Limit for ${data.paymentMethod} set to ${data.limit}`)
              }
            />
          ),
          voice: "Configure per-method transaction caps here.",
        },
      ],
    },
  ];

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "speechSynthesis" in window &&
      tabs[activeTab].voice
    ) {
      const chartAnswer = tabs[activeTab].chart.props.value;
      const followUpChartAnswer =
        tabs[activeTab].followUp[activeFollowUp]?.answer?.props?.value;
      var toSpeak = chartAnswer || tabs[activeTab].voice;
      if (activeFollowUp !== null) {
        toSpeak =
          followUpChartAnswer || tabs[activeTab].followUp[activeFollowUp].voice;
      }
      window.speechSynthesis.cancel(); // Stop any previous speech
      const utter = new window.SpeechSynthesisUtterance(toSpeak);
      utter.rate = 1;
      utter.pitch = 1;
      utter.lang = "en-IN";
      window.speechSynthesis.speak(utter);
    }
  }, [activeTab, activeFollowUp]);

  return (
    <div className="dashboard-container">
      <div className="dropdown-container">
        <CustomSelect
          options={tabs}
          value={activeTab}
          onChange={(index) => {
            setActiveTab(index);
            setActiveFollowUp(null);
          }}
        />
      </div>
      <div className="right-panel">
        <div className="chart-container">
          {activeFollowUp !== null && tabs[activeTab].followUp
            ? tabs[activeTab].followUp[activeFollowUp].answer
            : tabs[activeTab].chart}
        </div>
        {tabs[activeTab].followUp && (
          <div className="follow-up-container">
            <h3>Follow-up Questions:</h3>
            {tabs[activeTab].followUp.map((q, index) => (
              <div
                key={index}
                className={`question ${
                  activeFollowUp === index &&
                  activeTab ===
                    tabs.findIndex(
                      (t) => t.followUp === tabs[activeTab].followUp
                    )
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveFollowUp(
                    activeFollowUp === index &&
                      activeTab ===
                        tabs.findIndex(
                          (t) => t.followUp === tabs[activeTab].followUp
                        )
                      ? null
                      : index
                  )
                }
              >
                <h4>{q.question}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
