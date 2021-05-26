import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimeService } from './time.service';
import { Times } from './Times';

@Component({
    selector: 'app-root',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.css']
  })

  export class TimeComponent implements OnInit {
      public times: Times[] = [];
      public editTime: Times;
      public deleteTime: Times;
      public nome: any;
      public keyTime: string;
      public reverseSort: boolean = false;



      constructor(private timeService: TimeService, private router: ActivatedRoute) {}

    ngOnInit(): void {
        console.log(this.router.snapshot.params);
        this.getTimeByLeague(this.router.snapshot.params.league);
        this.sortTime('titulos');
        
    }

    public getAllTimes(): void{
        this.timeService.getAllTimes().subscribe(
            (response: Times[]) => {
                this.times = response
                console.log(this.times)
            },
            (error: HttpErrorResponse) => {
                alert(error.message)
            }
        )
    }

    public getTimeByLeague(timeLeague: String): void {
        this.timeService.getTimeByLeague(timeLeague).subscribe(
            (response: Times[]) => {
                this.times = response
                console.log(this.times);
            }
        )
    }

    public onAddTime(addForm: NgForm): void {
        this.timeService.addNewTime(addForm.value).subscribe(
            (response: Times) => {
                console.log(response)
                this.ngOnInit();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
            
            )
        
    }

    public updateTime(time: Times): void {
        this.timeService.updateTime(time).subscribe(
            (response: Times) => {
                console.log(response);
                this.ngOnInit();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        )
    }

    public onDeleteTime(timeId: number): void {
        this.timeService.deleteTime(timeId).subscribe(
            (response: void) => {
                console.log(response);
                this.ngOnInit();
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        )
    }



    public onOpenModal(time: Times, mode: string): void {
        const container = document.getElementById('mainContainer');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if (mode == 'edit') {
            this.editTime = time;
            button.setAttribute('data-target', '#updateTimeModal');
        }
        if (mode == 'delete') {
            this.deleteTime = time;
            button.setAttribute('data-target', '#deleteTimeModal')
        }

        if (container != null) {
            container.appendChild(button);
        }
        button.click();


    }

    public SearchTime() {
        if (this.nome == "") {
            this.getTimeByLeague(this.router.snapshot.params.league);
        }
        else {
            this.times = this.times.filter(response =>{
            return response.nome.toLocaleLowerCase().match(this.nome.toLocaleLowerCase());
        })}
    }

    public sortTime(keyTime: string) {
        this.keyTime = keyTime;
        this.reverseSort = !this.reverseSort;

    }

    public log() {
        console.log("teste")
    }


  }