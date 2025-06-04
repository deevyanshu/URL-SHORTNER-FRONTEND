import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UrlService } from '../../Service/url.service';
import { Subject, exhaustMap, map } from 'rxjs';
import { error } from 'console';


@Component({
  selector: 'app-shorten-pop-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './shorten-pop-up.component.html',
  styleUrl: './shorten-pop-up.component.css'
})
export class ShortenPopUpComponent {
  originalUrl!:string;
  urlDataSub=new Subject<void>
  

  constructor(private service:UrlService){ 
  }

  ngOnInit(): void {
    
    this.urlDataSub.pipe(
      exhaustMap(()=>this.createShortUrl())
    ).subscribe(res=>{
      alert("Shortened URL Created: "+res.shortUrl);
      this.service.urlMappingDtoSub.next(res);
      console.log("Shortened URL Created: ", res);  
    },error=>{
      console.log("error:- "+error.message)
    })
  }

  createShortUrl(){
    console.log("entered")
    return this.service.createShortUrl(this.originalUrl).pipe(
      map(res=>res)
    );
  }

  ngOnDestroy(): void {
    this.urlDataSub.complete();
  }
}
