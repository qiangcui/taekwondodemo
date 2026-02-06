import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What programs do you offer?",
    answer: "We offer programs for kids (4-5), youth (6-12), adults (13+), and families. Each program is designed for its age group and focuses on building skills, confidence, and a positive experience."
  },
  {
    question: "At what age can kids start?",
    answer: "Most children ages four and up can participate. We offer a trial so our instructors can work with your child one-on-one and help you find the right fit. No prior experience is required."
  },
  {
    question: "Is the environment safe and supportive?",
    answer: "Yes. Our programs emphasize respect, cooperation, and personal growth. Instructors teach in a step-by-step way so everyone can progress at their own pace in a safe, structured setting."
  },
  {
    question: "How safe are the classes?",
    answer: "Safety is a priority. We use appropriate equipment, warm-ups, and progressions. Classes are supervised by trained instructors. If you have specific concerns, we're happy to discuss them before you start."
  },
  {
    question: "I'm a complete beginner or out of shape. Can I still join?",
    answer: "Absolutely. Beginners are welcome. Our trial and beginner programs are designed to introduce you to the basics in a supportive way. You can improve your fitness and skills gradually at your own pace."
  }
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-0 bg-white">
      {/* Page Header */}
      <div className="relative h-[400px] w-full overflow-hidden bg-brand-dark flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200)` }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 container mx-auto px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Frequently Asked Questions
            </h1>
            <div className="w-24 h-1 bg-brand-red rounded-full"></div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors text-left focus:outline-none"
              >
                <span className="font-bold text-lg text-gray-900 flex items-center gap-3">
                  {openIndex === index ? <Minus size={20} className="text-brand-red shrink-0" /> : <Plus size={20} className="text-gray-400 shrink-0" />}
                  {faq.question}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Have other questions? Ask us here!</h3>
          <Link
            to="/#contact"
            className="inline-block bg-brand-red text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg"
            onClick={() => {
              setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-brand-dark py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rotate-45"></div>
        <div className="container mx-auto px-4 relative z-10">
          <span className="block text-xl md:text-2xl font-heading font-bold text-white uppercase tracking-widest mb-8">
            Schedule a trial lesson. It'll only take a minute.
          </span>
          <Link
            to="/get-started"
            className="inline-block bg-brand-red text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all hover:scale-105 shadow-xl shadow-red-900/20"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;