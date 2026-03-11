import { ContactItem } from './ContactItem';
import '../styles/ContactList.css';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

interface ContactListProps {
  contacts: Contact[];
  onDeleteContact: (id: number) => void;
}

export function ContactList({ contacts, onDeleteContact }: ContactListProps) {
  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay contactos aún. ¡Añade uno para empezar!</p>
      </div>
    );
  }

  return (
    <div className="contact-list">
      <h2>Mis Contactos ({contacts.length})</h2>
      <div className="contacts-container">
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onDelete={onDeleteContact}
          />
        ))}
      </div>
    </div>
  );
}
