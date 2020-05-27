import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

constructor(private _toast: MatSnackBar) { }

openToast(message: string, action: string){
  this._toast.open(message, action,{
    duration: 2000,
  });
}

}
