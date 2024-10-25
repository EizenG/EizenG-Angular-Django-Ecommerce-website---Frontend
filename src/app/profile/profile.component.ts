import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';
import { Country } from '../model/country';
import { Region } from '../model/region';
import { CommonModule } from '@angular/common';
import { ShareDataBtwCompService } from '../services/share-data-btw-comp.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy {
  userData: any = undefined;
  country : any = undefined;
  region : any = undefined;
  getUserDataSubscription?: Subscription;
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

  constructor(private authService : AuthService,private sdbtwComp : ShareDataBtwCompService){}

  ngOnInit(): void {
    this.sdbtwComp.updateHeaderBottomContent(6);
    this.getUserDataSubscription = this.authService.userData$.subscribe({
      next: (resp : any) => {
        this.userData = resp;
        for(let c of this.westAfricanCountriesWithRegions){
          if(c.countryShortCode == this.userData['country']){
            this.country = c.countryName;
            for(let r of c.regions){
              if(r.shortCode == this.userData['region']){
                this.region = r.name;
                break;
              }
            }
            break;
          }
        }
      },
      error: (err : any)=> {

      }
    });
  }

  ngOnDestroy(): void {
      if(this.getUserDataSubscription)
        this.getUserDataSubscription.unsubscribe();
  }
}
