import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white text-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Info Side */}
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <h2 className="font-heading text-4xl font-bold mb-6 text-gray-900">Contact Us</h2>
              <p className="text-gray-600 text-lg">We are here to answer any questions you may have about our programs. Reach out to us and we'll respond as soon as we can.</p>
            </div>

            {/* Google Map - Expanded */}
            <div className="w-full flex-grow bg-gray-100 rounded-lg overflow-hidden relative min-h-[400px] shadow-sm border border-gray-200">
               <iframe 
                 width="100%" 
                 height="100%" 
                 frameBorder="0" 
                 title="Tiger Lee's World Class Tae Kwon Do Location"
                 scrolling="no" 
                 marginHeight={0} 
                 marginWidth={0} 
                 src="https://maps.google.com/maps?q=Tiger%20Lee's%20World%20Class%20Tae%20Kwon%20Do%20Parker%20CO&t=&z=13&ie=UTF8&iwloc=&output=embed"
                 className="absolute inset-0 w-full h-full border-0"
                 allowFullScreen
               ></iframe>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white rounded-xl p-8 text-gray-800 shadow-2xl border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Send a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all" placeholder="Your Email" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all" placeholder="How can we help?" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={6} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent outline-none transition-all" placeholder="Tell us more..."></textarea>
              </div>

              <button type="button" className="w-full bg-brand-dark text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-colors shadow-lg">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;