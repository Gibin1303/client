import { Loader2, PlusIcon, X } from "lucide-react";
import React, { useState } from "react";

const GeneratePayslips = ({ employees, onSuccess }) => {
  const [open, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center gap-2"
      >
        <PlusIcon className="w-4 h-4" /> Generate Payslips
      </button>
    );

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="card max-w-lg w-full p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Generate Monthly Payslips
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 bg-slate-200 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            {/* select employee */}
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Employee
            </label>
            <select name="employeeId" required>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.firstName} {e.lastName} ({e.position})
                </option>
              ))}
            </select>
          </div>
          {/* month and year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Month
              </label>
              <select name="month" required>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Year
              </label>
              <input
                type="number"
                name="year"
                defaultValue={new Date().getFullYear()}
              />
            </div>
          </div>
          {/* Basic salary */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Basic salary
            </label>
            <input
              type="number"
              name="basicSalary"
              required
              placeholder="5000"
            />
          </div>
          {/* Allowences and deductions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Allowances
              </label>
              <input type="number" name="allowances" defaultValue="0" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Deductions
              </label>
              <input type="number" name="deductions" defaultValue="0" />
            </div>
          </div>
          {/* buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="btn-primary flex items-center"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneratePayslips;
