import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Pangolin } from 'src/app/models/Pangolin';
import { PangolinService } from 'src/app/services/pangolin.service';
import { SessionstorageService } from 'src/app/services/sessionstorage.service';

@Component({
  selector: 'app-pangolin-friends',
  templateUrl: './pangolin-friends.component.html',
  styleUrls: ['./pangolin-friends.component.scss'],
})
export class PangolinFriendsComponent implements OnInit {
  allPangolinsNotFriend: Pangolin[] = [];
  pangolin: Pangolin;
  isSending: boolean = false;

  constructor(
    private pangolinService: PangolinService,
    private sessionService: SessionstorageService,
    private nzNotification: NzNotificationService
  ) {
    this.pangolin = sessionService.getUser();
  }

  ngOnInit(): void {
    this.updateAllPanolinsNotFriend();
  }

  async updateAllPanolinsNotFriend() {
    this.allPangolinsNotFriend = await this.pangolinService.updateAllPangolinNotFriend(this.pangolin);
    // this.pangolinService.getAll().subscribe({
    //   next: (d: Pangolin[]) => {
    //     // console.log(d);
    //     // console.log(this.pangolin);
    //     this.allPangolinsNotFriend = [...d];

    //     // for (let i = 0; i < this.allPangolinsNotFriend.length; i++) {
    //     //   if (this.allPangolinsNotFriend[i]._id === this.pangolin._id) {
    //     //     this.allPangolinsNotFriend.splice(i, 1);
    //     //     break;
    //     //   }
    //     // }
    //     const index = this.allPangolinsNotFriend.findIndex(p => p._id === this.pangolin._id);
    //     if (index !== - 1) this.allPangolinsNotFriend.splice(index, 1);

    //     for (const p of this.pangolin.pangolinFriends) {
    //       // for (let i = 0; i < this.allPangolinsNotFriend.length; i++) {
    //       //   if (this.allPangolinsNotFriend[i]._id === p._id) {
    //       //     this.allPangolinsNotFriend.splice(i, 1);
    //       //     break;
    //       //   }
    //       // }
    //       const index = this.allPangolinsNotFriend.findIndex(_p => _p._id === p._id);
    //       if (index !== - 1) this.allPangolinsNotFriend.splice(index, 1);
    //     }
    //   },
    // });
  }

  onClickAdd(id: string): void {
    this.isSending = true;
    this.pangolinService.addFriend(this.pangolin._id, id).subscribe({
      next: async (d) => {
        // console.log(d);
        this.sessionService.saveUser(d);
        this.pangolin = this.sessionService.getUser();
        this.allPangolinsNotFriend = await this.pangolinService.updateAllPangolinNotFriend(this.pangolin);
      },
      error: () => {
        this.isSending = false;
      },
      complete: () => {
        this.isSending = false;
        this.nzNotification.success('', "L'ami a été ajouté");
      },
    });
  }

  onClickDelete(id: string): void {
    this.isSending = true;
    this.pangolinService.removeFriend(this.pangolin._id, id).subscribe({
      next: async (d) => {
        // console.log(d);
        this.sessionService.saveUser(d);
        this.pangolin = this.sessionService.getUser();
        this.allPangolinsNotFriend = await this.pangolinService.updateAllPangolinNotFriend(this.pangolin);
      },
      error: () => {
        this.isSending = false;
      },
      complete: () => {
        this.isSending = false;
        this.nzNotification.success('', "L'ami a été supprimé");
      },
    });
  }
}
