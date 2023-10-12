import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  itemForm = new FormGroup({
    name: new FormControl(''),
    amount: new FormControl(0),
  });
  url = 'http://localhost:8080/';
  items!: Item[];
  edit = false;
  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.getItems();
  }

  onSubmit() {
    console.info('form', this.itemForm.value);
    if (this.edit) {
      this.httpClient
        .put<Item>(this.url, this.itemForm.value)
        .pipe(catchError(handleError))
        .subscribe((value) => {
          console.log('value', value);
          this.itemForm.reset();
          this.getItems();
          this.edit = false;
        });
    } else {
      this.httpClient
        .post<Item>(this.url, this.itemForm.value)
        .pipe(catchError(handleError))
        .subscribe((value) => {
          console.log('value', value);
          this.itemForm.reset();
          this.getItems();
        });
    }
  }

  getItems() {
    this.httpClient
      .get<Item[]>(this.url)
      .pipe(catchError(handleError))
      .subscribe((value) => {
        console.log('value', value);
        this.items = value;
      });
  }

  editItem(itemIndex: number) {
    this.edit = true;
    this.itemForm.patchValue(this.items[itemIndex]);
  }

  deleteItem(itemIndex: number) {
    const itemName = this.items[itemIndex].name;
    console.log('itemName', itemName);

    this.httpClient
      .delete<Item>(this.url + `${itemName}`)
      .pipe(catchError(handleError))
      .subscribe((value) => {
        console.log('value', value);
        this.getItems();
      });
  }
}

function handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    console.error('An error occurred:', error.error);
  } else {
    console.error(
      `Backend returned code ${error.status}, body was: `,
      error.error
    );
  }
  return throwError(() => {
    return new Error('Something bad happened; please try again later.');
  });
}

interface Item {
  name: string;
  amount: number;
}
