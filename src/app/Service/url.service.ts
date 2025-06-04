import { HttpClient} from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { RegisterRequest } from '../Dto/register-request';
import { Observable, Subject } from 'rxjs';
import { LoginRequest } from '../Dto/login-request';


@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private baseUrl=`https://url-shortner-1lsi.onrender.com/`;

  loggedinSub=new Subject<boolean>();
  urlMappingDtoSub=new Subject<any>();
  totalCLicksFromParentSub=new Subject<any[]>();

  constructor(private http:HttpClient) { }

  registerUser(registerRequest:RegisterRequest):Observable<any>{
    return this.http.post(`${this.baseUrl}api/auth/public/register`,registerRequest,{responseType: 'any' as 'json'});
  }

  loginUser(loginRequest:LoginRequest):Observable<any>{
    return this.http.post(`${this.baseUrl}api/auth/public/login`,loginRequest);
  }

  getTotalClicks(startDate:string, endDate:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}api/urls/totalclicks?startDate=${startDate}&endDate=${endDate}`);
  }

  getUrlAnalytics(shortUrl:string, startDate:string, endDate:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}api/urls/analytics/${shortUrl}?startDate=${startDate}&endDate=${endDate}`);
  }

  createShortUrl(originalUrl:string):Observable<any>{
  return this.http.post<any>(`${this.baseUrl}api/urls/shorten`,{originalUrl});
  }

  getTotalUrls():Observable<any>{
  
    return this.http.get<any>(`${this.baseUrl}api/urls/myurls`);

  }

  isUserLoggedIn(){
    if(localStorage.getItem('token') === null) {
      
      return false;
    }else
    {
      
      return true;
    }
  }

  logout(){
    localStorage.removeItem('token');
    this.loggedinSub.next(false); 
  }
}
