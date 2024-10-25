import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ShareDataBtwCompService } from '../services/share-data-btw-comp.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-in-log-out',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink],
  templateUrl: './log-in-log-out.component.html',
  styleUrl: './log-in-log-out.component.css'
})
export class LogInLogOutComponent implements OnDestroy,AfterViewInit {
  isLoginForm ?: boolean;
  currentFormTypeSubscription ?: Subscription;

  constructor(private shareDataBtwComp : ShareDataBtwCompService,private cdref : ChangeDetectorRef){}

  ngAfterViewInit(): void {
    this.currentFormTypeSubscription = this.shareDataBtwComp.currentFormType$.subscribe({
      next : (value) =>{
        this.isLoginForm = value;
        if(this.isLoginForm){
          this.shareDataBtwComp.updateHeaderBottomContent(3);
        }else{
          this.shareDataBtwComp.updateHeaderBottomContent(4);
        }
        this.cdref.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
      this.currentFormTypeSubscription?.unsubscribe();
  }
}
