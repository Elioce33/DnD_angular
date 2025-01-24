import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-tab-item',
  imports: [],
  template: ``,
  styleUrl: './tab.component.css'
})
export class TabItemComponent {
  @Input() tabTitle? = 'default';
  @Input() templateRef!: TemplateRef<any>;
  @Input() disabled?: boolean = false;

}
