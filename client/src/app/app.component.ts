import { Component } from '@angular/core';

@Component({
  selector: 'app-root', //bunu html dosyalarinda <app-root></app-root> olarak kullanabiliriz.
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
}
