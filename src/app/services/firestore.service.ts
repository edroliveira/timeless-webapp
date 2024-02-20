import { Injectable, inject } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { PageText } from "../model/page-text";

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    firestore = inject(AngularFirestore);
    pageText: PageText = new PageText('', '', '', '');
    paragraphsRef = this.firestore.collection('paragraphs');
    paragraphsCollectionId = '37DpH4M7UbBUjXUDFGMF';

    constructor() {
        this.paragraphsRef.doc(this.paragraphsCollectionId).snapshotChanges().subscribe(data => {
            this.pageText.topPr = data.payload.get('topPr');
            this.pageText.firstRowPr = data.payload.get('firstRowPr');
            this.pageText.secondRowPr = data.payload.get('secondRowPr');
            this.pageText.thirdRowPr = data.payload.get('thirdRowPr');
        });
    }

    getPageText(): PageText {
        return this.pageText;
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

}