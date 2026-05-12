import React, { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import Loading from "../components/Loading";
import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslips from "../components/payslip/GeneratePayslips";
import api from "../api/axios";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

const Payslip = () => {
  const [paySlips, setPaySlips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";
  const fetchPaySlips = useCallback(async () => {
    // setPaySlips(dummyPayslipData);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);
    setLoading(true);
    try {
      const res = await api.get("payslips");
      // setPaySlips(Array.isArray(res.data) ? res.data : []);
      setPaySlips(res.data.data)
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaySlips();
  }, [fetchPaySlips]);

  useEffect(() => {
    if (isAdmin) api.get("/employees").then((res)=>setEmployees(res.data.filter((e)=>!e.isDeleted))).catch(()=>{})
  }, [isAdmin]);

  if (loading) return <Loading />;
  return (
    <div className="animate-fade-in ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Payslips</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Genaerate and manage employees payslips"
              : "Your payslip history"}
          </p>
        </div>
        {isAdmin && (
          <GeneratePayslips employees={employees} onSuccess={fetchPaySlips} />
        )}
      </div>
      <PayslipList payslips={paySlips} isAdmin={isAdmin} />
    </div>
  );
};

export default Payslip;
