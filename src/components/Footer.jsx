import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { t } from '../locales';
import Modal from './Modal';

const Footer = () => {
    const { lang, theme } = useContext(AppContext);
    const dict = t[lang];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <footer id="contact" style={{
            padding: '80px 20px 40px',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-color)',
            transition: 'background-color 0.4s ease'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '60px' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    gap: '40px'
                }}>

                    {/* Левая часть: Логотип и описание */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{
                                fontSize: 'clamp(3rem, 8vw, 6rem)',
                                fontWeight: 900,
                                lineHeight: 1,
                                letterSpacing: '-0.04em',
                                margin: '0 0 20px 0',
                                color: 'var(--text-main)'
                            }}
                        >
                            SPARK.
                        </motion.h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: 0, maxWidth: '400px' }}>
                            {dict.heroDesc.substring(0, 75)}...
                        </p>
                    </div>

                    {/* Правая часть: Контакты и кнопка заявки */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMobile ? 'flex-start' : 'flex-end',
                        gap: '24px'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            alignItems: isMobile ? 'flex-start' : 'flex-end'
                        }}>
                            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                                {dict.navContact}
                            </h4>
                            <a
                                href="mailto:fetisovdev0@gmail.com"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: 'var(--text-muted)',
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    transition: 'color 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.color = 'var(--text-main)'}
                                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                            >
                                <Mail size={18} /> fetisovdev0@gmail.com
                            </a>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="gold-gradient-noise"
                            onClick={() => setIsModalOpen(true)}
                            style={{
                                padding: '14px 32px',
                                borderRadius: '100px',
                                fontSize: '1rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 10px 25px rgba(212, 157, 77, 0.15)'
                            }}
                        >
                            {dict.btnApply}
                        </motion.button>
                    </div>
                </div>

                {/* Нижняя полоса с копирайтом */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '30px',
                    borderTop: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                            src="/spark.png"
                            alt="Spark Mini"
                            style={{
                                width: '16px',
                                height: '16px',
                                filter: theme === 'light' ? 'invert(1)' : 'none',
                                transition: 'filter 0.4s ease'
                            }}
                        />
                        <span style={{ fontWeight: 600 }}>Spark Inc.</span>
                    </div>
                    <div>
                        © {new Date().getFullYear()} Spark Inc.
                    </div>
                </div>
            </div>

            {/* Модальное окно */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </footer>
    );
};

export default Footer;