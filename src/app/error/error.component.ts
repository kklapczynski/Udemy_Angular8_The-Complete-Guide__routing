import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  message: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.message = this.route.snapshot.data['message'];
    this.route.data.subscribe(
      (data: Data) => {
        this.message = data['message'];
      }
    );
  }

}
