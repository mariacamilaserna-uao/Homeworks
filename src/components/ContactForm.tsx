import { useState } from 'react';
import '../styles/ContactForm.css';

interface ContactFormProps {
  onAddContact: (name: string, phone: string) => void;
}

export function ContactForm({ onAddContact }: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() && phone.trim()) {
      onAddContact(name, phone);
      setName('');
      setPhone('');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Añadir Contacto</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
      <input
        type="tel"
        placeholder="Teléfono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="input-field"
      />
      <button type="submit" className="submit-btn">
        Añadir Contacto
      </button>
    </form>
  );
}
