import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'shared-component-form-validator',
  templateUrl: './form-validator.component.html',
  styleUrls: ['./form-validator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormValidatorComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() errors?: ValidationErrors | null | undefined;

  constructor() {}

  ngOnInit() {}
}
