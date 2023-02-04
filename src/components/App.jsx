import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactsForm } from './ContactForm';
import { Contacts } from './Contacts';
import { AppBlock } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  onClickDelete = (e, index) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((elem, i) => i !== index),
    }));
  };

  inputHandle = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  formSubmit = e => {
    e.preventDefault();
    const { name, contacts, number } = this.state;
    if (contacts.filter(elem => elem.name === name).length) {
      alert(`${name} is alredy in contacts`);
      return;
    }
    const newPerson = {
      id: nanoid(),
      name: name,
      number: number,
    };
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newPerson],
      name: '',
      number: '',
    }));
  };
  render() {
    const { state, inputHandle, formSubmit, onClickDelete } = this;
    return (
      <AppBlock>
        <ContactsForm
          state={state}
          inputHandle={inputHandle}
          formSubmit={formSubmit}
        />
        <Contacts
          state={state}
          onClickDelete={onClickDelete}
          filterHandle={inputHandle}
        />
      </AppBlock>
    );
  }
}
