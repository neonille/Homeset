import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Case } from '../cases/cases.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-case-dialog',
  templateUrl: './edit-case-dialog.component.html',
  styleUrls: ['./edit-case-dialog.component.css'],
})
export class EditCaseDialogComponent implements OnInit {
  caseGroup = this.formBuilder.group({
    id: [this.data.id],
    date: [this.data.date],
    complex: [this.data.complex],
    apartId: [this.data.apartId],
    status: [this.data.status],
    description: [this.data.description, Validators.required],
    headline: [this.data.headline, Validators.required],
  });

  isNew: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Case,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    if (data.new) {
      this.isNew = data.new;
    }
  }

  ngOnInit(): void {}

  public delete() {
    this.http
      .delete(`http://localhost/homeset/api/case/${this.data.id}`)
      .subscribe(() => {
        this.dialog.closeAll();
        this.snackbar.open('Borta! 🧨', 'Stäng');
        this.router.navigate(['cases']);
      });
  }
  public create() {
    this.http
      .post(`http://localhost/homeset/api/case`, { ...this.caseGroup.value })
      .subscribe(() => {
        this.dialog.closeAll();
        this.snackbar.open('Tack för ärendet🎁, vi återkommer! ', 'Stäng');
        this.router.navigate(['cases']);
      });
  }
}
