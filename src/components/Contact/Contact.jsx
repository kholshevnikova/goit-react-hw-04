import css from "./Contact.module.css";
import { FaUserAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

export default function Contact({ contact, onDelete }) {
  return (
    <div className={css.listItem}>
      <p>
        <FaUserAlt />
        {contact.name}
      </p>
      <p>
        <FaPhoneAlt />
        {contact.number}
      </p>
      <button onClick={() => onDelete(contact.id)}>Delete</button>
    </div>
  );
}
