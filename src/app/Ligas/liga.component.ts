
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LigaService } from './liga.service';
import { Ligas } from './Ligas';



@Component({
    selector: 'app-root',
    templateUrl: './liga.component.html',
    styleUrls: ['./liga.component.css']
  })

  export class LigaComponent implements OnInit {
    public ligas: Ligas[] = [];
    editLiga: Ligas;
    deleteLiga: Ligas;
    keyLiga: String;
    public reverseSort: boolean = true;
    public pageColor: String;

    constructor(private ligaService: LigaService, private router: ActivatedRoute) {}

    ngOnInit(): void {
        this.getLigaByEsporte(this.router.snapshot.params.esporte)
        this.sortLiga('paisLiga')
        this.changeColor();
    }

    public getAllLigas(): void {
        this.ligaService.getAllLigas().subscribe(
            (response: Ligas[]) => {
                this.ligas = response;
                console.log(this.ligas);
            }
        )
    }

    public getLigaByEsporte(ligaEsporte:String): void {
        this.ligaService.getLigaByEsporte(ligaEsporte).subscribe(
            (response: Ligas[]) => {
                this.ligas = response
                console.log(this.ligas);
            }
        )
    }

    public onAddLiga(addFormLiga: NgForm): void {
        this.ligaService.addNewLiga(addFormLiga.value).subscribe(
            (response: Ligas) => {
                console.log(response)
                this.getLigaByEsporte(this.router.snapshot.params.esporte)
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        )
    }
   
    public updateLiga(liga: Ligas): void {
        this.ligaService.updateLiga(liga).subscribe(
            (response: Ligas) => {
                console.log(response)
                this.getLigaByEsporte(this.router.snapshot.params.esporte)
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        )
    }

    public onDeleteLiga(ligaId: number): void {
        this.ligaService.deleteLiga(ligaId).subscribe(
            (response: void) => {
                console.log(response);
                this.getLigaByEsporte(this.router.snapshot.params.esporte)
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        )
    }

    public onOpenModal(liga: Ligas, mode: string): void {
        const container = document.getElementById('mainContainer');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if (mode == 'edit') {
            this.editLiga = liga;
            button.setAttribute('data-target', '#updateLigaModal');
        }

        if (mode == 'delete') {
            this.deleteLiga = liga;
            button.setAttribute('data-target', '#deleteLigaModal')
        }

        if (container != null) {
            container.appendChild(button);
        }
        button.click();
    }

    public sortLiga(keyLiga: string) {
        this.keyLiga = keyLiga;
        this.reverseSort = !this.reverseSort;

    }

    public changeColor() {
        let docStyle = getComputedStyle(document.documentElement);
        switch(this.router.snapshot.params.esporte) {
            case 'Futebol': {
                document.body.style.background =  docStyle.getPropertyValue('--green-gradient');
                this.pageColor = 'green';
                break;
            }
            case 'Hockey': {
                document.body.style.background = docStyle.getPropertyValue('--blue-gradient');
                this.pageColor = 'steelblue';
                break;
            }
            case 'Basquete': {
                document.body.style.background = docStyle.getPropertyValue('--orange-gradient');
                this.pageColor = 'orange';
                break;

            }
            case 'Tenis': {
                document.body.style.background = docStyle.getPropertyValue('--yellowgreen-gradient');
                this.pageColor = 'yellowgreen';
                break;

            }
            case 'Dota2': {
                document.body.style.background = docStyle.getPropertyValue('--red-gradient');
                this.pageColor = 'tomato';
                break;

            }
            case 'CSGO': {
                document.body.style.background = docStyle.getPropertyValue('--darkorange-gradient');
                break;

            }
            case 'LOL': {
                document.body.style.background = docStyle.getPropertyValue('--cyan-gradient');
                break;

            }
            case 'Valorant': {
                document.body.style.background = docStyle.getPropertyValue('--pink-gradient');
                break;

            }

        }
    }



  }