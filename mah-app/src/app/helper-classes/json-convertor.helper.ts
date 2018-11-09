/**
 * Author: Michael Alan Hendricks
 * Date Created: 26/10/2018
 * Description: This class converts a string into a JSON object if it is in the correct format.
 *              Else it will console.log the error message
 */

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JsonConvertorHelper {
    /**
     * This method converts a json format string into a JSON object
     * @param convert json format string to convert
    */
    convertStringToJson ( convert: string) {
        try {
            return JSON.parse(convert);
        } catch (e) {
            if (e instanceof SyntaxError) {
                this.printError(e, true);
            } else {
                this.printError(e, false);
            }
        }
    }

    convertJsonToString ( convert: JSON) {
        return JSON.stringify(convert);
    }

    /**
     * This method will print error message to console
     * @param error Error object
     * @param explicit  bool specifying if the error occured explicitly or inexplicitly
     */
    private printError(error, explicit) {
        console.log(`[${explicit ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name}: ${error.message}`);
    }
}
