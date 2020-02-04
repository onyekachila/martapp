import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  readonly initialUrl: string = location.href;

  constructor() { }

  extractAppUrl(href: string): string {
    return new URL(href).origin;
}

 extractTenantNameFromUrl(baseUrl: string): string {
    if (this.isSubdomainPresent(baseUrl)) {
        return baseUrl.split('.')[0];
    } else {
        return null;
    }
}

processBaseUrl(baseUrl: string): string {
  if (baseUrl.indexOf(':') > -1) {
      baseUrl = this.removePortFromUrl(baseUrl);
  }

  return baseUrl;
}

removePortFromUrl(baseUrl: string): string {
  return baseUrl = baseUrl.split(':')[0];
}

 isAppRunningLocally(baseUrl: string): boolean {
    baseUrl = this.processBaseUrl(baseUrl);

    return baseUrl.endsWith('localhost');
}

 isSubdomainPresent(baseUrl: string): boolean {
  return baseUrl.split('.').length > 1;
}




 setInitialUrl(apiUrl: string): string {
   const tenantName = this.extractTenantNameFromUrl(this.initialUrl);
   const protocol = 'http://';
   let newApiTenantUrl = protocol + apiUrl;
   if (tenantName !== null ) {
    newApiTenantUrl = tenantName + '.' + apiUrl;
   }
    return newApiTenantUrl;
 }


}
