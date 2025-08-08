import React, { useState } from 'react';
import './App.css';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Mock data for the charts
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'PREPAID ORDERS : PER CATEGORY',
      color: '#f0f0f0',
      font: {
        size: 16,
        family: "'Courier New', Courier, monospace",
      },
      align: 'start',
      padding: {
        bottom: 10,
      }
    },
    subtitle: {
        display: true,
        text: 'JULY VS JUNE',
        color: '#f0f0f0',
        font: {
            size: 12,
            family: "'Courier New', Courier, monospace",
        },
        align: 'end',
        padding: {
            bottom: 30,
        }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#f0f0f0',
      },
      grid: {
        color: 'rgba(240, 240, 240, 0.1)',
      },
    },
    y: {
      ticks: {
        color: '#f0f0f0',
      },
      grid: {
        color: 'rgba(240, 240, 240, 0.1)',
      },
    },
  },
};

const conversionFunnelData = {
  labels: ['Leads', 'Contacted', 'Demo', 'Won'],
  datasets: [
    {
      label: 'Conversion Funnel',
      data: [1000, 800, 500, 200],
      backgroundColor: '#f0f0f0',
      barThickness: 20,
    },
  ],
};

const revenueData = {
  labels: ['Cards', 'UPI', 'Netbanking', 'COD', 'Others'],
  datasets: [
    {
      label: 'Revenue',
      data: [4000, 3000, 2000, 1000, 500],
      backgroundColor: '#f0f0f0',
      barThickness: 20,
    },
  ],
};

const leadSourceData = {
  labels: ['Organic', 'Paid', 'Referral', 'Direct'],
  datasets: [
    {
      label: 'Lead Source',
      data: [400, 300, 200, 100],
      backgroundColor: '#f0f0f0',
      barThickness: 20,
    },
  ],
};

const marketingChannelData = {
    labels: ['Google Ads', 'Facebook', 'SEO', 'Email', 'Affiliates'],
    datasets: [
        {
            label: 'Marketing Channel Performance',
            data: [250, 200, 300, 150, 100],
            backgroundColor: '#f0f0f0',
            barThickness: 20,
        },
    ],
};

const dailyTrendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: 'Success Rate',
            data: [95, 96, 94, 97, 98, 96, 95],
            borderColor: '#8FBC8F',
            tension: 0.1,
        },
    ],
};

const paymentMethodSRData = {
    labels: ['Cards', 'UPI', 'Netbanking', 'COD'],
    datasets: [
        {
            label: 'Success Rate',
            data: [92, 98, 95, 99],
            backgroundColor: '#f0f0f0',
            barThickness: 20,
        },
    ],
};

const topRegionsData = {
    labels: ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Uttar Pradesh'],
    datasets: [
        {
            label: 'Sales',
            data: [50000, 45000, 40000, 35000, 30000],
            backgroundColor: '#f0f0f0',
            barThickness: 20,
        },
    ],
};

const topCustomersData = [
    { name: 'John Doe', purchases: 25 },
    { name: 'Jane Smith', purchases: 22 },
    { name: 'Peter Jones', purchases: 20 },
    { name: 'Mary Johnson', purchases: 18 },
    { name: 'David Williams', purchases: 15 },
    { name: 'Chris Brown', purchases: 14 },
    { name: 'Emily Davis', purchases: 12 },
    { name: 'Michael Miller', purchases: 11 },
    { name: 'Sarah Wilson', purchases: 10 },
    { name: 'James Taylor', purchases: 9 },
];

const topProductsData = [
    { name: 'Smartphone', sales: 1500 },
    { name: 'Laptop', sales: 1200 },
    { name: 'Headphones', sales: 1000 },
    { name: 'Smartwatch', sales: 800 },
    { name: 'Tablet', sales: 700 },
    { name: 'Camera', sales: 600 },
    { name: 'Gaming Console', sales: 500 },
    { name: 'Bluetooth Speaker', sales: 400 },
    { name: 'External Hard Drive', sales: 300 },
    { name: 'Wireless Mouse', sales: 200 },
];

const lowStockProductsData = [
    { name: 'Wireless Mouse', stock: 5 },
    { name: 'Bluetooth Speaker', stock: 8 },
    { name: 'External Hard Drive', stock: 10 },
];

const ValueDisplay = ({ value, label }) => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', textAlign: 'center' }}>
    <div style={{ fontSize: '3em', fontWeight: 'bold' }}>{value}</div>
    {label && <div style={{ fontSize: '1.5em', marginTop: '10px' }}>{label}</div>}
  </div>
);

const TableDisplay = ({ data, columns }) => (
    <table style={{ width: '100%', color: '#f0f0f0', borderCollapse: 'collapse' }}>
        <thead>
            <tr>
                {columns.map(col => <th key={col.key} style={{ borderBottom: '1px solid #555', padding: '10px', textAlign: 'left' }}>{col.title}</th>)}
            </tr>
        </thead>
        <tbody>
            {data.map((row, index) => (
                <tr key={index}>
                    {columns.map(col => <td key={col.key} style={{ borderBottom: '1px solid #555', padding: '10px' }}>{row[col.key]}</td>)}
                </tr>
            ))}
        </tbody>
    </table>
);

const Placeholder = ({ text }) => <ValueDisplay value={text || "Coming Soon"} />;

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
        <form onSubmit={handleSubmit} style={{ color: '#f0f0f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {fields.map(field => (
                <div key={field.name} style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        onChange={handleChange}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#2a2a2a', color: '#f0f0f0' }}
                    />
                </div>
            ))}
            <button type="submit" style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>
                {buttonText}
            </button>
        </form>
    );
};

const ConversionFunnelChart = () => <Bar data={conversionFunnelData} options={chartOptions} />;
const RevenueChart = () => <Bar data={revenueData} options={chartOptions} />;
const LeadSourceChart = () => <Bar data={leadSourceData} options={chartOptions} />;
const MarketingChannelChart = () => <Bar data={marketingChannelData} options={chartOptions} />;
const DailyTrendChart = () => <Line data={dailyTrendData} options={{ ...chartOptions, scales: { ...chartOptions.scales, y: { ...chartOptions.scales.y, beginAtZero: false } } }} />;
const PaymentMethodSRChart = () => <Bar data={paymentMethodSRData} options={chartOptions} />;
const TopRegionsChart = () => <Bar data={topRegionsData} options={chartOptions} />;

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const conversionRate = (conversionFunnelData.datasets[0].data[3] / conversionFunnelData.datasets[0].data[0]) * 100;

  const tabs = [
    { question: "What is my conversion funnel?", chart: <ConversionFunnelChart /> },
    { question: "How much revenue did I process through Cards/UPI/Netbanking/COD/Others?", chart: <RevenueChart /> },
    { question: "What is my conversion rate?", chart: <ValueDisplay value={`${conversionRate.toFixed(2)}%`} /> },
    { question: "What is the source of my leads?", chart: <LeadSourceChart /> },
    { question: "Can you provide marketing channel performance?", chart: <MarketingChannelChart /> },
    { question: "What is my ROAS?", chart: <ValueDisplay value={"4.5x"} /> },
    { question: "What is my SR?", chart: <ValueDisplay value={"85%"} /> },
    { question: "How many failed transactions did I have?", chart: <ValueDisplay value={"1,234"} /> },
    { question: "What is the daily trend for transaction success rates?", chart: <DailyTrendChart /> },
    { question: "What is the SR for different payment methods?", chart: <PaymentMethodSRChart /> },
    { question: "What is the breakdown of payment methods?", chart: <RevenueChart /> },
    { question: "How many orders were placed?", chart: <ValueDisplay value={"12,345"} /> },
    { question: "What are my net sales?", chart: <ValueDisplay value={"₹1,23,45,678"} /> },
    { question: "What are my prepaid sales?", chart: <ValueDisplay value={"₹1,00,00,000"} /> },
    { question: "What's the forecast for sales based on historical data?", chart: <Placeholder /> },
    { question: "What is AOV?", chart: <ValueDisplay value={"₹1,000"} /> },
    { question: "What is my GMV?", chart: <ValueDisplay value={"₹1,50,00,000"} /> },
    { question: "What are my COD sales?", chart: <ValueDisplay value={"₹23,45,678"} /> },
    { question: "How many orders did I receive this week compared to last week?", chart: <ValueDisplay value={"+15%"} label="vs Last Week" /> },
    { question: "What regions have the highest sales?", chart: <TopRegionsChart /> },
    { question: "Which regions are we gettign the most orders from?", chart: <TopRegionsChart /> },
    { question: "How many customers made a repeat purchase?", chart: <ValueDisplay value={"2,345"} /> },
    { question: "Identify my top 10 most loyal customers based on purchase frequency?", chart: <TableDisplay data={topCustomersData} columns={[{ key: 'name', title: 'Customer Name' }, { key: 'purchases', title: 'Purchases' }]} /> },
    { question: "How many new customers did I acquire?", chart: <ValueDisplay value={"1,234"} /> },
    { question: "Which payment gateway is performing best in terms of success rates this month?", chart: <ValueDisplay value={"Razorpay"} /> },
    { question: "How many abandoned carts did I have and what's their estimated value?", chart: <ValueDisplay value={"5,678"} label="Estimated Value: ₹56,78,000" /> },
    { question: "iOS/Android - Device specific data", chart: <Placeholder /> },
    { question: "What is my Avg. number of orders per customer in a given period", chart: <ValueDisplay value={"2.5"} /> },
    { question: "What are my top 10 most bought products?", chart: <TableDisplay data={topProductsData} columns={[{ key: 'name', title: 'Product Name' }, { key: 'sales', title: 'Sales' }]} /> },
    { question: "Which products are running low on stock?", chart: <TableDisplay data={lowStockProductsData} columns={[{ key: 'name', title: 'Product Name' }, { key: 'stock', title: 'Stock' }]} /> },
    { question: "What are my current shipping rules?", chart: <ValueDisplay value={"Standard Shipping: ₹50, Express Shipping: ₹100"} /> },
    { question: "Can you block COD for certain pincodes?", chart: <FormDisplay fields={[{ name: 'pincodes', label: 'Pincodes (comma-separated)', type: 'text' }]} buttonText="Block Pincodes" onSubmit={data => alert(`Blocked COD for pincodes: ${data.pincodes}`)} /> },
    { question: "Can you block COD for certain customer numbers/emails?", chart: <FormDisplay fields={[{ name: 'customers', label: 'Customer Numbers/Emails (comma-separated)', type: 'text' }]} buttonText="Block Customers" onSubmit={data => alert(`Blocked COD for customers: ${data.customers}`)} /> },
    { question: "What are the high risk pincodes?", chart: <ValueDisplay value={"110001, 400001, 560001"} /> },
    { question: "Create a shipping rule basis cart value", chart: <FormDisplay fields={[{ name: 'cartValue', label: 'Cart Value', type: 'number' }, { name: 'shippingCost', label: 'Shipping Cost', type: 'number' }]} buttonText="Create Rule" onSubmit={data => alert(`Created shipping rule: If cart value > ${data.cartValue}, shipping cost is ${data.shippingCost}`)} /> },
    { question: "Create a shipping rule basis product", chart: <FormDisplay fields={[{ name: 'product', label: 'Product', type: 'text' }, { name: 'shippingCost', label: 'Shipping Cost', type: 'number' }]} buttonText="Create Rule" onSubmit={data => alert(`Created shipping rule: For product ${data.product}, shipping cost is ${data.shippingCost}`)} /> },
    { question: "Create a shipping basis pincode/regions", chart: <FormDisplay fields={[{ name: 'pincodes', label: 'Pincodes/Regions (comma-separated)', type: 'text' }, { name: 'shippingCost', label: 'Shipping Cost', type: 'number' }]} buttonText="Create Rule" onSubmit={data => alert(`Created shipping rule: For pincodes ${data.pincodes}, shipping cost is ${data.shippingCost}`)} /> },
    { question: "Can you configure partial payment offer?", chart: <FormDisplay fields={[{ name: 'offerName', label: 'Offer Name', type: 'text' }, { name: 'percentage', label: 'Percentage', type: 'number' }]} buttonText="Configure Offer" onSubmit={data => alert(`Configured partial payment offer: ${data.offerName} at ${data.percentage}%`)} /> },
    { question: "Can you create a static offer for UPI?", chart: <FormDisplay fields={[{ name: 'offerName', label: 'Offer Name', type: 'text' }, { name: 'discount', label: 'Discount', type: 'number' }]} buttonText="Create Offer" onSubmit={data => alert(`Created static offer for UPI: ${data.offerName} with a discount of ${data.discount}`)} /> },
    { question: "What was my sales growth year-over-year?", chart: <ValueDisplay value={"+25%"} label="vs Last Year" /> },
    { question: "What are my order details for XYZ order", chart: <ValueDisplay value={"Order XYZ: 2 items, ₹2,500"} /> },
    { question: "What are my details for XYZ Transaction", chart: <ValueDisplay value={"Transaction XYZ: Success, ₹2,500"} /> },
    { question: "Can you provide order analytics for the currently configured offers?", chart: <ValueDisplay value={"Offer 'DIWALI10' used 500 times, AOV: ₹1,200"} /> },
    { question: "Can you initiate a refund basis order ID XYZ (Can be platform/breeze)", chart: <FormDisplay fields={[{ name: 'orderId', label: 'Order ID', type: 'text' }]} buttonText="Initiate Refund" onSubmit={data => alert(`Refund initiated for order ID: ${data.orderId}`)} /> },
    { question: "What are my refund analytics for the past 5 days?", chart: <ValueDisplay value={"123 Refunds, Total: ₹1,23,000"} /> },
    { question: "Can you bifurcate sales/SR basis payment method. Provide more analytics like debit card, VPA, QR code", chart: <Placeholder /> },
    { question: "Can you help with configuring Custom Payment Options for me?", chart: <FormDisplay fields={[{ name: 'optionName', label: 'Option Name', type: 'text' }]} buttonText="Configure" onSubmit={data => alert(`Configured custom payment option: ${data.optionName}`)} /> },
    { question: "Can you please change the breeze checkout button skinning/colour?", chart: <FormDisplay fields={[{ name: 'color', label: 'Color', type: 'text' }]} buttonText="Change Color" onSubmit={data => alert(`Changed checkout button color to: ${data.color}`)} /> },
    { question: "How many people applied my offer XYZ during checkout? (Give as a percentage of total orders)", chart: <ValueDisplay value={"15%"} /> },
    { question: "How many carts used offers?", chart: <ValueDisplay value={"3,456"} /> },
    { question: "How does offer affect their AOV and likelihood to purchase again?", chart: <ValueDisplay value={"AOV with offer: ₹1,200, without: ₹1,000"} /> },
    { question: "What is our Average Order Value (AOV) for first-time customers versus returning customers in the last quarter?", chart: <ValueDisplay value={"First-time: ₹900, Returning: ₹1,100"} /> },
    { question: "Can you disable PayU as a PG", chart: <FormDisplay fields={[]} buttonText="Disable PayU" onSubmit={() => alert('PayU has been disabled.')} /> },
    { question: "What were the peak sales hours?", chart: <ValueDisplay value={"6 PM - 9 PM"} /> },
    { question: "Can you configure Surcharge on COD?", chart: <FormDisplay fields={[{ name: 'surcharge', label: 'Surcharge (%)', type: 'number' }]} buttonText="Configure Surcharge" onSubmit={data => alert(`Configured COD surcharge of ${data.surcharge}%`)} /> },
    { question: "What is the average sell through rate of the products?", chart: <ValueDisplay value={"75%"} /> },
    { question: "What products have the highest sell through rate?", chart: <ValueDisplay value={"Smartphone, Laptop"} /> },
    { question: "Which landing page is most visited by users first?", chart: <ValueDisplay value={"Homepage"} /> },
    { question: "How many orders were serviced through Standard, Express or any other shipping method?", chart: <ValueDisplay value={"Standard: 10,000, Express: 2,345"} /> },
    { question: "How many products do I currently have in my store? Active/inactive?", chart: <ValueDisplay value={"Active: 500, Inactive: 50"} /> },
    { question: "How many of my orders are fulfilled? How many unfullfilled? How many partially fulfilled?", chart: <ValueDisplay value={"Fulfilled: 11,000, Unfulfilled: 1,000, Partially: 345"} /> },
    { question: "What has been the reach and impact of my campaigns?", chart: <ValueDisplay value={"Reach: 1M, Impact: 10,000 conversions"} /> },
    { question: "Can you comment on the effectives of campaign XYZ?", chart: <ValueDisplay value={"Campaign XYZ had a ROAS of 5x"} /> },
    { question: "Which is the best performing adset?", chart: <ValueDisplay value={"Adset 'Summer Sale'"} /> },
    { question: "How much amount have I spent on the ads?", chart: <ValueDisplay value={"₹5,00,000"} /> },
    { question: "How many campaigns did I run in the last 6 months?", chart: <ValueDisplay value={"12"} /> },
    { question: "Which campaign has the highest spend but lowest ROAS?", chart: <ValueDisplay value={"Campaign 'Winter Sale'"} /> },
    { question: "Show me the checkout behavior of customers who came from our Instagram ads versus those from Google Search", chart: <Placeholder /> },
    { question: "Are new users converting better or returning users?", chart: <ValueDisplay value={"Returning users convert 2x better"} /> },
    { question: "What time of day are ads converting best?", chart: <ValueDisplay value={"8 PM - 10 PM"} /> },
    { question: "Suggest the top 3 performing campaigns I should scale.", chart: <ValueDisplay value={"Summer Sale, Diwali Dhamaka, New Year Bonanza"} /> },
    { question: "Compare Google vs Meta performance last 7 days", chart: <ValueDisplay value={"Google ROAS: 4x, Meta ROAS: 3.5x"} /> },
    { question: "What is my CAC through ad campaign", chart: <ValueDisplay value={"₹500"} /> },
    { question: "Get me the details of my campaigns in breeze, which are live and what are they?", chart: <ValueDisplay value={"Live campaigns: Summer Sale, Monsoon Magic"} /> },
    { question: "Enable/Disable the payment method for a specific payment gateway.", chart: <FormDisplay fields={[{ name: 'paymentMethod', label: 'Payment Method', type: 'text' }, { name: 'gateway', label: 'Payment Gateway', type: 'text' }, { name: 'action', label: 'Enable/Disable', type: 'text' }]} buttonText="Submit" onSubmit={data => alert(`${data.action}d ${data.paymentMethod} for ${data.gateway}`)} /> },
  ];

  return (
    <div className="dashboard-container">
      <div className="left-panel">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`question ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            <h2>{tab.question}</h2>
          </div>
        ))}
      </div>
      <div className="right-panel">
        <div className="chart-container">
          {tabs[activeTab].chart}
        </div>
      </div>
    </div>
  );
}

export default App;
