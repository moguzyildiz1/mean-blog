import { Component } from '@angular/core'; //tum angular componentler icin base component

@Component({
  selector: 'app-root', //bunu html dosyalarinda <app-root></app-root> olarak kullanabiliriz. (Dependency injection bununla yapilir.)
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
}
