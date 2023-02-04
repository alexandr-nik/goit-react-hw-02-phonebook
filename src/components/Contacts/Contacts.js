import PropTypes from 'prop-types';
import {
  ContactsBlock,
  ContactsTile,
  ContactsList,
  ContactsItem,
  ContactsText,
  ContactsButton,
} from './Contacts.styled';
import { ContactsFilter } from 'components/ContactsFilter';
export const Contacts = ({ state, onClickDelete, filterHandle }) => {
  const { filter, contacts } = state;
  const filterName = filter.trim().toLowerCase();
  return (
    <ContactsBlock>
      <ContactsTile>Contacts</ContactsTile>
      <ContactsFilter state={state} filterHandle={filterHandle} />
      <ContactsList>
        {filter.length === 0 &&
          contacts.map((item, index) => {
            return (
              <ContactsItem key={item.id}>
                <ContactsText>{item.name}</ContactsText>
                <ContactsText>{item.number}</ContactsText>
                <ContactsButton
                  type="button"
                  value={item.id}
                  onClick={e => onClickDelete(e, index)}
                >
                  delete
                </ContactsButton>
              </ContactsItem>
            );
          })}
        {filter.length >= 1 &&
          contacts
            .filter(elem => elem.name.toLowerCase().includes(filterName))
            .map(item => {
              return (
                <ContactsItem key={item.id}>
                  <ContactsText>{item.name}</ContactsText>
                  <ContactsText>{item.number}</ContactsText>
                  <ContactsButton
                    type="button"
                    value={item.id}
                    onClick={e => onClickDelete(e, item.id)}
                  >
                    delete
                  </ContactsButton>
                </ContactsItem>
              );
            })}
      </ContactsList>
    </ContactsBlock>
  );
};
Contacts.propTypes = {
  state: PropTypes.shape({
    filter: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  onClickDelete: PropTypes.func.isRequired,
};
