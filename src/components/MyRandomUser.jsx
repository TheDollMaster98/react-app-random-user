import React from "react";
import { useState,  useEffect } from "react";
import axios from "axios";
import { Card,Button} from "react-bootstrap"
import CardHeader from "react-bootstrap/esm/CardHeader";
//https://randomuser.me/api/


//https://controlc.com/537cee56
/*
Un Hook è una speciale funzione che ti permette di “agganciare” funzionalità di React. 
Per esempio, useState è un Hook che ti permette di aggiungere lo state React nei componenti funzione.

Al posto di usare in una classe: 
class Esempio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contatore: 0
    };
  }

  Ci creiamo una funzione con gli hooks:
  import React, { useState } from 'react';

function Esempio() {
 * Dichiara una nuova variabile di stato, che chiameremo "contatore" *
  const [contatore, setContatore] = useState(0);


  useState:
  dichiara una “variabile di stato”. 
  La nostra variabile è chiamata user ma potremmo chiamarla in qualsiasi altro modo, anche banana. 
  È un modo per “conservare” qualche valore durante le chiamate di funzione — 
  useState è un modo nuovo di usare la stessa esatta funzionalità che this.state fornisce ad una classe. 
  Normalmente, le variabili “scompaiono” quando la funzione esce mentre le variabili di stato vengono preservate da React.
*/

//serve per forza il secondo argomento, con l'array vuoto si blocca
    /*  
        * https://dmitripavlutin.com/javascript-fetch-async-await/

        const response = await fetch(resource[, options]);
        which accepts 2 arguments:

        resource: the URL string, or a Request object
        options: the configuration object with properties like method, headers, body, credentials, and more.

        await fetch('/movies') starts an HTTP request to '/movies' URL. Because the await keyword is present, 
        the asynchronous function is paused until the request completes
    */
const  MyRandomUser = () => {
    const [user, setUser] = useState(null); //oggetto vuoto, l'API è un oggetto con un vettore di oggetti
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null) 

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            //quando fetcho l'URL il server risponde 
            const result = await axios.get(`https://randomuser.me/api/?results=${1}`);
            setUser(result.data.results[0]);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }
    useEffect(() => {
        //la parola chiave async consente di dichiarare una funzione come asincrona 
        //(cioè che contiene un’operazione asincrona)

        //mentre await sospende l’esecuzione di una funzione, 
        //in attesa che la Promise associata ad un’attività asincrona venga risolta o rigettata.
        fetchData();
    }, []);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }
    if (!user) {
        return <h1>Manca l'user</h1>;
    }
 
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <CardHeader className="text-center">{user.name.first} {user.name.last}</CardHeader>
                    <Card.Img variant="top" src={user.picture.large} />
                    <Card.Subtitle className="mb-2 text-muted"> 
                        <strong>
                        <i className="fas fa-envelope"/>
                        </strong>  - Email: {user.email}
                    </Card.Subtitle>
                    <Card.Text>
                        - Street Number: {user.location.street.number} <br/>
                        - Street Name: {user.location.street.name} <br/>
                        - City: {user.location.city} <br/>
                        - State: {user.location.state} <br/>
                        - Country: {user.location.country} <br/>
                        - Postcode: {user.location.postcode} <br/>
                        - Coordinates: {user.location.coordinates.latitude} {user.location.coordinates.longitude} <br/>
                        - Timezone: {user.location.timezone.offset} <br/>
                    </Card.Text>
                    <Card.Text>
                        <strong>
                        <i className="fas fa-phone"/>
                        </strong>- Phone: {user.phone}
                    </Card.Text>
                    <Card.Text>
                        <strong>
                        <i className="fas fa-birthday-cake"/>
                        </strong>- Age: {user.dob.age}
                    </Card.Text>
                    <Card.Footer>
                        <Button onClick={fetchData} type="button" value="Genera un nuovo utente" class="btn btn-success" variant="primary" >Random User</Button>
                        <br/>
                    </Card.Footer>

                </Card.Body>
            </Card>
        </>
    );
}
export default MyRandomUser;
/*import react, { useState } from 'react';

import { Spinner, Button, Card, Image, ProgressBar } from 'react-bootstrap';

//https://randomuser.me/api/
//stampare nome,(first,last)mail,foto,phone, country,

const HookRandonUser = () => {
	const [ user, setUser ] = useState(null);
	const [ loading, setLoading ] = useState(false);
	const [ error, setError ] = useState(null);

	// faccio il fetch user dopo 10 secondi

	const fetchUser = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch('https://randomuser.me/api/');
			const data = await response.json();
			setUser(data.results[0]);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	return (
		<div>
			<Button variant="primary" onClick={fetchUser}>
				{loading ? <Spinner animation="border" variant="primary" /> : 'Fetch User'}
			</Button>
			<ProgressBar variant="success" now={loading} style={{ width: '18rem' }} />

			{error && <p>{error.message}</p>}
			{user && (
				<Card style={{ width: '18rem' }} bg="dark" variant="dark" text="white">
					<Card.Body>
						<h2>
							{' '}
							<Card.Title>
								{user.name.first} {user.name.last}
							</Card.Title>{' '}
						</h2>
						<hr />
						<Card.Subtitle>
							<Image src={user.picture.large} rounded />
						</Card.Subtitle>
						<hr />
						<Card.Text>
							<strong>
								<p>Email</p>
							</strong>
							{user.email}
							<hr />
							<strong>
								<p>Age</p>
							</strong>
							{user.dob.age}
							<hr />
							<strong>
								<p>Phone</p>
							</strong>
							{user.phone}
							<hr />
							<strong>
								<p>Country</p>
							</strong>
							{user.location.country}
							<hr />
							<strong>
								<p>City</p>
							</strong>
							{user.location.city}
						</Card.Text>
					</Card.Body>
				</Card>
			)}
		</div>
	);
};

export default HookRandonUser;
*/