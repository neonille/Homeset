import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

interface loginForm {
  firstname?: string | null | undefined;
  password?: string | null | undefined;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    password: ['', Validators.required],
  });
  invalidInput: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {}

  login(): void {
    this.invalidInput = false;
    if (
      this.loginFormGroup.controls['firstname'].hasError('required') ||
      this.loginFormGroup.controls['password'].hasError('required')
    ) {
      this.invalidInput = true;
    } else {
      let form: loginForm = { ...this.loginFormGroup.value };
      this.http
        .post('http://localhost/homeset/api/login', form, {
          responseType: 'text',
        })
        .subscribe((token: string) => {
          this.router.navigate(['home']);
        });
    }
  }
}
