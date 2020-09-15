import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dataForm: FormGroup;
  showForm: boolean = false;
  showMatrices: boolean = true;
  criterions: string[];
  alternatives: string[];

  constructor(private fb: FormBuilder) { }

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
  }

  onSubmit(): void {
    this.showForm = false;
    this.showMatrices = true;

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
  }

}
