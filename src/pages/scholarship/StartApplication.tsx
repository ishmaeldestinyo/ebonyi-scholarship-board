import React, { useEffect, useState } from 'react';
import {
  User,
  BookOpen,
  IdCard,
  CheckCircle2,
  ArrowLeftCircle,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Input } from '../../components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../../api/axiosConfig';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const steps = [
  { label: 'Basic Information', icon: <User className="mr-2 h-4 w-4" /> },
  { label: 'Academic Information', icon: <BookOpen className="mr-2 h-4 w-4" /> },
  { label: 'Identification', icon: <IdCard className="mr-2 h-4 w-4" /> },
  { label: 'Review & Submit', icon: <CheckCircle2 className="mr-2 h-4 w-4" /> },
];


const ebonyiLGAs = [
  'Abakaliki',
  'Afikpo North',
  'Afikpo South',
  'Ebonyi',
  'Ezza North',
  'Ezza South',
  'Ikwo',
  'Ishielu',
  'Ivo',
  'Izzi',
  'Ohaozara',
  'Ohaukwu',
  'Onicha',
];

export default function StartApplication() {

  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const location = useLocation();

  const isScholarshipOpen = location?.state?.isScholarshipOpen ?? false;

  const [isOpen, setIsOpen] = useState(isScholarshipOpen);

  useEffect(() => {
    if (isOpen === false) {
      toast.error("No ongoing scholarship!");
      navigate("/dashboard");
    }
  }, [isOpen, navigate]);


  const [form, setForm] = useState({
    fullName: '',
    contactAddress: '',
    lga: '',
    courseOfStudy: '',
    presentQualification: '',
    qualificationDesired: '',
    institutionOfAward: '',
    nextOfKinName: '',
    nextOfKinPhone: '',
    nextOfKinRelationship: '',
    phoneNumber: '',
    transcript: null as File | null,
    lgaLetter: null as File | null,
    passportPhoto: null as File | null,
  });


  const [passportPreview, setPassportPreview] = useState<string | null>(null);


  function ReviewItem({ label, value }: { label: string; value?: string }) {
    return (
      <div>
        <p className="text-gray-500 text-xs uppercase mb-1">{label}</p>
        <p className="font-medium">{value || <span className="text-red-500">Not provided</span>}</p>
      </div>
    );
  }

  function getFilePreview(file: File) {
    const fileType = file.type;

    if (fileType.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      return (
        <img
          src={imageUrl}
          alt="File Preview"
          className="w-24 h-24 object-cover rounded border"
        />
      );
    }

    if (fileType === "application/pdf") {
      return (
        <a
          href={URL.createObjectURL(file)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Open PDF
        </a>
      );
    }

    return <p className="text-yellow-600">Unsupported file type</p>;
  }



  const handleNext = () => {
    const errors: string[] = [];

    if (step === 0) {
      if (!form.fullName) errors.push('Full Name');
      if (!form.contactAddress) errors.push('Contact Address');
      if (!form.lga) errors.push('LGA');
    } else if (step === 1) {
      if (!form.courseOfStudy) errors.push('Course of Study');
      if (!form.presentQualification) errors.push('Present Qualification');
      if (!form.qualificationDesired) errors.push('Qualification Desired');
      // if (!form.institutionOfAward) errors.push('Institution of Award');
    } else if (step === 2) {
      if (!form.nextOfKinName) errors.push('Next of Kin Name');
      if (!form.nextOfKinPhone) errors.push('Next of Kin Phone Number');
      if (!form.nextOfKinRelationship) errors.push('Next of Kin Relationship');
      if (!form.passportPhoto) errors.push("Please upload your passport photo");
      if (!form.phoneNumber) errors.push('Your Phone Number');
      if (!form.transcript) errors.push('Transcript');
      if (!form.lgaLetter) errors.push('LGA Identification Letter');
    }

    if (errors.length > 0) {
      errors.forEach((err) => toast.error(`${err} is required.`));
      return;
    }

    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleChange = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };


  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className=" w-full  grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Input
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
              />
              <Textarea
                placeholder="Contact Address"
                value={form.contactAddress}
                onChange={(e) => handleChange('contactAddress', e.target.value)}
              />
              <div className="md:col-span-2">
                <label className="text-sm block mb-1">Local Government of Origin</label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={form.lga}
                  onChange={(e) => handleChange('lga', e.target.value)}
                >
                  <option value="">Select LGA</option>
                  {ebonyiLGAs.map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          </AnimatePresence>
        );
      case 1:
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className=" w-full  grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Input
                placeholder="Course of Study"
                value={form.courseOfStudy}
                onChange={(e) => handleChange('courseOfStudy', e.target.value)}
              />
              <Input
                placeholder="Present Qualification"
                value={form.presentQualification}
                onChange={(e) => handleChange('presentQualification', e.target.value)}
              />
              <Input
                placeholder="Qualification Desired"
                value={form.qualificationDesired}
                onChange={(e) => handleChange('qualificationDesired', e.target.value)}
              />
              <Input
                placeholder="Institution of Award (Optional)"
                value={form.institutionOfAward}
                onChange={(e) => handleChange('institutionOfAward', e.target.value)}
              />
            </motion.div>
          </AnimatePresence>
        );
      case 2:
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className=" w-full  grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Input
                placeholder="Name of Next of Kin"
                value={form.nextOfKinName}
                onChange={(e) => handleChange('nextOfKinName', e.target.value)}
              />
              <Input
                placeholder="Phone Number of Next of Kin"
                value={form.nextOfKinPhone}
                onChange={(e) => handleChange('nextOfKinPhone', e.target.value)}
              />
              <Input
                placeholder="Relationship with Next of Kin"
                value={form.nextOfKinRelationship}
                onChange={(e) => handleChange('nextOfKinRelationship', e.target.value)}
              />
              <Input
                placeholder="Your Phone Number"
                value={form.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
              />
              <div>
                <label className="text-sm block mb-1">Passport Photo</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    handleChange('passportPhoto', file);
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPassportPreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      setPassportPreview(null);
                    }
                  }}
                />
                {passportPreview && (
                  <img
                    src={passportPreview}
                    alt="Passport Preview"
                    className="mt-2 w-20 h-20 object-cover border rounded shadow"
                  />
                )}
              </div>

              <div>
                <label className="text-sm block mb-1">Transcript (PDF or Image)</label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleChange('transcript', e.target.files?.[0] || null)}
                />
              </div>
              <div>
                <label className="text-sm block mb-1">LGA Identification Letter</label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleChange('lgaLetter', e.target.files?.[0] || null)}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        );
      case 3:
        return (
          <div className="mt-6 p-4 border rounded-md bg-white shadow">
            <h2 className="text-lg font-bold mb-2">Review & Submit</h2>
            <div className="mt-6 p-6 border rounded-xl bg-white shadow space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Review & Submit</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <ReviewItem label="Full Name" value={form.fullName} />
                <ReviewItem label="Contact Address" value={form.contactAddress} />
                <ReviewItem label="Local Govt Area" value={form.lga} />
                <ReviewItem label="Course of Study" value={form.courseOfStudy} />
                <ReviewItem label="Present Qualification" value={form.presentQualification} />
                <ReviewItem label="Qualification Desired" value={form.qualificationDesired} />
                <ReviewItem label="Institution of Award" value={form.institutionOfAward} />
                <ReviewItem label="Phone Number" value={form.phoneNumber} />

                <div className="col-span-full border-t pt-4">
                  <h3 className="font-semibold mb-2">Next of Kin</h3>
                  <ReviewItem label="Name" value={form.nextOfKinName} />
                  <ReviewItem label="Phone" value={form.nextOfKinPhone} />
                  <ReviewItem label="Relationship" value={form.nextOfKinRelationship} />
                </div>

                <div className="col-span-full border-t pt-4">
                  <h3 className="font-semibold mb-2">Uploaded Files</h3>

                  {/* Passport Photo Preview */}
                  <div>
                    <p className="text-gray-500 text-xs uppercase mb-1">Passport Photo</p>
                    {form.passportPhoto ? (
                      getFilePreview(form.passportPhoto)
                    ) : (
                      <p className="text-red-500">Not uploaded</p>
                    )}
                  </div>

                  {/* Transcript Preview */}
                  <div>
                    <p className="text-gray-500 text-xs uppercase mb-1">Transcript</p>
                    {form.transcript ? (
                      getFilePreview(form.transcript)
                    ) : (
                      <p className="text-red-500">Not uploaded</p>
                    )}
                  </div>

                  {/* LGA Letter Preview */}
                  <div>
                    <p className="text-gray-500 text-xs uppercase mb-1">LGA Letter</p>
                    {form.lgaLetter ? (
                      getFilePreview(form.lgaLetter)
                    ) : (
                      <p className="text-red-500">Not uploaded</p>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        );
      default:
        return null;
    }
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    if (step < 3) {
      handleNext();
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('fullname', form.fullName);
    formData.append('contact_address', form.contactAddress);
    formData.append('lga', form.lga);
    formData.append('course_of_study', form.courseOfStudy);
    formData.append('present_qualification', form.presentQualification);
    formData.append('qualiciation_desired', form.qualificationDesired);
    formData.append('phone_number', form.phoneNumber);

    // Files
    if (form.transcript) formData.append('transcript', form.transcript);
    if (form.lgaLetter) formData.append('lga_means_of_id', form.lgaLetter);

    if (form.passportPhoto) formData.append('passport_photo', form.passportPhoto);


    // Required by backend (even though not in form): simulate placeholder if needed
    formData.append('statement_of_result', '');

    // Next of kin - nested
    formData.append('next_of_kin.name', form.nextOfKinName);
    formData.append('next_of_kin.phone', form.nextOfKinPhone);
    formData.append('next_of_kin.relationship', form.nextOfKinRelationship);

    try {
      const response = await axiosInstance.post('/scholarships', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      });

      toast.success('Application submitted successfully!');
      setForm({
        fullName: '',
        contactAddress: '',
        lga: '',
        courseOfStudy: '',
        presentQualification: '',
        qualificationDesired: '',
        institutionOfAward: '',
        nextOfKinName: '',
        nextOfKinPhone: '',
        nextOfKinRelationship: '',
        phoneNumber: '',
        transcript: null,
        lgaLetter: null,
        passportPhoto: null,
      });
      setTimeout(() => {
        navigate("/dashboard")
      }, 1000);
      // optionally redirect or reset form
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Submission failed.');
    }
  };

  return (
    <React.Fragment>
      <form className="px-5 min-h-screen pb-20" onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="w-16 rounded-full" />
            <h2 className="berlin-sans-normal text-xl md:text-3xl">Ebonyi Scholarship Application</h2>
          </div>
          <div className="md:flex hidden gap-4">
            <Link
              className="bg-white text-[#0a4c3d] border-[#0a4c3d] hover:bg-[#0a4c3d] hover:text-white flex items-center px-4 py-2 rounded-md transition-colors border"
              to={'/dashboard'}
            >
              <ArrowLeftCircle className="mr-2" />
              Back to Dashboard
            </Link>
            <Button
              type="button"
              className="bg-[#0a4c3d] text-white "
              size={"lg"}
              onClick={() => {
                if (step === 3) {
                  handleSubmit(new Event('submit') as unknown as React.FormEvent); // manually trigger
                } else {
                  handleNext();
                }
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowRight className="" />
                  {step === 3 ? 'Submit' : 'Continue'}
                </>
              )}

            </Button>

          </div>
        </div>

        {/* Stepper */}
        <div className="w-full overflow-x-auto">
          <div className="flex md:border-b border-gray-400 w-max whitespace-nowrap items-center justify-start bg-white rounded-none px-4 py-3 shadow-none mx-auto">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 min-w-max mr-6 text-sm font-semibold transition-all ${i <= step ? 'text-[#0a4c3d]' : 'text-gray-400'
                  }`}
              >
                {s.icon}
                {s.label}
              </div>
            ))}
          </div>
        </div>


        {/* Form Step */}
        <div className="w-4/5 mx-auto">{renderStep()}</div>

        {/* Navigation */}
        <div className="flex w-4/5 mx-auto mt-8 gap-4 justify-between">
          {step > 0 && (
            <Button type="button" variant="outline" onClick={handleBack}>
              <ArrowLeftCircle className="mr-2" /> Back
            </Button>
          )}
          <div className="flex-grow" />
        </div>

{/* small screen */}
        <div className="flex md:hidden gap-4">
            <Link
              className="bg-white text-[#0a4c3d] border-[#0a4c3d] hover:bg-[#0a4c3d] hover:text-white flex items-center px-4 py-2 rounded-md transition-colors border md:text-base text-sm"
              to={'/dashboard'}
            >
              <ArrowLeftCircle className="mr-2" />
              Dashboard
            </Link>
            <Button
              type="button"
              className="bg-[#0a4c3d] text-white md:text-base text-sm"
              size={"lg"}
              onClick={() => {
                if (step === 3) {
                  handleSubmit(new Event('submit') as unknown as React.FormEvent); // manually trigger
                } else {
                  handleNext();
                }
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowRight className="mr-" />
                  {step === 3 ? 'Submit' : 'Continue'}
                </>
              )}

            </Button>

          </div>
      </form>
    </React.Fragment>
  );
}
