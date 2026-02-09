import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditIcon, StopCircleIcon, Menu, X, LogOut } from "lucide-react";
import { Button } from "../../components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

const TopBar = ({ user, isScholarshipOpen }: { user: any; isScholarshipOpen: boolean }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="w-12 rounded-full" />
          <h2 className="berlin-sans-normal text-lg md:text-2xl">
            Ebonyi Scholarship Application
          </h2>
        </div>

        <div className="md:flex hidden gap-2">
          {user?.role === "ADMIN" && (
            <Button onClick={() => navigate("/scholarship")} className="bg-blue-600 hover:bg-blue-700">
              Open New Application
            </Button>
          )}
          {isScholarshipOpen ? (
            <Button
              size="lg"
              onClick={() => navigate("/applications", { state: { isScholarshipOpen } })}
              className="bg-emerald-800 hover:bg-emerald-900 flex items-center gap-2"
            >
              <EditIcon size={18} /> New Application
            </Button>
          ) : (
            <Button disabled size="lg" variant="destructive" className="flex items-center gap-2">
              <StopCircleIcon size={18} /> No Open Scholarship
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <X /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-4/5 h-full bg-white z-50 p-4 shadow-lg border-r"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setShowMenu(false)}>
                <X />
              </button>
            </div>

            <div className="flex flex-col gap-2">
             
              {isScholarshipOpen ? (
                <Button
                  onClick={() => {
                    navigate("/applications", { state: { isScholarshipOpen } });
                    setShowMenu(false);
                  }}
                  className="bg-emerald-800 hover:bg-emerald-900 flex items-center gap-2 w-full"
                >
                  <EditIcon size={18} /> New Application
                </Button>
              ) : (
                <Button disabled variant="ghost" className="flex items-center gap-2 w-full">
                  <StopCircleIcon size={18} /> No Open Scholarship
                </Button>
              )}
               
              {user?.role === "ADMIN" && (
                <Button
                  onClick={() => {
                    navigate("/scholarship");
                    setShowMenu(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 w-full"
                >
                  Open New Application
                </Button>
              )}


              <Button onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setShowMenu(false);
                navigate("/login");
              }} variant="destructive" className="flex cursor-pointer items-center gap-2 w-full">
                <LogOut size={18} /> Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopBar;
