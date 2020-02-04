import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suppliers-toolkit',
  templateUrl: './suppliers-toolkit.component.html',
  styleUrls: ['./suppliers-toolkit.component.css']
})
export class SuppliersToolkitComponent implements OnInit {

  constructor() { }

  panelOpenState: boolean;

  ngOnInit() {
    window.scrollTo(0, 0)
  }

}
