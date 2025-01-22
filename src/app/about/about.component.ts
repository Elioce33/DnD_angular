import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  template: `
    <div>
      <p>Simple app using Angular and D&D open API</p>
      <span>See more :</span>
      <ul>
        <li><a href="https://angular.io" target="_blank">Angular</a></li>
        <li><a href="https://5e-bits.github.io/" target="_blank">D&D 5e SRD API</a></li>
      </ul>
    </div>
  `,
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
