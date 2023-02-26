import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './ContactForm.module.css';

class ContactFrom extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({ name: '', number: '' });
  }
  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <div className={css.formBox}>
          <label>Name</label>
          <input
            onChange={this.handleChange}
            className={css.formText}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div className={css.formBox}>
          <label>Number</label>
          <input
            onChange={this.handleChange}
            className={css.formText}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactFrom;


ContactFrom.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
