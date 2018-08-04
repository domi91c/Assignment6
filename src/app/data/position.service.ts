import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Position} from './position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) {
  }

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`http://web422.herokuapp.com/positions`);
  }

  savePosition(position: Position): Observable<any> {
    return this.http.put<any>(`http://web422.herokuapp.com/position/${position._id}`, {});
  }

  getPosition(id): Observable<Position[]> {
    return this.http.get<any>(`http://web422.herokuapp.com/position/${id}`);
  }
}
