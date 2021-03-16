import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../Service/common.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, Events } from '@ionic/angular';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  UserData: any = {};
  UserImage_Base64: any;
  UpdatePass: boolean = false;
  newpassword_type: string = "password";
  UpdatePassForm: FormGroup;
  UpdateUserDetail: FormGroup;
  datePickerObj: any = this.common.GetDatePickerObj();
  UserType:any;

  constructor(public events: Events, public common: CommonService, private camera: Camera, public Fb: FormBuilder, public nav: NavController) {

    this.UpdateUserDetail = this.Fb.group({
      name: new FormControl('', Validators.required),
      // mobileno:  new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
      email: new FormControl('', Validators.required),
      dob: new FormControl(''),
    });

    this.UpdatePassForm = this.Fb.group({
      currentpass: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])),
      newpass: new FormControl('', Validators.required)
    });


    this.UserData = JSON.parse(localStorage.getItem('UserProfile'));

  }

  ngOnInit() {
    
    this.UserType = localStorage.getItem('UserType');
  }

  Update() {
    this.common.presentLoader();
    this.UserData.mobile = this.UserData.mobileno;
    this.common.PostMethod("CustomerRegistration", this.UserData).then((res: any) => {
      if (res.Data){
        debugger
        localStorage.setItem('UserProfile', JSON.stringify(res.Data)); 
    
    }
      this.common.dismissLoader();
      this.common.presentToast('Profile Updated Successfully', 4000);
      this.events.publish('ProfileUpdated');

    });
  }


  pickImage(sourceType) {
    let env = this;
    this.common.presentLoader();
    const options: CameraOptions = {
      quality: 50,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      this.UserImage_Base64 = 'data:image/jpeg;base64,' + imageData;
      this.common.PostMethod("FileUpload", { file: this.UserImage_Base64 }).then((res: any) => {
        this.UserData.logo = res.file;
        env.common.dismissLoader();
      }).catch(y => {
        console.log(y);
      });
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.common.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  SavePassword() {
    this.common.presentLoader();
    this.common.PostMethod("ChangePassword", { mobile: this.UserData.mobileno, password: this.UserData.currentpassword, newpassword: this.UserData.newpassword }).then((res: any) => {
      if (res.Status == 1) {
        this.common.dismissLoader();
        this.common.presentToast(res.Message, 4000);
        this.UpdatePass = false;
      }
    }).catch(y => {
      console.log(y);
    });
  }


  CheckDateValidate(ev) {
    let sdate = new Date(ev.detail.value);
    let today = new Date();
    if (sdate > today) {
      //this.registerform.controls["dob"].setValue("");
      this.common.BasicAlert("Alert !", "", "Please do not Select Future Date.");
    }
  }


  goBack() {
    this.nav.pop()
  }


}
