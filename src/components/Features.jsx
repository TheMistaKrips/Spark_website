import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { t } from '../locales';

const Features = () => {
    const [isMobile, setIsMobile] = useState(false);
    const { lang, theme } = useContext(AppContext);
    const dict = t[lang];

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 900);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Компонент карточки для обеих сеток
    const Card = ({ title, desc, imageSrc, span, glassy = false }) => (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -5 }}
            style={{
                gridColumn: isMobile ? 'span 1' : span,
                backgroundColor: glassy
                    ? (theme === 'dark' ? 'rgba(22, 22, 22, 0.7)' : 'rgba(255, 255, 255, 0.7)')
                    : 'var(--card-bg)',
                backdropFilter: glassy ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: glassy ? 'blur(20px)' : 'none',
                borderRadius: '32px',
                padding: '24px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                overflow: 'hidden',
                boxShadow: glassy ? '0 20px 40px rgba(0,0,0,0.1)' : 'none'
            }}
        >
            <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#111' }}>
                <img src={imageSrc} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '0 8px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 10px 0', color: 'var(--text-main)' }}>
                    {title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                    {desc}
                </p>
            </div>
        </motion.div>
    );

    return (
        <section id="features">
            {/* БЛОК 1: Аппаратные возможности (Железо) */}
            <div style={{ padding: '80px 20px', backgroundColor: 'var(--bg-color)', transition: 'background-color 0.4s ease' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, margin: '0 0 20px 0', color: 'var(--text-main)' }}>
                            {dict.featTitle}
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                            {dict.featDesc}
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
                        <Card title={dict.feat1Title} desc={dict.feat1Desc} imageSrc="/assets/desktop.jpeg" span="span 2" />
                        <Card title={dict.feat2Title} desc={dict.feat2Desc} imageSrc="/assets/front.jpeg" span="span 1" />
                        <Card title={dict.feat3Title} desc={dict.feat3Desc} imageSrc="/assets/back.jpeg" span="span 1" />
                        <Card title={dict.feat4Title} desc={dict.feat4Desc} imageSrc="/assets/exploded.jpeg" span="span 2" />
                    </div>
                </div>
            </div>

            {/* БЛОК 2: Программное обеспечение (с видео на фоне animation2.mp4) */}
            <div style={{
                position: 'relative',
                padding: '120px 20px',
                overflow: 'hidden',
                borderTop: '1px solid var(--border-color)',
                borderBottom: '1px solid var(--border-color)'
            }}>
                {/* Анимация разобранного куба на фоне */}
                <video
                    src="/assets/animation2.mp4"
                    autoPlay loop muted playsInline
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, width: '100%', height: '100%',
                        objectFit: 'cover',
                        zIndex: 0,
                        opacity: theme === 'dark' ? 0.4 : 0.2,
                        pointerEvents: 'none'
                    }}
                />

                {/* Адаптивный оверлей поверх видео */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: theme === 'dark'
                        ? 'radial-gradient(circle at center, rgba(17, 17, 17, 0.4) 0%, rgba(17, 17, 17, 0.8) 100%)'
                        : 'radial-gradient(circle at center, rgba(245, 245, 247, 0.4) 0%, rgba(245, 245, 247, 0.8) 100%)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    zIndex: 1,
                    pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, margin: '0 0 20px 0', color: 'var(--text-main)' }}
                        >
                            {dict.softTitle}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}
                        >
                            {dict.softDesc}
                        </motion.p>
                    </div>

                    {/* Сетка приложения (2 колонки) - карточки с эффектом стекла */}
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
                        <Card
                            title={dict.softAppMainTitle}
                            desc={dict.softAppMainDesc}
                            imageSrc="/assets/app_main.png"
                            span="span 1"
                            glassy={true}
                        />
                        <Card
                            title={dict.softAppChatTitle}
                            desc={dict.softAppChatDesc}
                            imageSrc="/assets/app_chat.png"
                            span="span 1"
                            glassy={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;