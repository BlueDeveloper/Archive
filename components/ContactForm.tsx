'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/LanguageContext';

type FormState = {
  name: string;
  contact: string;
  type: string;
  budget: string;
  description: string;
};

export default function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>({
    name: '',
    contact: '',
    type: '',
    budget: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'e0cd0a09-edaf-4f5f-8686-57676a7ed891',
          subject: `[외주 문의] ${form.type} - ${form.budget}`,
          name: form.name,
          contact: form.contact,
          type: form.type,
          budget: form.budget,
          description: form.description,
          from_name: 'BD 문의 폼',
        }),
      });

      const result = await response.json() as { success: boolean };

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(t.form.errorMessage);
      }
    } catch {
      setError(t.form.errorNetworkMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-thanks">
        <p className="contact-thanks-text">{t.form.successMessage}</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-grid">
        <div className="form-field">
          <label className="form-label">{t.form.labels.name}</label>
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder={t.form.placeholders.name}
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label">{t.form.labels.contact}</label>
          <input
            className="form-input"
            type="text"
            name="contact"
            placeholder={t.form.placeholders.contact}
            value={form.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label">{t.form.labels.type}</label>
          <select
            className="form-input form-select"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">{t.form.selectDefault}</option>
            {t.form.projectTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">{t.form.labels.budget}</label>
          <select
            className="form-input form-select"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            required
          >
            <option value="">{t.form.selectDefault}</option>
            {t.form.budgetRanges.map((budget) => (
              <option key={budget} value={budget}>{budget}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-field form-field--full">
        <label className="form-label">{t.form.labels.description}</label>
        <textarea
          className="form-input form-textarea"
          name="description"
          placeholder={t.form.placeholders.description}
          value={form.description}
          onChange={handleChange}
          rows={4}
        />
      </div>
      {error && (
        <div className="form-error" style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>
          {error}
        </div>
      )}
      <button type="submit" className="contact-submit" disabled={isSubmitting}>
        {isSubmitting ? t.form.submitting : t.form.submit}
      </button>
    </form>
  );
}
