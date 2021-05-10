import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {GlobalConstants} from './common/global-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = GlobalConstants.SITE_TITLE;

  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
