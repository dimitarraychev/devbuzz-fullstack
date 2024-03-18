import { Component, OnInit } from '@angular/core';
import BentoGrid from '@bentogrid/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myBento = {} as BentoGrid;

  ngOnInit(): void {
    this.myBento = new BentoGrid({
      target: '.bentogrid',
      columns: 3,
      cellGap: 10,
    });
  }
}
