import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Herbal Remedies';
  hide = true;
  loader= false; //
  commentPart = false;
  loginPage = true;
  dashboardPage= false;
  homeContent = false;
  uploadData=false;
  addResearchContent = false;
  editResearchContent = false;
  userInfoContent = false;
  viewUser=false;
  aboutContent = false;
  signup=false;
  userLogin=false;
  userID=''; //
  password='';
  uid='';
  pass='';
  loggedIn='';
  editPlant=false;
  editplantid='';
  role='';


  constructor(private http:HttpClient,private router:Router){}

  ngOnInit(): void{
    this.getAdvlist();
    this.getUserList();

    this.displayPlant();

  }

  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if(this.ContactNumber.length<10){
       if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
    }
    else{
      return false;
    }
    // Only Numbers 0-9

  }

  keyPressForAlphabet(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;

       if ((charCode < 64 || charCode > 91) && (charCode < 96 || charCode > 123)  ) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }


    // Only Numbers 0-9

  }

  keyPressEmpNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if(this.empContactNumber.length<10){
       if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
    }
    else{
      return false;
    }
    // Only Numbers 0-9

  }



  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

SignUp(){
  this.loginPage = false;
  this.signup=true;
  this.userLogin=false;
  this.editResearchContent = false;
  this.uploadData=false;
  this.commentPart = false;
  this.searchContent = false;
}
  logout(){
    this.loginPage = true;
  this.dashboardPage= false;
  this.editResearchContent = false;
  this.uploadData=false;
  this.commentPart = false;
  this.searchContent = false;
  }
  addResercher(){
    this.homeContent = false;
    this.addResearchContent = true;
    this.userInfoContent = false;
    this.aboutContent = false;
    this.viewUser=false;
  this.editResearchContent = false;
  this.uploadData=false;
  this.searchContent = false;
  this.commentPart = false;
  }
  home(){
    this.homeContent = true;
    this.addResearchContent = false;
    this.userInfoContent = false;
    this.aboutContent = false;
    this.viewUser=false;
  this.editResearchContent = false;
  this.uploadData=false;
this.displayPlant();
this.commentPart = false;
this.searchContent = false;
  }
  searchContent =false;
  Search(){
    this.homeContent = false;
    this.addResearchContent = false;
    this.userInfoContent = false;
    this.aboutContent = false;
    this.viewUser=false;
  this.editResearchContent = false;
  this.uploadData=false;
this.displayPlant();
this.commentPart = false;
this.searchContent = true;
  }

  info(){
    this.homeContent = false;
    this.addResearchContent = false;
    this.userInfoContent = false;
    this.aboutContent = false;
    this.viewUser=false;
  this.editResearchContent = false;
  this.uploadData=true;
  this.commentPart = false;
  this.searchContent = false;
  }
  userInfo(){
    this.homeContent = false;
    this.addResearchContent = false;
    this.userInfoContent = true;
    this.aboutContent = false;
    this.viewUser=false;
  this.editResearchContent = false;
  this.uploadData=false;
  this.commentPart = false;
  this.searchContent = false;
  }

  User(){
    this.homeContent = false;
    this.addResearchContent = false;
    this.userInfoContent = false;
    this.aboutContent = false;
    this.viewUser=true;
  this.editResearchContent = false;
  this.uploadData=false;
  this.uploadData=false;
  this.commentPart = false;
  this.searchContent = false;
  }

  about(){
    this.homeContent = false;
    this.addResearchContent = false;
    this.userInfoContent = false;
    this.aboutContent = true;
    this.viewUser=false;
  this.editResearchContent = false;
  this.uploadData=false;
  this.commentPart = false;
  this.searchContent = false;
  }

  login(){
    this.loader= true;
   console.warn(this.userID);
   console.warn(this.password);
   const headers = {'Content-Type':'application/json'} //Creating header with type of application
   const body = {
     'userId':this.userID,
     'password':this.password,
   };
       this.http.post<any>('http://localhost:3000/employeePlantLogin',body,{headers}).subscribe(data => {
         console.warn(data);
         var msg = data["message"];
         if(msg=="Login Successfull"){
              this.loggedIn=this.userID;
              this.loginPage = false;
              this.dashboardPage= true;
              this.homeContent=true;
              this.loader= false;
              this.userID = '';
              this.password = '';
              this.role="employee";
              this.getCount();
console.log("this.role"+this.role);
         }else{
          this.http.post<any>('http://localhost:3000/userPlantLogin',body,{headers}).subscribe(data => {
            console.warn(data);
            var msg = data["message"];
            if(msg=="Login Successfull"){
              this.loggedIn=this.userID;
              this.loginPage = false;
              this.dashboardPage= true;
              this.homeContent=true;
              this.loader= false;
              this.userID = '';
              this.password = '';
              this.role="user";
              this.getCount();
              console.log("this.role"+this.role);

            }else{
              this.http.post<any>('http://localhost:3000/adminLogin',body,{headers}).subscribe(data => {
                console.warn(data);
                var msg = data["message"];
                if(msg=="Login Successfull"){
                  this.loggedIn=this.userID;
                  this.loginPage = false;
                  this.dashboardPage= true;
                  this.homeContent=true;
                  this.loader= false;
                  this.userID = '';
                  this.password = '';
                  this.role="admin";
                  this.getCount();
                  console.log("this.role"+this.role);

                }else{
                  this.userID = '';
                  this.password = '';
                 this.loginPage = true;

                 this.dashboardPage= false;
                 this.loader= false;
                }
              },
               error => {
                console.warn(error);

                });
            }
          },
           error => {
            console.warn(error);

            });

         }
       },
        error => {
         console.warn(error);

         });

       }

       loginuser(){
        this.loader= true;
       console.warn(this.uid);
       console.warn(this.pass);
       const headers = {'Content-Type':'application/json'} //Creating header with type of application
       const body = {
         'userId':this.uid,
         'password':this.pass,
       };
           this.http.post<any>('http://localhost:3000/userPlantLogin',body,{headers}).subscribe(data => {
             console.warn(data);
             var msg = data["message"];
             if(msg=="Login Successfull"){
                  this.loginPage = false;
                  this.userLogin = false;
                  this.dashboardPage= true;
                  this.loader= false;
                  this.userID = '';
                  this.password = '';
                  this.getCount();

             }else{
               this.uid = '';
               this.pass = '';
              this.loginPage = false;
              this.userLogin=true;
              this.dashboardPage= false;
              this.loader= false;
             }
           },
            error => {
             console.warn(error);

             });

           }

       empName ='';
       empUsername ='';
       empEmail ='';
       empContactNumber ='';
       empAddress ='';
       empLocation ='';
       empQualification ='';
       empExperience ='';
       empPassword ='';


       createEmployee(){
        if(this.empContactNumber.length==10 && this.empPassword.length>4){
          const headers = {'Content-Type':'application/json'} //Creating header with type of application
          const body = {
                 'name':this.empName,
                 'userId':this.empUsername, //name,userId,contact,address,email,location,experience,qualification,password
                 'contact':this.empContactNumber,
                 'address':this.empAddress,
                 'email':this.empEmail,
                 'location':this.empLocation,
                 'experience':this.empExperience,
                 'qualification':this.empQualification,
                 'password':this.empPassword,
          };
              this.http.post<any>('http://localhost:3000/employeePlantCreate',body,{headers}).subscribe(data => {
                console.warn(data);
                       this.empName ='';
                       this.empUsername ='';
                       this.empEmail ='';
                       this.empContactNumber ='';
                       this.empAddress ='';
                       this.empLocation ='';
                       this.empQualification ='';
                       this.empExperience ='';
                       this.empPassword ='';
                       this.getAdvlist();

              },
               error => {
                console.warn(error);

                });
        }
        else{
          alert('Invalid Contact or Incorrect Password')
        }


           }

           editEmpName='';
           editEmpId='';
           editEmpQualification='';
           editEmpLocation='';
           editEmpExperience='';
           editEmpEmail='';
           editEmpContact='';
           editEmpAddress='';
           editPassword='';
           empId='';


           editResearcher(name: string,uid: string,qualification: string,location: string,experience: string,email: string,contact: string,address: string,password:string,id:string){
            this.editResearchContent = true;
            this.homeContent = false;
    this.addResearchContent = false;
    this.userInfoContent = false;
    this.aboutContent = false;
    this.viewUser=false;
            this.editEmpName=name;
            this.editEmpId=uid;
            this.editEmpQualification=qualification;
            this.editEmpLocation=location;
            this.editEmpExperience=experience;
            this.editEmpEmail=email;
            this.editEmpContact=contact;
            this.editEmpAddress=address;
            this.editPassword=password;
            this.empId=id;
           }

           updateReseracherInfo(){
            const headers = {'Content-Type':'application/json'} //Creating header with type of application
            const body = {
                   'name':this.editEmpName,
                   'userId':this.editEmpId, //name,userId,contact,address,email,location,experience,qualification,password
                   'contact':this.editEmpContact,
                   'address':this.editEmpAddress,
                   'email':this.editEmpEmail,
                   'location':this.editEmpLocation,
                   'experience':this.editEmpExperience,
                   'qualification':this.editEmpQualification,
                   'password':this.editPassword,
            };
                this.http.put<any>('http://localhost:3000/updateEmployeePlant/'+this.empId,body,{headers}).subscribe(data => {
                  console.warn(data);
                  this.editEmpName='';
                  this.editEmpId='';
                  this.editEmpQualification='';
                  this.editEmpLocation='';
                  this.editEmpExperience='';
                  this.editEmpEmail='';
                  this.editEmpContact='';
                  this.editEmpAddress='';
                  this.editPassword='';
                  this.empId='';
                  this.getAdvlist();

                },
                 error => {
                  console.warn(error);

                  });
           }
           plantName='';
           plantCategory='';
           plantDescription='';
           plantLocation='';
           plantBenefits='';
           facts='';
           imageUrl=''
           uploadedBy='';

           sideEffects='';
           createPlantInfo(){
            const headers = {'Content-Type':'application/json'} //Creating header with type of application
            if(this.editPlant==false){
              const body = {

                'name':this.plantName,
                'category':this.plantCategory, //name,userId,contact,address,email,location,experience,qualification,password
                'location':this.plantLocation,
                'description':this.plantDescription,
                'image':this.imageUrl,
                'benefits':this.plantBenefits,
                'sideeffects':this.sideEffects,
                'uploadedby':this.uploadedBy

         };
         this.http.post<any>('http://localhost:3000/plantsInfoCreate',body,{headers}).subscribe(data => {
          console.warn(data);
          this.displayPlant();
          this.plantName='';
          this.plantCategory='';
          this.plantDescription='';
          this.plantLocation='';
          this.plantBenefits='';

          this.imageUrl=''
          this.uploadedBy='';

          this.sideEffects='';


        },
         error => {
          console.warn(error);

          });
            }
            else{
              const body = {
                '_id':this.editplantid,
                'name':this.plantName,
                'category':this.plantCategory, //name,userId,contact,address,email,location,experience,qualification,password
                'location':this.plantLocation,
                'description':this.plantDescription,
                'image':this.imageUrl,
                'benefits':this.plantBenefits,
                'sideeffects':this.sideEffects,
                'uploadedby':this.uploadedBy

         };
         this.http.put<any>('http://localhost:3000/updatePlantsInfo/'+this.editplantid,body,{headers}).subscribe(data => {
                  console.warn(data);
                  this.displayPlant();
                  this.homeContent=true;
                  this.uploadData=false;
                  this.editplantid='';
                  this.editPlant=false;
                  this.plantName='';
                  this.plantCategory='';
                  this.plantDescription='';
                  this.plantLocation='';
                  this.plantBenefits='';
                  this.facts='';
                  this.imageUrl=''
                  this.uploadedBy='';

                  this.sideEffects='';


                },
                 error => {
                  console.warn(error);

                  });
            }



           }



           plant:any;
           displayPlant(){
            const headers = { 'Content-Type': 'application/json' } //Creating header with type of application

            this.http.get<any>("http://localhost:3000/plantsInfoList", { headers }).subscribe(data => {
                  console.warn(data);
                  this.plant = data[ "result"];
            },
              error => {
                console.log('server error', error);
              }
            );
           }


           editPlantInfo(id:string,name:string,category:string,location:string,description:string,
            image:string,benefits:string,sideeffects:string,uploadedby:string){
            this.homeContent=false;
            this.uploadData=true;
            this.editPlant=true;
            this.editplantid=id;
            this.plantName=name
            this.plantCategory=category
            this.plantLocation=location
            this.plantDescription=description
            this.imageUrl=image
            this.plantBenefits=benefits
            this.sideEffects=sideeffects
            this.uploadedBy=uploadedby
            //  this.createPlantInfo();
           }

           uName='';
           Username='';
           uAddress='';
           ContactNumber='';
           uLocation='';
           uPassword='';

           createUser(){
            console.log(this.uName,this.Username,this.uAddress,this.ContactNumber,this.uLocation,this.uPassword)
            if(this.ContactNumber.length==10 && this.uPassword.length>4){
              const headers = {'Content-Type':'application/json'} //Creating header with type of application
              const body = {
                     'name':this.uName,
                     'userId':this.Username, //name,userId,contact,address,email,location,experience,qualification,password
                     'contact':this.ContactNumber,
                     'address':this.uAddress,
                     'location':this.uLocation,
                     'password':this.uPassword
              };
                  this.http.post<any>('http://localhost:3000/userPlantCreate',body,{headers}).subscribe(data => {
                    console.warn(data);
                    this.uName='';
                    this.Username='';
                    this.uAddress='';
                    this.ContactNumber='';
                    this.uLocation='';
                    this.uPassword='';
                    this.loginPage = false;
                    this.signup=false;
                    this.userLogin=true;

                  },
                   error => {
                    console.warn(error);

                    });
            }
            else{
              alert('Invalid Contact Number or Incorrect Password');
              this.ContactNumber='';
            }

                }



           displayedColumns: string[] = ['_id', 'name', 'userId', 'qualification',
           'location', 'experience', 'email','contact','address','edit'];

           dataSource=[];
           getAdvlist() {

            const headers = { 'Content-Type': 'application/json' } //Creating header with type of application

            this.http.get<any>("http://localhost:3000/employeePlantList", { headers }).subscribe(data => {
                  console.warn(data);
                  this.dataSource = data[ "result"];
            },
              error => {
                console.log('server error', error);
              }
            );

          }
          displayUser: string[] = ['_id', 'name', 'userId','location','contact','address'];

          userData=[];
          getUserList(){
            const headers = { 'Content-Type': 'application/json' } //Creating header with type of application

            this.http.get<any>("http://localhost:3000/userPlantList", { headers }).subscribe(data => {
                  console.warn(data);
                  this.userData = data[ "result"];
            },
              error => {
                console.log('server error', error);
              }
            );
          }
          count:any;
          getCount() {
              var tempCount;
              const headers = { 'Content-Type': 'application/json' } //Creating header with type of application

            this.http.get<any>("http://localhost:3000/countList", { headers }).subscribe(data => {
                  console.warn(data);
                  var num = data[ 'result'][0]['countVisitor'];
                  tempCount = num + 1;
                  this.count = tempCount;

              const body = {
                "countVisitor":tempCount
               };
            this.http.put<any>('http://localhost:3000/updateCount/617518235baf541f30b88b81',body,{headers}).subscribe(data => {
              console.log(data);
              },
               error => {
                console.warn(error);
                });
            },
              error => {
                console.log('server error', error);
              }
            );


   }
   commentList:any;
   commentID:any;
   _getCommentList(id:string){
    console.log(id);
    this.commentID = id;
     this.homeContent =false;
     this.commentPart = true;
    this.commentList = [];
    const headers = { 'Content-Type': 'application/json' } //Creating header with type of application

    this.http.get<any>("http://localhost:3000/plantFeedbackList", { headers }).subscribe(data => {
          console.warn(data);
          var list =[];
          for(var i =0;i<data["result"].length;i++){
            if(data["result"][i]["plantId"]==id){
              list.push(data["result"][i]);
            }
          }
          console.log(list);
          this.commentList = list;
    },
      error => {
        console.log('server error', error);
      }
    );
   }
   commentMsg='';
   addComment(){
    const headers = {'Content-Type':'application/json'} //Creating header with type of application
    const body = {
      "userId":this.loggedIn,
      "message":this.commentMsg,
       "plantId":this.commentID,
      "votes":"1"
    };
        this.http.post<any>('http://localhost:3000/plantFeedbackCreate',body,{headers}).subscribe(data => {
          console.warn(data);
          this._getCommentList(this.commentID);
          this.commentMsg ="";
        },
         error => {
          console.warn(error);

          });
   }

   backFromComment(){
    this.commentMsg ="";
    this.commentID = "";
     this.homeContent = true;
     this.commentPart = false;
   }
   searchResults:any;
   searchKeywords='';
   searchForPlants(){
    this.searchResults = [];
     console.log(this.searchKeywords);
    const headers = { 'Content-Type': 'application/json' } //Creating header with type of application

    this.http.get<any>("http://localhost:3000/plantsInfoList", { headers }).subscribe(data => {
          console.warn(data);
          var search = [];
          for(var i=0;i<data[ "result"].length;i++) {
            var name = data[ "result"][i]["name"];
            if(name.includes(this.searchKeywords)){
              search.push(data[ "result"][i]);
            }
          }
          this.searchResults =search;
    },
      error => {
        console.log('server error', error);
      }
    );
   }

}
