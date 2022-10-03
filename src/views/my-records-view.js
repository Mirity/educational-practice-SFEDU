import AbstractView from "./abstract-view.js";

const template = 'my-records';

export default class MyRecordsView extends AbstractView{
    constructor() {
        super(template);
        this.myRecords = null;
    }

    setMyRecords(myRecords) {
        this.myRecords = myRecords;

        return this;
    }

    getMyRecords () {
        return this.myRecords;
    }
}

