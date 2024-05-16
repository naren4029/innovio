import { Injectable } from "@angular/core";
import { ERROR_TEXT } from "@constants/labels";
import { getStorageKey } from "@constants/utils";
import { CryptoService } from "@services/crypto/crypto-service.service";

@Injectable({
	providedIn: "root"
})
export class CacheStorageService {

	constructor(private cryptoService: CryptoService) { }

	getLocalStorage<T>(key: string): T | undefined {
		if (key) {
			const actualKey = getStorageKey(key);
			const strData = localStorage.getItem(actualKey);

			if (strData) {
				try {
					return JSON.parse(this.cryptoService.decrypt(strData)) as T;
				} catch (err) {
					console.error(ERROR_TEXT.noFetch);
				}
			}
		} else {
			console.error(ERROR_TEXT.emptyKey);
		}
		return;
	}

	setLocalStorage<T>(key: string, data: T): boolean {
		if (key && data) {
			const actualKey = getStorageKey(key);

			try {
				const strData = this.cryptoService.encrypt(JSON.stringify(data));
				localStorage.setItem(actualKey, strData);
				return true;
			} catch (err) {
				console.error(ERROR_TEXT.noSet);
			}
		} else {
			console.error(ERROR_TEXT.emptyKey);
		}
		return false;
	}

}
