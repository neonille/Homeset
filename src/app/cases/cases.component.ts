import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditCaseDialogComponent } from '../edit-case-dialog/edit-case-dialog.component';
import { MeService, UserInfo } from '../me.service';
import { Router } from '@angular/router';

export interface Case {
  id: number;
  date: Date;
  status: number;
  headline: string;
  complex: number;
  description: string;
  apartId: number;
  new?: boolean;
}

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css'],
})
export class CasesComponent implements OnInit {
  cases!: CdkTableDataSourceInput<Case>;
  columnsToShow: string[] = ['id', 'headline', 'date', 'status'];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private meService: MeService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.http
      .get<[Case]>('http://localhost/homeset/api/cases')
      .subscribe((cases: [Case]) => {
        this.cases = cases;
      });
  }

  public createNewCase() {
    let user = this.meService.userInfo!;
    let newCase: Case = {
      apartId: user.apartId,
      complex: user.complex,
      date: new Date(),
      description: '',
      headline: '',
      id: 0,
      status: 1,
      new: true,
    };
    this.openCaseDialog(newCase);
  }

  public openCaseDialog(data: Case): void {
    this.dialog.open(EditCaseDialogComponent, {
      data: {
        ...data,
      },
    });
  }
}
