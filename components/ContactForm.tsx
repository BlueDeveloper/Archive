'use client';

import React, { useState } from 'react';

const PROJECT_TYPES = [
  '랜딩페이지 / 회사 소개',
  '기업 홈페이지',
  '쇼핑몰 / 판매 플랫폼',
  '관리자 시스템',
  '유지보수 / 기능 추가',
  '기타',
];

const BUDGET_RANGES = [
  '10 ~ 50만원',
  '50 ~ 150만원',
  '150 ~ 300만원',
  '협의 가능',
];

type FormState = {
  name: string;
  contact: string;
  type: string;
  budget: string;
  description: string;
};

export default function ContactForm() {
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

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setError('전송에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      setError('전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="contact-thanks">
        <p className="contact-thanks-text">문의가 전송되었습니다. 빠르게 검토 후 회신드립니다.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-grid">
        <div className="form-field">
          <label className="form-label">이름</label>
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="홍길동"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label">연락처</label>
          <input
            className="form-input"
            type="text"
            name="contact"
            placeholder="010-0000-0000 또는 이메일"
            value={form.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label className="form-label">프로젝트 유형</label>
          <select
            className="form-input form-select"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">선택해주세요</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label className="form-label">예산 범위</label>
          <select
            className="form-input form-select"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            required
          >
            <option value="">선택해주세요</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-field form-field--full">
        <label className="form-label">간단 설명</label>
        <textarea
          className="form-input form-textarea"
          name="description"
          placeholder="구현하고 싶은 기능이나 참고 사이트 등을 간단히 적어주세요"
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
        {isSubmitting ? '전송 중...' : '문의 보내기'}
      </button>
    </form>
  );
}
