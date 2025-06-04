import { Component, ElementRef, ViewChild } from '@angular/core';
import { GraphComponent } from '../graph/graph.component';
import { UrlService } from '../../Service/url.service';
import { ShortenPopUpComponent } from "../shorten-pop-up/shorten-pop-up.component";
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable, map } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GraphComponent, ShortenPopUpComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  @ViewChild('myDialog') myDialog!: ElementRef<HTMLDialogElement>;
  myUrls: any[] = [];

      openDialog() {
        this.myDialog.nativeElement.showModal(); // Use showModal() for a modal dialog
      }

      closeDialog() {
        this.myDialog.nativeElement.close();
      }

  constructor(private service:UrlService, private datepipe:DatePipe){

  }

  navigate(shortUrl: string):string {
    return "https://url-shortner-1lsi.onrender.com/"+shortUrl;
    }



  ngOnInit(): void {
    
    this.service.getTotalUrls().subscribe(res=>{
      this.myUrls = res;
    },error=>{
      console.log("Error fetching URLs: ", error.message)
    })
    this.service.urlMappingDtoSub.subscribe(res=>{
      this.myUrls.push(res);
    })
}

urlAnalytics(shortUrl:string, startDate:Date)
{
  
  this.service.getUrlAnalytics(shortUrl,this.datepipe.transform(new Date(startDate),'yyyy-MM-ddThh:mm:ss')!, this.datepipe.transform(new Date(),'yyyy-MM-ddThh:mm:ss')!).subscribe(res=>{
    console.log("URL Analytics: ", res);
    this.service.totalCLicksFromParentSub.next(res);
  },error=>{
    console.log("Error fetching URL analytics: ", error.message);
  });
}


}
