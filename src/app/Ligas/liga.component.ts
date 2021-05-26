
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

    constructor(private ligaService: LigaService, private router: ActivatedRoute) {}

    ngOnInit(): void {
        this.getLigaByEsporte(this.router.snapshot.params.esporte)
        this.sortLiga('paisLiga')
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



  }