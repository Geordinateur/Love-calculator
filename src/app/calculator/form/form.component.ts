import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnChanges{

  @Input({ required: true }) placeholderInput1!: string
  @Input({ required: true }) placeholderInput2!: string

  @Input() name1!: string
  @Input() name2!: string

  @Output() formSubmit = new EventEmitter<[string, string]>()

  form = new FormGroup({
    name1: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    name2: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    })
  })
  constructor() { }

  ngOnChanges () {
    this.form.controls.name1.setValue(this.name1 ?? '')
    this.form.controls.name2.setValue(this.name2 ?? '')
  }

  submitForm() {
    const {form} = this
    if(this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    const { name1, name2 } = form.controls
    this.formSubmit.emit([name1.value, name2.value])
  }

}
