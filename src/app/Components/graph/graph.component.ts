import { Component, Input } from '@angular/core';
import { BarElement, CategoryScale, Chart, Filler, Legend, LinearScale, Tooltip, registerables } from 'chart.js';
import { UrlService } from '../../Service/url.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {
  totalClicksFromParent: any[] = []; 
  public chart:any;
  totalClicks:any[]=[];
  graphLabel:any[] = [];
  graphData:any[]=[];
  endDate=new Date();
  startDate= new Date(this.endDate.getFullYear(), this.endDate.getMonth() ,this.endDate.getDate()-1);
  totalClickObservable:any;
  
  constructor(private service: UrlService, private datepipe:DatePipe){
    Chart.register(BarElement, CategoryScale, LinearScale, Filler, Legend, Tooltip);
    Chart.register(...registerables); 
  }

  
  ngOnInit(): void {
    this.service.totalCLicksFromParentSub.subscribe((data)=>{
      this.totalClicksFromParent = data;
      this.totalClicks = this.totalClicksFromParent;
      this.graphLabel=[];
    this.graphData=[];
  this.totalClicks.forEach((item) => {
    console.log("entered block")
    
    this.graphLabel.push(item.clickDate);
    this.graphData.push(item.count);
  })
   console.log(this.graphLabel);
   console.log(this.graphData);

   this.chart.destroy();

   this.createChart();
    })

    this.totalClickObservable= this.service.getTotalClicks(''+this.datepipe.transform(this.startDate,'yyyy-MM-dd'), ''+this.datepipe.transform(this.endDate,'yyyy-MM-dd')).subscribe(data=>{
      const convertToArray=Object.keys(data).map(key=>{
        return {clickDate: this.datepipe.transform(new Date(key),'yyyy-MM-dd'), count: data[key]};
    });
    // this.test=convertToArray; new Date(key).toISOString()
    this.totalClicks=convertToArray;
    //console.log(this.test.at(0).clickDate.getDate() + " " + this.test.at(0).count);
    // console.log(this.totalClicks);
    // console.log(this.dummyData.dummyData);
    this.totalClicks.forEach((item) => {
      //console.log("entered block")
      this.graphLabel.push(item.clickDate);
      this.graphData.push(item.count);
    })
    // console.log(this.graphLabel);
    // console.log(this.graphData);

    this.createChart();
  },error=>{
    console.log(error)
  })
    
      
  }

  createChart(){
    this.chart=new Chart('barCanvas',{
      type: 'bar' ,
      data:{
        labels:this.graphLabel,
        datasets:[{
          label:"Total clicks",
          data:this.graphData,
          backgroundColor: '#3b82f6',
          borderColor: '#1D2327',
          barThickness: 20,
          barPercentage:1.5,
          categoryPercentage:1.5,
        }]
      },
      options:{
        maintainAspectRatio: false,
        responsive: true,
        plugins:{
          legend:{
            display: true
          }
        },
        scales:{
          y:{
            beginAtZero: true,
            ticks:{
              callback: function(value){
                if(Number.isInteger(value)){
                  return value.toString();
                }
                return "";
              }
            },
            title:{
              display:true,
              text: "Number of Clicks",
              font:{
                family:"Arial",
                size:16,
                weight:"bold",
              }
            }
          },
          x:{
            beginAtZero: true,
            title: {
              display: true,
              text: "Date",
              font: {
                family: "Arial",
                size: 16,
                weight: "bold",
              },
            },
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.totalClickObservable.unsubscribe();
  }
}
