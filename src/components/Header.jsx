import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { LiquidGlass } from 'react-glassy';
import 'react-glassy/styles.css';
import { AppContext } from '../context/AppContext';
import { t } from '../locales';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const { lang, toggleLang, theme, setTheme } = useContext(AppContext);
    const dict = t[lang];

    // Состояние для анимации заливки темы
    const [themeFill, setThemeFill] = useState({ active: false, x: 0, y: 0, newTheme: 'dark' });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 968);
            if (window.innerWidth >= 968) setMobileMenuOpen(false);
        };
        checkMobile();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', checkMobile);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const navLinks = [
        { name: dict.navAbout, href: '#about' },
        { name: dict.navFeatures, href: '#features' },
        { name: dict.navSpecs, href: '#specs' },
        { name: dict.navContact, href: '#contact' }
    ];

    const handleThemeToggle = (e) => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setThemeFill({ active: true, x: e.clientX, y: e.clientY, newTheme });

        setTimeout(() => {
            setTheme(newTheme);
        }, 150); // Меняем стейт в середине анимации

        setTimeout(() => {
            setThemeFill({ active: false, x: 0, y: 0, newTheme: 'dark' });
        }, 800);
    };

    return (
        <>
            {/* Анимация заливки темы на весь экран */}
            <AnimatePresence>
                {themeFill.active && (
                    <motion.div
                        initial={{ clipPath: `circle(0px at ${themeFill.x}px ${themeFill.y}px)` }}
                        animate={{ clipPath: `circle(150vw at ${themeFill.x}px ${themeFill.y}px)` }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: [0.64, 0, 0.12, 1] }}
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: themeFill.newTheme === 'dark' ? '#111111' : '#f5f5f7',
                            zIndex: 99999,
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                <motion.header
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    style={{
                        position: 'fixed',
                        left: 0, right: 0,
                        margin: '0 auto',
                        top: scrolled ? '15px' : '24px',
                        width: isMobile ? '92%' : 'fit-content',
                        maxWidth: '1200px',
                        minWidth: isMobile ? 'auto' : '800px',
                        zIndex: 1000,
                        transition: 'top 0.3s ease'
                    }}
                >
                    <LiquidGlass
                        preset="frost"
                        config={{
                            borderRadius: '32px',
                            tint: theme === 'dark' ? 'rgba(17,17,17,0.4)' : 'rgba(255,255,255,0.4)',
                            blur: '10px',
                            frost: 'none',
                            specular: 'true'
                        }}
                    >
                        <div style={{
                            padding: '12px 24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: `1px solid var(--border-color)`,
                            borderRadius: '32px'
                        }}>
                            {/* Логотип */}
                            <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <img
                                    src="/spark.png"
                                    alt="Spark"
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        objectFit: 'contain',
                                        filter: theme === 'light' ? 'invert(1)' : 'none'
                                    }}
                                />
                                <span style={{
                                    fontWeight: 800,
                                    fontSize: '1.2rem',
                                    color: 'var(--text-main)',
                                    letterSpacing: '-0.02em',
                                    fontFamily: 'Montserrat, sans-serif'
                                }}>
                                    SPARK
                                </span>
                            </a>

                            {/* Навигация Desktop */}
                            {!isMobile && (
                                <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                                    {navLinks.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'var(--text-muted)',
                                                fontWeight: 600,
                                                fontSize: '0.9rem',
                                                transition: 'color 0.2s',
                                                fontFamily: 'Montserrat, sans-serif'
                                            }}
                                            onMouseEnter={(e) => e.target.style.color = 'var(--text-main)'}
                                            onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </nav>
                            )}

                            {/* Контролы */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <button
                                    onClick={toggleLang}
                                    style={{
                                        background: 'transparent', border: 'none', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: '6px',
                                        color: 'var(--text-main)', fontWeight: 700, fontSize: '0.9rem'
                                    }}
                                >
                                    <Globe size={18} /> {lang.toUpperCase()}
                                </button>

                                <button
                                    onClick={handleThemeToggle}
                                    style={{
                                        background: 'transparent', border: 'none', cursor: 'pointer',
                                        color: 'var(--text-main)', display: 'flex', alignItems: 'center'
                                    }}
                                >
                                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                </button>

                                {/* Мобильная кнопка меню */}
                                {isMobile && (
                                    <div
                                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                        style={{ color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                    >
                                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Мобильное меню */}
                        <AnimatePresence>
                            {isMobile && mobileMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {navLinks.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                style={{
                                                    padding: '14px 20px',
                                                    borderRadius: '16px',
                                                    textDecoration: 'none',
                                                    color: 'var(--text-main)',
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                    background: 'var(--card-bg)',
                                                    border: '1px solid var(--border-color)',
                                                    fontFamily: 'Montserrat, sans-serif'
                                                }}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </LiquidGlass>
                </motion.header>
            </AnimatePresence>
        </>
    );
};

export default Header;