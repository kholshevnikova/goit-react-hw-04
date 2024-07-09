import { useState, useEffect } from "react";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import initialContacts from "../contacts.json";
// console.log(contacts);

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const savedNumbers = window.localStorage.getItem("saved-contacts");
    if (savedNumbers !== null) {
      return JSON.parse(savedNumbers);
    }
    return initialContacts;
  });

  const [filter, setFilter] = useState("");

  const addContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };
  useEffect(() => {
    window.localStorage.setItem("saved-contacts", JSON.stringify(contacts));
  }, [contacts]);

  const deleteNumber = (numberID) => {
    // console.log(numberID);
    setContacts((prevContacts) => {
      return prevContacts.filter((contact) => contact.id !== numberID);
    });
  };

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList initialContacts={visibleContacts} onDelete={deleteNumber} />
    </div>
  );
}
