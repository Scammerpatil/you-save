"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { IconBookmark, IconChartBar } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthProvider";
import axios from "axios";

const DashboardPage = () => {
  const [analytics, setAnalytics] = useState({
    totalLinks: 0,
    weeklyLinks: {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    },
    platformStats: {},
  });

  const { user } = useAuth();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("/api/analytics");
        setAnalytics(res.data.data); // Ensure correct path
      } catch (error) {
        console.error("Error fetching analytics", error);
      }
    };
    fetchAnalytics();
  }, []);

  // Convert weeklyLinks object into array format for chart
  const barChartData = Object.entries(analytics.weeklyLinks).map(
    ([day, count]) => ({
      day: day.slice(0, 3), // "Monday" -> "Mon"
      links: count,
    })
  );

  // Convert platformStats object into array format for pie chart
  const pieChartData = Object.entries(analytics.platformStats).map(
    ([platform, value]) => ({
      name: platform.charAt(0).toUpperCase() + platform.slice(1), // "youtube" -> "YouTube"
      value,
    })
  );

  // Get DaisyUI colors dynamically
  const COLORS = ["#FF5733", "#33FF57", "#337BFF", "#F3FF33"];

  return (
    <>
      <h1 className="text-4xl font-bold text-center uppercase">Dashboard</h1>

      <div className="stats shadow w-full bg-base-300 mt-6">
        <div className="stat">
          <div className="stat-figure text-primary">
            <IconBookmark size={32} className="text-primary" />
          </div>
          <div className="stat-title">Total Links Saved</div>
          <div className="stat-value text-primary">{analytics.totalLinks}</div>
          <div className="stat-desc">Save More</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <IconChartBar size={32} className="text-success" />
          </div>
          <div className="stat-title">Links Saved This Week</div>
          <div className="stat-value text-secondary">
            {Object.values(analytics.weeklyLinks).reduce((a, b) => a + b, 0)}
          </div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src={user?.profileImage} alt="User Profile" />
              </div>
            </div>
          </div>
          <div className="stat-value text-error">
            {pieChartData.length > 0 ? pieChartData[0].name : "N/A"}
          </div>
          <div className="stat-title">Top Platform</div>
          <div className="stat-desc text-secondary">
            {pieChartData.length > 0 ? pieChartData[0].name : "No Data"}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Bar Chart */}
        <div className="p-6 shadow-md bg-base-300">
          <h2 className="text-xl font-semibold mb-4">Links Saved This Week</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barChartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="links" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="p-6 bg-base-300">
          <h2 className="text-xl font-semibold mb-4">Platforms Used</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="currentColor"
                dataKey="value"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
