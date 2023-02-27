import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import ContactFrom from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const locatStoreItems = JSON.parse(localStorage.getItem('contacts'));
    return locatStoreItems?.length ? locatStoreItems : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContactHandler = ({ name, number }) => {
    if (dublicatedHandler({ name })) {
      return alert(`${name} is already in contacts`);
    }
    setContacts(prevState => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [...prevState, newContact];
    });
  };

  const dublicatedHandler = ({ name }) => {
    const normalizedName = name.toLowerCase();
    const isDublicated = contacts.find(item => {
      return item.name.toLowerCase() === normalizedName;
    });
    return Boolean(isDublicated);
  };

  const deleteContactHandler = id => {
    setContacts(prevState => prevState.filter(item => item.id !== id));
  };

  const filterContactsHandler = () => {
    if (filter === '') {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(item =>
      item.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const onInputChange = event => setFilter(event.target.value);

  return (
    <div className={css.App}>
      <h1 className={css.phonebook}>Phonebook</h1>
      <ContactFrom onSubmit={addContactHandler} />
      <h2 className={css.contacts}>Contacts</h2>
      <p className={css.text}>Find contacts by name</p>
      <Filter name={filter} onChange={onInputChange} />
      <ContactList
        items={filterContactsHandler()}
        deleteContactHandler={deleteContactHandler}
      />
    </div>
  );
};
