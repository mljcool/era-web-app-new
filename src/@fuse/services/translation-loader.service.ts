import { Injectable } from '@angular/core';

export interface Locale {
    lang: string;
    data: Object;
}

@Injectable({
    providedIn: 'root'
})
export class FuseTranslationLoaderService {
    /**
     * Constructor
     *
     */
    constructor(
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Load translations
     *
     * @param {Locale} args
     */
    loadTranslations(...args: Locale[]): void {
        const locales = [...args];

        locales.forEach((locale) => {
            // use setTranslation() with the third argument set to true
            // to append translations instead of replacing them
        });
    }
}
