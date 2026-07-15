import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#111111',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}
        >
            <div style={{
                position: 'relative',
                width: 120,
                height: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* Внешнее кольцо (Золотое) */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 2.2,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.02)',
                        borderTop: '2px solid #D49D4D',
                        borderRight: '2px solid rgba(224, 211, 128, 0.4)'
                    }}
                />

                {/* Внутреннее кольцо (Белое) */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 2.8,
                        ease: "linear"
                    }}
                    style={{
                        position: 'absolute',
                        width: '70%',
                        height: '70%',
                        borderRadius: '50%',
                        border: '1px solid rgba(255, 255, 255, 0.02)',
                        borderBottom: '1px solid #ffffff',
                        borderLeft: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                />

                {/* Логотип по центру */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 1
                    }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                    style={{
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <img
                        src="/spark.png"
                        alt="Spark Logo"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                        }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Preloader;