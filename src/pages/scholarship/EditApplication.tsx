import { useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import axiosInstance from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';

function ReviewItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between items-start w-full py-2 border-b">
      <p className="text-gray-500 text-xs uppercase w-1/3">{label}</p>
      <p className="w-2/3 font-medium text-right">
        {value || <span className="text-red-500">Not provided</span>}
      </p>
    </div>
  );
}

const ApplicationStatus = {
  AWARDED: 'AWARDED',
  REJECTED: 'REJECTED',
  PROCESSING: 'PROCESSING',
};

function getFilePreview(label: string, fileUrl?: string) {
  if (!fileUrl) {
    return (
      <div className="flex justify-between items-center w-full py-2 border-b">
        <p className="text-gray-500 text-xs uppercase w-1/3">{label}</p>
        <p className="text-red-500 text-right w-2/3">Not uploaded</p>
      </div>
    );
  }

  const extension = fileUrl.split('.').pop()?.toLowerCase();
  return (
    <div className="flex justify-between items-center w-full py-2 border-b">
      <p className="text-gray-500 text-xs uppercase w-1/3">{label}</p>
      <div className="w-2/3 text-right">
        {['jpg', 'jpeg', 'png'].includes(extension || '') ? (
          <img
            src={fileUrl}
            alt={label}
            className="w-24 h-24 object-cover rounded border ml-auto"
          />
        ) : extension === 'pdf' ? (
          <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            View PDF
          </a>
        ) : (
          <p className="text-yellow-600">Unsupported file type</p>
        )}
      </div>
    </div>
  );
}

export default function DetailedApplication() {
  const location = useLocation();
  const application = location.state?.data;

  const role = location?.state?.role;

  const navigate = useNavigate();

  if(!role) {
    navigate('/dashboard')
  }

  const isAdmin = role === "ADMIN";

  if (!application) {
    return (
      <div className="max-w-3xl mx-auto mt-10 text-center text-red-500">
        <p>No application data found. Try going back and selecting an application.</p>
      </div>
    );
  }

  const [applications, setApplication] = useState([]);


  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 pb-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Detailed Application View
      </h1>

      <div className="flex flex-col gap-6 text-sm text-gray-700 bg-white p-6 rounded-lg shadow">
        <div className="flex flex-wrap gap-4">
          <ReviewItem label="Full Name" value={application.fullname} />
          <ReviewItem label="Reference" value={application.reference} />
          <ReviewItem label="Contact Address" value={application.contact_address} />
          <ReviewItem label="Phone Number" value={application.phone_number} />
          <ReviewItem label="Local Government Area" value={application.lga} />
          <ReviewItem label="Course of Study" value={application.course_of_study} />
          <ReviewItem label="Present Qualification" value={application.present_qualification} />
          <ReviewItem label="Qualification Desired" value={application.qualiciation_desired} />
          <ReviewItem label="Status" value={application.status} />
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-2">Next of Kin</h3>
          <div className="flex flex-wrap gap-4">
            <ReviewItem label="Name" value={application.next_of_kin?.name} />
            <ReviewItem label="Phone" value={application.next_of_kin?.phone} />
            <ReviewItem label="Relationship" value={application.next_of_kin?.relationship} />
          </div>
        </div>

        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-2">Uploaded Files</h3>
          <div className="flex flex-col gap-2">
            {getFilePreview('Passport Photo', application.passport_photo)}
            {getFilePreview('Transcript', application.transcript)}
            {getFilePreview('Statement of Result', application.statement_of_result)}
            {getFilePreview('LGA Means of ID', application.lga_means_of_id)}
          </div>
        </div>

        {application && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Review Application</h2>

            <div className="flex gap-3 items-center">
              {isAdmin && (
                <Select
                  onValueChange={async (newStatus) => {
                    try {
                      const res = await axiosInstance.patch(`/scholarships/${application._id}/status`, {
                        status: newStatus,
                      }, {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                      });
                      toast.success(`Status updated to ${newStatus}`);
                      setApplication((prev) => ({ ...prev, status: newStatus }));
                    } catch (err) {
                      toast.error("Failed to update status");
                    }
                  }}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder={application.status || 'Review'} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ApplicationStatus).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        )}


        {application.academic_session_performance?.length > 0 && (
          <div className="pt-4 border-t">
            <h3 className="font-semibold mb-2">Academic Session Performance</h3>
            <div className="space-y-4">
              {application.academic_session_performance.map((perf: any, index: number) => (
                <div key={index} className="border p-3 rounded-md bg-gray-50">
                  <ReviewItem label="Academic Session" value={perf.academic_session} />
                  <ReviewItem label="Result" value={perf.result} />
                  <ReviewItem label="Supervisor's Comments" value={perf.supervisor_comments} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
