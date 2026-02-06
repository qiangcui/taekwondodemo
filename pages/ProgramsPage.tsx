import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProgramSection: React.FC<{
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  content: React.ReactNode;
  isReversed?: boolean;
  titleClass?: string;
  fullBleed?: boolean;
  cleanImage?: boolean;
  imageContainerClass?: string;
}> = ({ id, title, subtitle, image, content, isReversed, titleClass = '', fullBleed = false, cleanImage = false, imageContainerClass = 'relative' }) => {
  return (
    <section id={id} className={`overflow-hidden ${fullBleed ? 'bg-white' : 'py-20 bg-gray-50'}`}>
      <div className={fullBleed ? 'w-full' : 'container mx-auto px-4'}>
        <div className={`flex flex-col lg:flex-row items-stretch ${isReversed ? 'lg:flex-row-reverse' : ''}`}>

          {fullBleed ? (
            <>
              {/* Image Side - Full Bleed */}
              <motion.div
                className={`lg:w-1/2 ${imageContainerClass}`}
                initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img src={image} alt={title} className="w-full h-full object-cover" />
              </motion.div>

              {/* Content Side */}
              <motion.div
                className={`lg:w-1/2 py-20 ${isReversed ? 'lg:pl-16' : 'lg:pr-16'} px-6 md:px-12 flex flex-col justify-center items-start`}
                initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className={`font-heading text-4xl md:text-5xl font-bold mb-4 ${titleClass}`}>{title}</h2>
                {subtitle && (
                  <h4 className="font-heading text-xl md:text-2xl font-bold text-brand-dark mb-6">{subtitle}</h4>
                )}
                <div className="prose prose-lg text-gray-600 mb-8">
                  {content}
                </div>
                <Link
                  to="/get-started"
                  className="inline-block bg-brand-red text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg"
                >
                  SIGN UP
                </Link>
              </motion.div>
            </>
          ) : (
            <>
              {/* Content Side */}
              <motion.div
                className="lg:w-1/2"
                initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className={`font-heading text-4xl md:text-5xl font-bold mb-4 ${titleClass}`}>{title}</h2>
                {subtitle && (
                  <h4 className="font-heading text-xl md:text-2xl font-bold text-brand-dark mb-6">{subtitle}</h4>
                )}
                <div className="prose prose-lg text-gray-600 mb-8">
                  {content}
                </div>
              </motion.div>

              {/* Image Side */}
              <motion.div
                className="lg:w-1/2 w-full"
                initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {cleanImage ? (
                  /* Clean Image Style (No shadow/radius/zoom) */
                  <img src={image} alt={title} className="w-full h-auto object-cover" />
                ) : (
                  /* Styled Image (Shadow, radius, hover zoom) */
                  <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                )}
              </motion.div>
            </>
          )}

        </div>
      </div>
    </section>
  );
};

const ProgramsPage: React.FC = () => {
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
              Our Programs
            </h1>
            <div className="w-24 h-1 bg-brand-red rounded-full"></div>
          </motion.div>
        </div>
      </div>

      {/* Little Tigers */}
      <ProgramSection
        id="little-tigers"
        title="Kids Program"
        titleClass="text-black"
        fullBleed={true}
        image="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800"
        content={
          <>
            <p className="mb-4">
              Our kids program is designed for ages 4–5. We combine fun activities with clear structure so young children build focus, confidence, and basic skills in a positive setting.
            </p>
            <p className="mb-4">
              Classes are short and engaging, with an emphasis on participation and encouragement.
            </p>
            <p className="mb-6">
              Many families see improved focus and confidence at home and at school. Our instructors are patient and experienced with this age group.
            </p>
            <h4 className="font-bold text-gray-900 mb-3">Benefits include:</h4>
            <ul className="space-y-2">
              {[
                'Focus and self-control',
                'Working toward goals',
                'Structured, positive environment',
                'Building confidence',
                'Active, fun outlet',
                'Supportive instructors'
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-2 text-black">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        }
      />

      {/* Children's Classes */}
      <ProgramSection
        id="children"
        title="Children's Classes"
        subtitle="Give your child a fun, challenging way to learn and grow!"
        image="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800"
        isReversed={true}
        fullBleed={true}
        content={
          <>
            <p className="mb-6">
              Our youth program builds discipline, focus, and confidence in a fun, active setting. Participants gain skills that help at school and at home while staying engaged and motivated.
            </p>
            <h4 className="font-bold text-gray-900 mb-3">We offer classes by age:</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-brand-red rounded-full mr-3"></div>
                <span>Kids Program <strong className="text-brand-dark">(age 4-5)</strong></span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-brand-red rounded-full mr-3"></div>
                <span>Youth Class <strong className="text-brand-dark">(age 6-12)</strong></span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-brand-red rounded-full mr-3"></div>
                <span>Family Class <strong className="text-brand-dark">(All Ages)</strong></span>
              </li>
            </ul>
          </>
        }
      />

      {/* Family Classes */}
      <ProgramSection
        id="family"
        title="Family Classes"
        subtitle="Learn and grow together as a family!"
        image="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800"
        fullBleed={true}
        content={
          <>
            <p className="mb-4">
              Family classes let you get active and learn together in one place. Our sessions are designed so all ages can participate, share goals, and spend quality time as a family. Schedules are flexible to fit your routine.
            </p>
            <p className="mb-6">
              We also run special events and opportunities to connect with other families and build community. These include:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'Special workshops',
                'Progress events',
                'Community outings',
                'Local charity events',
                'Summer programs',
                'Seasonal parties',
                'Family nights'
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle size={18} className="text-brand-red mr-2 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        }
      />

      {/* Adult Classes */}
      <ProgramSection
        id="adult"
        title="Adult Classes"
        subtitle="Our adult program offers many benefits!"
        image="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800"
        imageContainerClass="relative h-96 lg:h-[750px]"
        isReversed={true}
        fullBleed={true}
        content={
          <>
            <p className="mb-6">
              Our adult program offers a full-body workout that builds strength, flexibility, and endurance. Classes mix stretching, conditioning, and skill work so you stay engaged and see progress.
            </p>
            <p>
              Many participants notice improved energy, confidence, and stress relief. Classes are varied so you stay motivated and can attend regularly at your own pace.
            </p>
          </>
        }
      />

      {/* CTA Section */}
      <div className="bg-brand-dark py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rotate-45"></div>
        <div className="container mx-auto px-4 relative z-10">
          <span className="block text-xl md:text-2xl font-heading font-bold text-white uppercase tracking-widest mb-8">
            Ready to join us?
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

export default ProgramsPage;