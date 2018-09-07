import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],

})
export class TextboxComponent {
  
  @Input('label') inputLabel: string;
  @Input() control: FormControl;
  @ViewChild('input') inputRef: ElementRef;
  constructor() { }

  ngOnInit() {
  }

}
