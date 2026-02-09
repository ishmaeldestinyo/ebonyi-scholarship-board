import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import axiosInstance from '../api/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

function EditSessionApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, startDate, endDate } = formData;

      if (!name) toast.error('Session name is required');

    if (new Date(startDate) >= new Date(endDate)) {
      toast.error('Start date must be before end date');
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.put(`/applications/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast.success('Session updated successfully');
      navigate('/scholarship'); 
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">Edit Application Session</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Session Name</label>
          <input
            type="text"
            name="name"
            placeholder={`e.g. ${currentYear}/${nextYear} Ebonyi Scholarship`}
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

        <Button type="submit" className="bg-[#0a4c3d] text-white hover:bg-[#0a4c3dcc]" disabled={loading}>
          {loading ? 'Updating...' : 'Update Session'}
        </Button>
      </form>
    </div>
  );
}

export default EditSessionApplication;
