import PropTypes from 'prop-types';

import css from './ContactItem.module.css';

const ContactItem = ({ id, name, number, deleteContactHandler }) => {
  return (
    <li className={css.item}>
      <p>
        {name} : {number}
      </p>
      <button onClick={() => deleteContactHandler(id)}>Delete</button>
    </li>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  deleteContactHandler: PropTypes.func.isRequired,
};
