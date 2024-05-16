import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import * as CryptoJS from "crypto-js";

@Injectable({
	providedIn: "root"
})
export class CryptoService {

private key = environment.cryptoKey;

encrypt(content: string): string {
	return CryptoJS.AES.encrypt(content, this.key).toString();
}

decrypt(contentToDecrypt: string): string {
	return CryptoJS.AES.decrypt(contentToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
}

}
