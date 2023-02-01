import PropTypes from 'prop-types';
import {
  Phonebook,
  PhonebookTitle,
  PhonebookForm,
  PhonebookLable,
  PhonebookInput,
  PhonebookButton,
} from './ContactForm.module';
export const ContactsForm = ({
  state: { name, number, changeContact },
  inputHandle,
  formSubmit,
}) => {
  return (
    <Phonebook>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <PhonebookForm onSubmit={formSubmit}>
        <PhonebookLable>
          Name
          <PhonebookInput
            type="text"
            name="name"
            placeholder="FirstName  LastName"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={inputHandle}
          />
        </PhonebookLable>
        <PhonebookLable>
          Phone
          <PhonebookInput
            type="tel"
            name="number"
            placeholder="123-45-67"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={inputHandle}
          />
        </PhonebookLable>
        <PhonebookButton type="submit">
          {changeContact ? 'Edit contact' : 'Add contact'}
        </PhonebookButton>
      </PhonebookForm>
    </Phonebook>
  );
};
ContactsForm.protoType = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  inputHandle: PropTypes.func.isRequired,
  formSubmit: PropTypes.func.isRequired,
};
