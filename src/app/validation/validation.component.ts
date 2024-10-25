import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShareDataBtwCompService } from '../services/share-data-btw-comp.service';

@Component({
  selector: 'app-validation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.css'
})
export class ValidationComponent implements OnInit {

  constructor(private sdbtwcomp : ShareDataBtwCompService){}

  ngOnInit(): void {
      this.sdbtwcomp.updateHeaderBottomContent(5);
  }
}
