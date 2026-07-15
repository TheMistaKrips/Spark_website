import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Cpu, HardDrive, Mail } from 'lucide-react';

const navItems = [
    { id: 'about', icon: Box },
    { id: 'features', icon: Cpu },
    { id: 'specs', icon: HardDrive },
    { id: 'contact', icon: Mail },
];

const StickyLiquidNav = () => {
    const [activeId, setActiveId] = useState('about');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 1100);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollCenter = window.scrollY + window.innerHeight * 0.4;

                    let currentId = 'about';
                    for (const item of navItems) {
                        const section = document.getElementById(item.id);
                        if (section) {
                            const offsetTop = section.offsetTop;
                            const offsetHeight = section.offsetHeight;
                            if (scrollCenter >= offsetTop && scrollCenter < offsetTop + offsetHeight) {
                                currentId = item.id;
                            }
                        }
                    }
                    setActiveId(currentId);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        setTimeout(handleScroll, 500); // Initial check after render
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (id) => {
        setActiveId(id);
        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const containerVars = {
        hidden: { opacity: 0, scale: 0.8, x: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.5
            }
        }
    };

    return (
        <div style={{
            position: 'fixed',
            zIndex: 999,
            right: isMobile ? 'auto' : '40px',
            bottom: isMobile ? '30px' : 'auto',
            left: isMobile ? '50%' : 'auto',
            top: isMobile ? 'auto' : '50%',
            transform: isMobile ? 'translateX(-50%)' : 'translateY(-50%)',
            willChange: 'transform'
        }}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVars}
                style={{
                    position: 'relative',
                    isolation: 'isolate',
                    cursor: 'pointer',
                    WebkitTapHighlightColor: 'transparent',
                    display: 'flex',
                    flexDirection: isMobile ? 'row' : 'column',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50px',
                    padding: isMobile ? '8px 20px' : '20px 8px',
                    gap: isMobile ? '20px' : '15px'
                }}
            >
                {navItems.map((item) => {
                    const isActive = activeId === item.id;

                    return (
                        <div
                            key={item.id}
                            onClick={() => handleClick(item.id)}
                            style={{
                                position: 'relative',
                                width: '50px',
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-blob"
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30
                                    }}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: '50%',
                                        background: '#ffffff',
                                        zIndex: 1
                                    }}
                                />
                            )}
                            <div style={{
                                color: isActive ? '#111111' : '#666666',
                                transition: 'color 0.3s ease',
                                position: 'relative',
                                zIndex: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default StickyLiquidNav;