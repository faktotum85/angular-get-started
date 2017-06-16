import { Component, OnInit } from '@angular/core';
import { NgFor, NgLocalization } from '@angular/common';

import { PeopleService } from '../people.service';
import { Person } from '../person';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-people-list',
  template: `
    <ul>
      <li *ngFor = "let person of people | async">
        <a [routerLink]="['/persons', person.id]">
          {{person.name}}
        </a>
      </li>
    </ul>
  `,
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  people: Observable<Person[]>;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.people = this.peopleService.getAll()  }
}
