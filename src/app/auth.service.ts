import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  //Get all Data
  getPeople(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/people`);
  }

  // Update a person
  updatePerson(id: number, updatedPerson: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/people/${id}`, updatedPerson);
  }

  // Delete a person
  deletePerson(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/people/${id}`);
  }

  // Add a new person
  addPerson(newPerson: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/people`, newPerson);
  }
}
