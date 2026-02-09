import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import axiosInstance from '../api/axiosConfig';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Session {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
}

function NewSessionApplication() {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<Session | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, startDate, endDate } = formData;

    if (!name || !startDate || !endDate) {
      if (!name) toast.error('Session name is required');
      if (!startDate) toast.error('Start date is required');
      if (!endDate) toast.error('End date is required');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      toast.error('Start date must be before end date');
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.post('/applications/open', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Application session created successfully');
      setFormData({ name: '', startDate: '', endDate: '' });
      fetchSessions(); // Refresh session list
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

const fetchSessions = async () => {
  try {
    const res = await axiosInstance.get('/applications', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // Normalize single object to array
    const raw = res.data?.data;
    const sessionList = Array.isArray(raw) ? raw : raw ? [raw] : [];
    setSessions(sessionList);

    // Check if any session is currently open
    const now = new Date();
    const open = sessionList.some(
      session =>
        new Date(session.startDate) <= now &&
        new Date(session.endDate) >= now
    );
    setIsScholarshipOpen(open);
  } catch (error) {
    console.error(error);
    toast.error('Failed to load sessions');
  }
};


  useEffect(() => {
    fetchSessions();
  }, []);

  const handleDelete = async () => {
    if (!sessionToDelete) return;

    try {
      await axiosInstance.delete(`/applications/${sessionToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast.success('Session deleted successfully');
      setSessions(prev => prev.filter(s => s._id !== sessionToDelete._id));
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Failed to delete session');
    } finally {
      setShowDeleteModal(false);
      setSessionToDelete(null);
    }
  };

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Create New Application Session</h2>
          <Link
            to="/dashboard"
            className="py-2 px-5 bg-[#0a4c3d] text-white rounded-lg hover:bg-[#0a4c3dcc]"
          >
            Dashboard
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Session Name</label>
            <input
              type="text"
              name="name"
              placeholder={`e.g., ${currentYear}/${nextYear} Ebonyi Scholarship`}
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="bg-[#0a4c3d] text-white hover:bg-[#0a4c3dcc]"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Create Session Scholarship'}
          </Button>
        </form>

        {/* ✅ Optional: Show if current session is open */}
        <div className="mt-4 text-sm text-gray-700">
          Scholarship Status:{' '}
          <span className={isScholarshipOpen ? 'text-green-600 font-medium' : 'text-red-600'}>
            {isScholarshipOpen ? 'OPEN' : 'CLOSED'}
          </span>
        </div>

        {/* Session List */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Existing Sessions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2">Start</th>
                  <th className="px-4 py-2">End</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map(session => (
                  <tr key={session._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{session.name}</td>
                    <td className="px-4 py-2">{new Date(session.startDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{new Date(session.endDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/scholarship/${session._id}`)}
                          className="p-1.5 rounded hover:bg-blue-100 transition"
                          title="Edit Session"
                        >
                          <PencilIcon className="w-5 h-5 text-blue-600" />
                        </button>
                        <button
                          onClick={() => {
                            setSessionToDelete(session);
                            setShowDeleteModal(true);
                          }}
                          className="p-1.5 rounded hover:bg-red-100 transition"
                          title="Delete Session"
                        >
                          <TrashIcon className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {sessions.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                      No sessions available yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && sessionToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-3">Delete Session</h2>
            <p className="text-sm text-gray-700">
              Are you sure you want to delete{' '}
              <span className="font-semibold">{sessionToDelete?.name}</span>? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewSessionApplication;
