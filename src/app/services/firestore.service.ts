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
        await this.paragraphsRef.doc(this.paragraphsCollectionId).update(
            {
                topPr: pageText.topPr,
                firstRowPr: pageText.firstRowPr,
                secondRowPr: pageText.secondRowPr,
                thirdRowPr: pageText.thirdRowPr,
            }
        );
    }

}