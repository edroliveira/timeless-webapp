import { Injectable, inject } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { PageText } from "../model/page-text";
import { Subject } from "rxjs";
import { PageImage } from "../model/page-image";
import { Storage, getDownloadURL, ref, uploadBytes } from "@angular/fire/storage";

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    firestore = inject(AngularFirestore);
    storage = inject(Storage);
    filePath: string = '/images/';

    $pageTextSubject = new Subject<PageText>();
    paragraphsRef = this.firestore.collection('paragraphs');
    paragraphsCollectionId = '37DpH4M7UbBUjXUDFGMF';

    $musicIdSubject = new Subject<string>();
    musicRef = this.firestore.collection('music');
    musicCollectionId = 'EX3fT9BsaZT7YX5XbMpt';

    $backgroundColorSubject = new Subject<string>();
    backgroundRef = this.firestore.collection('background');
    backgroundCollectionId = 'Gc5CIJ3QbVu7RjQmcQfX';

    constructor() { }

    fetchParagraphs(): void {
        this.paragraphsRef.doc(this.paragraphsCollectionId).snapshotChanges().subscribe(data => {
            const pageText: PageText = new PageText(
                data.payload.get('topPr'),
                data.payload.get('firstRowPr'),
                data.payload.get('secondRowPr'),
                data.payload.get('thirdRowPr'),
                data.payload.get('textColor')
            );

            this.$pageTextSubject.next(pageText);
        });
    }

    fetchMusicVideoId(): void {
        this.musicRef.doc(this.musicCollectionId).snapshotChanges().subscribe(data => {
            this.$musicIdSubject.next(data.payload.get('youtubeVideoUrl'));
        });
    }

    fetchBackground(): void {
        this.backgroundRef.doc(this.backgroundCollectionId).snapshotChanges().subscribe(data => {
            this.$backgroundColorSubject.next(data.payload.get('color'));
        });
    }

    getImages(): PageImage {
        let images: PageImage = new PageImage('', '', '', '');

        const storageRefTop = ref(this.storage, this.filePath + 'top');
        getDownloadURL(storageRefTop).then(resp => images.topImgSrc = resp);

        const storageRefFirst = ref(this.storage, this.filePath + 'first');
        getDownloadURL(storageRefFirst).then(resp => images.firstRowImgSrc = resp);
    
        const storageRefSecond = ref(this.storage, this.filePath + 'second');
        getDownloadURL(storageRefSecond).then(resp => images.secondRowImgSrc = resp);
    
        const storageRefThird = ref(this.storage, this.filePath + 'third');
        getDownloadURL(storageRefThird).then(resp => images.thirdRowImgSrc = resp);

        return images;
    }

    getPageText(): Subject<PageText> {
        return this.$pageTextSubject;
    }

    getMusicUrl(): Subject<string> {
        return this.$musicIdSubject;
    }

    getBackgroundColor(): Subject<string> {
        return this.$backgroundColorSubject;
    }

    async updateTexts(pageText: PageText) {
        let data: Object = {};

        if (pageText.topPr) {
            Object.assign(data, {topPr: pageText.topPr});
        }
        if (pageText.firstRowPr) {
            Object.assign(data, {firstRowPr: pageText.firstRowPr});
        }
        if (pageText.secondRowPr) {
            Object.assign(data, {secondRowPr: pageText.secondRowPr});
        }
        if (pageText.thirdRowPr) {
            Object.assign(data, {thirdRowPr: pageText.thirdRowPr});
        }
        if (pageText.textColor) {
            Object.assign(data, {textColor: pageText.textColor});
        }

        if (Object.keys(data).length > 0) {
            await this.paragraphsRef.doc(this.paragraphsCollectionId).update(data);
        }
    }

    async updateMusicVideoId(videoId: string) {
        await this.musicRef.doc(this.musicCollectionId).update({ youtubeVideoUrl: videoId });
    }

    async updateBackgroundColor(color: string) {
        await this.backgroundRef.doc(this.backgroundCollectionId).update({ color: color });
    }

    async addDataToStorage(imgBlob: Blob, imgPath: string) {
        const storageRef = ref(this.storage, this.filePath + imgPath);
        await uploadBytes(storageRef, imgBlob);
    }

}