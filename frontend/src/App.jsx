import React, { useState, useEffect } from 'react';
import AlertTable from './components/AlertTable';
import CreateAlertModal from './components/CreateAlertModal';

const App = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 7;

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/alerts`);
      const data = await response.json();
      if (data.success) {
        setAlerts(data.alerts);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = alerts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(alerts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCreateAlert = async (newAlert) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAlert),
      });
      const data = await response.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchAlerts();
      }
    } catch (error) {
      console.error('Error creating alert:', error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setAlerts(alerts.map(alert =>
        alert.id === id ? { ...alert, status: newStatus } : alert
      ));

      const response = await fetch(`${import.meta.env.VITE_API_URL}/alerts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (!data.success) {
        // Revert if failed
        fetchAlerts();
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      fetchAlerts();
    }
  };

  const handleDeleteAlert = async (id) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/alerts/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          fetchAlerts();
        }
      } catch (error) {
        console.error('Error deleting alert:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex justify-center py-16 px-4 md:px-0">
      <div className="w-full max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between px-1">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Alerts Dashboard</h1>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="hidden md:inline-flex items-center px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium ring-1 ring-inset ring-blue-700/10">
              Live Data
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create
            </button>
          </div>
        </div>


        <div className="bg-white rounded-xl card-shadow border border-slate-200 overflow-hidden">
          <AlertTable
            alerts={currentItems}
            loading={loading}
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDeleteAlert}
          />


          {!loading && totalPages > 1 && (
            <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-4 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Showing <span className="text-slate-900">{indexOfFirstItem + 1}</span> to <span className="text-slate-900">{Math.min(indexOfLastItem, alerts.length)}</span> of <span className="text-slate-900">{alerts.length}</span> results
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:hover:bg-white transition-all shadow-sm"
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium transition-all ${currentPage === i + 1
                        ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-600'
                        : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:ring-1 hover:ring-slate-200'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:hover:bg-white transition-all shadow-sm"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
        <CreateAlertModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateAlert}
        />
      </div>
    </div>
  );
};

export default App;
