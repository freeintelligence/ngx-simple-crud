import { Component, ViewChild } from '@angular/core';
import {
  ManagerComponent,
  ManagerPanelParameters,
  ManagerHeaderParameters,
  ManagerReadParameters,
} from 'ngx-simple-crud';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(ManagerComponent) manager!: ManagerComponent;

  header: ManagerHeaderParameters = {
    title: 'Lista de Pokemons con actualización change',
    leftElements: {
      list: {
        type: 'button',
        params: {
          variant: 'icon',
          text: 'list',
        },
      },
    },
    rightElements: {
      favorite: {
        type: 'button',
        params: {
          variant: 'icon',
          text: 'settings',
          handle: async () => {
            if (this.read?.filters) {
              this.read.filters.submitOn =
                this.read.filters.submitOn === 'submit' ? 'change' : 'submit';
            }

            this.header.title = `Lista de Pokemons con actualización ${this.read.filters?.submitOn}`;
          },
        },
        styles: {
          width: '100%',
        },
      },
    },
  };

  panel: ManagerPanelParameters = {
    elements: {
      name: {
        type: 'input',
        params: {
          label: 'Por nombre',
          placeholder: 'Filtrar por nombre',
          type: 'text',
        },
        styles: {
          width: '312px',
        },
      },
      type: {
        type: 'select',
        params: {
          label: 'Por tipo',
          placeholder: 'Filtrar por tipo',
          options: [
            { value: undefined as unknown as string, description: 'Todos' },
            { value: 'normal', description: 'Normal' },
            { value: 'fire', description: 'Fuego' },
            { value: 'water', description: 'Agua' },
            { value: 'electric', description: 'Eléctrico' },
            { value: 'grass', description: 'Planta' },
            { value: 'ice', description: 'Hielo' },
            { value: 'fighting', description: 'Lucha' },
            { value: 'poison', description: 'Veneno' },
            { value: 'ground', description: 'Tierra' },
            { value: 'flying', description: 'Volador' },
            { value: 'psychic', description: 'Psíquico' },
            { value: 'bug', description: 'Bicho' },
            { value: 'rock', description: 'Roca' },
            { value: 'ghost', description: 'Fantasma' },
            { value: 'dragon', description: 'Dragón' },
            { value: 'dark', description: 'Oscuro' },
            { value: 'steel', description: 'Acero' },
            { value: 'fairy', description: 'Hada' },
          ],
        },
        styles: {
          width: 'calc(100% - 312px - 74px)',
        },
      },
      submit: {
        type: 'button',
        params: {
          type: 'submit',
          variant: 'icon',
          text: 'search',
        },
        styles: {
          width: '74px',
        },
        disabled: () => this.read.filters?.submitOn === 'change',
      },
    },
  };

  read: ManagerReadParameters = {
    filters: {
      submitOn: 'change',
      debounceTime: 1000,
      elements: this.panel.elements,
    },
    service: {
      url: ({ offset, to, pageSize, pageNumber, filters: { query, json } }) => {
        return this.read.pagination?.remote
          ? `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}&${query}`
          : `https://pokeapi.co/api/v2/pokemon?offset=0&limit=500`;
      },
      method: 'GET',
      keys: {
        results: 'results',
        count: 'count',
      },
      body: (data) => {
        return {
          ...data,
        };
      },
    },
    pagination: {
      remote: true,
      pageSize: 10,
      pageSizeOptions: [10, 20, 50, 100],
    },
    columns: [
      { title: 'Nombre', property: 'name', hidden: false },
      { title: 'URL', property: 'url', hidden: false },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
