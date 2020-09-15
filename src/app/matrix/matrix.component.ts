import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {
  @Input() data: string[];
  @Input() criterion: string;
  matrix: any[][] = [];

  constructor() { }

  ngOnInit(): void {
    this.matrix.push([this.criterion, ...this.data]);
    this.data.forEach(item => {
      this.matrix.push([item, null, null, null, null]);
    });
  }

}
