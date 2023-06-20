import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pangolin } from '../models/Pangolin';

@Injectable({
  providedIn: 'root',
})
export class PangolinService {
  private urlAPI: string = environment.API_URL + '/pangolins';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pangolin[]> {
    return this.http.get<Pangolin[]>(this.urlAPI);
  }

  update(id: string, data: {}): Observable<Pangolin> {
    return this.http.put<Pangolin>(this.urlAPI + '/update/' + id, data);
  }

  addFriend(
    idPangolin: string,
    idPangolinFriend: string
  ): Observable<Pangolin> {
    return this.http.put<Pangolin>(this.urlAPI + '/add-friend/' + idPangolin, {
      friendPangolinId: idPangolinFriend,
    });
  }

  async updateAllPangolinNotFriend(
    pangolin: Pangolin
  ): Promise<Pangolin[]> {
    let allPangolins: Pangolin[] = [];
    await lastValueFrom(this.getAll())
      .then((d: any) => {
        // console.log(d);
        // console.log(this.pangolin);
        allPangolins = [...d];

        // for (let i = 0; i < this.allPangolinsNotFriend.length; i++) {
        //   if (this.allPangolinsNotFriend[i]._id === this.pangolin._id) {
        //     this.allPangolinsNotFriend.splice(i, 1);
        //     break;
        //   }
        // }
        const index = allPangolins.findIndex((p) => p._id === pangolin._id);
        if (index !== -1) allPangolins.splice(index, 1);

        for (const p of pangolin.pangolinFriends) {
          // for (let i = 0; i < this.allPangolinsNotFriend.length; i++) {
          //   if (this.allPangolinsNotFriend[i]._id === p._id) {
          //     this.allPangolinsNotFriend.splice(i, 1);
          //     break;
          //   }
          // }
          const index = allPangolins.findIndex((_p) => _p._id === p._id);
          if (index !== -1) allPangolins.splice(index, 1);
        }
      });
    return allPangolins;
  }

  removeFriend(
    idPangolin: string,
    idPangolinFriend: string
  ): Observable<Pangolin> {
    return this.http.put<Pangolin>(
      this.urlAPI + '/remove-friend/' + idPangolin,
      {
        friendPangolinId: idPangolinFriend,
      }
    );
  }
}
