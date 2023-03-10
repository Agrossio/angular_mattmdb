import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  id: string | undefined;

  constructor(private activatedRoute: ActivatedRoute) {

    activatedRoute.params
      .subscribe(params => {

        let id = params['id']

        if (id != undefined){
          this.id = id;
        } else {
          this.id = "hola"
        }

      }
    )

  }

}
