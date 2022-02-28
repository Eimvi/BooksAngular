import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  @Output() menuClose: EventEmitter<any>  = new EventEmitter();

  statusUser: boolean = false;
  userSubscription: Subscription = new Subscription();

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this.userSubscription = this.securityService
      .changeSecurity
        .subscribe( status => {
          this.statusUser = status;
        });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onMenuCloseDispatch(): void{
    this.menuClose.emit();
  }

  logout(){
    this.onMenuCloseDispatch();
    this.securityService.logoutUser();
  }

}
