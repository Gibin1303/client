import React, { useEffect, useState } from "react";
import {
  dummyAdminDashboardData,
  dummyEmployeeDashboardData,
} from "../assets/assets";
import Loading from "../components/Loading";
import EmployeeDashboard from "../components/EmployeeDashboard";
import AdminDahboard from "../components/AdminDahboard";
import api from "../api/axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setData(res.data))
      .catch((err) =>
        toast.error(err.response?.data?.data?.error || err.message),
      )
      .finally(() => setLoading(false));
  }, []);

  //   useEffect(() => {
  //   api
  //     .get("/dashboard")
  //     .then((res) => setData(res.data))
  //     .catch((err) =>
  //       toast.error(err.response?.data?.error || err.message)
  //     )
  //     .finally(() => setLoading(false));
  // }, []);

  console.log(data,"shjgdvgdgvd")

  if (loading) return <Loading />;
  if (!data)
    return (
      <p className="text-center text-slate-500 py-12">
        Failed to load Dashboard
      </p>
    );

  if (data.role === "ADMIN") {
    return <AdminDahboard data={data} />;
  } else {
    return <EmployeeDashboard data={data} />;
  }
};

export default Dashboard;
