import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  AsyncValidator,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { ForRecipesService } from '../services/for-recipes.service';

@Injectable({ providedIn: 'root' })
export class UniqueEmail implements AsyncValidator {
  constructor(private http: HttpClient, private recipeApi: ForRecipesService) {}
  validate = (
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return this.http
      .post<ValidationErrors | null>(
        `${this.recipeApi.baseUrl}/api/v1/users/checkEmail`,
        {
          email: control.value,
        }
      )
      .pipe(
        map((value) => {
          return null;
        }),
        catchError((error) => {
          return of({ nonUniqueEmail: true });

          //   if (error.message.username) {
          //     return of({ nonUniqueEmail: true });
          //   } else {
          //     return of({ nonConnections: true });
          //   }
        })
      );
  };
}
