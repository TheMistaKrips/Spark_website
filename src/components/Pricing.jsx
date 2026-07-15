import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Добавил ArrowRight в импорт, чтобы исправить ошибку
import { Check, X, Zap, Crown, Building2, ArrowRight } from 'lucide-react';

const plans = [
    {
        id: 'starter',
        name: 'Starter',
        icon: <Zap size={24} />,
        price: { monthly: 29, yearly: 24 },
        desc: 'Для начинающих предпринимателей',
        features: [
            { text: '1 Telegram Бот', included: true },
            { text: '500 Пользователей', included: true },
            { text: 'Базовая админка', included: true },
            { text: 'Crypto Платежи', included: true },
            { text: 'API Доступ', included: false },
            { text: 'Whitelabel', included: false },
        ],
        popular: false,
        color: '#10b981'
    },
    {
        id: 'pro',
        name: 'Pro Business',
        icon: <Crown size={24} />,
        price: { monthly: 79, yearly: 65 },
        desc: 'Для быстрорастущих проектов',
        features: [
            { text: '5 Telegram Ботов', included: true },
            { text: '5,000 Пользователей', included: true },
            { text: 'Расширенная аналитика', included: true },
            { text: 'Все виды платежей', included: true },
            { text: 'Полный API', included: true },
            { text: 'Приоритетная поддержка', included: true },
        ],
        popular: true,
        color: '#f59e0b'
    },
    {
        id: 'enterprise',
        name: 'Empire',
        icon: <Building2 size={24} />,
        price: { monthly: 199, yearly: 165 },
        desc: 'Масштабирование без границ',
        features: [
            { text: 'Безлимитные боты', included: true },
            { text: 'Безлимитные юзеры', included: true },
            { text: 'Whitelabel (Свой бренд)', included: true },
            { text: 'Выделенный сервер', included: true },
            { text: 'Персональный менеджер', included: true },
            { text: 'SLA 99.9%', included: true },
        ],
        popular: false,
        color: '#8b5cf6'
    }
];

const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');
    // eslint-disable-next-line no-unused-vars
    const [hoveredPlan, setHoveredPlan] = useState(null);

    // Варианты анимации для контейнера
    const containerVars = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    // Варианты для карточек
    const cardVars = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 50, damping: 20 }
        }
    };

    return (
        <section id="pricing" style={{ padding: '6rem 20px', position: 'relative', overflow: 'hidden' }}>

            {/* Фоновый свет (Ambient Light) */}
            <div style={{
                position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
                width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
                filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

                {/* ЗАГОЛОВОК */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            fontSize: '3.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem',
                            letterSpacing: '-1px'
                        }}
                    >
                        Честные, прозрачные <span style={{ color: '#f59e0b' }}>цены</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: '1.2rem', color: '#64748b' }}
                    >

                        Никаких скрытых платежей. Отмените заказ в любое время.
                    </motion.p>

                    {/* ПЕРЕКЛЮЧАТЕЛЬ (TOGGLE) */}
                    <div style={{
                        display: 'inline-flex', marginTop: '2rem',
                        background: '#f1f5f9', padding: '4px', borderRadius: '16px',
                        position: 'relative'
                    }}>
                        {['monthly', 'yearly'].map((cycle) => (
                            <button
                                key={cycle}
                                onClick={() => setBillingCycle(cycle)}
                                style={{
                                    padding: '10px 24px', border: 'none', background: 'transparent',
                                    cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600,
                                    color: billingCycle === cycle ? '#0f172a' : '#64748b',
                                    position: 'relative', zIndex: 2, transition: 'color 0.2s'
                                }}
                            >
                                {cycle === 'monthly' ? 'Месяц' : 'Год (-20%)'}
                                {cycle === 'yearly' && (
                                    <span style={{
                                        position: 'absolute', top: -10, right: -10,
                                        background: '#10b981', color: 'white', fontSize: '0.7rem',
                                        padding: '2px 6px', borderRadius: 100
                                    }}>
                                        SAVE
                                    </span>
                                )}
                            </button>
                        ))}
                        {/* Анимированная подложка */}
                        <motion.div
                            layoutId="toggle-bg"
                            style={{
                                position: 'absolute', top: 4, bottom: 4,
                                left: billingCycle === 'monthly' ? 4 : '50%',
                                width: 'calc(50% - 4px)',
                                background: 'white',
                                borderRadius: '12px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                zIndex: 1
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    </div>
                </div>

                {/* КАРТОЧКИ (GRID) */}
                <motion.div
                    variants={containerVars}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2rem',
                        alignItems: 'start' // Чтобы карточки не растягивались
                    }}
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.id}
                            variants={cardVars}
                            onMouseEnter={() => setHoveredPlan(plan.id)}
                            onMouseLeave={() => setHoveredPlan(null)}
                            style={{
                                background: plan.popular ? '#0f172a' : 'white',
                                color: plan.popular ? 'white' : '#0f172a',
                                borderRadius: '24px',
                                padding: '32px',
                                position: 'relative',
                                border: plan.popular ? 'none' : '1px solid rgba(0,0,0,0.05)',
                                boxShadow: plan.popular
                                    ? '0 20px 50px rgba(15, 23, 42, 0.3)'
                                    : '0 10px 30px rgba(0,0,0,0.03)',
                                transform: plan.popular ? 'scale(1.05)' : 'none',
                                zIndex: plan.popular ? 2 : 1
                            }}
                        >
                            {/* Бейдж "Popular" */}
                            {plan.popular && (
                                <div style={{
                                    position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)',
                                    background: 'linear-gradient(90deg, #f59e0b, #d97706)',
                                    color: 'white', padding: '6px 16px', borderRadius: 100,
                                    fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.5px',
                                    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)'
                                }}>
                                    MOST POPULAR
                                </div>
                            )}

                            {/* Заголовок */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                <div style={{
                                    padding: 10, borderRadius: 12,
                                    background: plan.popular ? 'rgba(255,255,255,0.1)' : `${plan.color}15`,
                                    color: plan.popular ? 'white' : plan.color
                                }}>
                                    {plan.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{plan.name}</h3>
                                    <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.7 }}>{plan.desc}</p>
                                </div>
                            </div>

                            {/* Цена */}
                            <div style={{ marginBottom: 30 }}>
                                <span style={{ fontSize: '3rem', fontWeight: 800 }}>
                                    ${plan.price[billingCycle]}
                                </span>
                                <span style={{ opacity: 0.6, fontSize: '1rem' }}>/mo</span>
                            </div>

                            {/* Фичи */}
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {plan.features.map((feat, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: feat.included ? 1 : 0.4 }}>
                                        {feat.included
                                            ? <Check size={18} color={plan.popular ? '#10b981' : plan.color} />
                                            : <X size={18} />
                                        }
                                        <span style={{ fontSize: '0.95rem' }}>{feat.text}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Кнопка */}
                            <button style={{
                                width: '100%', padding: '16px', borderRadius: '16px',
                                border: 'none', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                                background: plan.popular ? 'white' : '#f1f5f9',
                                color: plan.popular ? '#0f172a' : '#0f172a',
                                transition: 'transform 0.2s',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                Choose Plan <ArrowRight size={18} />
                            </button>

                        </motion.div>
                    ))}
                </motion.div>

                {/* НИЖНИЙ БЛОК (Кастомизация) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        marginTop: '5rem',
                        padding: '40px',
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                        borderRadius: '32px',
                        color: 'white',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Вам нужно индивидуальное решение?</h3>
                        <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2rem' }}>
                            Мы можем создать индивидуальную платформу для вашего бренда с индивидуальными функциями и специализированной поддержкой.
                        </p>
                        <button style={{
                            padding: '14px 32px', borderRadius: 100, background: '#f59e0b',
                            color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '1rem'
                        }}>
                            Свяжитесь с отделом продаж
                        </button>
                    </div>

                    {/* Декор */}
                    <div style={{
                        position: 'absolute', top: -50, left: -50, width: 200, height: 200,
                        background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)',
                        borderRadius: '50%', filter: 'blur(40px)'
                    }} />
                    <div style={{
                        position: 'absolute', bottom: -50, right: -50, width: 200, height: 200,
                        background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
                        borderRadius: '50%', filter: 'blur(40px)'
                    }} />
                </motion.div>

            </div>
        </section>
    );
};

export default Pricing;