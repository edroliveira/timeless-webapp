import { Injectable, inject } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { PageText } from "../model/page-text";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    firestore = inject(AngularFirestore);
    $pageTextSubject = new Subject<PageText>();
    paragraphsRef = this.firestore.collection('paragraphs');
    paragraphsCollectionId = '37DpH4M7UbBUjXUDFGMF';

    $musicIdSubject = new Subject<string>();
    musicRef = this.firestore.collection('music');
    musicCollectionId = 'EX3fT9BsaZT7YX5XbMpt';

    constructor() {
        this.paragraphsRef.doc(this.paragraphsCollectionId).snapshotChanges().subscribe(data => {
            const pageText: PageText = new PageText(
                data.payload.get('topPr'),
                data.payload.get('firstRowPr'),
                data.payload.get('secondRowPr'),
                data.payload.get('thirdRowPr')
            );

            this.$pageTextSubject.next(pageText);
        });

        this.musicRef.doc(this.musicCollectionId).snapshotChanges().subscribe(data => {
            this.$musicIdSubject.next(data.payload.get('youtubeVideoUrl'));
        });
    }

    getPageText(): Subject<PageText> {
        return this.$pageTextSubject;
    }

    getMusicUrl(): Subject<string> {
        return this.$musicIdSubject;
    }

    async updateTexts(pageText: PageText) {
        let data: Object = {};

        if (pageText.topPr) {
            Object.assign(data, {topPr: pageText.topPr})
        }
        if (pageText.firstRowPr) {
            Object.assign(data, {firstRowPr: pageText.firstRowPr})
        }
        if (pageText.secondRowPr) {
            Object.assign(data, {secondRowPr: pageText.secondRowPr})
        }
        if (pageText.thirdRowPr) {
            Object.assign(data, {thirdRowPr: pageText.thirdRowPr})
        }

        if (Object.keys(data).length > 0) {
            await this.paragraphsRef.doc(this.paragraphsCollectionId).update(data);
        }
    }

    async updateMusicVideoId(videoId: string) {
        await this.musicRef.doc(this.musicCollectionId).update({ youtubeVideoUrl: videoId });
    }

}