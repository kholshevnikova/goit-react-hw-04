import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList({ initialContacts, onDelete }) {
  return (
    <ul className={css.list}>
      {initialContacts.map((contact) => (
        <li key={contact.id}>
          <Contact contact={contact} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
