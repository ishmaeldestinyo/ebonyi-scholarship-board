import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditIcon, Menu, X, SearchXIcon, StopCircleIcon } from 'lucide-react';
import axiosInstance from '../api/axiosConfig';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import TopBar from './scholarship/TopBar';

const ApplicationStatus = {
  AWARDED: 'AWARDED',
  REJECTED: 'REJECTED',
  PROCESSING: 'PROCESSING',
};

export interface ApplicationType {
  _id: string;
  reference: string;
  fullname: string;
  lga: string;
  lga_means_of_id: string;
  contact_address?: string;
  course_of_study: string;
  present_qualification: string;
  qualiciation_desired: string;
  phone_number?: string;
  passport_photo: string;
  transcript?: string;
  statement_of_result?: string;
  next_of_kin?: {
    name: string;
    phone: string;
    relationship?: string;
  };
  status: 'AWARDED' | 'REJECTED' | 'PROCESSING';
  academic_session_performance?: {
    result: string;
    supervisor_comments: string;
    academic_session: string;
  }[];
  user_id?: {
    _id: string;
    role?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}


export interface UserType {
  _id: string;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  auth_token?: string;
  auth_expiry?: Date;
  auth_otp?: string;
  status: 'ACTIVE' | 'UNACTIVATED' | 'DISABLED';
  applications: string[]; // array of ObjectId strings
  role: 'ADMIN' | 'STAFF' | 'DEFAULT';
  createdAt: Date;
  updatedAt: Date;
}


function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance.get('/users/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Uncomment if using token
        }
      });
      setUser(response.data?.data);
    } catch (error) {
      toast.error('Session expired, please login again.');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const fetchApplications = async (page = 1) => {
    try {
      const res = await axiosInstance.get(`/scholarships?page=${page}&limit=10`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setApplications(res.data.data);
      setPage(res.data?.pagination?.page);
      setPages(res.data?.pagination?.pages);
    } catch (err) {
    }
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);


  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    try {
      const res = await axiosInstance.get(`/scholarships/search?q=${encodeURIComponent(searchTerm)}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setApplications(res.data.data);
      toast.success(`Found ${res.data.data.length} result(s)`);
    } catch (error) {
      toast.error('Search failed.');
    } finally {
      setIsSearching(false);
    }
  };

  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  const fetchCurrentSession = async () => {
    setIsSearching(true);
    try {
      const res = await axiosInstance.get(`/applications`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const session = res.data?.data;
      setCurrentSession(session);
      setIsScholarshipOpen(!!session); // true if session exists
    } catch (error) {
      setIsScholarshipOpen(false);
      toast.error('No active scholarship session');
    } finally {
      setIsSearching(false);
    }
  };



  useEffect(() => {
    fetchUserProfile();
    fetchApplications();
    fetchCurrentSession();
    setLoading(false);
  }, []);

  const goToPage = (newPage: any) => {
    fetchApplications(newPage);
  };

  

  return (
    <div className="p-6">
      <TopBar user={user} isScholarshipOpen={isScholarshipOpen} />

      <div className="md:flex justify-between items-center md:my-4 ">
        <h2 className="berlin-sans-normal text-gray-700 text-xl md:text-2xl">Your Applications</h2>

        <div className="flex items-center md:mt-0 my-3 gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name, reference, LGA, status..."
            className="px-3 py-2 border border-gray-300 rounded-md text-sm flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleSearch}
          >
            {isSearching ? (
              <span className="animate-spin">🔄</span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 10.35a6.3 6.3 0 11-12.6 0 6.3 6.3 0 0112.6 0z" />
              </svg>
            )}
          </Button>
        </div>
      </div>

      {applications && applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
          <SearchXIcon size={44} className="mb-2" />
          <p className="text-lg">No Applications Found</p>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto border rounded-md shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">#</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Fullname</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Reference</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">LGA</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Created At</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications && applications
                  .filter(app => {
                    const term = searchTerm.toLowerCase();
                    return (
                      app.fullname?.toLowerCase().includes(term) ||
                      app.lga?.toLowerCase().includes(term) ||
                      app.reference?.toLowerCase().includes(term) ||
                      app.status?.toLowerCase().includes(term) ||
                      app.lga?.toLowerCase().includes(term) // Only if app.lga exists
                    );
                  })
                  .map((app, index) => (

                    <tr key={app._id}>
                      <td className="px-4 py-2 text-sm">{(page - 1) * 10 + index + 1}</td>
                      <td className="px-4 py-2 text-sm font-medium text-blue-600 flex items-center gap-1">
                        <img src={app.passport_photo} alt="" className="w-7 h-7 rounded" />
                        <span className="">{app.fullname}</span>
                      </td>
                      <td className="px-4 py-2 text-sm font-medium text-blue-600">{app.reference}</td>
                      <td className="px-4 py-2 text-sm font-medium text-blue-600">{app.lga}</td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${app.status === ApplicationStatus.AWARDED ? 'bg-green-100 text-green-700' :
                          app.status === ApplicationStatus.REJECTED ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td className="px-4 py-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => navigate(`/applications/${app._id}`, { state: { data: app, role: user?.role } })}>View</Button>
                          {user && user?.role === "ADMIN" && (
                            <Select
                              onValueChange={async (newStatus) => {
                                try {
                                  const res = await axiosInstance.patch(`/scholarships/${app._id}/status`, {
                                    status: newStatus,
                                  }, {
                                    headers: {
                                      Authorization: `Bearer ${localStorage.getItem("token")}`
                                    }
                                  });

                                  toast.success(`Status updated to ${newStatus}`);

                                  setApplications((prev) =>
                                    prev.map((item) =>
                                      item._id === app._id ? { ...item, status: newStatus as ApplicationType['status'] } : item
                                    )
                                  );
                                } catch (err) {
                                  toast.error("Failed to update status");
                                }
                              }}
                            >

                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder={`${app.status}` || 'Review'} />

                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(ApplicationStatus).map(([key, value]) => (
                                  <SelectItem key={key} value={value}>{value}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">Page {page} of {pages}</p>
            <div className="flex gap-2">
              <Button size="sm" disabled={page <= 1} onClick={() => goToPage(page - 1)}>Previous</Button>
              <Button size="sm" disabled={page >= pages} onClick={() => goToPage(page + 1)}>Next</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
