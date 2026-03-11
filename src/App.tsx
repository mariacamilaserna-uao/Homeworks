import { useState, useEffect } from 'react';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setContacts([
        { id: 1, name: 'Juan García', phone: '912-345-678' },
        { id: 2, name: 'María López', phone: '923-456-789' },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  const addContact = () => {
    if (name && phone) {
      setContacts([...contacts, { id: Date.now(), name, phone }]);
      setName('');
      setPhone('');
    }
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  if (isLoading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Cargando...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1>Gestor de Contactos</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <input 
          type="text" 
          placeholder="Nombre" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
        <input 
          type="text" 
          placeholder="Teléfono" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
        <button 
          onClick={addContact} 
          style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
        >
          Añadir Contacto
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {contacts.map((contact) => (
          <li key={contact.id} style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px', borderRadius: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div><strong>{contact.name}</strong></div>
              <div style={{ color: '#666', fontSize: '12px' }}>{contact.phone}</div>
            </div>
            <button 
              onClick={() => deleteContact(contact.id)} 
              style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
