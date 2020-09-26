import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidmessageService {
  validation_messages = {
    'mobile': [
      { type: 'required', message: 'Mobile Number is required.' },
      { type: 'minlength', message: 'Mobile number must be at least 10 characters long.' },
      { type: 'maxlength', message: 'Mobile cannot be more than 10 characters long.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' }
    ],
    'OTP': [
      { type: 'required', message: 'OTP is required.' },
      { type: 'minlength', message: 'OTP must be at least 6 characters long.' },
      { type: 'maxlength', message: 'OTP cannot be more than 6 characters long.' },
    ],
    'common': [
      { type: 'required', message: 'Field is required.' },
    ]
  }
  constructor() { }
}
