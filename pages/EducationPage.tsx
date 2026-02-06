import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Play, Video, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AccordionItem {
  id: string;
  title: string;
  type: 'text-image' | 'video-feature' | 'grid-video' | 'audio';
  content: React.ReactNode;
}

const EducationPage: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>('intro');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const sections: AccordionItem[] = [
    {
      id: 'intro',
      title: 'About Our Programs',
      type: 'video-feature',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="prose prose-lg text-gray-600">
            <p>
              Our programs are designed to build skills, confidence, and fitness for all ages. We focus on clear goals, positive reinforcement, and a supportive environment.
            </p>
            <p>
              Whether you're new to this type of activity or have some experience, our instructors will help you progress at your own pace.
            </p>
            <h4 className="font-bold text-gray-900 mt-4 mb-2">What We Offer</h4>
            <p>
              We offer classes for kids, youth, adults, and families. Each program is tailored to its age group and emphasizes safety, respect, and personal growth.
            </p>
            <p>
              Many of our participants see improvements in focus, fitness, and confidence. We welcome you to try a trial session and see if we're a good fit for you.
            </p>
          </div>
          <div className="space-y-6">
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/3AtDnEC4zk0?rel=0"
                title="About Our Programs"
                referrerPolicy="strict-origin-when-cross-origin"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600"
              alt="Program values"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      )
    },
    {
      id: 'fitness',
      title: 'Physical Fitness',
      type: 'text-image',
      content: (
        <div className="space-y-6">
          <div className="float-right ml-6 mb-4 w-1/3">
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300"
              alt="Physical Fitness"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="prose prose-lg text-gray-600">
            <p>
              Our programs offer a full-body workout that supports both fitness and mental well-being. Regular participation can lead to better health and a more active lifestyle.
            </p>
            <p><strong>Cardio and circulation</strong><br />Classes engage multiple muscle groups and get your heart rate up, improving circulation and cardiovascular health.</p>
            <p><strong>Fat loss</strong><br />Regular activity helps burn calories and, combined with a balanced lifestyle, can support healthy weight management.</p>
            <p><strong>Muscle toning</strong><br />Training strengthens muscles, bones, joints, and connective tissue over time.</p>
            <p><strong>Increased flexibility</strong><br />We include stretching and mobility work in sessions, which can improve flexibility with consistent practice.</p>
            <p><strong>Improved stamina</strong><br />As you get stronger and more conditioned, your overall stamina and energy levels can increase.</p>
            <p><strong>Stress relief</strong><br />Physical activity is a proven way to reduce stress and improve mood and overall well-being.</p>
          </div>
          <div className="clear-both"></div>
        </div>
      )
    },
    {
      id: 'focus',
      title: 'Help Improve Focus',
      type: 'text-image',
      content: (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300"
              alt="Improved Focus"
              className="w-full h-auto rounded-lg shadow-md max-w-[200px] mx-auto md:mx-0"
            />
          </div>
          <div className="md:w-2/3 prose prose-lg text-gray-600">
            <p><strong>Better focus for children</strong></p>
            <p>If you want to help your child improve focus and concentration, structured physical activity can make a real difference.</p>
            <p><strong>The importance of exercise</strong></p>
            <p>Research shows that exercise supports brain function, including attention and stress regulation. For kids, regular activity can reduce impulsivity and support readiness to learn.</p>
            <p>Exercise affects brain chemistry in positive ways, influencing focus and mood.</p>
            <p><strong>Why our programs?</strong></p>
            <p>Activities that require attention to body movements and sequences help train focus and can be especially helpful for children who benefit from structure and physical engagement.</p>
          </div>
        </div>
      )
    },
    {
      id: 'stress',
      title: 'Help Control Stress',
      type: 'text-image',
      content: (
        <div className="space-y-6">
          <div className="float-right ml-6 mb-4 w-1/3 max-w-[250px]">
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300"
              alt="Control Stress"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="prose prose-lg text-gray-600">
            <p><strong>Control stress through exercise:</strong></p>
            <p>Too much stress in your life? Exercise is a great way to manage stress so that it no longer interferes with your health and happiness. And adult martial arts classes may be the best answer to finding a form of exercise you actually want to do.</p>
            <p><strong>How Exercise Helps Reduce Stress:</strong></p>
            <p>Exercise helps both the brain and body handle stress better. Regular exercise improves mood, relieves anxiety and depression, and increases energy. Studies have found that exercise increases concentrations of norepinephrine in brain regions involved in the body's stress response.</p>
            <p><strong>A workout you'll enjoy</strong></p>
            <p>To make exercise a stress-reducer, find something you enjoy. At Demo Academy, we build goal-setting into our programs and keep the atmosphere friendly and encouraging.</p>
          </div>
          <div className="clear-both"></div>
        </div>
      )
    },
    {
      id: 'self-defense',
      title: 'Self Defense',
      type: 'text-image',
      content: (
        <div className="space-y-6">
          <div className="float-right ml-6 mb-4 w-1/3 max-w-[250px]">
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300"
              alt="Self Defense"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="prose prose-lg text-gray-600">
            <p><strong>Learn Self Defense Through Martial Arts Classes</strong></p>
            <p>The first rule in self-defense is to prevent a dangerous situation from developing. However, if you cannot get away and find you need to protect yourself, knowing self-defense techniques can be invaluable.</p>
            <p><strong>Self-Defense for Men</strong></p>
            <p>Men are more likely than women to fight back 'in self-defense.' However, if all else fails you may have no choice but to defend yourself or someone you care for. Adult martial arts classes will teach you techniques, strength, speed, and balance.</p>
            <p><strong>Self-Defense for Women</strong></p>
            <p>Taking self-defense classes is a safe way to prepare yourself. Knowing that you could do something if it came down to it will give you peace of mind.</p>
            <p><strong>Why our program</strong></p>
            <p>Participants learn practical skills in a structured, safe environment. Building knowledge and ability can increase confidence in daily life.</p>
          </div>
          <div className="clear-both"></div>
        </div>
      )
    },
    {
      id: 'bullying',
      title: 'Help Stop Bullying',
      type: 'text-image',
      content: (
        <div className="space-y-6">
          <div className="float-right ml-6 mb-4 w-1/3 max-w-[200px]">
            <img
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300"
              alt="Confidence"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="prose prose-lg text-gray-600">
            <p>At Demo Academy, we teach confidence and respect, not aggression. Building confidence is one of the best ways to help children respond to bullying and stand up for themselves in a positive way.</p>
            <p><strong>Victims of bullying typically do not retaliate</strong></p>
            <p>Children targeted by bullies are usually intelligent, sensitive, and creative. Unfortunately, they are often never taught how to defend themselves.</p>
            <p><strong>Martial arts classes can help</strong></p>
            <p>Martial arts classes will teach children various techniques for blocking, breaking an attacker's grasp, and other methods to protect themselves from injury.</p>
            <p><strong>Why our program?</strong></p>
            <ul className="list-disc pl-4 space-y-2">
              <li>All students are taught that martial arts are to be used only as a last resort.</li>
              <li>Our students learn a variety of blocks and take-downs applicable to threatening situations.</li>
              <li>Students are always taught in a positive manner.</li>
              <li>One of the greatest benefits is a higher level of self-confidence.</li>
            </ul>
          </div>
          <div className="clear-both"></div>
        </div>
      )
    },
    {
      id: 'comparison',
      title: 'Choosing a Program',
      type: 'text-image',
      content: (
        <div className="space-y-6">
          <div className="float-right ml-6 mb-4 w-1/3 max-w-[200px]">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300"
              alt="Programs"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="prose prose-lg text-gray-600">
            <p>When you're looking for a program, it helps to know what matters to you and your family.</p>
            <p>We focus on self-discipline, respect, and personal growth in a supportive environment.</p>
            <p><strong>What to consider</strong></p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Quality and style of instruction</li>
              <li>Facility safety and cleanliness</li>
              <li>Atmosphere and culture</li>
              <li>Schedule and location</li>
            </ul>
            <p><strong>How to choose</strong></p>
            <p>We recommend visiting in person, trying a trial session, and asking questions. Finding the right fit makes a big difference in long-term success and enjoyment.</p>
          </div>
          <div className="clear-both"></div>
        </div>
      )
    },
    {
      id: 'korean-terms',
      title: 'Video Resources',
      type: 'grid-video',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Intro to Basics", vid: "3AtDnEC4zk0" },
            { title: "Getting Started", vid: "3AtDnEC4zk0" },
            { title: "Next Steps", vid: "3AtDnEC4zk0" },
            { title: "Practice Tips", vid: "3AtDnEC4zk0" },
            { title: "Building Skills", vid: "3AtDnEC4zk0" }
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <div className="aspect-video w-full bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${item.vid}?rel=0`}
                  title={item.title}
                  referrerPolicy="strict-origin-when-cross-origin"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4 bg-brand-dark text-white text-center font-bold">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'basic-movement',
      title: 'Basic Movement',
      type: 'audio',
      content: (
        <div className="w-full">
          <audio controls className="w-full">
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )
    },
    {
      id: 'breathing-form',
      title: 'Breathing Form',
      type: 'audio',
      content: (
        <div className="w-full">
          <audio controls className="w-full">
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )
    }
  ];

  return (
    <div className="pt-0 bg-white">
      {/* Page Header */}
      <div className="relative h-[400px] w-full overflow-hidden bg-brand-dark flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200)` }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 container mx-auto px-4 pt-20">
          <motion.div
            initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Education
            </h1>
            <div className="w-24 h-1 bg-brand-red rounded-full"></div>
            <p className="text-gray-300 mt-4 text-lg">
              Learn more about our programs, benefits, and resources.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 transition-colors text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  {openSection === section.id ? <Minus size={20} className="text-brand-red shrink-0" /> : <Plus size={20} className="text-gray-400 shrink-0" />}
                  <h3 className="font-bold text-lg text-gray-900">{section.title}</h3>
                </div>
                {section.type === 'video-feature' && <Video size={20} className="text-gray-400 hidden sm:block" />}
                {section.type === 'grid-video' && <Play size={20} className="text-gray-400 hidden sm:block" />}
                {section.type === 'audio' && <Music size={20} className="text-gray-400 hidden sm:block" />}
              </button>

              <AnimatePresence>
                {openSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 md:p-8 border-t border-gray-100 bg-white">
                      {section.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-brand-dark py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rotate-45"></div>
        <div className="container mx-auto px-4 relative z-10">
          <span className="block text-xl md:text-2xl font-heading font-bold text-white uppercase tracking-widest mb-8">
            Ready to start learning?
          </span>
          <Link
            to="/get-started"
            className="inline-block bg-brand-red text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all hover:scale-105 shadow-xl shadow-red-900/20"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;