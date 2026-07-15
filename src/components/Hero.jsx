import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { t } from '../locales';
import Modal from './Modal';

const Hero = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { lang, theme } = useContext(AppContext);
    const dict = t[lang];

    return (
        <section style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Видео-фон */}
            <video
                src="/assets/animation.mp4"
                autoPlay loop muted playsInline
                style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    objectFit: 'cover',
                    opacity: theme === 'dark' ? 0.35 : 0.15,
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />

            <div style={{
                position: 'absolute',
                inset: 0,
                background: theme === 'dark'
                    ? 'radial-gradient(circle at center, rgba(17, 17, 17, 0.2) 0%, #111111 90%)'
                    : 'radial-gradient(circle at center, rgba(245, 245, 247, 0.4) 0%, #f5f5f7 90%)',
                zIndex: 1,
                pointerEvents: 'none'
            }} />

            {/* Контент */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                maxWidth: '650px',
                textAlign: 'center',
                padding: '0 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px'
            }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                        fontWeight: 900,
                        lineHeight: 1.15,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-main)',
                        margin: 0
                    }}
                >
                    {dict.heroTitle.split('.').map((part, i) => (
                        <React.Fragment key={i}>
                            {part}{i !== dict.heroTitle.split('.').length - 1 && '.'}
                            {i === 0 && <br />}
                        </React.Fragment>
                    ))}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{
                        fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                        color: 'var(--text-muted)',
                        lineHeight: 1.6,
                        fontWeight: 500,
                        margin: 0
                    }}
                >
                    {dict.heroDesc}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="gold-gradient-noise"
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            padding: '16px 36px',
                            borderRadius: '100px',
                            fontSize: '1rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            marginTop: '10px',
                            boxShadow: '0 10px 30px rgba(212, 157, 77, 0.2)'
                        }}
                    >
                        {dict.btnApply}
                    </motion.button>
                </motion.div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
};

export default Hero;