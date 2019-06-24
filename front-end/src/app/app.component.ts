import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MEAN-GS';

  constructor(private apollo: Apollo, private socket: Socket) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            users {
              Username
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        console.log(result.data['users']);
      });
  }
}
