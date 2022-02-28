import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import  { Subscription } from 'rxjs';

import { SecurityService } from '../../services/security.service';


@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit, OnDestroy {

  @Output() menuToggle: EventEmitter<any>  = new EventEmitter();
  userSubscription: Subscription = new Subscription();

  userStatus: boolean = false;


  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this.userSubscription = this.securityService
      .changeSecurity
        .subscribe( status => {
          this.userStatus = status;
        })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onMenuToggleDispatch(): void{
    this.menuToggle.emit();
  }

  logout(){
    this.securityService.logoutUser();
  }

}
