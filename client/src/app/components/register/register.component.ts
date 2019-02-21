import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; //register.post() burada tanimladi
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup; // register.html icerisindeki forma ulasmamizi saglar
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();//baslarken form objesini olusturur ve html formun kullanimina hazir hale getirir.
  };

  ngOnInit() {
  }

  /**
   * Burada 4 parcali form olusturulur ve buradaki elemanlara map edilir.
   * Daha sonra register.html  icersinde formControlName ile baglanir.
   */
  public createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(7),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(1),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(3),
        this.validatePassword
      ])],
      confirm: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(3)
      ])]
    }, { validator: this.matchingPasswords('password', 'confirm') });
  }

  //Uses authService.checkEmail()
  checkEmail() {
    /*this.authService.checkEmail(this.form.get('email').value).subscribe(data => {
      if (!data.success) {
        this.emailValid = false;
        this.emailMessage = data.message;
      } else {
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    })*/
  }

  //Uses authService.checkUsername()
  checkUsername() {
   /* this.authService.checkUsername(this.form.get('username').value).subscribe(data => {
      if (!data.success) {
        this.usernameValid = false;
        this.usernameMessage = data.message;
      } else {
        this.usernameValid = true;
        this.usernameMessage = data.message;
      }
    })*/
  }

  // Function to validate e-mail is proper format
  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail': true }; //Erron durumunda fonksiyounun adini gonderip.Bunu kontrol eder.
    }
  };

  // Function to validate username is proper format
  validateUsername(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test username against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validateUsername': true } // Return as invalid username
    }
  }

  // Function to validate password
  validatePassword(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{3,30}$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validatePassword': true } // Return as invalid password
    }
  }

  // Funciton to ensure passwords match
  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true } // Return as error: do not match
      }
    }
  }

  //Veriler tamam olarak dogru girildikten sonra degistirlmesini engeller
  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  //Submit islemi sonucunda eger hata gelirse tekrar enable eder
  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

  /**
   * register.html icersinde formda submit yapildiginda buraya baglandi.
   * registration formu buraya gonderip submit button tiklandiginda 
   * bu method calistirilacak.
   */
  public onRegisterSubmit() {
    //yukarida tanimlanan form objesi register.html icerisindeki forma baglidir
    this.processing = true; //ayni creditentials ile birden cok requesti engellemek icin submit butonu bloklanir.
    this.disableForm();
    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }
    //UI ve Server farkli portlardan service verdigi icin bunu cross-origin olarak kabule eder.
    //Cross-origin problemini halletmek icin cors-npm kullanilir
    /*authService da tanimlanan registerUser metoduna gonderdik
    this.authService.registerUser(user).subscribe(data =>{
      if(!data.succes){
        this.messageClass='alert alert-danger';
        this.message=data.message;
        this.processing=false;
        this.enableForm();
      }else{
        this.messageClass='alert alert-success';
        this.message=data.message;
        setTimeout(()  => {
          this.router.navigate(['/login'])
        },1500);
      }
    })*/
    console.log(this.form.get('email').value);
    console.log(this.form.get('username').value);
  }

}
