import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public comments = [
    {
      name : 'Kevin Brennan',
      reply: 'Not sure about this one really, can we ask @Mick?'
    },
    {
      name : 'Mick Thompson',
      reply: 'Hmmmm, looks good to me?'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
