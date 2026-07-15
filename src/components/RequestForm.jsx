import React, { useState } from 'react';
import Modal from './Modal';

const RequestForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telegram: '',
        serverSize: 50,
        plan: 'basic',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Форма отправлена:', formData);
        setIsModalOpen(false);
        alert('Заявка отправлена! Мы свяжемся с вами в Telegram.');
        setFormData({
            name: '',
            email: '',
            telegram: '',
            serverSize: 50,
            plan: 'basic',
            message: ''
        });
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    };

    const inputStyle = {
        padding: '0.75rem',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        background: 'rgba(255, 255, 255, 0.05)',
        color: 'white',
        fontSize: '1rem'
    };

    const labelStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem'
    };

    return (
        <section id="request" style={{ padding: '4rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        color: 'white'
                    }}>
                        Оставить заявку
                    </h2>
                    <p style={{ color: 'var(--gray-light)', fontSize: '1.1rem' }}>
                        Заполните форму, и мы поможем вам запустить собственный VPN-сервис
                    </p>
                </div>

                <div style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    padding: '2.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <form style={formStyle}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                Ваше имя
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="Иван Иванов"
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="ivan@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                Telegram @username
                            </label>
                            <input
                                type="text"
                                name="telegram"
                                value={formData.telegram}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="@username"
                                required
                            />
                        </div>

                        <div>
                            <div style={labelStyle}>
                                <label>Размер сервера (ГБ):</label>
                                <span>{formData.serverSize} ГБ</span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="500"
                                step="10"
                                name="serverSize"
                                value={formData.serverSize}
                                onChange={handleChange}
                            />
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                color: 'var(--gray)',
                                fontSize: '0.9rem'
                            }}>
                                <span>10 ГБ</span>
                                <span>250 ГБ</span>
                                <span>500 ГБ</span>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                Тарифный план
                            </label>
                            <select
                                name="plan"
                                value={formData.plan}
                                onChange={handleChange}
                                style={inputStyle}
                            >
                                <option value="basic">Basic - $49/мес</option>
                                <option value="pro">Pro - $99/мес</option>
                                <option value="enterprise">Enterprise - $199/мес</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                                Дополнительные пожелания
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                style={{ ...inputStyle, minHeight: '100px' }}
                                placeholder="Расскажите о ваших потребностях..."
                            />
                        </div>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setIsModalOpen(true)}
                            style={{ marginTop: '1rem' }}
                        >
                            Отправить заявку
                        </button>
                    </form>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Подтверждение заявки"
            >
                <div style={{ color: 'var(--gray-light)' }}>
                    <p>Проверьте данные перед отправкой:</p>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '1rem',
                        borderRadius: '8px',
                        margin: '1rem 0'
                    }}>
                        <p><strong>Имя:</strong> {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Telegram:</strong> {formData.telegram}</p>
                        <p><strong>Размер сервера:</strong> {formData.serverSize} ГБ</p>
                        <p><strong>Тариф:</strong> {formData.plan}</p>
                    </div>
                    <button
                        className="btn btn-secondary"
                        onClick={handleSubmit}
                        style={{ width: '100%' }}
                    >
                        Подтвердить и отправить
                    </button>
                </div>
            </Modal>
        </section>
    );
};

export default RequestForm;