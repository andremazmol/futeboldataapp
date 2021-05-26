import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public esporte: String;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public log(event: Event) {
    const target = event.currentTarget
    this.esporte = (<HTMLInputElement>target).id;
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
    this.router.navigate([this.esporte]);
    
  }

}
