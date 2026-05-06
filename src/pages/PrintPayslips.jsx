import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyPayslipData } from "../assets/assets";
import Loading from "../components/Loading";
import { format } from "date-fns";

const PrintPayslips = () => {
  const { id } = useParams();
  const [paySlip, setPayslip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPayslip(dummyPayslipData.find((slip) => slip._id === id));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) return <Loading />;
  if (!paySlip)
    return (
      <p className="text-slate-400 text-center py-12">Payslip not found</p>
    );
  return (
    <div className="max-w-2xl mx-auto p-8  bg-white animate-fade-in">
      <div className="text-center  border-b  border-slate-200  pb-6 mb-8 ">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Payslip
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {format(new Date(paySlip.year, paySlip.month - 1), "MMMM yyyy")}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">
            Employee Name
          </p>
          <p className="font-semibold text-slate-900">
            {paySlip.employee?.firstName} {paySlip.employee?.lastName}
          </p>
        </div>
        <div>
          <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">
            Position
          </p>
          <p className="font-semibold text-slate-900">
            {paySlip.employee?.position}
          </p>
        </div>
        <div>
          <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">
            Email
          </p>
          <p className="font-semibold text-slate-900">
            {paySlip.employee?.email}
          </p>
        </div>
        <div>
          <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">
            Period
          </p>
          <p className="font-semibold text-slate-900">
            {format(new Date(paySlip.year, paySlip.month - 1),"MMMM yyyy")}
          </p>
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 overflow-hidden mb-8">
        <table  className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="text-left py-3 px-4 text-xs text-slate-500 uppercase tracking-wider">Description</th>
              <th className=" text-right py-3 px-4 text-xs text-slate-500 uppercase">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-100">
               <td className="px-3 py-3 text-slate-700">Basic Salary</td>
               <td className="text-right py-3 px-4 text-slate-900 font-medium tracking-wider">${paySlip.basicSalary?.toLocaleString()}</td>
            </tr>

             <tr className="border-t border-slate-100">
               <td className="px-3 py-3 text-slate-700">Allowances</td>
               <td className="text-right py-3 px-4 text-slate-900 font-medium tracking-wider">+${paySlip.allowances?.toLocaleString()}</td>
            </tr>
             <tr className="border-t border-slate-100">
               <td className="px-3 py-3 text-slate-700">Deductions</td>
               <td className="text-right py-3 px-4 text-slate-900 font-medium tracking-wider">$-{paySlip.deductions?.toLocaleString()}</td>
            </tr>

             <tr className="border-t-2 border-slate-200 bg-slate-50">
               <td className="px-4 py-4 font-bold text-slate-900">Net Salary</td>
               <td className="text-right py-3 px-4 text-slate-900 font-medium tracking-wider">${paySlip.netSalary?.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center">
        <button className="btn-primary print:hidden cursor-pointer" onClick={()=>window.print()}>Print Payslip</button>
      </div>
    </div>
  );
};

export default PrintPayslips;
