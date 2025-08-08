import React, { useState } from 'react';
import './App.css';
import { Bar, Pie } from 'react-chartjs-2';
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

const ValueDisplay = ({ value }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '3em', fontWeight: 'bold' }}>
    {value}
  </div>
);

const ConversionFunnelChart = () => <Bar data={conversionFunnelData} options={chartOptions} />;
const RevenueChart = () => <Bar data={revenueData} options={chartOptions} />;
const LeadSourceChart = () => <Bar data={leadSourceData} options={chartOptions} />;
const MarketingChannelChart = () => <Bar data={marketingChannelData} options={chartOptions} />;

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const conversionRate = (conversionFunnelData.datasets[0].data[3] / conversionFunnelData.datasets[0].data[0]) * 100;

  const tabs = [
    {
      question: "What is my conversion funnel?",
      chart: <ConversionFunnelChart />
    },
    {
      question: "How much revenue did I process through Cards/UPI/Netbanking/COD/Others?",
      chart: <RevenueChart />
    },
    {
      question: "What is my conversion rate?",
      chart: <ValueDisplay value={`${conversionRate.toFixed(2)}%`} />
    },
    {
      question: "What is the source of my leads?",
      chart: <LeadSourceChart />
    },
    {
        question: "Can you provide marketing channel performance?",
        chart: <MarketingChannelChart />
    },
    {
      question: "What is my ROAS?",
      chart: <ValueDisplay value={"4.5x"} />
    },
    {
      question: "What is my SR?",
      chart: <ValueDisplay value={"85%"} />
    },
    {
      question: "How many failed transactions did I have?",
      chart: <ValueDisplay value={"1,234"} />
    }
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
