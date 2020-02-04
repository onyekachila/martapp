
import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/core/services/utility.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private utilitySrv: UtilityService) { }

  ngOnInit() {
   this.utilitySrv.getMovePageUp();
  }

}
