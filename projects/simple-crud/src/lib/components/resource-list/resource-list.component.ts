import { Component, OnInit, Input } from '@angular/core';
import { Header } from '../../interfaces/header.interface';

@Component({
  selector: 'simple-crud-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss']
})
export class ResourceListComponent implements OnInit {

  @Input('header') header: Header = {};

  constructor() { }

  ngOnInit(): void {
  }

}
