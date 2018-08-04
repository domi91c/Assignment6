import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Position} from '../data/position';
import {PositionService} from '../data/position.service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  paramSubscription: any;
  positionSubscription: any;
  savePositionSubscription: any;
  position: Position;

  successMessage = false;
  failMessage = false;

  constructor(private ps: PositionService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.paramSubscription = this.route.params.subscribe((params) => {
      this.positionSubscription = this.ps.getPosition(params['_id']).subscribe((data) => {
        this.position = data[0];
      });
    });
  }

  onSubmit(f: NgForm) {
    this.savePositionSubscription = this.ps.savePosition(this.position).subscribe(() => {
      this.successMessage = true;
      setTimeout(() => {
        this.successMessage = false;
      }, 2500)
    });
  }

  ngOnDestroy() {
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
    }
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
    if (this.savePositionSubscription) {
      this.savePositionSubscription.unsubscribe();
    }
  }

}
