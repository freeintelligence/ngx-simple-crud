import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  ManagerComponent,
  ManagerPanelParameters,
  ManagerHeaderParameters,
  ManagerReadParameters,
  ManagerCreateParameters,
  ManagerUpdateParameters,
  deepClone,
  ManagerDeleteParameters,
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
      add: {
        type: 'button',
        params: {
          variant: 'icon',
          text: 'add',
          color: 'accent',
          handle: async () => this.manager.createComponent.open(),
        },
        styles: {
          width: '50%',
        },
      },
      favorite: {
        type: 'button',
        params: {
          variant: 'icon',
          text: 'toggle_on',
          handle: async () => {
            if (this.read?.filters) {
              this.read.filters.submitOn =
                this.read.filters.submitOn === 'submit' ? 'change' : 'submit';

              if (
                this.header.rightElements &&
                this.header.rightElements['favorite'] &&
                this.header.rightElements['favorite'].type === 'button'
              ) {
                this.header.rightElements['favorite'].params.text =
                  this.read.filters.submitOn === 'change'
                    ? 'toggle_on'
                    : 'toggle_off';
              }
            }

            this.header.title = `Lista de Pokemons con actualización ${this.read.filters?.submitOn}`;
          },
        },
        styles: {
          width: '50%',
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

  create: ManagerCreateParameters = {
    title: 'Crear Pokemon',
    description: 'Formulario para la creación de un Pokemon',
    color: 'primary',
    service: {
      url: ({ form: { query, json } }) =>
        'https://jsonplaceholder.typicode.com/posts',
      method: 'POST',
      body: (value) => value,
      success: {
        when: (response) => {
          return response.status === 201;
        },
        message: 'Pokemon creado exitosamente!',
      },
      error: {
        message:
          'Tenemos problemas al crear el Pokemon, inténtalo de nuevo más tarde.',
      },
    },
    fields: {
      name: {
        type: 'input',
        params: {
          label: 'Nombre',
          type: 'text',
        },
        validators: [
          [Validators.required, 'El nombre es obligatorio'],
          [
            Validators.minLength(3),
            'El nombre debe tener al menos 3 caracteres',
          ],
          [
            Validators.maxLength(32),
            'El nombre debe tener como máximo 32 caracteres',
          ],
        ],
      },
    },
    buttons: {
      cancel: {
        type: 'button',
        params: {
          color: 'warn',
          variant: 'basic',
          text: 'Cancelar',
          type: 'button',
        },
        styles: {
          marginTop: '16px',
          width: '50%',
        },
      },
      submit: {
        type: 'button',
        params: {
          color: 'primary',
          variant: 'raised',
          text: 'Crear',
          type: 'submit',
        },
        styles: {
          marginTop: '16px',
          width: '50%',
        },
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
      { title: 'ID', property: 'id', hidden: false },
      {
        title: 'Nombre',
        property: 'name',
        hidden: false,
        styles: { width: '312px' },
      },
      { title: 'URL', property: 'url', hidden: false },
      {
        title: 'Opciones',
        property: 'options',
        hidden: false,
        styles: {
          width: '184px',
          textAlign: 'center',
        },
        elements: {
          edit: {
            type: 'button',
            params: {
              variant: 'icon',
              text: 'edit',
              color: 'primary',
              handle: async ({ group, extra: item }) => {
                this.manager.updateComponent.open(item);
              },
            },
            styles: {
              width: '72px',
            },
          },
          delete: {
            type: 'button',
            params: {
              variant: 'icon',
              text: 'delete',
              color: 'warn',
              handle: async ({ group, extra: item }) => {
                this.manager.deleteComponent.open(item);
              },
            },
            styles: {
              width: '72px',
            },
          },
        },
      },
    ],
  };

  update: ManagerUpdateParameters = {
    base: deepClone(this.create),
    title: 'Actualizar Pokemon',
    description: 'Formulario para la actualización de un Pokemon',
    service: {
      url: ({ form: { query, json } }) =>
        'https://jsonplaceholder.typicode.com/posts',
      method: 'PATCH',
      body: (value) => value,
      success: {
        when: (response) => {
          return response.status === 200;
        },
        message: 'Pokemon actualizado exitosamente!',
      },
      error: {
        message:
          'Tenemos problemas al actualizar el Pokemon, inténtalo de nuevo más tarde.',
      },
    },
    buttons: {
      submit: {
        type: 'button',
        params: {
          text: 'Actualizar',
        },
      },
    },
  };

  delete: ManagerDeleteParameters = {
    base: deepClone(this.create),
    title: 'Eliminar Pokemon',
    description: 'Estás seguro/a de querer eliminar el Pokemon?',
    color: 'primary',
    service: {
      url: ({ form: { json }, item }) => {
        return `https://jsonplaceholder.typicode.com/posts/eliminar/${
          (item as any).name
        }`;
      },
      method: 'DELETE',
      body: (value) => value,
      success: {
        when: (response) => {
          return response.status === 200;
        },
        message: 'Pokemon eliminado exitosamente!',
      },
      error: {
        message:
          'Tenemos problemas al eliminar el Pokemon, inténtalo de nuevo más tarde.',
      },
    },
    buttons: {
      submit: {
        type: 'button',
        params: {
          text: 'Confirmar',
          color: 'warn',
          variant: 'raised',
        },
      },
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
