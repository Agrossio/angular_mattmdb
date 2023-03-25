import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MediaService} from "../../services/media.service";
import {Media} from "../../models/Media";
import {SessionService} from "../../services/session.service";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{

  mediaId?: number;
  mediaType?: string;
  media?: Media;

  constructor(private activatedRoute: ActivatedRoute, private mediaService: MediaService, private router:Router, private sessionService: SessionService, private userService: UserService) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(params => {

        let mediaId: number = params['id'];
        let mediaType: string = params['media_type']

        if (mediaId == undefined) this.router.navigate([''])

        this.mediaId = mediaId;
        this.mediaType = mediaType;

        this.mediaService.getDetails(mediaId, mediaType)
          .subscribe(response => {

            console.log(response)
            this.media = response;
            console.log(this.media);
          })


        }
      )
  }

  closeDetails(): void{
    this.router.navigate([''])
  }

  get session(): User {
    return this.sessionService.loggedUser;
  }

  toggleFavorite(userId: string, favorite: Media): void {

    favorite.media_type = this.mediaType!;


    this.userService.toggleFavorite(userId, favorite)
      .subscribe(response => {

        if(response.success){
          Swal.fire(
            {
              position: 'center',
              icon: 'success',
              title: response.message,
              html: '<img src="../../../../assets/success-dog.PNG" width="40%" alt="response.message">',
              /*            showConfirmButton: false,*/
              timer: 2000
            }
          )
          console.log("RESPONSE ------ ", response)
          this.sessionService.updateFavorites(response.data.favorites)
      }


        },
        (error: HttpErrorResponse) => {

            console.log("TOGGLE FAVORITE", error)

            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.error.message,
              /*            footer: '<a href="">Why do I have this issue?</a>'*/
            })

            if(error instanceof Error) {
              console.log(error)
            }

          }
        )


  }

}
