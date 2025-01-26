import { useNavigate } from "react-router";
import API from "../../api/api";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register chart elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Card = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [], // Initialize labels to an empty array
    datasets: [] // Initialize datasets to an empty array
  });

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await API.get("/complaint/getAllComplaints");
        const complaints = response.data.complaints;

        // Initialize counts
        const pending = complaints.filter((c) => c.status === "pending").length;
        const resolved = complaints.filter((c) => c.status === "closed").length;
        const total = pending + resolved;

        setPendingCount(pending);
        setResolvedCount(resolved);
        setTotalCount(total);

        // Prepare data for chart
        const groupedByDate = complaints.reduce((acc, c) => {
          const date = new Date(c.createdAt).toLocaleDateString();
          if (!acc[date]) acc[date] = { total: 0, pending: 0, resolved: 0 };
          acc[date].total += 1;
          if (c.status === "pending") acc[date].pending += 1;
          if (c.status === "closed") acc[date].resolved += 1;
          return acc;
        }, {});

        // Convert grouped data into chart-friendly format
        const dates = Object.keys(groupedByDate);
        const totalComplaints = dates.map(date => groupedByDate[date].total);
        const pendingComplaints = dates.map(date => groupedByDate[date].pending);
        const resolvedComplaints = dates.map(date => groupedByDate[date].resolved);

        // Set chart data
        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Complaints Submitted',
              data: totalComplaints,
              borderColor: 'blue',
              backgroundColor: 'rgba(0, 0, 255, 0.1)',
              fill: true,
            },
            {
              label: 'Pending Complaints',
              data: pendingComplaints,
              borderColor: 'orange',
              backgroundColor: 'rgba(255, 165, 0, 0.1)',
              fill: true,
            },
            {
              label: 'Resolved Complaints',
              data: resolvedComplaints,
              borderColor: 'green',
              backgroundColor: 'rgba(0, 128, 0, 0.1)',
              fill: true,
            }
          ]
        });
      } catch (error) {
        console.error("Error fetching complaints:", error.response?.data?.message || error.message);
      }
    };

    fetchComplaints();
  }, []);

  const nav = useNavigate();
  const view = () => {
    nav("/browse/complaints");
  };

  const cards = [
    { title: "Complaints Submitted", description: `${totalCount}`, button: "View All" },
    { title: "Pending Complaints", description: `${pendingCount}`, button: "View All" },
    { title: "Resolved Complaints", description: `${resolvedCount}`, button: "View All" },
  ];

  return (
    <div style={{ transform: "translate(22% ,10%)" }} className="grid grid-cols-1 sm:grid-cols-4 gap-3 ">
      {cards.map((card, index) => (
        <div key={index} className="p-4 bg-gray-200 shadow rounded-lg">
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <p className="text-lg font-bold text-gray-900">{card.description}</p>
          <button className="mt-4 text-blue-500 font-medium" onClick={view}>
            {card.button}
          </button>
        </div>
      ))}

      {/* Chart for complaints over time */}
      <div className="col-span-1 sm:col-span-4 mt-6 p-4 bg-gray-200 shadow rounded-lg graph-card">
        <h3 className="text-lg font-semibold mb-4">Complaints Over Time</h3>
        <Line 
          data={chartData}
          options={{
            scales: {
              y: {
                min: 0,
                max: 10,  // Adjust to a value based on your data
                ticks: {
                  stepSize: 1,  // Adjust for whole numbers on y-axis
                }
              },
              x: {
                ticks: {
                  autoSkip: true,
                  maxRotation: 90,
                  minRotation: 45,
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Card;
