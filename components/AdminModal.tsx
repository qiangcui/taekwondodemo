import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Upload, CheckCircle, LogOut, X, AlertCircle, User, ShieldCheck } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setUploadStatus('idle');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please select a valid PDF file.');
        return;
      }
      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const base64String = event.target?.result as string;
          localStorage.setItem('tigerlee_schedule_pdf', base64String);
          setUploadStatus('success');
          window.dispatchEvent(new Event('scheduleUpdated'));
        } catch (err) {
          console.error(err);
          setUploadStatus('error');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetSchedule = () => {
    if (window.confirm("Are you sure you want to revert to the default schedule?")) {
      localStorage.removeItem('tigerlee_schedule_pdf');
      setUploadStatus('idle');
      setFileName('');
      window.dispatchEvent(new Event('scheduleUpdated'));
      alert("Schedule reverted to default.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        ></motion.div>

        {/* Modal Card */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden z-10"
        >
          {/* Decorative Header */}
          <div className="h-2 bg-gradient-to-r from-brand-red to-red-800"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X size={20} />
          </button>

          <div className="p-8">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4 text-brand-red">
                    <ShieldCheck size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-heading tracking-wide">Admin Portal</h2>
                <p className="text-gray-500 text-sm mt-1">Authorized personnel only</p>
            </div>

            {!isAuthenticated ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-4">
                  <div>
                    <div className="relative group">
                      <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-brand-red transition-colors" size={18} />
                      <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all placeholder-gray-400 text-gray-800"
                        placeholder="Username"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-brand-red transition-colors" size={18} />
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                         className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all placeholder-gray-400 text-gray-800"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100"
                  >
                    <AlertCircle size={16} className="mr-2 shrink-0" />
                    {error}
                  </motion.div>
                )}

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-red to-red-700 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Secure Login
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center justify-center text-sm font-medium border border-green-100">
                  <CheckCircle size={16} className="mr-2" /> Logged In Successfully
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Update Schedule PDF</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-brand-red/50 transition-colors relative cursor-pointer group bg-white">
                    <input 
                      type="file" 
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-red-50 group-hover:text-brand-red transition-colors text-gray-400">
                         <Upload size={24} />
                      </div>
                      <span className="font-bold text-gray-700 text-sm group-hover:text-gray-900">Upload New PDF</span>
                      <span className="text-xs text-gray-400 mt-1">Drag & drop or click</span>
                    </div>
                  </div>

                  {uploadStatus === 'success' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-lg text-sm flex items-start"
                    >
                      <CheckCircle size={16} className="mr-2 mt-0.5 shrink-0" />
                      <div>
                          <p className="font-bold">Schedule Updated!</p>
                          <p className="text-xs opacity-80 mt-1">Refresh the schedule page to see changes.</p>
                      </div>
                    </motion.div>
                  )}
                  {uploadStatus === 'error' && (
                     <div className="mt-3 text-sm text-red-600">
                       Error saving file.
                     </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                   <button 
                    onClick={handleResetSchedule}
                    className="text-red-600 text-xs hover:text-red-800 hover:underline font-medium"
                  >
                    Reset Defaults
                  </button>
                  <button onClick={handleLogout} className="text-gray-500 text-sm hover:text-brand-red flex items-center font-medium transition-colors">
                    <LogOut size={16} className="mr-1"/> Logout
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminModal;