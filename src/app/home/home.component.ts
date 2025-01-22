import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div>
      <h2>Roll the dice or choose your way</h2>
      <div class="container">
        <a class="card" href="/classes">
          <h3>Classes</h3>
          <p>List of all D&D classes, with more information's</p>
        </a>
        <a class="card" href="/spells">
          <h3>Spells</h3>
          <p>You can looking for the spell you want through all the D&D spells</p>
        </a>
        <a class="card" href="/equipments">
          <h3>Equipment</h3>
          <p>Need an equipment or more information about your sword ? Check this</p>
        </a>
        <a class="card" href="/">
          <h3>Random</h3>
          <p>Roll dice of 20 and see were you end up</p>
        </a>
        <a class="card" href="/">
          <h3>Work in progress...</h3>
          <p>More are coming soon</p>
        </a>
      </div>
    </div>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
