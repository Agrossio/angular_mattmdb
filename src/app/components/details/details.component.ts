import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MediaService} from "../../services/media.service";
import {Media} from "../../models/Media";
import {SessionService} from "../../services/session.service";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Location} from "@angular/common";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{

  mediaId?: number;
  mediaType?: string;
  media?: Media;
  isFavorite?: boolean;
  videoActive: boolean = false;
  sanitizedVideoUrl: SafeResourceUrl = "https://www.youtube.com/embed/8uIe0qY9qG8?mute=1&autoplay=1&controls=1";


  constructor(private activatedRoute: ActivatedRoute, private mediaService: MediaService, private router:Router, private sessionService: SessionService, private userService: UserService, private sanitizer: DomSanitizer, private location: Location) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe(params => {

        // get id & mediaType from url:
        let mediaId: number = params['id'];
        let mediaType: string = params['media_type']

        if (mediaId == undefined) this.router.navigate([''])

        this.mediaId = mediaId;
        this.mediaType = mediaType;

        this.mediaService.getDetails(mediaId, mediaType)
          .subscribe(response => {
            this.media = response
            this.sessionService.loggedUser.favorites?.forEach(favorite => {
              if (favorite.mediaId === this.media?.id) this.isFavorite = true;
            })

          })

        }
      )
  }

  closeDetails(): void{
    this.location.back();
  }

  get session(): User {
    return this.sessionService.loggedUser;
  }

  showVideo(): void {

    if (this.mediaId && this.mediaType) {

      this.mediaService.getVideo(this.mediaId, this.mediaType)
        .subscribe(response => {

           if (!this.videoActive) {

             if (!response.results[0]) {
               Swal.fire(
                 {
                   position: 'center',
                   icon: 'error',
                   title: 'Watch Video',
                   text: 'Not available for this media',
                   // showConfirmButton: false,
                   timer: 1500
                 }
               )

                return;
             }

               // @ts-ignore
               this.media.video = response.results[0];

               /*************************************************************************
                YouTube: to get autoplay to work we have to set mute=1. Also, to get loop to
                work we have to add playlist=videoId.
                Angular Safe Resource URL: To use an external url in an iframe we have to bypass the security
                of angular and then sanitize:
                *************************************************************************/

               this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.media?.video.key}?mute=1&autoplay=1&controls=1`)

               this.videoActive = true;



           } else {
             this.videoActive = false;
           }
        })
    }
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
          this.sessionService.updateFavorites(response.data.favorites)

          if (this.isFavorite === true) this.isFavorite = false;

          this.ngOnInit();
      }


        },
        (error: HttpErrorResponse) => {

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
