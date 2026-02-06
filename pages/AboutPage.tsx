import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
    const affiliations = [
        { name: 'Partner A', src: 'https://placehold.co/120x80/333/fff?text=Partner+A' },
        { name: 'Partner B', src: 'https://placehold.co/120x80/333/fff?text=Partner+B' },
        { name: 'Partner C', src: 'https://placehold.co/120x80/333/fff?text=Partner+C' },
        { name: 'Partner D', src: 'https://placehold.co/120x80/333/fff?text=Partner+D' },
    ];

    return (
        <div className="pt-0 bg-white">
            {/* Page Header */}
            <div className="relative h-[400px] w-full overflow-hidden bg-brand-dark flex items-center">
                {/* Reuse exterior image for consistency */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200)` }}
                ></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 pt-20">
                    <motion.div
                        initial={typeof window !== 'undefined' && window.innerWidth < 768 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                            About Us
                        </h1>
                        <div className="w-24 h-1 bg-brand-red rounded-full"></div>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">

                {/* Master Lee Section */}
                <div className="flex flex-col lg:flex-row gap-16 items-center mb-8">
                    <motion.div
                        className="lg:w-1/2 flex justify-center w-full"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
                            alt="Lead Instructor"
                            className="w-full h-auto max-w-[240px] md:max-w-[360px] mx-auto"
                        />
                    </motion.div>

                    <motion.div
                        className="lg:w-1/2 text-center lg:text-left"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading text-4xl font-bold text-gray-900 mb-2">Alex Chen</h2>
                        <h3 className="text-xl text-brand-red font-bold uppercase tracking-wide mb-6">Head Instructor</h3>

                        <div className="prose prose-lg text-gray-600 space-y-4">
                            <p>
                                Alex has over 15 years of teaching and coaching experience. He is passionate about helping people of all ages build confidence and reach their goals.
                            </p>
                            <p>
                                Before joining Demo Academy, he led programs at several community centers and built a strong reputation for clear, supportive instruction.
                            </p>
                            <p>
                                He believes in combining high standards with a positive, welcoming environment so that every participant can progress at their own pace.
                            </p>
                            <p>
                                Alex holds relevant certifications in instruction and safety, and is committed to ongoing training so our programs stay current and effective.
                            </p>
                            <p>
                                At Demo Academy, he works with the team to design programs that are both challenging and accessible, so everyone can see progress and feel supported.
                            </p>
                            <p>
                                He is certified in First Aid and CPR and stays active in professional development to keep our offerings up to date.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Affiliations 1 */}
                <div className="mb-12 bg-white pb-6 px-4 md:px-12">
                    <h3 className="font-heading text-2xl font-bold text-center mb-6 text-gray-800 uppercase tracking-wider">Affiliations</h3>
                    <div className="flex flex-wrap justify-center gap-12 items-center">
                        {affiliations.map((logo, idx) => (
                            <img
                                key={idx}
                                src={logo.src}
                                alt={logo.name}
                                className="h-24 w-auto object-contain hover:scale-110 transition-transform duration-300"
                            />
                        ))}
                    </div>
                </div>

                {/* Heejeong Lee Section */}
                <div className="flex flex-col lg:flex-row gap-16 items-center mb-8">
                    <motion.div
                        className="lg:w-1/2 order-2 lg:order-1 text-center lg:text-left"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading text-4xl font-bold text-gray-900 mb-6">Sam Rivera</h2>
                        <div className="prose prose-lg text-gray-600 space-y-4">
                            <p>
                                Sam brings a background in education and community programs. She has worked with youth and families for over a decade.
                            </p>
                            <p>
                                She believes that learning works best in a supportive, inclusive environment where everyone can contribute and grow.
                            </p>
                            <blockquote className="border-l-4 border-brand-red pl-4 italic text-gray-800 bg-gray-50 py-2 pr-2 my-4 text-left">
                                The Wind Ensemble’s album, “Fireworks” would later go on to become a Grammy Entry List in the Best Classical Album and Best Orchestral Performance categories.
                            </blockquote>
                            <p>
                                At Demo Academy, Sam helps design programs that are engaging for all ages.
                            </p>
                            <p>
                                She works closely with our instructors to keep our curriculum effective and fun.
                            </p>
                            <p className="font-medium text-brand-dark">
                                She holds certifications in program design and youth development.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end w-full"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400"
                            alt="Team"
                            className="w-full h-auto max-w-[240px] md:max-w-[360px] mx-auto lg:mx-0"
                        />
                    </motion.div>
                </div>

                {/* Affiliations 2 */}
                <div className="bg-white pb-6 px-4 md:px-12">
                    <h3 className="font-heading text-2xl font-bold text-center mb-6 text-gray-800 uppercase tracking-wider">Affiliations</h3>
                    <div className="flex flex-wrap justify-center gap-12 items-center">
                        {affiliations.map((logo, idx) => (
                            <img
                                key={idx}
                                src={logo.src}
                                alt={logo.name}
                                className="h-24 w-auto object-contain hover:scale-110 transition-transform duration-300"
                            />
                        ))}
                    </div>
                </div>

            </div>

            {/* CTA Section */}
            <div className="bg-brand-dark py-16 text-center relative overflow-hidden">
                {/* Decorative Triangle */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rotate-45"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <span className="block text-xl md:text-2xl font-heading font-bold text-white uppercase tracking-widest mb-8">
                        Schedule a trial. It only takes a minute.
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

export default AboutPage;