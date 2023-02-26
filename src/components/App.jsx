import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';
import ContactFrom from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsList = JSON.parse(localStorage.getItem('contacts'));
    if (contactsList && contactsList.length) {
      this.setState({
        contacts: contactsList,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (contacts.length !== prevState.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContactHandler = ({ name, number }) => {
    if (this.dublicatedHandler({ name })) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(prevState => {
      const { contacts } = prevState;

      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [...contacts, newContact] };
    });
  };
  dublicatedHandler({ name }) {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    const isDublicated = contacts.find(item => {
      return item.name.toLowerCase() === normalizedName;
    });
    return Boolean(isDublicated);
  }
  deleteContactHandler = id => {
    this.setState(prevState => {
      const arrWithDeletedContact = prevState.contacts.filter(
        item => item.id !== id
      );
      return {
        contacts: arrWithDeletedContact,
      };
    });
  };
  filterContactsHandler = () => {
    const { filter, contacts } = this.state;

    if (filter === '') {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const filteredArr = contacts.filter(item => {
      return item.name.toLowerCase().includes(normalizedFilter);
    });
    return filteredArr;
  };
  onInputChange = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const contacts = this.filterContactsHandler();
    const { filter } = this.state;

    return (
      <div className={css.App}>
        <h1 className={css.phonebook}>Phonebook</h1>
        <ContactFrom onSubmit={this.addContactHandler} />
        <h2 className={css.contacts}>Contacts</h2>
        <p className={css.text}>Find contacts by name</p>
        <Filter name={filter} onChange={this.onInputChange} />
        <ContactList
          items={contacts}
          deleteContactHandler={this.deleteContactHandler}
        />
      </div>
    );
  }
}
