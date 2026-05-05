import React, { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import Loading from "../components/Loading";
import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslips from "../components/payslip/GeneratePayslips";

const Payslip = () => {
  const [paySlips, setPaySlips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = true;
  const fetchPaySlips = useCallback(() => {
    setPaySlips(dummyPayslipData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchPaySlips();
  }, [fetchPaySlips]);

  useEffect(() => {
    if (isAdmin) setEmployees(dummyEmployeeData);
  }, [isAdmin]);

  if (loading) return <Loading />;
  return (
    <div className="animate-fade-in ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Payslips</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Genaerate and mange employees payslips"
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
