import { MeService, UserInfo } from '../me.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileGroup = this.formBuilder.group({
    firstname: [this.user.firstname, Validators.required],
    lastname: [this.user.lastname, Validators.required],
    phone: [this.user.phone, Validators.required],
    email: [this.user.email, [Validators.email, Validators.required]],
  });

  constructor(
    private meService: MeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
    this.meService.clear();
  }

  public update(): void {
    let anyErrors = this.profileGroup.invalid;
    if (anyErrors) {
      this.snackbar.open('Du har fyllt i lite saker fel 😊', 'Stäng');
      return;
    }
    this.http
      .patch('http://localhost/homeset/api/me', { ...this.profileGroup.value })
      .subscribe(() => {
        this.snackbar.open('Användaren är uppdaterad!', 'Stäng');
        this.meService.getUserInfo();
      });
  }

  get user(): UserInfo {
    return this.meService.userInfo!;
  }
}
