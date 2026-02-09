import { useState } from 'react';
import { ArrowLeftCircle, Save, Loader2, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';

interface TopbarApplicationProps {
  step: number;
  loading: boolean;
  handleNext: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const TopbarApplication: React.FC<TopbarApplicationProps> = ({
  step,
  loading,
  handleNext,
  handleSubmit,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="p-4 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        {/* Logo and title */}
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="w-12 rounded-full" />
          <h2 className="berlin-sans-normal text-xl sm:text-2xl md:text-3xl">
            Ebonyi Scholarship Application
          </h2>
        </div>

        {/* Toggle Button (mobile) */}
        <div className="sm:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Buttons */}
        <div
          className={`w-full sm:w-auto flex-col sm:flex-row flex items-center gap-4 ${
            menuOpen ? 'flex' : 'hidden sm:flex'
          }`}
        >
          <Link
            to="/dashboard"
            className="w-full sm:w-auto justify-center flex items-center px-4 py-2 rounded-md border border-[#0a4c3d] bg-white text-[#0a4c3d] hover:bg-[#0a4c3d] hover:text-white transition-colors"
          >
            <ArrowLeftCircle className="mr-2" />
            Back to Dashboard
          </Link>

          <Button
            type="button"
            className="w-full sm:w-auto bg-[#0a4c3d] text-white"
            size="lg"
            onClick={() => {
              if (step === 3) {
                handleSubmit(new Event('submit') as unknown as React.FormEvent);
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
                <Save className="mr-2" />
                {step === 3 ? 'Submit' : 'Save & Continue'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopbarApplication;
