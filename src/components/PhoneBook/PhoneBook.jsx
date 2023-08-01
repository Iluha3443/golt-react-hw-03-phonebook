import React from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from "../ContactForm/ContactForm";
import { Filter } from "components/Filter/Filter";
import { ContactList } from "components/ContactList/ContactList";

class PhoneBook extends React.Component {
     
 state = {
  contacts: [],
  filter: '',
}
   componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({contacts: parseContacts})
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
    
  }

    
    handleSubmit = (evt) => {
        evt.preventDefault();
        const { contacts } = this.state;
        const nameContact = evt.target.name.value;
        const numberTel = evt.target.number.value;
          const nameRepeat = contacts.map(contact => contact.name);
        console.log(nameRepeat)
        if (nameRepeat.includes(nameContact) ) {
            alert(`${nameContact} is already in contacts`);
             evt.target.name.value = '';
        evt.target.number.value = '';
           return
    } 
        this.setState(prevState => ({
            contacts: [...prevState.contacts, { id: nanoid(), name: nameContact, number: numberTel }]
        }))
        
        evt.target.name.value = '';
        evt.target.number.value = '';
    }

    deleteNumber = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  }

    searchByName = (e) => {
        const { contacts } = this.state;
        const nameInput = e.target.value.toLowerCase();
        const searchResults = contacts.filter((contact) => contact.name.toLowerCase().includes(nameInput));
       
        if (searchResults.length > 0) {
          this.setState({ filter: nameInput })
        }   
    }


    render() {
         return (
             <>
                 
                 <ContactForm Submit={this.handleSubmit} />
                 
                 <Filter Search={this.searchByName} /> 
                 
                <ContactList contacts={this.state.contacts} filter={this.state.filter}  deleteNumber={this.deleteNumber}  />
                
             </>
         )
    }
};

export default PhoneBook;