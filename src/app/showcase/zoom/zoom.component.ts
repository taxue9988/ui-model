import {Component} from '@angular/core';
import {Zoom} from 'ui-model';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent {
  zoom: Zoom = new Zoom();
}
