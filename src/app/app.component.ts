import { Component, ViewChild } from '@angular/core';
import {
  ManagerComponent,
  ManagerFiltersParameters,
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
            this.filters.submitOn =
              this.filters.submitOn === 'custom' ? 'change' : 'custom';
            this.header.title = `Lista de Pokemons con actualización ${this.filters.submitOn}`;
          },
        },
        styles: {
          width: '100%',
        },
      },
    },
  };

  filters: ManagerFiltersParameters = {
    submitOn: 'change',
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
          handle: async (form) => {
            console.log('Submitted', form);
          },
        },
        styles: {
          width: '74px',
        },
        disabled: () => this.filters.submitOn === 'change',
      },
    },
  };

  read: ManagerReadParameters = {
    service: {
      url: ({ offset, to, pageSize, pageNumber }) => {
        return this.read.pagination?.remote
          ? `https://pokeapi.co/api/v2/pokemon-species?offset=${offset}&limit=${pageSize}`
          : `https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=500`;
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
      remote: false,
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
