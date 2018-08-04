import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EmployeeRaw} from '../data/employee-raw';
import {Position} from '../data/position';
import {EmployeeService} from '../data/employee.service';
import {PositionService} from '../data/position.service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  paramSubScription: any;
  employeeSubscription: any;
  getPositionsSub: any;
  saveEmployeeSubscription: any;

  employee: EmployeeRaw;
  positions: Position[];

  successMessage = false;
  failMessage = false;

  constructor(private route: ActivatedRoute,
              private es: EmployeeService,
              private ps: PositionService) {
  }

  ngOnInit() {

    this.paramSubScription = this.route.params.subscribe((params) => {
      this.employeeSubscription = this.es.getEmployee(params['_id']).subscribe((data) => {
        this.employee = data[0];
        this.getPositionsSub = this.ps.getPositions().subscribe(data => {
          this.positions = data;
        });
      });
    });
  }

  onSubmit(f: NgForm) {
    this.saveEmployeeSubscription = this.es.saveEmployee(this.employee).subscribe(() => {
      this.successMessage = true;
      setTimeout(() => {
        this.successMessage = false;
      }, 2500)
    });
  }

  ngOnDestroy() {
    if (this.paramSubScription)
      this.paramSubScription.unsubscribe();
    if (this.employeeSubscription)
      this.employeeSubscription.unsubscribe();
    if (this.getPositionsSub)
      this.getPositionsSub.unsubscribe();
    if (this.saveEmployeeSubscription)
      this.saveEmployeeSubscription.unsubscribe();
  }
}

