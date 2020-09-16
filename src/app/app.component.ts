import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRITERION_X_CRITERION, FIRST_CRIT_X_ALTERNATIVES, SECOND_CRIT_X_ALTERNATIVES, THIRD_CRIT_X_ALTERNATIVES, FOURTH_CRIT_X_ALTERNATIVES } from './data/matrices';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dataForm: FormGroup;
  showForm: boolean = true;
  showMatrices: boolean = false;
  showResult: boolean = false;
  criterions: string[];
  alternatives: string[];
  matrices: {
    data: number[][],
    columns: string[],
    criterion: string,
    ownVector?: number[];
    priorityVector?: number[];
    vectorY?: number[];
    maximumEigenvalue?: number;
    consistencyIndex?: number;
  }[];
  globalPriorities: any[] = [];
  criterionsAndPriority: any[] = [];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildDataFrom();
  };

  buildDataFrom(): void {
    this.dataForm = this.fb.group({
      target: ['Selection of elective courses', Validators.required],
      firstCriterion: ['Interest', Validators.required],
      secondCriterion: ['Topicality', Validators.required],
      thirdCriterion: ['Number of credits / Scope', Validators.required],
      fourthCriterion: ['Reviews of undergraduates', Validators.required],
      firstAlternative: ['Frontend programming', Validators.required],
      secondAlternative: ['Cloud security', Validators.required],
      thirdAlternative: ['Forensics in software-oriented systems', Validators.required],
      fourthAlternative: ['Embedded system programming', Validators.required]
    });
  }

  getFinalResults(critAndPriority): void {
    const index = this.criterionsAndPriority.findIndex(item => item.criterion === critAndPriority.criterion);
    if (index > -1)
      this.criterionsAndPriority.splice(index, 1);
    this.criterionsAndPriority.push(critAndPriority);
  }

  onSubmitForm(): void {
    this.criterions = [
      this.dataForm.controls['firstCriterion'].value,
      this.dataForm.controls['secondCriterion'].value,
      this.dataForm.controls['thirdCriterion'].value,
      this.dataForm.controls['fourthCriterion'].value
    ];

    this.alternatives = [
      this.dataForm.controls['firstAlternative'].value,
      this.dataForm.controls['secondAlternative'].value,
      this.dataForm.controls['thirdAlternative'].value,
      this.dataForm.controls['fourthAlternative'].value
    ];

    this.matrices = [
      {
        data: CRITERION_X_CRITERION,
        columns: this.criterions,
        criterion: null,
      },
      {
        data: FIRST_CRIT_X_ALTERNATIVES,
        columns: this.alternatives,
        criterion: this.dataForm.controls['firstCriterion'].value,
      },
      {
        data: SECOND_CRIT_X_ALTERNATIVES,
        columns: this.alternatives,
        criterion: this.dataForm.controls['secondCriterion'].value,
      },
      {
        data: THIRD_CRIT_X_ALTERNATIVES,
        columns: this.alternatives,
        criterion: this.dataForm.controls['thirdCriterion'].value,
      },
      {
        data: FOURTH_CRIT_X_ALTERNATIVES,
        columns: this.alternatives,
        criterion: this.dataForm.controls['fourthCriterion'].value,
      }
    ];

    this.showForm = false;
    this.showMatrices = true;
  }

  showResults(): void {
    this.showMatrices = false;
    this.showResult = true;
    this.globalPriorities = [];
    const vectorOfImportanceCriteria = this.criterionsAndPriority.find(item => item.criterion === 'Criterions').vector;
    this.criterionsAndPriority = this.criterionsAndPriority.filter(item => item.criterion !== 'Criterions');
    this.alternatives.forEach((alt, i) => {
      let priority = 0;
      for (let j = 0; j < 4; j++) {
        priority += vectorOfImportanceCriteria[j] * this.criterionsAndPriority[j].vector[i];
      }
      this.globalPriorities.push({ alternative: alt, priority: Math.round(priority * 1000) / 1000 });
    });
    this.globalPriorities.sort((a, b) => b.priority - a.priority);
  }

}
