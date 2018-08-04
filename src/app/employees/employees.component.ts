import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Employee} from '../data/employee';
import {EmployeeService} from '../data/employee.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
  currentEmployees: Employee[];

  constructor(private es: EmployeeService,
              private router: Router) {
  }

  ngOnInit() {
    this.es.getEmployees().subscribe(employees => {
      this.employees = employees
      this.currentEmployees = this.employees;
      return this.employees;
    });
  }

  routeEmployee(id: string) {
    this.router.navigate(['/employee', id]);
  }

  onEmployeeSearchKeyUp(event: any) {
    let query = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((employee) => {
      if (employee.FirstName.toLowerCase().includes(query) ||
        employee.LastName.toLowerCase().includes(query) ||
        employee.Position.PositionName.toLowerCase().includes(query) ||
        employee.PhoneNum.toLowerCase().includes(query)) {
        return true;
      }
    });
    this.currentEmployees = query.length ? this.filteredEmployees : this.employees;
  }

}
