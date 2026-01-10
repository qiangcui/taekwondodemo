import React from 'react';
import { motion } from 'framer-motion';
import { Program } from '../types';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const programsData: Program[] = [
  {
    id: 'little-tigers',
    title: 'Little Tigers',
    ageGroup: '(4-5 yr olds)',
    description: 'Working through a martial art and the belt ranking system gives kids measurable goals to follow that are realistic to attain. The sense of accomplishment a child feels by mastering a new technique or graduating to a new belt follows him everywhere he goes!',
    image: 'https://www.tigerleestkd.com/wp-content/uploads/2018/04/little-tigers-class.jpg'
  },
  {
    id: 'children',
    title: "Children’s Class",
    ageGroup: '(6-12 yr olds)',
    description: 'Working through a martial art and the belt ranking system gives kids measurable goals to follow that are realistic to attain. The sense of accomplishment a child feels by mastering a new technique or graduating to a new belt follows him everywhere he goes!',
    image: 'https://www.tigerleestkd.com/wp-content/uploads/2018/04/children-class.jpg'
  },
  {
    id: 'family',
    title: 'Family Class',
    ageGroup: '(Kids & Adult)',
    description: 'At Tiger Lee’s , we teach families, as well as individuals. The change in a family’s demeanor after a few months is amazing. It becomes a source of fitness and team building with a bit of friendly competition, too. Many families will find that they have something in common and will share their time on an off the mat.',
    image: 'https://www.tigerleestkd.com/wp-content/uploads/2018/04/family-class-large.jpg'
  },
  {
    id: 'adult',
    title: 'Adult Class',
    ageGroup: '(13 yr olds and up)',
    description: 'Do you need more energy, a boost in self-confidence and a great way to reduce stress? Then Tae Kwon Do may be the perfect fitness program for you!',
    image: 'https://www.tigerleestkd.com/wp-content/uploads/2018/04/adult-classes.jpg'
  }
];

const Programs: React.FC = () => {
  return (
    <section id="programs" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-gray-900 uppercase tracking-tight mb-4">Our Programs</h2>
          <div className="w-24 h-1 bg-brand-red mx-auto rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programsData.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[500px] overflow-hidden rounded-2xl bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center text-center p-8">
                
                {/* Title Section */}
                <div className="mt-2 mb-2">
                    <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2 tracking-wide leading-none">{program.title}</h3>
                    <span className="text-brand-red font-bold uppercase tracking-widest text-xs md:text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                        {program.ageGroup}
                    </span>
                </div>
                
                {/* Description */}
                <div className="flex-grow flex items-center justify-center">
                    <p 
                        className="text-gray-100 text-base md:text-lg font-light opacity-90 drop-shadow-md"
                        style={{ lineHeight: '2.3rem' }}
                    >
                        {program.description}
                    </p>
                </div>

                {/* Button inside card */}
                <div className="mb-4">
                     <Link 
                        to={`/programs#${program.id}`} 
                        className="group/btn flex items-center space-x-3 text-white text-xs md:text-sm font-bold tracking-[0.2em] uppercase hover:text-brand-red transition-colors"
                     >
                        <span>Get Started</span>
                        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover/btn:bg-brand-red group-hover/btn:border-brand-red group-hover/btn:text-white transition-all bg-white/10 backdrop-blur-sm">
                            <ChevronRight size={14} />
                        </div>
                     </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Programs Button - Updated Style */}
        <div className="flex justify-center mt-12">
            <Link 
                to="/programs" 
                className="inline-block bg-brand-red text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all hover:scale-105 shadow-xl shadow-red-900/20"
            >
                View All Programs
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Programs;