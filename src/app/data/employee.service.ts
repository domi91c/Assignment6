import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Employee} from './employee';
import {EmployeeRaw} from './employee-raw';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`http://web422.herokuapp.com/employees`);
  }

  saveEmployee(employee: EmployeeRaw): Observable<any> {
    return this.http.put<any>(`http://web422.herokuapp.com/employee/${employee._id}`, employee);
  }

  getEmployee(id): Observable<EmployeeRaw[]> {
    return this.http.get<any>(`http://web422.herokuapp.com/employee-raw/${id}`, {});
  }
}
