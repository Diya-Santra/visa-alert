import React from 'react';

const AlertTable = ({ alerts, loading, onStatusUpdate, onDelete }) => {

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-blue-600"></div>
                <span className="mt-3 text-sm text-slate-400 font-medium">Loading data...</span>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-200">
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors">
                            <div className="flex items-center">ID</div>
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors">
                            <div className="flex items-center">Country</div>
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors">
                            <div className="flex items-center">Visa Type</div>
                        </th>
                        <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center cursor-pointer hover:bg-slate-50 transition-colors">
                            <div className="flex items-center justify-center">Status</div>
                        </th>
                        <th className="px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {alerts.length > 0 ? (
                        alerts.map((alert) => (
                            <tr key={alert.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                                <td className="px-6 py-5 text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                                    #{alert.id}
                                </td>
                                <td className="px-6 py-5 text-sm text-slate-700 font-medium">{alert.country}</td>
                                <td className="px-6 py-5 text-sm text-slate-600">{alert.visaType}</td>
                                <td className="px-4 py-5 text-center">
                                    <div className="relative group/status max-w-[110px] mx-auto">
                                        <select
                                            value={alert.status}
                                            onChange={(e) => onStatusUpdate(alert.id, e.target.value)}
                                            className={`
                        appearance-none w-full pl-7 pr-7 py-1.5 rounded-full text-xs font-semibold cursor-pointer outline-none transition-all duration-200 border
                        ${alert.status === 'Active' || alert.status === 'Booked'
                                                    ? 'bg-green-50 text-green-700 border-green-200 hover:border-green-300 focus:ring-2 focus:ring-green-500/20'
                                                    : 'bg-red-50 text-red-700 border-red-200 hover:border-red-300 focus:ring-2 focus:ring-red-500/20'}
                      `}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Booked">Booked</option>
                                            <option value="Expired">Expired</option>
                                        </select>

                                        {/* Status Indicator Dot */}
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <span className={`block w-1.5 h-1.5 rounded-full ${alert.status === 'Active' || alert.status === 'Booked' ? 'bg-green-600' : 'bg-red-600'
                                                }`}></span>
                                        </div>

                                        {/* Custom Dropdown Arrow */}
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-50">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-5 text-center">
                                    <button
                                        onClick={() => onDelete(alert.id)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 group"
                                        title="Delete Alert"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="px-6 py-16 text-center text-slate-400">
                                <p className="text-sm">No alerts found in the database.</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AlertTable;
