import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {
  @Input() matrix: {
    data: number[][],
    columns: string[],
    criterion: string,
    ownVector?: number[];
    priorityVector?: number[];
    vectorY?: number[];
    maximumEigenvalue?: number;
    consistencyIndex?: number;
  };
  displayedMatrix: any[][] = [];
  @Output() priorityVector = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.displayedMatrix.push([this.matrix.criterion, ...this.matrix.columns]);
    for (let i = 0; i < this.matrix.data.length; i++) {
      this.matrix.data[i] = this.matrix.data[i].map(item => this.round(item));
      this.displayedMatrix.push([this.matrix.columns[i], ...this.matrix.data[i]]);
    }

    this.matrix.data = this.displayedMatrix.slice(1).map((row, index) =>
      row.filter((cell, index) => index !== 0)
    );

    this.makeСalculations();
  }

  changeMatrix(newValue: string, rowIndex: number, colIndex: number): void {
    this.displayedMatrix[rowIndex][colIndex] = +newValue;
    this.displayedMatrix[colIndex][rowIndex] = this.round(1 / this.displayedMatrix[rowIndex][colIndex]);

    this.matrix.data = this.displayedMatrix.slice(1).map((row, index) =>
      row.filter((cell, index) => index !== 0)
    );

    this.makeСalculations();
  }

  makeСalculations(): void {
    this.matrix.ownVector = this.matrix.data.map(row => {
      return this.round(Math.pow(
        row.reduce((acc, curr) =>
          acc * curr
        ), 1 / 4));
    });

    const ownVectorSum = this.matrix.ownVector.reduce((acc, curr) => acc + curr);
    this.matrix.priorityVector = this.matrix.ownVector.map(item => this.round(item / ownVectorSum));

    this.matrix.vectorY = this.matrix.data.map(row => {
      let sum = 0;
      row.forEach((cell, index) => {
        sum += cell * this.matrix.priorityVector[index];
      });
      return this.round(sum);
    });

    this.matrix.maximumEigenvalue = 0;
    for (let i = 0; i < 4; i++) {
      this.matrix.maximumEigenvalue += this.matrix.vectorY[i] / this.matrix.priorityVector[i];
    }
    this.matrix.maximumEigenvalue = this.round(this.matrix.maximumEigenvalue / 4);

    this.matrix.consistencyIndex = this.round((this.matrix.maximumEigenvalue - 4) / 3);
    const criterion = this.matrix.criterion ? this.matrix.criterion : 'Criterions';
    this.priorityVector.emit({ vector: this.matrix.priorityVector, criterion });
  }

  isNumber(value): boolean {
    return typeof value === 'number' && !isNaN(+value);
  }

  round(number: number): number {
    return Math.round(number * 100) / 100;
  }

}
