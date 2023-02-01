import PropTypes from 'prop-types';
import {
  ContactsBlock,
  ContactsTile,
  ContactsList,
  ContactsItem,
  ContactsText,
  ContactsButton,
} from './Contacts.module';
import { ContactsFilter } from 'components/ContactsFilter';
export const Contacts = ({ state, onClickDelete, filterHandle,onClickEdit }) => {
  const { filter, contacts } = state;
  return (
    <ContactsBlock>
      <ContactsTile>Contacts</ContactsTile>
      <ContactsFilter state={state} filterHandle={filterHandle} />
      <ContactsList>
        {filter.length === 0 &&
          contacts.map(item => {
            return (
              <ContactsItem key={item.id}>
                <ContactsText>{item.name}</ContactsText>
                <ContactsText>{item.number}</ContactsText>
                <ContactsButton
                  type="button"
                  value={item.id}
                  onClick={onClickDelete}
                >
                  delete
                </ContactsButton>
                <ContactsButton
                  type="button"
                  value={item.id}
                  onClick={onClickEdit}
                >
                  edit
                </ContactsButton>
              </ContactsItem>
            );
          })}
        {filter.length >= 1 &&
          contacts
            .filter(elem =>
              elem.name.toLowerCase().includes(filter.trim().toLowerCase())
            )
            .map(item => {
              return (
                <ContactsItem key={item.id}>
                  <ContactsText>{item.name}</ContactsText>
                  <ContactsText>{item.number}</ContactsText>
                  <ContactsButton
                    type="button"
                    value={item.id}
                    onClick={onClickDelete}
                  >
                    delete
                  </ContactsButton>
                  <ContactsButton
                  type="button"
                  value={item.id}
                  onClick={onClickEdit}
                >
                 edit
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
