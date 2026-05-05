import React, { useState } from "react";
import { getDayTypeDisplay, getWorkingHoursDisplay } from "../../assets/assets";
import { format } from "date-fns";
import { Check, Loader2, X } from "lucide-react";

const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null);

  const handleStatusUpdate = (id, status) => {
    setProcessing(id);
  };
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table-modern">
          <thead>
            <tr>
              {isAdmin && <th>Employee</th>}
              <th>Type</th>
              <th>Dates</th>
              <th>Reason</th>
              <th>Status</th>
              {isAdmin && <th className="text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 6 : 4}
                  className="text-center py-12  text-slate-400"
                >
                  No Leaves application found
                </td>
              </tr>
            ) : (
              leaves.map((leaves) => {
                return (
                  <tr
                    key={leaves._id || leaves.id}
                    className="cursor-pointer hover:animate-pulse"
                  >
                    {isAdmin && (
                      <td className="px-6 py-4 text-slate-900">
                        {leaves.employee?.firstName}
                        {leaves.employee?.lastName}
                      </td>
                    )}

                    <td className="px-6 py-4 text-slate-900">
                      <span className="badge text-slate-100 bg-slate-600">
                        {leaves.type}
                      </span>
                    </td>
                    <td className="text-xs text-slate-500">
                      {format(new Date(leaves.startDate), "MMM dd")} -{" "}
                        {format(new Date(leaves.endDate), "MMM dd, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-slate-900">
                      {leaves.reason}
                    </td>
                    <td className="px-6 py-7 text-slate-900">
                      <span
                        className={`badge ${leaves.status === "APPROVED" ? "badge-success" : leaves.status === "REJECTED" ? "badge-danger" : "badge-warning"}`}
                      >
                        {leaves.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4 text-slate-900">
                        {leaves.status === "PENDING" && (
                          <div className="flex justify-center gap-2">
                            <button onClick={()=>handleStatusUpdate(leaves.id || leaves._id, status="APPROVED")} 
                            disabled={!!processing} className="p-1.5 rounded-md bg-emerald-50  text-emerald-600 hover:bg-emerald-100  transition-colors">
                              {processing === (leaves._id || leaves.id) ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </button>

                            <button onClick={()=>handleStatusUpdate(leaves.id || leaves._id, status="REJECTED")}
                            disabled={!!processing} className="p-1.5 rounded-md bg-rose-50  text-rose-600 hover:bg-rose-100  transition-colors">
                              {processing === (leaves._id || leaves.id) ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;
