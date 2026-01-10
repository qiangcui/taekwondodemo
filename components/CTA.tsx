import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Mail, Phone, CheckCircle, ChevronRight, ChevronLeft, Lock, Unlock, Trash2, AlertCircle, ShieldCheck, ArrowDown } from 'lucide-react';

const CTA: React.FC = () => {
  const [formData, setFormData] = useState({
    service: 'Trial Lesson Special - $20',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [dateError, setDateError] = useState('');

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Load blocked dates
  useEffect(() => {
    const saved = localStorage.getItem('tigerlee_blocked_dates');
    if (saved) {
      try {
        setBlockedDates(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse blocked dates", e);
      }
    }
  }, []);

  // Handle Date Changes & Slot Calculation
  useEffect(() => {
    if (!formData.date) {
      setAvailableSlots([]);
      setDateError('');
      return;
    }

    // Parse date safely
    const parts = formData.date.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const dayOfMonth = parseInt(parts[2], 10);
    const dateObj = new Date(year, month, dayOfMonth);
    const dayOfWeek = dateObj.getDay(); // 0 = Sun, 1 = Mon ...

    let error = '';
    let slots: string[] = [];

    // 1. Check if blocked manually
    if (blockedDates.includes(formData.date)) {
      error = 'This date has been blocked by the administrator.';
    }
    // 2. Check Sunday (0)
    else if (dayOfWeek === 0) {
      error = 'Sorry, we are closed on Sundays.';
    }
    // 3. Assign Slots
    else if (dayOfWeek >= 1 && dayOfWeek <= 4) { // Mon-Thu
      slots = ['4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'];
    } else if (dayOfWeek === 5) { // Fri
      slots = ['5:30 PM', '6:00 PM', '6:30 PM'];
    } else if (dayOfWeek === 6) { // Sat
      slots = ['11:00 AM', '11:30 AM', '12:00 PM'];
    }

    setDateError(error);
    setAvailableSlots(slots);

    // Clear invalid time
    if (error || (formData.time && !slots.includes(formData.time))) {
      setFormData(prev => ({ ...prev, time: '' }));
    }

  }, [formData.date, blockedDates]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeSelection = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (dateError) {
      alert("Please select a valid date.");
      return;
    }
    if (!formData.time) {
      alert("Please select a time slot.");
      return;
    }

    const subject = encodeURIComponent("New Booking Request: Tiger Lee's TKD");
    const body = encodeURIComponent(`
Booking Request Details:
------------------------
Service: ${formData.service}
Date: ${formData.date}
Time: ${formData.time}

Contact Information:
------------------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Sent from Tiger Lee's Website Booking Form
`);
    window.location.href = `mailto:gloriacloudco@gmail.com?subject=${subject}&body=${body}`;
  };

  const toggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      const pwd = prompt("Enter Admin Password:");
      if (pwd === "admin") { // Simple password for demo
        setIsAdmin(true);
      } else if (pwd !== null) {
        alert("Incorrect password");
      }
    }
  };

  const handleBlockDate = () => {
    if (formData.date && !blockedDates.includes(formData.date)) {
      const newBlocked = [...blockedDates, formData.date].sort();
      setBlockedDates(newBlocked);
      localStorage.setItem('tigerlee_blocked_dates', JSON.stringify(newBlocked));
    }
  };

  const handleUnblockDate = (dateToUnblock: string) => {
    const newBlocked = blockedDates.filter(d => d !== dateToUnblock);
    setBlockedDates(newBlocked);
    localStorage.setItem('tigerlee_blocked_dates', JSON.stringify(newBlocked));
  };

  // --- Calendar Helpers ---
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay, year, month };
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const { days, firstDay, year, month } = getDaysInMonth(currentMonth);

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDateClick = (d: number) => {
      const dateStr = formatDate(year, month, d);
      setFormData(prev => ({ ...prev, date: dateStr }));
  };

  // Get today string for styling
  const today = new Date();
  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <section id="get-started" className="relative py-24 bg-brand-dark overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Content - Value Prop */}
          <motion.div 
            className="lg:w-1/2 pt-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Main Text Content */}
            <div className="prose prose-lg text-gray-300 mb-8">
              <p className="leading-relaxed mb-6">
                Tiger Lee's World Class Tae Kwon Do has made it easy to get started. We offer a $20 trial program which gives new students the opportunity to try Tae Kwon Do, without obligation. During the trial period, new students will participate in a class with people of similar ability. The trial classes also allow parents and/or students to talk with our instructors about the many benefits Tae Kwon Do offers. There is no obligation at all after the trial program.
              </p>
              
              <div className="flex items-center text-brand-red font-bold text-lg mb-6">
                <ArrowDown className="mr-2 animate-bounce" size={24} />
                <span>Schedule Your Trial Lesson. It only takes a minute!</span>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-bold text-white mb-4">This Beginner Special Program includes:</h3>
              <ul className="space-y-4">
                {[
                  'V.I.P. 1-on-1 classes as well as 1 group class',
                  'Free Uniform',
                  'The opportunity to observe classes and speak with our professional instructors',
                  'Personal tour of our new, state-of-the-art facility',
                  'A review of our flexible, class schedule'
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <CheckCircle className="text-brand-red mr-3 shrink-0 mt-1" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Content - Booking Form */}
          <motion.div 
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative">
              {/* Admin Toggle Button */}
              <button 
                onClick={toggleAdmin}
                className="absolute top-4 right-4 text-white/20 hover:text-white z-20 transition-colors"
                title="Admin Login"
              >
                {isAdmin ? <Unlock size={16} /> : <Lock size={16} />}
              </button>

              <div className="bg-brand-red p-4 text-center">
                <h3 className="text-white font-bold text-xl uppercase tracking-wider">Book Your Appointment</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                
                {/* Admin Panel */}
                {isAdmin && (
                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mb-6 animate-in slide-in-from-top-5">
                    <h4 className="font-bold text-gray-800 mb-2 flex items-center"><ShieldCheck size={16} className="mr-2 text-brand-red"/> Admin: Block Dates</h4>
                    <p className="text-xs text-gray-600 mb-2">Select a date in the calendar below and click "Block Selected Date".</p>
                    
                    <div className="flex space-x-2 mb-4">
                        <button 
                            type="button" 
                            onClick={handleBlockDate}
                            disabled={!formData.date}
                            className="bg-brand-dark text-white text-xs px-3 py-2 rounded hover:bg-black disabled:opacity-50"
                        >
                            Block {formData.date || "Selected Date"}
                        </button>
                    </div>

                    <div className="space-y-1 max-h-32 overflow-y-auto">
                        <p className="text-xs font-bold text-gray-500 uppercase">Blocked Dates:</p>
                        {blockedDates.length === 0 && <p className="text-xs text-gray-400 italic">No dates blocked.</p>}
                        {blockedDates.map(date => (
                            <div key={date} className="flex justify-between items-center bg-white px-2 py-1 rounded border border-gray-200 text-sm">
                                <span>{date}</span>
                                <button type="button" onClick={() => handleUnblockDate(date)} className="text-red-500 hover:text-red-700">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Step 1: Service */}
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">1. Select Service</label>
                  <div className="relative">
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none appearance-none cursor-pointer text-gray-700 font-medium"
                    >
                      <option>Trial Lesson Special - $20</option>
                      <option>Little Tigers (4-5 yrs)</option>
                      <option>Children's Class (6-12 yrs)</option>
                      <option>Adult Class (13+ yrs)</option>
                      <option>Family Class</option>
                    </select>
                    <CheckCircle className="absolute left-3 top-3.5 text-brand-red" size={18} />
                  </div>
                </div>

                {/* Step 2: Calendar */}
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">2. Select Date & Time</label>
                  
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 p-4">
                    {/* Calendar Header */}
                    <div className="flex justify-between items-center mb-4">
                        <button type="button" onClick={prevMonth} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                            <ChevronLeft size={20} className="text-gray-600"/>
                        </button>
                        <h4 className="font-bold text-gray-800 text-lg">
                            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h4>
                        <button type="button" onClick={nextMonth} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                            <ChevronRight size={20} className="text-gray-600"/>
                        </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {daysOfWeek.map(day => (
                            <div key={day} className="text-xs font-bold text-gray-400 uppercase tracking-wider py-1">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {/* Empty cells for padding start of month */}
                        {[...Array(firstDay)].map((_, i) => (
                            <div key={`empty-${i}`} className="p-2"></div>
                        ))}
                        
                        {/* Days */}
                        {[...Array(days)].map((_, i) => {
                            const d = i + 1;
                            const dateStr = formatDate(year, month, d);
                            const isSelected = formData.date === dateStr;
                            const isBlocked = blockedDates.includes(dateStr);
                            const currentDayOfWeek = new Date(year, month, d).getDay();
                            const isSunday = currentDayOfWeek === 0;
                            const isToday = dateStr === todayStr;

                            let btnClass = "w-full aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all ";
                            
                            if (isBlocked) {
                                btnClass += "bg-red-100 text-red-400 cursor-not-allowed decoration-red-400";
                            } else if (isSunday) {
                                btnClass += "bg-gray-100 text-gray-300 cursor-not-allowed";
                            } else if (isSelected) {
                                btnClass += "bg-brand-red text-white shadow-md transform scale-105";
                            } else {
                                btnClass += "bg-white hover:bg-red-50 hover:text-brand-red text-gray-700 border border-gray-100";
                            }

                            if (isToday && !isSelected) {
                                btnClass += " ring-1 ring-brand-red ring-offset-1";
                            }

                            return (
                                <button
                                    key={d}
                                    type="button"
                                    onClick={() => !isBlocked && !isSunday && handleDateClick(d)}
                                    disabled={isBlocked || isSunday}
                                    className={btnClass}
                                >
                                    {d}
                                </button>
                            );
                        })}
                    </div>
                  </div>

                  {dateError && (
                    <div className="flex items-center text-red-500 text-sm bg-red-50 p-2 rounded">
                        <AlertCircle size={16} className="mr-2" />
                        {dateError}
                    </div>
                  )}

                  {/* Dynamic Time Slots */}
                  {formData.date && !dateError && (
                      <div className="animate-in fade-in slide-in-from-top-2 pt-2">
                         <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                            Available Slots for {new Date(formData.date.split('-').join('/')).toLocaleDateString('en-US', {weekday: 'long', month: 'short', day: 'numeric'})}:
                         </p>
                         <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {availableSlots.length > 0 ? availableSlots.map(slot => (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => handleTimeSelection(slot)}
                                    className={`py-2 px-1 text-sm rounded border transition-all ${
                                        formData.time === slot 
                                        ? 'bg-brand-red text-white border-brand-red shadow-md' 
                                        : 'bg-white text-gray-700 border-gray-200 hover:border-brand-red hover:text-brand-red'
                                    }`}
                                >
                                    {slot}
                                </button>
                            )) : (
                                <p className="col-span-4 text-sm text-gray-500 italic">No slots available for this date.</p>
                            )}
                         </div>
                      </div>
                  )}
                </div>

                <hr className="border-gray-100" />

                {/* Step 3: Contact Details */}
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">3. Your Details</label>
                  
                  <div className="relative">
                    <input 
                      type="text"
                      name="name"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none"
                    />
                    <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <input 
                        type="email"
                        name="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none"
                      />
                      <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                    <div className="relative">
                      <input 
                        type="tel"
                        name="phone"
                        required
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none"
                      />
                      <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={!formData.date || !!dateError || !formData.time}
                  className="w-full bg-brand-red text-white font-bold text-lg py-4 rounded-lg shadow-lg hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Confirm Booking</span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-center text-xs text-gray-400">
                  By booking, you agree to our terms. We'll confirm your appointment via email.
                </p>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CTA;