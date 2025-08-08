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
      followUp: followUpQuestions,
    },
    {
      question:
        "How much revenue did I process through Cards/UPI/Netbanking/COD/Others?",
      chart: <RevenueChart />,
      followUp: [
        {
          question: "What is the revenue from credit cards vs debit cards?",
          answer: (
            <ValueDisplay
              value={
                "The revenue from credit cards is ₹2500 and from debit cards is ₹1500."
              }
            />
          ),
        },
        {
          question: "Which UPI app is used the most?",
          answer: <UpiAppChart />,
        },
      ],
    },
    {
      question: "What is my conversion rate?",
      chart: (
        <ValueDisplay
          value={`Your overall conversion rate is ${conversionRate.toFixed(
            2
          )}%. This is the percentage of leads that have been successfully converted into customers.`}
        />
      ),
      followUp: [
        {
          question: "How does this compare to the industry average?",
          answer: (
            <ValueDisplay
              value={
                "Your conversion rate of 20% is 5% higher than the industry average of 15%."
              }
            />
          ),
        },
        {
          question: "What is the conversion rate for new vs returning users?",
          answer: (
            <ValueDisplay
              value={
                "The conversion rate for new users is 15%, while for returning users it is 25%."
              }
            />
          ),
        },
      ],
    },
    {
      question: "What is the source of my leads?",
      chart: <LeadSourceChart />,
      followUp: [
        {
          question: "Which paid channel has the highest ROI?",
          answer: (
            <ValueDisplay
              value={
                "Google Ads has the highest ROI of 4.5x, followed by Facebook Ads with an ROI of 3.8x."
              }
            />
          ),
        },
        {
          question: "What is the conversion rate from organic search?",
          answer: (
            <ValueDisplay
              value={"The conversion rate from organic search is 18%."}
            />
          ),
        },
      ],
    },
    {
      question: "Can you provide marketing channel performance?",
      chart: <MarketingChannelChart />,
      followUp: [
        {
          question: "What is the cost per acquisition for each channel?",
          answer: <CpaChart />,
        },
        {
          question: "Which channel has the highest customer lifetime value?",
          answer: <ClvChart />,
        },
      ],
    },
    {
      question: "What is my ROAS?",
      chart: (
        <ValueDisplay
          value={"Your Return on Ad Spend is 4.5x."}
          label="This means for every dollar spent on advertising, you are generating $4.50 in revenue."
        />
      ),
      followUp: [
        {
          question: "How has ROAS trended over the last 6 months?",
          answer: <RoasTrendChart />,
        },
        {
          question: "What is the ROAS for my top 5 campaigns?",
          answer: <TopCampaignsRoasChart />,
        },
      ],
    },
    {
      question: "What is my SR?",
      chart: (
        <ValueDisplay
          value={"Your overall success rate is 85%."}
          label="This is the percentage of successful transactions out of the total number of attempts."
        />
      ),
      followUp: [
        {
          question: "What is the success rate for international payments?",
          answer: (
            <ValueDisplay
              value={"The success rate for international payments is 75%."}
            />
          ),
        },
        {
          question: "Which payment gateway has the highest success rate?",
          answer: (
            <ValueDisplay
              value={"Stripe has the highest success rate at 99%."}
            />
          ),
        },
      ],
    },
    {
      question: "How many failed transactions did I have?",
      chart: (
        <ValueDisplay
          value={"You had 1,234 failed transactions in the selected period."}
        />
      ),
      followUp: [
        {
          question: "What are the top reasons for transaction failure?",
          answer: <FailureReasonsChart />,
        },
        {
          question: "Which payment method has the most failures?",
          answer: <FailurePaymentMethodChart />,
        },
      ],
    },
    {
      question: "What is the daily trend for transaction success rates?",
      chart: <DailyTrendChart />,
      followUp: [
        {
          question: "What was the success rate last Tuesday?",
          answer: (
            <ValueDisplay value={"Last Tuesday's success rate was 96%."} />
          ),
        },
        {
          question: "Why was the success rate low on Wednesday?",
          answer: (
            <ValueDisplay
              value={
                "The success rate was low on Wednesday due to a temporary issue with one of our payment gateways."
              }
            />
          ),
        },
      ],
    },
    {
      question: "What is the SR for different payment methods?",
      chart: <PaymentMethodSRChart />,
      followUp: [
        {
          question: "Why is the success rate for Netbanking lower than others?",
          answer: (
            <ValueDisplay
              value={
                "The success rate for Netbanking is lower because it has more steps in the payment flow, which leads to higher customer drop-offs."
              }
            />
          ),
        },
        {
          question: "What is the success rate for EMI payments?",
          answer: (
            <ValueDisplay value={"The success rate for EMI payments is 90%."} />
          ),
        },
      ],
    },
    {
      question: "What is the breakdown of payment methods?",
      chart: <RevenueChart />,
      followUp: [
        {
          question: "What percentage of payments are made via mobile devices?",
          answer: (
            <ValueDisplay
              value={"70% of payments are made via mobile devices."}
            />
          ),
        },
        {
          question: "How has the use of UPI grown over the last year?",
          answer: (
            <ValueDisplay
              value={"The use of UPI has grown by 50% over the last year."}
            />
          ),
        },
      ],
    },
    {
      question: "How many orders were placed?",
      chart: (
        <ValueDisplay
          value={"A total of 12,345 orders were placed in the selected period."}
        />
      ),
      voice: "A total of 12,345 orders were placed in the selected period.",
      followUp: [
        {
          question: "What is the trend of orders over the last 7 days?",
          answer: <WeeklyOrderTrendChart />,
        },
        {
          question: "How many orders were placed during peak hours?",
          answer: (
            <ValueDisplay
              value={
                "A total of 4,000 orders were placed during peak hours (6 PM - 9 PM)."
              }
            />
          ),
        },
      ],
    },
    {
      question: "What are my net sales?",
      chart: (
        <ValueDisplay
          value={"Your net sales are ₹1,23,45,678."}
          label="This is your total revenue after deducting returns, allowances, and discounts."
        />
      ),
      followUp: [
        {
          question: "What is the breakdown of net sales by category?",
          answer: <NetSalesByCategoryChart />,
        },
        {
          question: "How have net sales trended over the last year?",
          answer: <NetSalesTrendChart />,
        },
      ],
    },
    {
      question: "What are my prepaid sales?",
      chart: (
        <ValueDisplay value={"Your prepaid sales amount to ₹1,00,00,000."} />
      ),
      followUp: [
        {
          question: "What is the breakdown of prepaid sales by payment method?",
          answer: <PrepaidPaymentMethodsChart />,
        },
        {
          question: "What is the ratio of prepaid to COD sales?",
          answer: (
            <ValueDisplay
              value={"The ratio of prepaid to COD sales is approximately 4:1."}
            />
          ),
        },
      ],
    },
    {
      question: "What's the forecast for sales based on historical data?",
      chart: <SalesForecastChart />,
      followUp: [
        {
          question: "What factors were considered in this forecast?",
          answer: (
            <ValueDisplay
              value={
                "The forecast considers historical sales data, seasonality, and market trends."
              }
            />
          ),
        },
        {
          question: "How accurate have previous forecasts been?",
          answer: (
            <ValueDisplay
              value={
                "Previous forecasts have been accurate within a 5% margin of error."
              }
            />
          ),
        },
      ],
    },
    {
      question: "What is AOV?",
      chart: (
        <ValueDisplay
          value={"Your Average Order Value is ₹1,000."}
          label="This is the average amount spent by a customer in a single order."
        />
      ),
      followUp: [
        {
          question: "Which products contribute the most to AOV?",
          answer: <TopAovProductsChart />,
        },
        {
          question: "How does AOV differ for new vs returning customers?",
          answer: (
            <ValueDisplay
              value={
                "AOV for new customers is ₹800, while for returning customers it is ₹1200."
              }
            />
          ),
        },
      ],
    },
    {
      question: "What is my GMV?",
      chart: (
        <ValueDisplay
          value={"Your Gross Merchandise Value is ₹1,50,00,000."}
          label="This is the total value of merchandise sold over a given period of time."
        />
      ),
      followUp: [
        {
          question: "How has GMV grown quarterly?",
          answer: <QuarterlyGmvChart />,
        },
        {
          question: "What is the difference between GMV and Net Sales?",
          answer: (
            <ValueDisplay
              value={
                "GMV is the total value of goods sold, while Net Sales is GMV minus returns, allowances, and discounts."
              }
            />
          ),
        },
      ],
    },
    {
      question: "What are my COD sales?",
      chart: (
        <ValueDisplay value={"Your Cash on Delivery sales are ₹23,45,678."} />
      ),
      followUp: [
        {
          question: "Which regions have the highest COD sales?",
          answer: <CodRegionsChart />,
        },
        {
          question: "What is the COD to prepaid ratio?",
          answer: (
            <ValueDisplay
              value={"The COD to prepaid ratio is approximately 1:4."}
            />
          ),
        },
      ],
    },
    {
      question:
        "How many orders did I receive this week compared to last week?",
      chart: <WeeklyOrderTrendChart />,
      followUp: [
        {
          question: "What was the percentage change in orders?",
          answer: (
            <ValueDisplay
              value={
                "There was a 15% increase in orders this week compared to last week."
              }
            />
          ),
        },
        {
          question: "Which day had the highest number of orders this week?",
          answer: (
            <ValueDisplay
              value={"Saturday had the highest number of orders with 250."}
            />
          ),
        },
      ],
    },
    {
      question: "What regions have the highest sales?",
      chart: <TopRegionsChart />,
      followUp: [
        {
          question: "What are the top 3 cities in Maharashtra by sales?",
          answer: <TopCitiesMaharashtraChart />,
        },
        {
          question:
            "How does marketing spend correlate with sales in these regions?",
          answer: <RegionSalesMarketingChart />,
        },
      ],
    },
    {
      question: "Which regions are we gettign the most orders from?",
      chart: <TopRegionsChart />,
      followUp: [
        {
          question: "What is the AOV for each of these regions?",
          answer: (
            <ValueDisplay
              value={"Maharashtra: ₹1200, Karnataka: ₹1100, Delhi: ₹1000"}
            />
          ),
        },
        {
          question: "Which products are most popular in these regions?",
          answer: (
            <ValueDisplay
              value={
                "Maharashtra: Electronics, Karnataka: Fashion, Delhi: Home Goods"
              }
            />
          ),
        },
      ],
    },
    {
      question: "How many customers made a repeat purchase?",
      chart: (
        <ValueDisplay value={"2,345 customers have made a repeat purchase."} />
      ),
      followUp: [
        {
          question: "What is the repeat purchase rate?",
          answer: <ValueDisplay value={"The repeat purchase rate is 19%."} />,
        },
        {
          question:
            "How has the repeat purchase rate trended over the last 6 months?",
          answer: <RepeatPurchaseRateChart />,
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
      followUp: [
        {
          question: "What is the average lifetime value of these customers?",
          answer: (
            <ValueDisplay
              value={
                "The average lifetime value of these top 10 customers is ₹15,000."
              }
            />
          ),
        },
        {
          question: "Which products do they purchase most often?",
          answer: (
            <ValueDisplay value={"Smartphones, Laptops, and Headphones"} />
          ),
        },
      ],
    },
    {
      question: "How many new customers did I acquire?",
      chart: (
        <ValueDisplay
          value={"You acquired 1,234 new customers in the selected period."}
        />
      ),
      followUp: [
        {
          question: "What is the breakdown of new vs returning customers?",
          answer: <NewVsReturningCustomersChart />,
        },
        {
          question: "What is the customer acquisition cost (CAC)?",
          answer: (
            <ValueDisplay
              value={"The average customer acquisition cost is ₹500."}
            />
          ),
        },
      ],
    },
    {
      question:
        "Which payment gateway is performing best in terms of success rates this month?",
      chart: <PgSuccessRateChart />,
      followUp: [
        {
          question: "What is the transaction volume for each gateway?",
          answer: (
            <ValueDisplay
              value={"Razorpay: 10,000, PayU: 8,000, Stripe: 5,000"}
            />
          ),
        },
        {
          question:
            "How does the cost per transaction compare for each gateway?",
          answer: (
            <ValueDisplay value={"Razorpay: 2%, PayU: 2.2%, Stripe: 2.5%"} />
          ),
        },
      ],
    },
    {
      question:
        "How many abandoned carts did I have and what's their estimated value?",
      chart: (
        <ValueDisplay
          value={
            "You had 5,678 abandoned carts with an estimated value of ₹56,78,000."
          }
        />
      ),
      followUp: [
        {
          question:
            "What is the trend of abandoned carts over the last 7 days?",
          answer: <AbandonedCartTrendChart />,
        },
        {
          question:
            "What are the most common products found in abandoned carts?",
          answer: <ValueDisplay value={"Smartphones, T-shirts, and Books"} />,
        },
      ],
    },
    {
      question: "iOS/Android - Device specific data",
      chart: <DeviceSalesChart />,
      followUp: [
        {
          question: "What is the conversion rate for each device type?",
          answer: (
            <ValueDisplay
              value={
                "The conversion rate is 25% for iOS, 20% for Android, and 15% for Desktop."
              }
            />
          ),
        },
        {
          question: "What is the AOV for each device type?",
          answer: (
            <ValueDisplay
              value={
                "The Average Order Value is ₹1200 for iOS, ₹1000 for Android, and ₹1500 for Desktop."
              }
            />
          ),
        },
      ],
    },
    {
      question:
        "What is my Avg. number of orders per customer in a given period",
      chart: (
        <ValueDisplay
          value={"The average number of orders per customer is 2.5."}
        />
      ),
      followUp: [
        {
          question: "How does this vary by customer segment?",
          answer: <AvgOrdersPerCustomerSegmentChart />,
        },
        {
          question: "What is the time between repeat purchases?",
          answer: (
            <ValueDisplay
              value={"The average time between repeat purchases is 45 days."}
            />
          ),
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
      followUp: [
        {
          question: "What is the category breakdown of these top products?",
          answer: <TopProductsByCategoryChart />,
        },
        {
          question:
            "Which of these products are most frequently purchased together?",
          answer: (
            <ValueDisplay
              value={"Smartphone and Headphones, Laptop and Wireless Mouse"}
            />
          ),
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
      followUp: [
        {
          question:
            "What is the estimated date for when these products will be out of stock?",
          answer: (
            <ValueDisplay
              value={
                "The estimated out-of-stock dates are: Wireless Mouse in 5 days, Bluetooth Speaker in 8 days, and External Hard Drive in 10 days."
              }
            />
          ),
        },
        {
          question: "Can you set up a low stock alert for these products?",
          answer: <LowStockAlertsChart />,
        },
      ],
    },
    {
      question: "What are my current shipping rules?",
      chart: (
        <ValueDisplay
          value={
            "Your current shipping rules are: Standard Shipping for ₹50 and Express Shipping for ₹100."
          }
        />
      ),
      followUp: [
        {
          question: "How many orders are using each shipping method?",
          answer: <ShippingRulePerformanceChart />,
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
      followUp: [
        {
          question: "What is the list of currently blocked pincodes?",
          answer: (
            <ValueDisplay
              value={"Currently blocked pincodes: 110001, 400001, 560001"}
            />
          ),
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
      followUp: [
        {
          question: "What is the list of currently blocked customers?",
          answer: (
            <ValueDisplay
              value={
                "Currently blocked customers: test@example.com, 9876543210"
              }
            />
          ),
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
        },
      ],
    },
    {
      question: "What are the high risk pincodes?",
      chart: <HighRiskPincodesChart />,
      followUp: [
        {
          question: "Why are these pincodes considered high risk?",
          answer: (
            <ValueDisplay
              value={
                "These pincodes are considered high risk due to a high rate of COD returns and fraudulent activities."
              }
            />
          ),
        },
        {
          question: "Can I add a new pincode to the high-risk list?",
          answer: (
            <FormDisplay
              fields={[{ name: "pincode", label: "Pincode", type: "text" }]}
              buttonText="Add to High-Risk"
              onSubmit={(data) =>
                alert(`Added pincode ${data.pincode} to high-risk list.`)
              }
            />
          ),
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
              `Created shipping rule: If cart value > ${data.cartValue}, shipping cost is ${data.shippingCost}`
            )
          }
        />
      ),
      followUp: [
        {
          question: "What are the existing cart value-based rules?",
          answer: <ValueDisplay value={"Free shipping on orders over ₹500."} />,
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
                alert(
                  `Edited rule ${data.ruleId} with new cost ${data.newCost}`
                )
              }
            />
          ),
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
            alert(
              `Created shipping rule: For product ${data.product}, shipping cost is ${data.shippingCost}`
            )
          }
        />
      ),
      followUp: [
        {
          question: "What are the existing product-based rules?",
          answer: <ValueDisplay value={"Free shipping on all electronics."} />,
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
                alert(
                  `Applied rule to category ${data.category} with shipping cost ${data.shippingCost}`
                )
              }
            />
          ),
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
            alert(
              `Created shipping rule: For pincodes ${data.pincodes}, shipping cost is ${data.shippingCost}`
            )
          }
        />
      ),
      followUp: [
        {
          question: "What are the existing region-based rules?",
          answer: <ValueDisplay value={"Express shipping for metro cities."} />,
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
                  `Set shipping rate for ${data.state} to ${data.shippingCost}`
                )
              }
            />
          ),
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
            alert(
              `Configured partial payment offer: ${data.offerName} at ${data.percentage}%`
            )
          }
        />
      ),
      followUp: [
        {
          question: "What are the active partial payment offers?",
          answer: <ValueDisplay value={"50% advance payment on all orders."} />,
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
                  `Set validity for offer ${data.offerName} from ${data.startDate} to ${data.endDate}`
                )
              }
            />
          ),
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
              `Created static offer for UPI: ${data.offerName} with a discount of ${data.discount}`
            )
          }
        />
      ),
      followUp: [
        {
          question: "What are the active UPI offers?",
          answer: <ValueDisplay value={"10% off on all UPI payments."} />,
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
                alert(`Limited offer ${data.offerName} to ${data.upiApp}`)
              }
            />
          ),
        },
      ],
    },
    {
      question: "What was my sales growth year-over-year?",
      chart: <ValueDisplay value={"Your sales grew by 25% year-over-year."} />,
      followUp: [
        {
          question: "What was the sales growth for the top 5 categories?",
          answer: (
            <ValueDisplay
              value={
                "The sales growth for the top 5 categories was: Electronics (30%), Fashion (20%), Home Goods (15%), Books (10%), and Sports (5%)."
              }
            />
          ),
        },
        {
          question: "How does this compare to the industry average growth?",
          answer: (
            <ValueDisplay
              value={"Your growth is 10% above the industry average."}
            />
          ),
        },
      ],
    },
    {
      question: "What are my order details for XYZ order",
      chart: (
        <ValueDisplay
          value={"Order XYZ contains 2 items with a total value of ₹2,500."}
        />
      ),
      followUp: [
        {
          question: "What is the payment status for this order?",
          answer: <ValueDisplay value={"Paid"} />,
        },
        {
          question: "What is the shipping status for this order?",
          answer: <ValueDisplay value={"Shipped"} />,
        },
      ],
    },
    {
      question: "What are my details for XYZ Transaction",
      chart: (
        <ValueDisplay
          value={"Transaction XYZ was successful for an amount of ₹2,500."}
        />
      ),
      followUp: [
        {
          question: "Which payment method was used for this transaction?",
          answer: <ValueDisplay value={"Credit Card"} />,
        },
        {
          question: "What is the associated order ID?",
          answer: <ValueDisplay value={"ABC-123"} />,
        },
      ],
    },
    {
      question:
        "Can you provide order analytics for the currently configured offers?",
      chart: (
        <ValueDisplay
          value={
            "The offer 'DIWALI10' has been used 500 times, resulting in an Average Order Value of ₹1,200."
          }
        />
      ),
      followUp: [
        {
          question: "What is the total revenue generated from this offer?",
          answer: <ValueDisplay value={"₹6,00,000"} />,
        },
        {
          question: "How many new customers used this offer?",
          answer: <ValueDisplay value={"150"} />,
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
            alert(`Refund initiated for order ID: ${data.orderId}`)
          }
        />
      ),
      followUp: [
        {
          question: "What is the refund policy?",
          answer: (
            <ValueDisplay
              value={"We offer a 30-day return policy on all products."}
            />
          ),
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
                  `Processed partial refund of ${data.amount} for order ID ${data.orderId}`
                )
              }
            />
          ),
        },
      ],
    },
    {
      question: "What are my refund analytics for the past 5 days?",
      chart: (
        <ValueDisplay
          value={
            "In the past 5 days, there have been 123 refunds totaling ₹1,23,000."
          }
        />
      ),
      followUp: [
        {
          question: "What are the top reasons for refunds?",
          answer: (
            <ValueDisplay
              value={
                "The top reasons for refunds are: damaged product, wrong item received, and customer changed their mind."
              }
            />
          ),
        },
        {
          question: "Which products have the highest refund rate?",
          answer: (
            <ValueDisplay
              value={"Smartphones and laptops have the highest refund rates."}
            />
          ),
        },
      ],
    },
    {
      question:
        "Can you bifurcate sales/SR basis payment method. Provide more analytics like debit card, VPA, QR code",
      chart: (
        <ValueDisplay
          value={
            "Sales - Debit Card: ₹30L, VPA: ₹25L, QR Code: ₹10L. SR - Debit Card: 95%, VPA: 97%, QR Code: 99%"
          }
        />
      ),
      followUp: [
        {
          question: "What is the success rate for VPA payments?",
          answer: <ValueDisplay value={"97%"} />,
        },
        {
          question:
            "What is the average transaction value for QR code payments?",
          answer: <ValueDisplay value={"₹500"} />,
        },
      ],
    },
    {
      question: "Can you help with configuring Custom Payment Options for me?",
      chart: (
        <FormDisplay
          fields={[{ name: "optionName", label: "Option Name", type: "text" }]}
          buttonText="Configure"
          onSubmit={(data) =>
            alert(`Configured custom payment option: ${data.optionName}`)
          }
        />
      ),
      followUp: [
        {
          question: "What are the existing custom payment options?",
          answer: <ValueDisplay value={"Bank Transfer, EMI"} />,
        },
        {
          question: "Can I remove a custom payment option?",
          answer: (
            <FormDisplay
              fields={[
                { name: "optionName", label: "Option Name", type: "text" },
              ]}
              buttonText="Remove"
              onSubmit={(data) =>
                alert(`Removed custom payment option: ${data.optionName}`)
              }
            />
          ),
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
          onSubmit={(data) =>
            alert(`Changed checkout button color to: ${data.color}`)
          }
        />
      ),
      followUp: [
        {
          question: "What is the current color of the checkout button?",
          answer: <ValueDisplay value={"#007bff"} />,
        },
        {
          question: "Can I revert to the default color?",
          answer: (
            <FormDisplay
              fields={[]}
              buttonText="Revert to Default"
              onSubmit={() => alert("Reverted to default color.")}
            />
          ),
        },
      ],
    },
    {
      question:
        "How many people applied my offer XYZ during checkout? (Give as a percentage of total orders)",
      chart: (
        <ValueDisplay
          value={"15% of total orders used the offer XYZ during checkout."}
        />
      ),
      followUp: [
        {
          question: "What was the total discount given for this offer?",
          answer: (
            <ValueDisplay
              value={"The total discount given for this offer was ₹75,000."}
            />
          ),
        },
        {
          question: "How did this offer impact the conversion rate?",
          answer: (
            <ValueDisplay
              value={
                "The conversion rate for users who applied the offer was 5% higher."
              }
            />
          ),
        },
      ],
    },
    {
      question: "How many carts used offers?",
      chart: <ValueDisplay value={"A total of 3,456 carts used offers."} />,
      followUp: [
        {
          question: "What is the most frequently used offer?",
          answer: (
            <ValueDisplay
              value={"The most frequently used offer is 'DIWALI10'."}
            />
          ),
        },
        {
          question: "What is the total value of discounts applied?",
          answer: (
            <ValueDisplay
              value={"The total value of discounts applied is ₹3,45,600."}
            />
          ),
        },
      ],
    },
    {
      question:
        "How does offer affect their AOV and likelihood to purchase again?",
      chart: (
        <ValueDisplay
          value={
            "The Average Order Value with an offer is ₹1,200, compared to ₹1,000 without an offer."
          }
        />
      ),
      followUp: [
        {
          question:
            "What is the repeat purchase rate for customers who used an offer?",
          answer: (
            <ValueDisplay
              value={
                "The repeat purchase rate for customers who used an offer is 30%."
              }
            />
          ),
        },
        {
          question: "Which offer has the highest impact on AOV?",
          answer: (
            <ValueDisplay
              value={
                "The 'Buy One Get One' (BOGO) offer has the highest impact on AOV."
              }
            />
          ),
        },
      ],
    },
    {
      question:
        "What is our Average Order Value (AOV) for first-time customers versus returning customers in the last quarter?",
      chart: (
        <ValueDisplay
          value={
            "In the last quarter, the AOV for first-time customers was ₹900, while for returning customers it was ₹1,100."
          }
        />
      ),
      followUp: [
        {
          question: "What is the AOV for VIP customers?",
          answer: (
            <ValueDisplay value={"The AOV for VIP customers is ₹2,500."} />
          ),
        },
        {
          question:
            "How has the AOV for first-time customers changed over the last year?",
          answer: (
            <ValueDisplay
              value={
                "The AOV for first-time customers has increased by 10% over the last year."
              }
            />
          ),
        },
      ],
    },
    {
      question: "Can you disable PayU as a PG",
      chart: (
        <FormDisplay
          fields={[]}
          buttonText="Disable PayU"
          onSubmit={() => alert("PayU has been disabled.")}
        />
      ),
      followUp: [
        {
          question: "What are the currently active payment gateways?",
          answer: <ValueDisplay value={"Razorpay, Stripe"} />,
        },
        {
          question: "Can I re-enable PayU later?",
          answer: (
            <FormDisplay
              fields={[]}
              buttonText="Enable PayU"
              onSubmit={() => alert("PayU has been enabled.")}
            />
          ),
        },
      ],
    },
    {
      question: "What were the peak sales hours?",
      chart: (
        <ValueDisplay
          value={"The peak sales hours were between 6 PM and 9 PM."}
        />
      ),
      followUp: [
        {
          question: "How do peak hours differ on weekends vs weekdays?",
          answer: (
            <ValueDisplay
              value={
                "On weekends, peak hours are from 8 PM to 11 PM, while on weekdays they are from 6 PM to 9 PM."
              }
            />
          ),
        },
        {
          question: "What is the AOV during peak hours?",
          answer: (
            <ValueDisplay
              value={"The Average Order Value during peak hours is ₹1,100."}
            />
          ),
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
          onSubmit={(data) =>
            alert(`Configured COD surcharge of ${data.surcharge}%`)
          }
        />
      ),
      followUp: [
        {
          question: "What is the current surcharge on COD orders?",
          answer: (
            <ValueDisplay value={"There is no surcharge on COD orders."} />
          ),
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
                alert(`Applied ${data.percentage}% surcharge on COD orders.`)
              }
            />
          ),
        },
      ],
    },
    {
      question: "What is the average sell through rate of the products?",
      chart: (
        <ValueDisplay
          value={"The average sell-through rate of the products is 75%."}
        />
      ),
      followUp: [
        {
          question: "Which category has the highest sell through rate?",
          answer: (
            <ValueDisplay
              value={
                "The Electronics category has the highest sell-through rate."
              }
            />
          ),
        },
        {
          question: "How does this compare to the industry average?",
          answer: (
            <ValueDisplay
              value={
                "Your sell-through rate is 10% higher than the industry average."
              }
            />
          ),
        },
      ],
    },
    {
      question: "What products have the highest sell through rate?",
      chart: (
        <ValueDisplay
          value={"Smartphones and Laptops have the highest sell-through rate."}
        />
      ),
      followUp: [
        {
          question: "What is the sell through rate for these products?",
          answer: (
            <ValueDisplay
              value={
                "The sell-through rate for smartphones is 90%, and for laptops it is 85%."
              }
            />
          ),
        },
        {
          question:
            "How can I improve the sell through rate for other products?",
          answer: (
            <ValueDisplay
              value={
                "You can try running promotions, bundling products, or improving product visibility."
              }
            />
          ),
        },
      ],
    },
    {
      question: "Which landing page is most visited by users first?",
      chart: (
        <ValueDisplay
          value={"The homepage is the most visited landing page."}
        />
      ),
      followUp: [
        {
          question: "What is the bounce rate for the homepage?",
          answer: (
            <ValueDisplay value={"The bounce rate for the homepage is 40%."} />
          ),
        },
        {
          question:
            "Which marketing channel drives the most traffic to the homepage?",
          answer: (
            <ValueDisplay
              value={"Organic Search drives the most traffic to the homepage."}
            />
          ),
        },
      ],
    },
    {
      question:
        "How many orders were serviced through Standard, Express or any other shipping method?",
      chart: (
        <ValueDisplay
          value={
            "10,000 orders were serviced through Standard shipping and 2,345 through Express shipping."
          }
        />
      ),
      followUp: [
        {
          question:
            "What is the average delivery time for each shipping method?",
          answer: (
            <ValueDisplay
              value={
                "The average delivery time is 5-7 days for Standard shipping and 1-2 days for Express shipping."
              }
            />
          ),
        },
        {
          question: "What is the cost of each shipping method?",
          answer: (
            <ValueDisplay
              value={
                "Standard shipping costs ₹50, and Express shipping costs ₹100."
              }
            />
          ),
        },
      ],
    },
    {
      question:
        "How many products do I currently have in my store? Active/inactive?",
      chart: (
        <ValueDisplay
          value={
            "You currently have 500 active and 50 inactive products in your store."
          }
        />
      ),
      followUp: [
        {
          question: "What are the top 5 inactive products?",
          answer: (
            <ValueDisplay
              value={
                "The top 5 inactive products are: Product F, Product G, Product H, Product I, and Product J."
              }
            />
          ),
        },
        {
          question: "Can I get a list of all active products?",
          answer: (
            <ValueDisplay
              value={"Please check your email for the list of active products."}
            />
          ),
        },
      ],
    },
    {
      question:
        "How many of my orders are fulfilled? How many unfullfilled? How many partially fulfilled?",
      chart: (
        <ValueDisplay
          value={
            "Out of your total orders, 11,000 are fulfilled, 1,000 are unfulfilled, and 345 are partially fulfilled."
          }
        />
      ),
      followUp: [
        {
          question: "What are the top reasons for unfulfilled orders?",
          answer: (
            <ValueDisplay
              value={
                "The top reasons for unfulfilled orders are 'Out of stock' and 'Invalid address'."
              }
            />
          ),
        },
        {
          question: "What is the average fulfillment time?",
          answer: (
            <ValueDisplay value={"The average fulfillment time is 2 days."} />
          ),
        },
      ],
    },
    {
      question: "What has been the reach and impact of my campaigns?",
      chart: (
        <ValueDisplay
          value={
            "Your campaigns have reached 1 million people and resulted in 10,000 conversions."
          }
        />
      ),
      followUp: [
        {
          question: "What was the cost per conversion?",
          answer: <ValueDisplay value={"The cost per conversion was ₹50."} />,
        },
        {
          question: "Which campaign had the highest reach?",
          answer: (
            <ValueDisplay
              value={"The 'Summer Sale' campaign had the highest reach."}
            />
          ),
        },
      ],
    },
    {
      question: "Can you comment on the effectives of campaign XYZ?",
      chart: (
        <ValueDisplay
          value={
            "Campaign XYZ was highly effective, with a Return on Ad Spend (ROAS) of 5x."
          }
        />
      ),
      followUp: [
        {
          question: "What was the conversion rate for this campaign?",
          answer: (
            <ValueDisplay
              value={"The conversion rate for this campaign was 10%."}
            />
          ),
        },
        {
          question: "How did this campaign perform on different platforms?",
          answer: (
            <ValueDisplay
              value={
                "The campaign performed better on Google with a 6x ROAS compared to Facebook's 4x ROAS."
              }
            />
          ),
        },
      ],
    },
    {
      question: "Which is the best performing adset?",
      chart: (
        <ValueDisplay value={"The best performing adset is 'Summer Sale'."} />
      ),
      followUp: [
        {
          question: "What is the ROAS for this adset?",
          answer: <ValueDisplay value={"The ROAS for this adset is 6x."} />,
        },
        {
          question: "Which ad creative performed the best in this adset?",
          answer: (
            <ValueDisplay
              value={
                "The video ad featuring a dog performed the best in this adset."
              }
            />
          ),
        },
      ],
    },
    {
      question: "How much amount have I spent on the ads?",
      chart: (
        <ValueDisplay value={"You have spent a total of ₹5,00,000 on ads."} />
      ),
      followUp: [
        {
          question: "What is the breakdown of ad spend by platform?",
          answer: (
            <ValueDisplay
              value={
                "The ad spend breakdown is: Google - ₹3,00,000 and Facebook - ₹2,00,000."
              }
            />
          ),
        },
        {
          question: "How has ad spend trended over the last 6 months?",
          answer: (
            <ValueDisplay
              value={
                "Ad spend has increased by 10% month-over-month for the last 6 months."
              }
            />
          ),
        },
      ],
    },
    {
      question: "How many campaigns did I run in the last 6 months?",
      chart: (
        <ValueDisplay value={"You ran 12 campaigns in the last 6 months."} />
      ),
      followUp: [
        {
          question: "What was the average ROAS across all campaigns?",
          answer: (
            <ValueDisplay
              value={"The average ROAS across all campaigns was 4.2x."}
            />
          ),
        },
        {
          question: "Which campaign had the highest conversion rate?",
          answer: (
            <ValueDisplay
              value={
                "The 'Diwali Dhamaka' campaign had the highest conversion rate."
              }
            />
          ),
        },
      ],
    },
    {
      question: "Which campaign has the highest spend but lowest ROAS?",
      chart: (
        <ValueDisplay
          value={
            "The 'Winter Sale' campaign has the highest spend but the lowest ROAS."
          }
        />
      ),
      followUp: [
        {
          question: "What was the spend and ROAS for this campaign?",
          answer: (
            <ValueDisplay
              value={
                "The spend for this campaign was ₹1,00,000, and the ROAS was 1.5x."
              }
            />
          ),
        },
        {
          question: "What were the target demographics for this campaign?",
          answer: (
            <ValueDisplay
              value={
                "The target demographics for this campaign were males aged 18-24 in Delhi."
              }
            />
          ),
        },
      ],
    },
    {
      question:
        "Show me the checkout behavior of customers who came from our Instagram ads versus those from Google Search",
      chart: (
        <ValueDisplay
          value={
            "Customers from Google Search have a 50% higher AOV and a 5% higher conversion rate compared to customers from Instagram ads."
          }
        />
      ),
      followUp: [
        {
          question: "What is the AOV for each group?",
          answer: <ValueDisplay value={"Instagram: ₹800, Google: ₹1200"} />,
        },
        {
          question: "What is the conversion rate for each group?",
          answer: <ValueDisplay value={"Instagram: 10%, Google: 15%"} />,
        },
      ],
    },
    {
      question: "Are new users converting better or returning users?",
      chart: (
        <ValueDisplay
          value={"Returning users are converting 2x better than new users."}
        />
      ),
      followUp: [
        {
          question: "What is the AOV for new vs returning users?",
          answer: (
            <ValueDisplay
              value={
                "The AOV for new users is ₹800, while for returning users it is ₹1200."
              }
            />
          ),
        },
        {
          question: "What is the repeat purchase rate?",
          answer: <ValueDisplay value={"The repeat purchase rate is 19%."} />,
        },
      ],
    },
    {
      question: "What time of day are ads converting best?",
      chart: (
        <ValueDisplay
          value={"Ads are converting best between 8 PM and 10 PM."}
        />
      ),
      followUp: [
        {
          question: "How does this differ by platform?",
          answer: (
            <ValueDisplay
              value={
                "On Google, the best time is 7 PM - 9 PM, while on Facebook it is 9 PM - 11 PM."
              }
            />
          ),
        },
        {
          question: "What is the AOV for conversions during these hours?",
          answer: (
            <ValueDisplay
              value={"The AOV for conversions during these hours is ₹1300."}
            />
          ),
        },
      ],
    },
    {
      question: "Suggest the top 3 performing campaigns I should scale.",
      chart: <TopPerformingCampaignsChart />,
      followUp: [
        {
          question: "What is the ROAS for each of these campaigns?",
          answer: (
            <ValueDisplay
              value={
                "Summer Sale: 6x, Diwali Dhamaka: 5.5x, New Year Bonanza: 5x"
              }
            />
          ),
        },
        {
          question: "What is the budget for each of these campaigns?",
          answer: (
            <ValueDisplay
              value={
                "Summer Sale: ₹50,000, Diwali Dhamaka: ₹75,000, New Year Bonanza: ₹60,000"
              }
            />
          ),
        },
      ],
    },
    {
      question: "Compare Google vs Meta performance last 7 days",
      chart: (
        <ValueDisplay
          value={
            "In the last 7 days, Google's ROAS was 4x, while Meta's was 3.5x."
          }
        />
      ),
      followUp: [
        {
          question: "What is the ad spend for each platform?",
          answer: (
            <ValueDisplay
              value={
                "The ad spend for Google was ₹50,000 and for Meta was ₹40,000."
              }
            />
          ),
        },
        {
          question: "What is the conversion rate for each platform?",
          answer: (
            <ValueDisplay
              value={
                "The conversion rate for Google was 12%, and for Meta it was 10%."
              }
            />
          ),
        },
      ],
    },
    {
      question: "What is my CAC through ad campaign",
      chart: (
        <ValueDisplay
          value={"Your Customer Acquisition Cost through ad campaigns is ₹500."}
        />
      ),
      followUp: [
        {
          question: "How does CAC vary by campaign?",
          answer: (
            <ValueDisplay
              value={
                "The CAC for the 'Summer Sale' campaign was ₹400, while for the 'Winter Sale' campaign it was ₹800."
              }
            />
          ),
        },
        {
          question: "What is the lifetime value to CAC ratio?",
          answer: (
            <ValueDisplay
              value={
                "The LTV to CAC ratio is 3:1, which means for every ₹1 spent on acquiring a customer, you get ₹3 in return."
              }
            />
          ),
        },
      ],
    },
    {
      question:
        "Get me the details of my campaigns in breeze, which are live and what are they?",
      chart: (
        <ValueDisplay value={"Live campaigns: Summer Sale, Monsoon Magic"} />
      ),
      followUp: [
        {
          question: "What is the budget for each of these campaigns?",
          answer: (
            <ValueDisplay
              value={"Summer Sale: ₹50,000, Monsoon Magic: ₹40,000"}
            />
          ),
        },
        {
          question: "When are these campaigns scheduled to end?",
          answer: (
            <ValueDisplay
              value={"Summer Sale: 2025-08-31, Monsoon Magic: 2025-09-30"}
            />
          ),
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
      followUp: [
        {
          question:
            "What are the currently enabled payment methods for Razorpay?",
          answer: <ValueDisplay value={"Credit Card, Debit Card, UPI"} />,
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
                alert(
                  `Set transaction limit for ${data.paymentMethod} to ${data.limit}`
                )
              }
            />
          ),
        },
      ],
    },
  ];

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "speechSynthesis" in window &&
      tabs[activeTab].voice &&
      activeFollowUp === null
    ) {
      window.speechSynthesis.cancel(); // Stop any previous speech
      const utter = new window.SpeechSynthesisUtterance(tabs[activeTab].voice);
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
