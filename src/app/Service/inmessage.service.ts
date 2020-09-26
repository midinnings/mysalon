import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InmessageService {
  private subject = new Subject<any>();

  sendMessage(Message: string, Page: string) {
    this.subject.next({ Message: Message, Page: Page });
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
