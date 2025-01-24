import {Component, ContentChildren, Input, QueryList} from '@angular/core';
import {NgClass, NgIf, NgTemplateOutlet} from '@angular/common';
import {TabItemComponent} from './tab-item.component';

@Component({
  selector: 'app-tab',
  imports: [
    NgClass,
    NgTemplateOutlet,
    NgIf
  ],
  template: `
    <div class="tab-container">
      <div class="nav">
        @for (tab of tabs; track tab.tabTitle) {
          <div [ngClass]="{active: tab == activeComponent}" class="tab" (click)="activateTab(tab)">
            <span>{{tab.tabTitle}}</span>
          </div>
        }
      </div>
      <div class="template">
        <ng-template [ngTemplateOutlet]="activeComponent.templateRef" />
      </div>
    </div>
  `,
  styleUrl: './tab.component.css'
})
export class TabComponent {
  @ContentChildren(TabItemComponent) tabs!: QueryList<TabItemComponent>;
  activeComponent!: TabItemComponent;
  @Input() updateTrigger: any;

  ngAfterContentInit() {
    this.activeComponent = this.tabs.first;
  }

  // ngDoCheck() {
  //   console.log('[TabItemComponent] ngDoCheck()');
  //   if (this.tabs) {
  //     this.activeComponent = this.tabs.first;
  //     console.log(this.tabs.map(t => t.tabTitle));
  //     console.log(this.activeComponent);
  //   }
  // }

  // ngAfterViewChecked() {
  //   console.log('[TabItemComponent] ngAfterViewChecked()');
  //   if (this.tabs) {
  //     this.activeComponent = this.tabs.first;
  //     console.log(this.tabs.map(t => t.tabTitle));
  //     console.log(this.activeComponent);
  //   }
  // }

  activateTab(tab: TabItemComponent) {
    this.activeComponent = tab;
  }

}
