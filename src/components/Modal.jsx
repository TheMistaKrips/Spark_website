import React, { useEffect, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '../config';
import { AppContext } from '../context/AppContext';
import { t } from '../locales';

const Modal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', telegram: '' });
    const [status, setStatus] = useState('idle');
    const { lang } = useContext(AppContext);
    const dict = t[lang];

    useEffect(() => {
        const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
            setStatus('idle');
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        const message = `Новая заявка на SPARK:\nИмя: ${formData.name}\nEmail: ${formData.email}\nTelegram: ${formData.telegram}`;

        try {
            const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
            });
            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', telegram: '' });
                setTimeout(() => onClose(), 3000);
            } else setStatus('error');
        } catch {
            setStatus('error');
        }
    };

    const inputStyle = {
        width: '100%', padding: '16px',
        backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)',
        borderRadius: '12px', color: 'var(--text-main)', fontSize: '1rem',
        outline: 'none', marginBottom: '16px', fontFamily: 'Montserrat, sans-serif'
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
                        style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)' }} />

                    <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        style={{ position: 'relative', width: '100%', maxWidth: '480px', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '40px' }}>

                        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>

                        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '10px', color: 'var(--text-main)' }}>{dict.modalTitle}</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '30px', lineHeight: 1.5 }}>{dict.modalDesc}</p>

                        {status === 'success' ? (
                            <div style={{ padding: '20px', backgroundColor: 'rgba(212,157,77,0.1)', border: '1px solid #D49D4D', borderRadius: '16px', textAlign: 'center', color: '#D49D4D' }}>
                                <h3 style={{ margin: '0 0 10px 0' }}>{dict.successMsg}</h3>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="name" placeholder={dict.formName} required value={formData.name} onChange={handleChange} style={inputStyle} />
                                <input type="email" name="email" placeholder={dict.formEmail} required value={formData.email} onChange={handleChange} style={inputStyle} />
                                <input type="text" name="telegram" placeholder={dict.formTg} required value={formData.telegram} onChange={handleChange} style={inputStyle} />
                                {status === 'error' && <p style={{ color: '#ff4444', fontSize: '0.9rem', marginBottom: '16px' }}>{dict.errorMsg}</p>}
                                <button type="submit" disabled={status === 'loading'} className="gold-gradient-noise" style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '1rem', fontWeight: 700, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}>
                                    {status === 'loading' ? dict.btnLoading : dict.btnSubmit}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;