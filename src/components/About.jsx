import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { t } from '../locales';

const About = () => {
    const { lang } = useContext(AppContext);
    const dict = t[lang];

    return (
        <section id="about" style={{ padding: '10px 20px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                        {dict.aboutDesc}
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;