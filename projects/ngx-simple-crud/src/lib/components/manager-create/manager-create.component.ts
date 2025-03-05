import { Component, Input } from '@angular/core';
import { ManagerCreateParameters } from './manager-create.parameters';
import { DialogComponent, DialogService, FormElement } from 'ngx-simple-forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { ManagerCreateService } from './manager-create.service';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'ngx-simple-crud-manager-create',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './manager-create.component.html',
  styleUrl: './manager-create.component.css',
})
export class ManagerCreateComponent {
  public readonly DEFAULT_METHOD = 'POST';
  public readonly DEFAULT_SUCCESS_WHEN_FN = (response: HttpResponse<Object>) =>
    response.status === 201;

  @Input({ required: true }) parameters!: ManagerCreateParameters;

  dialog!: MatDialogRef<DialogComponent>;

  originalDescription?: string;
  error!: string;

  constructor(
    private dialogService: DialogService,
    private managerCreateService: ManagerCreateService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.saveOriginalDescription();
    this.interceptSubmitButton();
    this.interceptCancelButton();
    this.interceptAllElementsForDisableWhenLoading();
  }

  private saveOriginalDescription() {
    this.originalDescription = this.parameters.description;
  }

  private setDescription(message?: string, color?: string) {
    if (this.dialog.componentInstance.parameters.description) {
      this.dialog.componentInstance.parameters.description.text = message;

      if (!this.dialog.componentInstance.parameters.description.styles) {
        this.dialog.componentInstance.parameters.description.styles = {};
      }

      this.dialog.componentInstance.parameters.description.styles.color = color;
    }
  }

  private resetOriginalDescription() {
    return this.setDescription(this.originalDescription, 'black');
  }

  public open() {
    this.dialog = this.dialogService.open({
      title: {
        text: this.parameters.title,
        color: this.parameters.color,
      },
      description: {
        text: this.parameters.description || '',
      },
      checkTimer: 256,
      elements: {
        ...(this.parameters.fields || {}),
        ...(this.parameters.buttons || {}),
      },
    });

    this.dialog.afterClosed().subscribe(() => {
      this.dialog.componentInstance.form.group.reset();
      this.resetOriginalDescription();
    });
  }

  public close() {
    this.dialog.close();
  }

  private interceptSubmitButton() {
    const submitButton = this.getFirstSubmitButton();

    if (!submitButton || submitButton.type !== 'button') {
      return;
    }

    const handleFn = submitButton.params.handle;

    submitButton.params.handle = async (form) => {
      if (typeof handleFn === 'function') {
        await handleFn(form);
      }

      await this.submit(form);
    };
  }

  private async submit(form: FormGroup) {
    const submitButton = this.getFirstSubmitButton();

    if (form.invalid || !submitButton || submitButton.type !== 'button') {
      return;
    }

    this.resetOriginalDescription();

    submitButton.params.loading = true;

    const json = form.value;
    const query = new URLSearchParams(json).toString();

    try {
      const response = await this.managerCreateService.store(
        this.parameters.service,
        { value: { json, query } }
      );

      const success =
        typeof this.parameters.service.success?.when === 'function'
          ? this.parameters.service.success?.when?.(response)
          : this.DEFAULT_SUCCESS_WHEN_FN(response);

      if (!success) {
        throw new Error('Error al crear el elemento');
      }

      this.snackBar.open(this.parameters.service.success.message, 'X', {
        duration: 4000,
      });

      this.close();
    } catch (err) {
      this.setDescription(this.parameters.service.error.message, 'red');
    }

    submitButton.params.loading = false;
  }

  private interceptCancelButton() {
    const cancelButton = this.getFirstCancelButton();

    if (!cancelButton || cancelButton.type !== 'button') {
      return;
    }

    const handleFn = cancelButton.params.handle;

    cancelButton.params.handle = async (form) => {
      if (typeof handleFn === 'function') {
        await handleFn(form);
      }

      this.close();
    };
  }

  private interceptAllElementsForDisableWhenLoading() {
    const allElements = {
      ...(this.parameters.fields || {}),
      ...(this.parameters.buttons || {}),
    };
    const submitButton = this.getFirstSubmitButton();

    if (!submitButton || submitButton.type !== 'button') {
      return;
    }

    for (const key in allElements) {
      const element = allElements[key];

      if (!element) {
        continue;
      }

      const disabledFn = element.disabled;

      element.disabled = () => {
        let originalDisabled = false;

        if (typeof disabledFn === 'function') {
          originalDisabled = !!disabledFn();
        }

        return originalDisabled || submitButton.params.loading;
      };
    }
  }

  private getFirstSubmitButton() {
    let submitButton!: FormElement;

    for (const key in this.parameters.buttons || {}) {
      const element = this.parameters.buttons?.[key];

      if (!element) {
        continue;
      }

      if (element.type !== 'button' || element.params.type !== 'submit') {
        continue;
      }

      submitButton = element;

      break;
    }

    return submitButton;
  }

  private getFirstCancelButton() {
    let cancelButton!: FormElement;

    for (const key in this.parameters.buttons) {
      const element = this.parameters.buttons[key];

      if (!element) {
        continue;
      }

      if (
        element.type !== 'button' ||
        element.params.type !== 'button' ||
        typeof element.params.handle === 'function'
      ) {
        continue;
      }

      cancelButton = element;

      break;
    }

    return cancelButton;
  }
}
