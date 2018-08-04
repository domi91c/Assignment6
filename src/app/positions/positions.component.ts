import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Position} from '../data/position';
import {PositionService} from '../data/position.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  positions: Position[];

  constructor(private ps: PositionService, private router: Router) {
  }


  ngOnInit() {
    this.ps.getPositions().subscribe(position => this.positions = position);
  }

  routePosition(id: string) {
    this.router.navigate(['/position', id]);
  }
}
