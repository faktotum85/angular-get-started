import { Injectable } from '@angular/core';
import { Person } from './person';

import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const PEOPLE: Person[] = [
  {id: 1, name: 'Luke Skywalker', height: 177, weight: 70},
  {id: 2, name: 'Darth Vader', height: 200, weight: 100},
  {id: 3, name: 'Han Solo', height: 185, weight: 85}
];

function mapPersons(response: Response): Person[] {
  return response.json().results.map(toPerson)
}

function mapPerson(response: Response): Person {
  return toPerson(response.json());
}

function toPerson(r:any): Person {
  let person = <Person>({
    id: extractId(r),
    url: r.url,
    name: r.name,
    weight: Number.parseInt(r.mass),
    height: Number.parseInt(r.height)
  });
  console.log('Parsed person', person);
  return person;
}

function extractId(personData: any) {
  let extractedId = personData.url.replace('http://swapi.co/api/people/','')
    .replace('/','');
  return parseInt(extractedId);
}

function handleError(error: any) {
  let errorMsg = error.message || `Yikes! There was a problem with our
  hyperdrive device and we couldn't retrieve your data!`
  console.log(errorMsg);

  return Observable.throw(errorMsg);
}

@Injectable()
export class PeopleService {
  private baseUrl: string = 'http://swapi.co/api'

  constructor (private http: Http) { }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  getAll(): Observable<Person[]> {
    let people$ = this.http
      .get(`${this.baseUrl}/people`, {headers: this.getHeaders()})
      .map(mapPersons)
      .catch(handleError);
      return people$;
  }

  get(id: number): Observable<Person> {
    let person$ = this.http
      .get(`${this.baseUrl}/people/${id}`, {headers: this.getHeaders()})
      .map(mapPerson)
      .catch(handleError);
      return person$;
  }

  save(person: Person): Observable<Response> {
    return this
      .http
      .put(`${this.baseUrl}/people/${person.id}`, JSON.stringify(person), {headers: this.getHeaders()});
  }

  private clone(object: any) {
    return JSON.parse(JSON.stringify(object))
  }
}
