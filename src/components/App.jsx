import { Component } from 'react';
import { ContactsForm } from './ContactForm';
import { Contacts } from './Contacts';
import { AppBlock } from './App.styled';
import { Section } from './Section';
import { ContactsFilter } from './ContactsFilter';

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
  filterHandle = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  onClickDelete = (e, index) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((elem, i) => i !== index),
    }));
  };
  addContact = newContact => {
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };
  findFilterContact = () => {
    const { filter, contacts } = this.state;
    const filterName = filter.trim().toLowerCase();
    return contacts.filter(elem =>
      elem.name.toLowerCase().includes(filterName)
    );
  };
  render() {
    const { state, filterHandle, addContact, onClickDelete, findFilterContact } =
      this;
    const { contacts, filter } = this.state;
    return (
      <AppBlock>
        <ContactsForm state={state} addContact={addContact} />
        <Section title="Contacts">
          <ContactsFilter state={state} filterHandle={filterHandle} />
          {filter.trim().length === 0 ? (
            <Contacts contacts={contacts} onClickDelete={onClickDelete} />
          ) : (
            <Contacts
              contacts={findFilterContact()}
              onClickDelete={onClickDelete}
            />
          )}
        </Section>
      </AppBlock>
    );
  }
}
