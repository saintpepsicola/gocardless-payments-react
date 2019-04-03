import React, { Component } from 'react'

class App extends Component {
  state = {
    styles: {
      label: 'block text-grey-darker text-sm font-bold mb-1',
      input: 'border border-black block text-grey-darker text-sm font-bold mb-1'
    }
  }
  createCustomer(e) {
    e.preventDefault()
    fetch('https://api-sandbox.gocardless.com/customers', {
      method: 'post',
      headers: new Headers({
        'Authorization': 'Basic '
      }),
      body: {
        customers: {
          "email": "user@example.com",
          "given_name": "Frank",
          "family_name": "Osborne",
          "address_line1": "27 Acer Road",
          "address_line2": "Apt 2",
          "city": "London",
          "postal_code": "E8 3GX",
          "country_code": "GB"
        }
      }
    })

    handleChange(value, event) {
      this.setState({ [value]: event.target.value })
    }

    render() {
      const { firstname, lastname, email, styles } = this.state
      return (

        <div className="container mx-auto">
          <form className="bg-white shadow-md rounded p-8 m-12" onSubmit={this.createCustomer.bind(this)}>
            <label className={styles.label} > First Name
            <input className={styles.input} onChange={this.handleChange.bind(this, 'firstname')} type="text" name="firstname" />
            </label>
            <br />
            <label className={styles.label}> Last Name:
            <input className={styles.input} onChange={this.handleChange.bind(this, 'lastname')} type="text" name="lastname" />
            </label>
            <br />
            <label className={styles.label}> Email:
        <input className={styles.input} onChange={this.handleChange.bind(this, 'email')} type="email" name="email" />
            </label>
            <br />
            {firstname && lastname && email && < input type="submit" value="Submit" />}
          </form >
        </div>

      )
    }
  }

  export default App