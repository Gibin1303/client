import React, { useCallback, useEffect, useState } from "react";
import { dummyAttendanceData } from "../assets/assets";
import CheckInButton from "../components/attendance/CheckInButton";
import AttendanceStatus from "../components/attendance/AttendanceStatus";
import AttendanceHistory from "../components/attendance/AttendanceHistory";

const Attebdance = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback(async () => {
    setHistory(dummyAttendanceData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;

  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayRecord = history.find(
    (r) => new Date(r.date).toDateString() === today.toDateString(),
  );
 
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Attendance</h1>
        <p className="page-subtitle">
          Track your work hours and daily check-in
        </p>
      </div>
      {isDeleted ? <div className="mb-6 p-6 bg-rose-50 border-rose-200 rounded-2xl text-center">
        <p className="text-rose-200">You can no longer cock in or out because your employee records have been marked as deleted </p>
      </div> : <div className="mb-8"><CheckInButton todayRecord={todayRecord} onAction={fetchData}/></div>}
      <AttendanceStatus history={history}/>
      <AttendanceHistory history={history}/>
    </div>
  );
};

export default Attebdance;
