import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Upload, FileText, CheckCircle, LogOut } from 'lucide-react';

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side check for demonstration. 
    // In a real app, this should be handled by a backend.
    if (password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
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
          // Store in localStorage to simulate backend persistence
          localStorage.setItem('tigerlee_schedule_pdf', base64String);
          setUploadStatus('success');
        } catch (err) {
          console.error(err);
          setUploadStatus('error');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetSchedule = () => {
      if(window.confirm("Are you sure you want to revert to the default schedule?")) {
          localStorage.removeItem('tigerlee_schedule_pdf');
          setUploadStatus('idle');
          setFileName('');
          alert("Schedule reverted to default.");
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-brand-dark p-6 text-center">
                <h1 className="text-2xl font-bold text-white flex items-center justify-center">
                    <Lock className="mr-2" /> Admin Portal
                </h1>
            </div>

            <div className="p-8">
                {!isAuthenticated ? (
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none"
                                placeholder="Enter admin password"
                            />
                        </div>
                        {error && <p className="text-red-600 text-sm">{error}</p>}
                        <button 
                            type="submit"
                            className="w-full bg-brand-red text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Login
                        </button>
                    </form>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        <div className="text-center pb-6 border-b border-gray-100">
                            <p className="text-green-600 font-medium mb-4">Logged in successfully</p>
                            <button onClick={handleLogout} className="text-gray-500 text-sm flex items-center justify-center mx-auto hover:text-brand-red">
                                <LogOut size={16} className="mr-1"/> Logout
                            </button>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Update Class Schedule</h2>
                            <p className="text-gray-600 text-sm mb-6">
                                Upload a new PDF to update the schedule displayed on the website. This will override the default schedule.
                            </p>

                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative">
                                <input 
                                    type="file" 
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="flex flex-col items-center">
                                    <Upload size={48} className="text-gray-400 mb-4" />
                                    <span className="font-bold text-gray-700">Click to upload PDF</span>
                                    <span className="text-sm text-gray-500 mt-2">or drag and drop</span>
                                </div>
                            </div>

                            {uploadStatus === 'success' && (
                                <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
                                    <CheckCircle className="mr-2" />
                                    <div>
                                        <p className="font-bold">Upload Successful!</p>
                                        <p className="text-sm">The schedule page has been updated.</p>
                                        {fileName && <p className="text-xs mt-1 italic">File: {fileName}</p>}
                                    </div>
                                </div>
                            )}

                             {uploadStatus === 'error' && (
                                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                                    <p className="font-bold">Upload Failed.</p>
                                    <p className="text-sm">The file might be too large for browser storage.</p>
                                </div>
                            )}
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                             <h3 className="font-bold text-gray-800 mb-2">Actions</h3>
                             <button 
                                onClick={handleResetSchedule}
                                className="text-red-600 text-sm hover:underline"
                             >
                                Reset to Default Schedule
                             </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;