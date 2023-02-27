import PropTypes from 'prop-types';

import ContactItem from './ContactItem/ContactItem';
import css from './ContactList.module.css';

const ContactList = ({ items = [], deleteContactHandler }) => {
  return (
    <ul className={css.list}>
      {items.map(item => (
        <ContactItem
          key={item.id}
          id={item.id}
          name={item.name}
          number={item.number}
          deleteContactHandler={deleteContactHandler}
        />
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};
