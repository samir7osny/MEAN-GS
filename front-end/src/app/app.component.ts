import { Component } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from "graphql-tag";
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  title = 'MEAN-GS';
  rates: any[];
  loading = true;
  error: any;

  constructor(private apollo: Apollo, private socket: Socket) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            users {
              username
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        console.log(result.data['users']);
      });
  }

}
