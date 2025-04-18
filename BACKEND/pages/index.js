import Head from "next/head";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { IoHome } from "react-icons/io5";
import { useState, useEffect } from "react";
import LoginLayout from "@/components/LoginLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [blogsData, setBlogsData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, projectsRes, shopsRes, coursesRes] = await Promise.all([
          fetch("/api/blogs"),
          fetch("/api/projects"),
          fetch("/api/shops"),
          fetch("/api/courses"),
        ]);

        const blogs = await blogsRes.json();
        const projects = await projectsRes.json();
        const shops = await shopsRes.json();
        const courses = await coursesRes.json();

        setBlogsData(blogs);
        setProjectData(projects);
        setShopData(shops);
        setCoursesData(courses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateRandomColor = () =>
    `rgba(${Math.floor(Math.random() * 256)}, 
          ${Math.floor(Math.random() * 256)}, 
          ${Math.floor(Math.random() * 256)}, 
          ${(Math.random()).toFixed(2)})`;

  // Aggregate Monthly Data
  const aggregateDataByMonth = (data) =>
    data
      .filter((dat) => dat.status === "Published" && dat.createdAt)
      .reduce((acc, item) => {
        const createdAt = new Date(item.createdAt);
        const year = createdAt.getFullYear();
        const month = createdAt.getMonth();

        if (!acc[year]) acc[year] = Array(12).fill(0);
        acc[year][month]++;
        return acc;
      }, {});

  const monthlyBlogData = aggregateDataByMonth(blogsData);
  const monthlyProjectData = aggregateDataByMonth(projectData);
  const monthlyShopData = aggregateDataByMonth(shopData);
  const monthlyCoursesData = aggregateDataByMonth(coursesData);

  const currentYear = new Date().getFullYear();
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const createDataset = (label, data, color) => ({
    label,
    data: data[currentYear] || Array(12).fill(0),
    backgroundColor: color,
  });

  // Prepare Datasets
  const datasets = [
    createDataset("Blogs", monthlyBlogData, "rgba(255, 99, 132, 0.6)"),
    createDataset("Projects", monthlyProjectData, "rgba(54, 162, 235, 0.6)"),
    createDataset("Courses", monthlyCoursesData, "rgba(255, 206, 86, 0.6)"),
    createDataset("Certifications", monthlyShopData, "rgba(75, 192, 192, 0.6)"),
  ];

  // Chart Data
  const barData = { labels, datasets };
  const lineData = { labels, datasets };
  const pieData = {
    labels: ["Blogs", "Projects", "Courses", "Certifications"],
    datasets: [
      {
        data: [
          blogsData.filter((dat) => dat.status === "Published").length,
          projectData.filter((dat) => dat.status === "Published").length,
          coursesData.filter((dat) => dat.status === "Published").length,
          shopData.filter((dat) => dat.status === "Published").length,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };
  const doughnutData = {
    labels: ["Published", "Draft"],
    datasets: [
      {
        data: [
          blogsData.filter((b) => b.status === "Published").length,
          blogsData.filter((b) => b.status === "Draft").length,
        ],
        backgroundColor: ["#2ECC71", "#E74C3C"],
      },
    ],
  };

  return (
    <LoginLayout>
      <Head>
        <title>Portfolio Backend</title>
      </Head>

      <div style={{ padding: "20px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
          Admin <span style={{ color: "#3498db" }}> Dashboard </span>
        </h2>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          {[
            { label: "Total Blog", count: blogsData.filter((dat) => dat.status === "Published").length },
            { label: "Total Projects", count: projectData.filter((dat) => dat.status === "Published").length },
            { label: "Total Courses", count: coursesData.filter((dat) => dat.status === "Published").length },
            { label: "Total Certifications", count: shopData.filter((dat) => dat.status === "Published").length },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                width: "22%",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>{item.label}</h2>
              <span style={{ fontSize: "24px", fontWeight: "bold", color: "#3498db" }}>{item.count}</span>
            </div>
          ))}
        </div>

        {/* Graphs Section */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          <div style={{ width: "45%" }}>
            <h3>Yearly Overview (Bar Chart)</h3>
            <Bar data={barData} />
          </div>

          <div style={{ width: "45%" }}>
            <h3>Monthly Trends (Line Chart)</h3>
            <Line data={lineData} />
          </div>

          <div style={{ width: "45%" }}>
            <h3>Overall Distribution (Pie Chart)</h3>
            <Pie data={pieData} />
          </div>

          <div style={{ width: "45%" }}>
            <h3>Blog Status (Doughnut Chart)</h3>
            <Doughnut data={doughnutData} />
          </div>
        </div>
      </div>
    </LoginLayout>
  );
}
