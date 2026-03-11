import '../styles/ContactItem.css';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

interface ContactItemProps {
  contact: Contact;
  onDelete: (id: number) => void;
}

export function ContactItem({ contact, onDelete }: ContactItemProps) {
  return (
    <div className="contact-item">
      <div className="contact-info">
        <h3>{contact.name}</h3>
        <p>{contact.phone}</p>
      </div>
      <button 
        className="delete-btn"
        onClick={() => onDelete(contact.id)}
      >
        Eliminar
      </button>
    </div>
  );
}
