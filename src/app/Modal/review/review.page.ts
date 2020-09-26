import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Events, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  customForm: FormGroup;
  @ViewChild('rating',{static:false}) rating : any;

  constructor(private formBuilder: FormBuilder,public events:Events,public modal: ModalController ) { }

  ngOnInit() {
    // at this we can seen the review api
    this.customForm = this.formBuilder.group({
      starRating: [0],
      comment: new FormControl(''),
  });
  }
  logRatingChange(rating){
    console.log("changed: ",rating, this.customForm.value.starRating);
    // do your stuff
}
close(){
  this.modal.dismiss({ Status: false });
}
postReview(){
  if(this.customForm.value.starRating>0){
    //store reviews in api
    console.log("Stars: ", this.customForm.value.starRating);
    this.modal.dismiss({ Status: false });
  }
  else{
    alert('please give atleast 1 star ')
  }
}
}
