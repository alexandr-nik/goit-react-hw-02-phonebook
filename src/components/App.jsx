import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactsForm } from './ContactForm';
import { Contacts } from './Contacts';
import { AppBlock } from './App.module';

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
    changeContact: false,
    changeContactId: '',
  };

  onClickDelete = e => {
    const indexOnDel = this.state.contacts.findIndex(
      elem => e.target.value === elem.id
    );
    const delContact = this.state.contacts.filter(
      (elem, index) => index !== indexOnDel
    );
    this.setState(prevState => ({
      ...prevState,
      contacts: [...delContact],
    }));
  };
  onClickEdit = e => {
    const { contacts } = this.state;
    const indexEdit = contacts.findIndex(elem => e.target.value === elem.id);
    const editContact = contacts.filter((elem, index) => index === indexEdit);
    this.setState(prevState => ({
      ...prevState,
      name: editContact[0].name,
      number: editContact[0].number,
      changeContact: true,
      changeContactId: `${indexEdit}`,
    }));
  };
  inputHandle = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  formEdit = e => {
    e.preventDefault();
    const { name, contacts, number, changeContactId } = this.state;
    const changePerson = {
      id: contacts[changeContactId].id,
      name: name,
      number: number,
    };
    const allContact = contacts;
    allContact[changeContactId] = changePerson;
    this.setState(prevState => ({
      ...prevState,
      contacts: [...allContact],
      name: '',
      number: '',
      changeContact: false,
      changeContactId: '',
    }));
  };
  formSubmit = e => {
    const { changeContact } = this.state;
    const { formSubmitAdd, formEdit } = this;
    changeContact ? formEdit(e) : formSubmitAdd(e);
  };

  formSubmitAdd = e => {
    e.preventDefault();
    const { name, contacts, number } = this.state;
    const newContacts = contacts;
    const findEnterContact = newContacts.filter(elem => elem.name === name);
    if (findEnterContact.length) {
      alert(`${name} is alredy in contacts`);
      return;
    }
    const newPerson = {
      id: nanoid(),
      name: name,
      number: number,
    };
    newContacts.push(newPerson);
    this.setState(prevState => ({
      ...prevState,
      contacts: [...newContacts],
      name: '',
      number: '',
    }));
  };
  filterHandle = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  render() {
    const {
      state,
      inputHandle,
      formSubmit,
      formEdit,
      filterHandle,
      onClickDelete,
      onClickEdit,
    } = this;
    return (
      <AppBlock>
        <ContactsForm
          state={state}
          inputHandle={inputHandle}
          formSubmit={formSubmit}
          formEdit={formEdit}
        />
        <Contacts
          state={state}
          onClickDelete={onClickDelete}
          filterHandle={filterHandle}
          onClickEdit={onClickEdit}
        />
      </AppBlock>
    );
  }
}
