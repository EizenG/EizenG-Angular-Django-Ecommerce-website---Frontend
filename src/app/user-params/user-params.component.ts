import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Country } from '../model/country';
import { Region } from '../model/region';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router,RouterLink} from '@angular/router';
import { ReactiveFormsModule,FormBuilder, Validators } from '@angular/forms';
import { ShareDataBtwCompService } from '../services/share-data-btw-comp.service';

@Component({
  selector: 'app-user-params',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './user-params.component.html',
  styleUrl: './user-params.component.css'
})
export class UserParamsComponent implements OnDestroy,OnInit {
  getUserDataSubscription ?: Subscription;
  updateUserDataBckendSubscription ?: Subscription;
  changePasswordSubscription ?: Subscription;
  authServiceUserDataSubscription ?: Subscription;
  @ViewChild("successMsg") successMsgDiv ?: ElementRef;
  @ViewChild("errorMsg") errorMsgDiv?: ElementRef;
  @ViewChild("errorMsg2") errorMsgDiv2 ?: ElementRef;
  @ViewChild("successMsg2") successMsgDiv2 ?: ElementRef;
  userData : any = undefined ;
  userForm = this.fb.group({
    profileImage : [null],
    username: ['', [Validators.maxLength(10),Validators.minLength(3)]],
    email : ['',Validators.email],
    secondEmail : ['',Validators.email],
    tel : [''],
    address : [''],
    country : [''],
    region : [''],
    zipCode : ['']
  });
  changePasswordForm = this.fb.group({
    oldPassword : ['',Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    newPasswordConfirmation: ['', [Validators.required, Validators.minLength(8)]]
  });
  @ViewChild("regionSelectElt") regionSelect ?: ElementRef;
  @ViewChild("main") mainElt ?: ElementRef;
  @ViewChild("userMessage") userMessage?: ElementRef;
  formData : FormData = new FormData()
  westAfricanCountriesWithRegions: Country[] = [
    {
      countryName: "Benin",
      countryShortCode: "BJ",
      regions: [
        { name: "Alibori", shortCode: "AL" },
        { name: "Atakora", shortCode: "AK" },
        { name: "Atlantique", shortCode: "AQ" },
        { name: "Borgou", shortCode: "BO" },
        { name: "Collines", shortCode: "CO" },
        { name: "Donga", shortCode: "DO" },
        { name: "Kouffo", shortCode: "KO" },
        { name: "Littoral", shortCode: "LI" },
        { name: "Mono", shortCode: "MO" },
        { name: "Ouémé", shortCode: "OU" },
        { name: "Plateau", shortCode: "PL" },
        { name: "Zou", shortCode: "ZO" }
      ]
    },
    {
      countryName: "Burkina Faso",
      countryShortCode: "BF",
      regions: [
        { name: "Boucle du Mouhoun", shortCode: "BM" },
        { name: "Cascades", shortCode: "CA" },
        { name: "Centre", shortCode: "CE" },
        { name: "Centre-Est", shortCode: "CE" },
        { name: "Centre-Nord", shortCode: "CN" },
        { name: "Centre-Ouest", shortCode: "CO" },
        { name: "Centre-Sud", shortCode: "CS" },
        { name: "Est", shortCode: "ES" },
        { name: "Hauts-Bassins", shortCode: "HB" },
        { name: "Nord", shortCode: "NO" },
        { name: "Plateau-Central", shortCode: "PC" },
        { name: "Sahel", shortCode: "SA" },
        { name: "Sud-Ouest", shortCode: "SO" }
      ]
    },
    {
      countryName: "Cape Verde",
      countryShortCode: "CV",
      regions: [
        { name: "Barlavento Islands", shortCode: "BV" },
        { name: "Sotavento Islands", shortCode: "SV" }
      ]
    },
    {
      countryName: "Cote d'Ivoire",
      countryShortCode: "CI",
      regions: [
        { name: "Abidjan", shortCode: "AB" },
        { name: "Bas-Sassandra", shortCode: "BS" },
        { name: "Comoe", shortCode: "CM" },
        { name: "Denguele", shortCode: "DN" },
        { name: "Goh-Djiboua", shortCode: "GD" },
        { name: "Lacs", shortCode: "LC" },
        { name: "Lagunes", shortCode: "LG" },
        { name: "Montagnes", shortCode: "MT" },
        { name: "Sassandra-Marahoue", shortCode: "SM" },
        { name: "Savanes", shortCode: "SV" },
        { name: "Vallee du Bandama", shortCode: "VB" },
        { name: "Woroba", shortCode: "WR" },
        { name: "Yamoussoukro", shortCode: "YM" },
        { name: "Zanzan", shortCode: "ZZ" }
      ]
    },
    {
      countryName: "Gambia",
      countryShortCode: "GM",
      regions: [
        { name: "Banjul", shortCode: "BJ" },
        { name: "Central River", shortCode: "CR" },
        { name: "Lower River", shortCode: "LR" },
        { name: "North Bank", shortCode: "NB" },
        { name: "Upper River", shortCode: "UR" },
        { name: "West Coast", shortCode: "WC" }
      ]
    },
    {
      countryName: "Ghana",
      countryShortCode: "GH",
      regions: [
        { name: "Ahafo", shortCode: "AH" },
        { name: "Ashanti", shortCode: "AS" },
        { name: "Bono", shortCode: "BO" },
        { name: "Bono East", shortCode: "BE" },
        { name: "Central", shortCode: "CE" },
        { name: "Eastern", shortCode: "EA" },
        { name: "Greater Accra", shortCode: "GA" },
        { name: "Northern", shortCode: "NO" },
        { name: "North East", shortCode: "NE" },
        { name: "Oti", shortCode: "OT" },
        { name: "Savannah", shortCode: "SA" },
        { name: "Upper East", shortCode: "UE" },
        { name: "Upper West", shortCode: "UW" },
        { name: "Volta", shortCode: "VO" },
        { name: "Western", shortCode: "WE" },
        { name: "Western North", shortCode: "WN" }
      ]
    },
    {
      countryName: "Guinea",
      countryShortCode: "GN",
      regions: [
        { name: "Beyla", shortCode: "BE" },
        { name: "Boffa", shortCode: "BO" },
        { name: "Boké", shortCode: "BK" },
        { name: "Conakry", shortCode: "CO" },
        { name: "Coyah", shortCode: "CO" },
        { name: "Dabola", shortCode: "DB" },
        { name: "Dalaba", shortCode: "DL" },
        { name: "Dinguiraye", shortCode: "DI" },
        { name: "Dubréka", shortCode: "DU" },
        { name: "Faranah", shortCode: "FA" },
        { name: "Forécariah", shortCode: "FO" },
        { name: "Fria", shortCode: "FR" },
        { name: "Gaoual", shortCode: "GA" },
        { name: "Guékédou", shortCode: "GU" },
        { name: "Kankan", shortCode: "KA" },
        { name: "Kérouané", shortCode: "KE" },
        { name: "Kindia", shortCode: "KI" },
        { name: "Kissidougou", shortCode: "KS" },
        { name: "Koubia", shortCode: "KB" },
        { name: "Koundara", shortCode: "KN" },
        { name: "Kouroussa", shortCode: "KO" },
        { name: "Labé", shortCode: "LA" },
        { name: "Lélouma", shortCode: "LE" },
        { name: "Lola", shortCode: "LO" },
        { name: "Macenta", shortCode: "MA" },
        { name: "Mali", shortCode: "ML" },
        { name: "Mamou", shortCode: "MM" },
        { name: "Mandiana", shortCode: "MD" },
        { name: "Nzérékoré", shortCode: "NZ" },
        { name: "Pita", shortCode: "PI" },
        { name: "Siguiri", shortCode: "SI" },
        { name: "Télimélé", shortCode: "TE" },
        { name: "Tougué", shortCode: "TO" },
        { name: "Yomou", shortCode: "YO" }
      ]
    },
    {
      countryName: "Guinea-Bissau",
      countryShortCode: "GW",
      regions: [
        { name: "Bafatá", shortCode: "BA" },
        { name: "Biombo", shortCode: "BI" },
        { name: "Bissau", shortCode: "BS" },
        { name: "Bolama", shortCode: "BO" },
        { name: "Cacheu", shortCode: "CA" },
        { name: "Gabu", shortCode: "GA" },
        { name: "Oio", shortCode: "OI" },
        { name: "Quinara", shortCode: "QU" },
        { name: "Tombali", shortCode: "TO" }
      ]
    },
    {
      countryName: "Liberia",
      countryShortCode: "LR",
      regions: [
        { name: "Bomi", shortCode: "BM" },
        { name: "Bong", shortCode: "BG" },
        { name: "Gbarpolu", shortCode: "GP" },
        { name: "Grand Bassa", shortCode: "GB" },
        { name: "Grand Cape Mount", shortCode: "GC" },
        { name: "Grand Gedeh", shortCode: "GG" },
        { name: "Grand Kru", shortCode: "GK" },
        { name: "Lofa", shortCode: "LO" },
        { name: "Margibi", shortCode: "MG" },
        { name: "Maryland", shortCode: "ML" },
        { name: "Montserrado", shortCode: "MO" },
        { name: "Nimba", shortCode: "NB" },
        { name: "River Cess", shortCode: "RC" },
        { name: "River Gee", shortCode: "RG" },
        { name: "Sinoe", shortCode: "SN" }
      ]
    },
    {
      countryName: "Mali",
      countryShortCode: "ML",
      regions: [
        { name: "Bamako", shortCode: "BK" },
        { name: "Gao", shortCode: "GA" },
        { name: "Kayes", shortCode: "KY" },
        { name: "Kidal", shortCode: "KD" },
        { name: "Koulikoro", shortCode: "KL" },
        { name: "Mopti", shortCode: "MP" },
        { name: "Segou", shortCode: "SG" },
        { name: "Sikasso", shortCode: "SK" },
        { name: "Taoudenni", shortCode: "TD" },
        { name: "Tombouctou", shortCode: "TB" }
      ]
    },
    {
      countryName: "Mauritania",
      countryShortCode: "MR",
      regions: [
        { name: "Adrar", shortCode: "AD" },
        { name: "Assaba", shortCode: "AS" },
        { name: "Brakna", shortCode: "BR" },
        { name: "Dakhlet Nouadhibou", shortCode: "DN" },
        { name: "Gorgol", shortCode: "GO" },
        { name: "Guidimaka", shortCode: "GM" },
        { name: "Hodh Ech Chargui", shortCode: "HC" },
        { name: "Hodh El Gharbi", shortCode: "HG" },
        { name: "Inchiri", shortCode: "IN" },
        { name: "Nouakchott-Nord", shortCode: "NN" },
        { name: "Nouakchott-Ouest", shortCode: "NO" },
        { name: "Nouakchott-Sud", shortCode: "NS" },
        { name: "Tagant", shortCode: "TA" },
        { name: "Tiris Zemmour", shortCode: "TZ" },
        { name: "Trarza", shortCode: "TR" }
      ]
    },
    {
      countryName: "Niger",
      countryShortCode: "NE",
      regions: [
        { name: "Agadez", shortCode: "AG" },
        { name: "Diffa", shortCode: "DF" },
        { name: "Dosso", shortCode: "DS" },
        { name: "Maradi", shortCode: "MA" },
        { name: "Niamey", shortCode: "NM" },
        { name: "Tahoua", shortCode: "TH" },
        { name: "Tillabéri", shortCode: "TL" },
        { name: "Zinder", shortCode: "ZD" }
      ]
    },
    {
      countryName: "Nigeria",
      countryShortCode: "NG",
      regions: [
        { name: "Abia", shortCode: "AB" },
        { name: "Adamawa", shortCode: "AD" },
        { name: "Akwa Ibom", shortCode: "AK" },
        { name: "Anambra", shortCode: "AN" },
        { name: "Bauchi", shortCode: "BA" },
        { name: "Bayelsa", shortCode: "BY" },
        { name: "Benue", shortCode: "BE" },
        { name: "Borno", shortCode: "BO" },
        { name: "Cross River", shortCode: "CR" },
        { name: "Delta", shortCode: "DE" },
        { name: "Ebonyi", shortCode: "EB" },
        { name: "Edo", shortCode: "ED" },
        { name: "Ekiti", shortCode: "EK" },
        { name: "Enugu", shortCode: "EN" },
        { name: "Gombe", shortCode: "GO" },
        { name: "Imo", shortCode: "IM" },
        { name: "Jigawa", shortCode: "JI" },
        { name: "Kaduna", shortCode: "KD" },
        { name: "Kano", shortCode: "KN" },
        { name: "Katsina", shortCode: "KT" },
        { name: "Kebbi", shortCode: "KE" },
        { name: "Kogi", shortCode: "KO" },
        { name: "Kwara", shortCode: "KW" },
        { name: "Lagos", shortCode: "LA" },
        { name: "Nasarawa", shortCode: "NA" },
        { name: "Niger", shortCode: "NI" },
        { name: "Ogun", shortCode: "OG" },
        { name: "Ondo", shortCode: "ON" },
        { name: "Osun", shortCode: "OS" },
        { name: "Oyo", shortCode: "OY" },
        { name: "Plateau", shortCode: "PL" },
        { name: "Rivers", shortCode: "RI" },
        { name: "Sokoto", shortCode: "SO" },
        { name: "Taraba", shortCode: "TA" },
        { name: "Yobe", shortCode: "YO" },
        { name: "Zamfara", shortCode: "ZA" },
        { name: "Federal Capital Territory", shortCode: "FC" }
      ]
    },
    {
      countryName: "Senegal",
      countryShortCode: "SN",
      regions: [
        { name: "Dakar", shortCode: "DK" },
        { name: "Diourbel", shortCode: "DB" },
        { name: "Fatick", shortCode: "FK" },
        { name: "Kaffrine", shortCode: "KF" },
        { name: "Kaolack", shortCode: "KL" },
        { name: "Kédougou", shortCode: "KE" },
        { name: "Kolda", shortCode: "KD" },
        { name: "Louga", shortCode: "LG" },
        { name: "Matam", shortCode: "MT" },
        { name: "Saint-Louis", shortCode: "SL" },
        { name: "Sédhiou", shortCode: "SD" },
        { name: "Tambacounda", shortCode: "TC" },
        { name: "Thiès", shortCode: "TH" },
        { name: "Ziguinchor", shortCode: "ZG" }
      ]
    },
    {
      countryName: "Sierra Leone",
      countryShortCode: "SL",
      regions: [
        { name: "Eastern", shortCode: "EA" },
        { name: "Northern", shortCode: "NO" },
        { name: "Southern", shortCode: "SO" },
        { name: "Western Area", shortCode: "WA" }
      ]
    },
    {
      countryName: "Togo",
      countryShortCode: "TG",
      regions: [
        { name: "Centrale", shortCode: "CE" },
        { name: "Kara", shortCode: "KA" },
        { name: "Maritime", shortCode: "MA" },
        { name: "Plateaux", shortCode: "PL" },
        { name: "Savanes", shortCode: "SA" }
      ]
    }
  ];

  constructor(private authService : AuthService, private router : Router,private cdrf : ChangeDetectorRef, private fb : FormBuilder,private sdbtwcomp : ShareDataBtwCompService){}
  
  getCountryRegion(code : string) : Region[]{
    let regions: Region[] = this.westAfricanCountriesWithRegions.filter(country => {
      return country.countryShortCode == code;
    })[0]['regions'];
    return regions;
  }
  updateRegionSelectElt(event : Event){
    let regions : Region[] = this.westAfricanCountriesWithRegions.filter(country =>{
      return country.countryShortCode == (event.target as HTMLSelectElement).value;
    })[0]['regions'];

    let regionSelectInnerHtml = `<option disabled value = ""> -- Choisis une region -- </option>`;
    let firstIteration = true;
    for(let region of regions){
      if(firstIteration){
        regionSelectInnerHtml += `<option selected value="${region.shortCode}">${region.name}</option>`;
        this.userForm.get("region")?.setValue(region.shortCode);
        firstIteration = false;
      }else{
        regionSelectInnerHtml += `<option value="${region.shortCode}">${region.name}</option>`;
      }
    }
    this.regionSelect!.nativeElement.innerHTML = regionSelectInnerHtml;
  }

  showOrHidePassword(event: MouseEvent) {

    let eyeBtn = (event.target as HTMLImageElement);
    let passwordInput = (eyeBtn.previousElementSibling as HTMLInputElement);
    if (passwordInput?.type == "password") {
      passwordInput.type = "text";
      eyeBtn.src = "../../../assets/images/eye-slash-regular.svg";
    } else if (passwordInput?.type == "text") {
      passwordInput.type = "password";
      eyeBtn.src = "../../../assets/images/eye-regular.svg";
    }

  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileType = file.type;

      // Verifie si le fichier est une image
      if (!fileType.startsWith('image/')) {
        this.userForm.patchValue({
          profileImage: null
        });
        alert('Veuillez uploader une image valide.');
      }else{
        this.formData.append("profileImage",file);
      }
    }
  }

  saveUpdate(){
    if(this.userForm.valid){
      
      const username = this.userForm.get("username")?.value;
      if (username)
        this.formData.append("username",username)

      const email = this.userForm.get("email")?.value;
      if (email)
        this.formData.append("email", email)

      const secondEmail = this.userForm.get("secondEmail")?.value;
      if (secondEmail)
        this.formData.append("secondEmail", secondEmail)

      const tel = this.userForm.get("tel")?.value;
      if (tel)
        this.formData.append("tel", tel)

      const address = this.userForm.get("address")?.value;
      if (address)
        this.formData.append("address", address)

      const country = this.userForm.get("country")?.value;
      if (country)
        this.formData.append("country", country)

      const region = this.userForm.get("region")?.value;
      if (region)
        this.formData.append("region", region)

      const zipCode = this.userForm.get("zipCode")?.value;
      if (zipCode)
        this.formData.append("zipCode", zipCode)

      this.updateUserDataBckendSubscription = this.authService.updateUserDataBckend(this.formData).subscribe({
        next : resp =>{
          this.formData.delete("profileImage");
          // this.userForm.reset();
          this.successMsgDiv!.nativeElement.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Vos informations!</strong> ont ete mise a jour.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
          `;
          this.authServiceUserDataSubscription = this.authService.getUserData().subscribe({
            next: (resp) => {
              this.authService.updateUserData(resp["user"]);
            },
            error: (error) => {
              alert("Veuillez-vous reconnecter et reessayer !")
              this.authService.updateUserData({});
              this.router.navigateByUrl("/signInRegister/signIn/");
            }
          });
        },
        error : err =>{
          let errorMsg = err.message.split(";");
          errorMsg.forEach((msg : any) =>{
            this.errorMsgDiv!.nativeElement.innerHTML += `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>${msg}</strong>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          `;
          });
        }
      });
    }
  }

  changePassword(){
    if (this.changePasswordForm.get("newPassword")?.value == this.changePasswordForm.get("newPasswordConfirmation")?.value){

      this.changePasswordSubscription = this.authService.changeUserPassword(this.changePasswordForm.getRawValue()).subscribe({
        next: (resp : any)=>{
          this.errorMsgDiv2!.nativeElement.innerHTML = "";
          this.successMsgDiv2!.nativeElement.innerHTML += `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>${resp["msg"]}</strong>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          `;
        },
        error : err =>{
          let errorMsg = err.message.split(";")
          errorMsg.forEach((msg: any) => {
            this.errorMsgDiv2!.nativeElement.innerHTML += `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>${msg}</strong>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          `;
          });
        }
      });
    }else{
      this.errorMsgDiv2!.nativeElement.innerHTML += `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Veuillez rentrer le meme mot de passe, pour confirmer!</strong>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          `;
    }
  }

  ngOnDestroy(): void {
    if (this.getUserDataSubscription) {
      this.getUserDataSubscription.unsubscribe();
    }
    if(this.updateUserDataBckendSubscription)
      this.updateUserDataBckendSubscription.unsubscribe();
    if(this.authServiceUserDataSubscription)
      this.authServiceUserDataSubscription.unsubscribe();
    if(this.changePasswordSubscription)
      this.changePasswordSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.sdbtwcomp.updateHeaderBottomContent(7);
    this.getUserDataSubscription = this.authService.userData$.subscribe({
      next: resp => {
        this.userData = resp;
        this.userForm.get("country")?.setValue(this.userData['country']);
        this.userForm.get("region")?.setValue(this.userData['region']);
      },
      error: err =>{

      }
    });
  }

}

