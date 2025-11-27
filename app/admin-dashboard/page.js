'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Download, X, CheckCircle, XCircle, Eye, LogOut, Loader2 } from 'lucide-react';
import { da } from 'zod/v4/locales';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const router = useRouter();

 
  const mapStatus = (status) => {
    if (status === 'pending') return 'requests';
    if (status === 'approved') return 'verified';
    if (status === 'rejected') return 'rejected';
    return 'requests';
  };


  const fetchRegistrations = async (pageNum = page, pageLimit = limit) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/registration?page=${pageNum}&limit=${pageLimit}`);
      const data = await response.json();

      if (data.success && data.data) {
        const mappedCandidates = data.data.map(reg => ({
          id: reg._id,
          firstName: reg.firstName,
          lastName: reg.lastName,
          fatherName: reg.fatherName,
          email: reg.email,
          mobile: reg.mobile,
          state: reg.state,
          district: reg.district,
          aadharFile: reg.aadharCardUrl,
          terms: reg.termsAccepted,
          status: mapStatus(reg.status),
          createdAt: reg.createdAt
        }));
        setCandidates(mappedCandidates);
        setTotal(data.total || 0);
        setPage(data.page || 1);
        setLimit(data.limit || 10);
      } else {
        console.error('Failed to fetch registrations:', data.message);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      fetchRegistrations(page, limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, page, limit]);
  // Pagination controls
  const totalPages = Math.ceil(total / limit);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    router.push('/login');
  };

  const handleAccept = async (id, email, firstName) => {
    try {
      setActionLoading(prev => ({ ...prev, [id]: 'accept' }));
      const response = await fetch(`/api/registration/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });
      const data = await response.json();
      if (data.success) {
        setCandidates(prev => prev.map(candidate => 
          candidate.id === id 
            ? { ...candidate, status: 'verified' }
            : candidate
        ));
        // Send accepted mail
        await fetch('/api/registration/send-status-mail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, status: 'approved', firstName: data.firstName})
        });
      } else {
        alert(data.message || 'Failed to approve registration');
      }
    } catch (error) {
      console.error('Error approving registration:', error);
      alert('Failed to approve registration. Please try again.');
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: null }));
    }
  };

  const handleReject = async (id, email,firstName) => {
    try {
      setActionLoading(prev => ({ ...prev, [id]: 'reject' }));
      const response = await fetch(`/api/registration/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });
      const data = await response.json();
      if (data.success) {
        setCandidates(prev => prev.map(candidate => 
          candidate.id === id 
            ? { ...candidate, status: 'rejected' }
            : candidate
        ));
        // Send rejected mail
        await fetch('/api/registration/send-status-mail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, status: 'rejected', firstName: data.firstName })
        });
      } else {
        alert(data.message || 'Failed to reject registration');
      }
    } catch (error) {
      console.error('Error rejecting registration:', error);
      alert('Failed to reject registration. Please try again.');
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: null }));
    }
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesTab = candidate.status === activeTab;
    const matchesSearch = 
      candidate.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.mobile?.includes(searchTerm);
    const matchesState = !filterState || candidate.state === filterState;
    
    return matchesTab && matchesSearch && matchesState;
  });

  const downloadAadhar = (imageUrl, fileName) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName || 'aadhar-card.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const states = [...new Set(candidates.map(candidate => candidate.state))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-[#29066d] font-main">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-sm font-sub">
                Canvi Premier Kabaddi League
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-sub"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toggle Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { key: 'requests', label: 'Registration Requests', count: candidates.filter(c => c.status === 'requests').length },
            { key: 'verified', label: 'Verified Candidates', count: candidates.filter(c => c.status === 'verified').length },
            { key: 'rejected', label: 'Rejected Candidates', count: candidates.filter(c => c.status === 'rejected').length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all font-sub ${
                activeTab === tab.key
                  ? 'bg-[#29066d] text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-[#29066d] hover:text-[#29066d]'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === tab.key
                  ? 'bg-white text-[#29066d]'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29066d] focus:border-transparent font-sub"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#29066d] focus:border-transparent font-sub"
              >
                <option value="">All States</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sub">
                    Candidate Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sub">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sub">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sub">
                    Aadhar Card
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sub">
                    Terms
                  </th>
                  {activeTab === 'requests' && (
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-sub">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={activeTab === 'requests' ? 7 : 6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="w-8 h-8 animate-spin text-[#29066d]" />
                        <p className="text-gray-500 font-sub">Loading registrations...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredCandidates.length === 0 ? (
                  <tr>
                    <td colSpan={activeTab === 'requests' ? 7 : 6} className="px-6 py-12 text-center">
                      <div className="text-gray-400 text-lg font-sub">No candidates found</div>
                      <p className="text-gray-500 text-sm mt-2 font-sub">
                        {searchTerm || filterState 
                          ? 'Try adjusting your search or filter criteria' 
                          : `No ${activeTab} candidates available`}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 font-sub">
                            {candidate.firstName} {candidate.lastName}
                          </div>
                          <div className="text-sm text-gray-500 font-sub">
                            Father: {candidate.fatherName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-sub">{candidate.email}</div>
                        <div className="text-sm text-gray-500 font-sub">{candidate.mobile}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-sub">{candidate.state}</div>
                        <div className="text-sm text-gray-500 font-sub">{candidate.district}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img
                            src={candidate.aadharFile}
                            alt="Aadhar Card"
                            className="w-12 h-8 object-cover rounded border border-gray-300 cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setSelectedImage(candidate.aadharFile)}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150x100?text=Image+Not+Found';
                            }}
                          />
                          <button
                            onClick={() => downloadAadhar(candidate.aadharFile, `aadhar-${candidate.firstName}-${candidate.lastName}.jpg`)}
                            className="text-gray-400 hover:text-[#29066d] transition-colors"
                            title="Download Aadhar"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          candidate.terms 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        } font-sub`}>
                          {candidate.terms ? 'Agreed' : 'Not Agreed'}
                        </span>
                      </td>
                      {activeTab === 'requests' && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAccept(candidate.id, candidate.email, candidate.firstName)}
                              disabled={actionLoading[candidate.id] === 'accept'}
                              className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-xs font-sub disabled:bg-green-400 disabled:cursor-not-allowed"
                            >
                              {actionLoading[candidate.id] === 'accept' ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <CheckCircle className="w-3 h-3" />
                              )}
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(candidate.id, candidate.email, candidate.firstName)}
                              disabled={actionLoading[candidate.id] === 'reject'}
                              className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors text-xs font-sub disabled:bg-red-400 disabled:cursor-not-allowed"
                            >
                              {actionLoading[candidate.id] === 'reject' ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <XCircle className="w-3 h-3" />
                              )}
                              Reject
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="font-sub text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages || totalPages === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 font-sub">
                Aadhar Card Preview
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadAadhar(selectedImage, 'aadhar-card.jpg')}
                  className="flex items-center gap-1 bg-[#29066d] text-white px-3 py-1 rounded-lg hover:bg-[#180444] transition-colors text-sm font-sub"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-4 flex justify-center">
              <img
                src={selectedImage}
                alt="Aadhar Card Preview"
                className="max-w-full max-h-[70vh] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;