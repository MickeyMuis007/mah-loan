/**
 * Author: Michael Alan Hendricks
 * Date Created: 9/11/2018
 * Description: Following Okta's auth API, reference https://github.com/okta/okta-auth-js
 */

/* Angular imports */
import { Injectable } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';


/* Models imports */
import { Login } from 'src/app/models/okta-demo/login.model';
import { UserRecovery } from 'src/app/models/okta-demo/user-recovery.model';
import { WebFinger } from 'src/app/models/okta-demo/web-finger.model';
import { TokenWithoutPrompt } from 'src/app/models/okta-demo/token-without-prompt.model';
import { TokenRenew } from 'src/app/models/okta-demo/token-renew.model';


@Injectable({
    providedIn: 'root'
})
export class OktaDemoService {
    private authClient: OktaAuth;
    private config: any;                //Use to pass in settings for authClient instances

    constructor() {
        this.initializeAuthClient();
    }


    /*********** 
     * Methods
     **********/
    //#region methods

    /*****************
     * Public Methods
     *****************/
    //#region public methods

    /******************
     * Authentication
     *****************/
    //#region authentication

    /**  
     * The goal of an authentication flow is to set an Okta session cookie on 
     * the user's browser or retrieve an id_token or access_token.
     * The flow is started using signIn
     */
    signIn(login: Login) {
        this.authClient.signIn({
            username: login.username,
            password: login.password
        })
            .then((transaction) => {
                if (transaction.status === 'SUCCESS') {
                    this.authClient.session.setCookieAndRedirect(transaction.sessionToken); // Sets a cookie on redirect
                }
                else {
                    throw 'We cannot handle the ' + transaction.status + ' status';
                }
            })
            .fail((err) => {
                console.error(err);
            });
    }

    /** 
     *  Signs the user out of their current Okta session
     */
    signOut() {
        this.authClient.signOut()
            .then(() => {
                console.log('successfully logged out');
            })
            .fail((err) => {
                console.log(err);
            });
    }

    /**
     * Start a new password recovery transaction for a given user and issues a recovery 
     * token that can be used to reset a user's password
     */
    forgotPassword(userRecovery: UserRecovery) {
        this.authClient.forgotPassword({
            username: userRecovery.username,                //User's non-qualified short-name or unique fully-qualified login
            factorType: userRecovery.factorType,            //Recovery factor to use for primary authentication. Supported options are SMS, EMAIL, or CALL
            relayState: userRecovery.relayState             //Optional state value that is persisted for the lifetime of the recovery transaction
        })
            .then((transaction) => {
                //Returning verification promise which is handle next
                transaction.verify({
                    passCode: '123456' // The passCode from the SMS or CALL
                });
            })
            .then((transaction) => {
                //When verification request is successful
                if (transaction.status === 'SUCCESS') {
                    this.authClient.session.setCookieAndRedirect(transaction.sessionToken);
                } else {
                    throw 'We cannot handle the ' + transaction.status + ' status';
                }
            })
            .fail((err) => {
                console.error(err);
            });
    }

    /**
     * Start a new unlock recovery transaction for a given user and issues a recovery token that 
     * can be used to unlock a user's account.
    */
    unlockAccount(userRecovery: UserRecovery) {
        this.authClient.unlockAccount({
            username: userRecovery.username,            //User's non-qualified short-name or unique fully-qualified login
            factorType: userRecovery.factorType,        //Recovery factor to use for primary authentication. Supported options are SMS, EMAIL, or CALL
            relayState: userRecovery.relayState         //Optional state value that is persisted for the lifetime of the recovery transaction
        })
            .then((transaction) => {
                //Returning verication promise which is handled next
                return transaction.verify({
                    passCode: '123456'  // The passCode from the SMS
                })
            })
            .then((transaction) => {
                //When verifcation request is successful
                if (transaction.status === 'SUCCESS') {
                    this.authClient.session.setCookieAndRedirect(transaction.sessionToken);
                } else {
                    throw 'We cannot handle the ' + transaction.status + ' status';
                }
            })
            .fail((err) => {
                console.log(err)
            })
            .finally(() => {
                console.log('Verification promise completed')
            });
    }

    /**
     * Validates a recovery token that was distributed to the end-user to continue the recovery transaction
     */
    verifyRecoveryToken(token) {
        this.authClient.verifyRecoveryToken({
            recoveryToken: token
        })
            .then((transaction) => {
                if (transaction.status === 'SUCCESS') {
                    this.authClient.session.setCookieAndRedirect(transaction.sessionToken);
                } else {
                    throw 'We cannot handle the ' + transaction.status + ' status';
                }
            })
            .fail((err) => {
                console.error(err);
            });
    }

    /**
     * Calls the Webfinger API and gets a response
     */
    webFinger(webFinger: WebFinger) {
        this.authClient.webfinger({
            resource: webFinger.resource,                   //URI that identifies the entity whose information is sought, currently only acct scheme is supported.
            rel: webFinger.rel,                             //Optional parameter to request only a subset of the information that would otherwise be returned without the "rel"  parameter
            requestContext: webFinger.requestContext        //Optional parameter that provides Webfinger the context of that which the user is trying to access, such as the path of an app
        })
            .then((res) => {
                // use the webfinger response to select an idp
            })
            .fail((err) => {
                console.error(err);
            })
    }

    /**
     * Create a browser fingerprint.
     */
    fingerPrint() {
        this.authClient.fingerprint()               //Include a timeout property that defaults to 15000
            .then((fingerprint) => {
                //Do something with the fingerprint
            })
            .fail((err) => {
                console.log(err);
            });
    }

    //#endregion authentication

    /***************
     * Transactions
     ***************/
    //#region transaction

    /**
     * Resumes an in-progress transaction. This is useful if a user navigates away from the login page 
     * before authentication is complete.
     */
    transactionResume() {
        var exists = this.authClient.tx.exists();
        if (exists) {
            this.authClient.tx.resume()
                .then((transaction) => {
                    console.log('current statys:', transaction.status);
                })
                .fail((err) => {
                    console.error(err);
                });
        }
    }

    /**
     * Check for a transactin to ber resumed. This is synchronous and return true or false.
     */
    transactionExist() {
        var exists = this.authClient.tx.exists();
        if (exists) {
            console.log('a session exists');
        } else {
            console.log('a session does not exist');
        }
    }

    //#endregion transaction

    /***********
     * Sessions
     ***********/
    //#region session

    /**
     * This is the session break down session.
     * When transaction status is SUCCESS:
     *          -The end of the authentication flow! This transaction contains a sessionToken you can exchange for an Okta
     *           cookie, an id_token, or access_token
     */

    /**
     * Returns a promise that resolves with true if there is an existing Okta session, or false if not
     */
    sessionExists() {
        this.authClient.session.exists()
            .then((exists) => {
                if (exists) {
                    // logged in
                    console.log('Logged in');
                } else {
                    // not logged in
                    console.log('Not logged in');
                }
            })
    }

    /**
     * Gets the active session
     */
    sessionGet() {
        this.authClient.session.get()
            .then((session) => {
                // logged in
                console.log('Logged in session: ' + session);
            })
            .catch((err) => {
                // not logged in
                console.error(err);
            })
    }

    /**
     * Refresh the current session by extending its lifetime. This can be used as a keep-alive operation.
     */
    sessionRefresh() {
        this.authClient.refresh()
            .then((session) => {
                // existing session is now refreshed
                console.log('Session Refreshed: ' + session);
            })
            .catch((err) => {
                // there was a problem refreshing (the user may not have an existing session)
                console.error(err);
            })
    }

    //#endregion session

    /*********
     * Tokens
     *********/

    /**
     * Extended OpenID connect options.
     * The following configuration options can only be included in token.getWithoutPrompt,
     * token.getWithPopup, or token.getWithRedirect.
     * Options:
     *      - sessionToken: Specify an Okta sessionToken to skip reauthentication when the user already authenticated using the
     *                      Authenication flow
     *      - responseMode:  Specify how the authorization response shoud be returned. You will generally not need to set this
     *                      unless you want to override the default values for token.getWithRedirect.
     *      - responseType: Specify the response type for OIDC(OpenID Connect) authentication. Defaults to id_token.
     *                      Use an array if specifying multiple response types - in this case, the response will contain both an 
     *                      ID Token and an Access Token. responseType: ['id_token', 'token']
     *      - scopes:       Specify what information to make available in the returned id_token or access_token. For OIDC, you
     *                      must include opendid as one of the scopes. Defaults to ['openid', 'email']. 
     *      - state:        Specify a state that will be validated in an OAuth response. This is usually only provided during
     *                      redirect flows to obtain an authorization code. Defaults to a random string.
     *      - nonce:        Specify a nonce that will be validated in an id_token. This is usually only provided during
     *                      redirect flows to obtain an authorization code that will be exchanged for an id_token. Defaults to 
     *                      a random string
     */


    /**
     * When you've obtained a sessionToken from the authorization flows, or a session already exists, you can obtain a
     * token or tokens without prompting the user to log in.
     */
    tokenGetWithoutPrompt(tokenWithoutPrompt: TokenWithoutPrompt) {
        this.authClient.token.getWithoutPrompt({
            sessionToken: tokenWithoutPrompt.sessionToken,          //'00p8RhRDCh_8NxIin-wtF5M6ofFtRhfKWGBAbd2WmE',
            scopes: tokenWithoutPrompt.scopes,                      //['openid','email','profile'],
            state: tokenWithoutPrompt.state,                        //'8rFzn3MH5q',
            nonce: tokenWithoutPrompt.nonce,                        //'51GePTswrm',
            // Use a custom IdP for social authentication
            idP: tokenWithoutPrompt.idp                             //'0oa62b57p7c8PaGpU0h7'
        })
            .then((tokenOrTokens) => {
                // manage token or tokens                                
                console.log('Tokens without prompt: ' + tokenOrTokens);
            })
            .catch((err) => {
                // handle OAuthError
                console.error(err);
            })
    }

    /**
     * Create token with a popup
     */
    tokenGetWithPopup(oauthOptions) {
        this.authClient.token.getWithPopup(oauthOptions)
            .then((tokenOrTokens) => {
                // manage token or tokens
                console.log('Tokens with prompt: ' + tokenOrTokens);
            })
            .catch((err) => {
                // handle OAuthError
                console.error(err);
            })
    }

    /**
     * Create token using a redirect
     */
    tokenGetWithRedirect(oauthOptions) {
        this.authClient.token.getWithRedirect(oauthOptions)
            .then((tokenOrTokens) => {
                // manage token or tokens
                console.log('Tokens with redirect: ' + tokenOrTokens);
            })
            .catch((err) => {
                //handle OAuthError
                console.error(err);
            });
    }

    /**
     * Parses the access or ID Tokens from the url after a successful authentication redirect. If an ID token is present,
     * it will be verified and validated before available for use.
     */
    tokenParseFromUrl(options) {
        this.authClient.token.parseFromUrl()
            .then((tokenOrTokens) => {
                // manage token or tokens
            })
            .catch((err) => {
                // handle OAuthError
            })
    }

    /**
     * Decode a raw ID Token
     * @param idTokenString an id_token JWT
     */
    tokenDecode(idTokenString) {
        this.authClient.token.decode(idTokenString);
    }

    /**
     * Return a new token if the Okta session is still valid.
     * @param tokenToRenew This token is provided by Oka via getWithoutPrompt, getWithPopup, and parseFromUrl.TODO: Find a better model name to create like token
     */
    tokenRenew(tokenToRenew: TokenRenew) {
        this.authClient.token.renew(tokenToRenew)
            .then((freshToken) => {
                // manage freshToken
                console.log('Renewed Token: ' + freshToken);
            })
            .catch((err) => {
                // handle OAuthError
                console.error(err);
            });
    }

    /**
     * Manually verify the validity of an ID token's claims and check the signature on browsers that support web cryptography.
     * @param idTokenObject an ID token returned by this library. note: this is not the raw ID token JWT
     * @param validationOptions Optional object to assert ID token claim values. Defaults to the configuration passed in 
     *                          during client instantiation
     */
    tokenVerify(idTokenObject, validationOptions) {
        this.authClient.token.verify(idTokenObject, validationOptions)
            .then(() => {
                // the idToken is valid
            })
            .catch((err) => {
                // handle AuthSdkError
            })
    }

    /****************
     * Token Manager
     ****************/
    //#region Token Manager

    /**
     * Token Manager
     * tokenManager.add(key, token)
     * After receiving an acces_token or id_token, add it to the tokenManager to manage token expiration and renew operations.
     * When a token is added to the tokenManager, it is automatically renewed when it expires.
     * @param key Unique key to store the toke in the tokenManager. This is used later when you want to get, delete,
     *            or renew the token.
     * @param token Token object that will be added
     */
    tokenManager(key, idToken) {
        this.authClient.tokenManager.add(key, idToken);
    }
    
    /**
     * Get a token that you have previously added to the tokenManager with the given key. The token object will be returned if
     * it has not expired.
     * @param key Key for the token you want to get
     */
    getToken(key) {
        this.authClient.tokenManager.get(key)
            .then((token) => {
                if (token) {
                    //Token is valid
                    console.log('Token ' + key + ': ' + token);
                } else {
                    // Token has expired
                    console.log('Token ' + key + ' expired: ' + token);
                }
            })
            .catch((err) => {
                //OAuth Error
                console.error(err);
            })
    }

    /**
     * Get a token that you have previously added to the tokenManager with the given key. The token object will be returned if
     * it has not expired.
     * @param key Key for the token you want to get
     */
    removeToken(key) {
        this.authClient.tokenManager.remove(key);
    }

    /**
     * Remove all tokens from the tokenManager
     */
    clearTokens() {
        this.authClient.tokenManager.clear();
    }

    /**
     * Manually renew a token before it expires
     * @param key Key for the token you want to renew
     */
    renewToken(key) {
        // Because the renew() method is async, you can wait for it to complete by using the returned Promise:
        this.authClient.tokenManager.renew(key)
            .then((newToken) => {
                console.log('New Token: ' + newToken);
            })
    }

    /**
     * Alternative way of renewing a token is to subscribe to the 'renewed' event to handler
     * @param key Key for the token you want to renew
     */
    alternativeRenewToken(key) {
        this.authClient.tokenManager.on('renewed', (key, newToken, oldToken) => {
            console.log(newToken);
        })
        this.authClient.tokenManager.renew(key)
    }

    //#endregion Token Manager

    //#endregion public methods

    /*******************
     * Private Methods 
     *******************/
    //#region private methods

    /***************
     * Transactions
     ***************/
    //#region transactions

    private initializeAuthClient() {
        this.config = {
            url: 'https://dev-223175.oktapreview.com',
            redirectUrl: window.location.origin,
            clientId: '0oageeuu0nT1I4MrV0h7',

            // Token Manager
            tokenManager: {
                storage: 'sessionStorage'
            }
        };

        this.authClient = new OktaAuth(this.config);
    }

    /**
     * When Auth Client methods resolve, they return a transaction object that encapsilates the new state in
     * the authentication flow. This transaction contains metadata about the current state, and methods that 
     * can be used to progress to the next state.
     * Status results:  LOCKED_OUT, PASSWORD_EXPIRED, PASSWORD_RESET, PASSWORD_WARN, RECOVERY, RECOVERY_CHALLENGE, MFA_ENROLL
     *                  MFA_ENROLL_ACTIVATE, MFA_REQUIRED, MFA_CHALLENGE, SUCCESS
     */
    private transactionStatus(transaction) {
        return transaction.status;
    }

    /**
     * Terminates the current auth flow
     */
    private transactionCancel(transaction) {
        transaction.cancel()
            .then(() => {
                // transaction canceled. You can now start another with authClient.signIn
            });
    }

    /**
     * Changes a user's password.
     */
    private transactionChangePassword(transaction) {
        transaction.changePassword({
            oldPassword: 'OldP4ass0rd',
            newPassword: 'N3P4ss0rd'
        });
    }

    /**
     * Reset a user's password.
     */
    private transactionResetPassword(transaction) {
        transaction.resetPassword({
            newPassword: 'N3wP4ssw0rd'
        });
    }

    /**
     * Ignore the warning and continue.
     */
    private transactionSkip(transaction) {
        transaction.skip();
    }

    /**
     * Unlock the user account.
     * Apply when transaction status is:
     *      - LOCKED_OUT: The user account is locked; self-seice unlock or admin unlock is required.
     */
    private transactionUnlock(transaction, userRecovery: UserRecovery) {
        transaction.unlock({
            username: userRecovery.username,            //User's non-qualified short-name or unique fully-qualified login.
            factoryType: userRecovery.factorType,       //Recovery factor to use for primary authentication. Supported options are SMS, EMAIL, or CALL.
            relayState: userRecovery.relayState         //Optional state value that is persisted for the lifetime of the recovery transaction.
        })
    }

    /**
     * Recovery:
     * The use has requested a recovery token to reset theer password or unlock their account.
     * Apply when transaction status is: 
     *      - PASSWORD_EXPIRED: The user's password was successfully validated but is expired.
     *      - PASSWORD_RESET: The user successfully answered their recovery question and can set a new password.
     *      - PASSWORD_WARN: The user's password was successfully validated but is about to expire and should be changed.
     */
    private transactionAnswer(transaction, recoveryAnswer: string) {
        transaction.answer({
            answer: recoveryAnswer                                      //Answer to user's recovery question
        });
    }

    private transcationRecovery(transaction, recoveryToken) {
        transaction.recovery({
            recoveryToken: recoveryToken                                //Recovery token that was distributed to end-user via out-of-band mechanism such as email
        });
    }

    /**
     * RECOVERY_CHALLENGE
     * The user must verify the factor-specific recovery challene
     */
    private transactionRecoveryVerify(transaction) {
        transaction.verify({
            passCode: '13532'
        })
    }

    private transactionRecoveryResend(transaction) {
        transaction.resend();
    }    

    //#endregion transactions

    /****************
     * Token Manager
     ****************/
    //#region Token Manager

    /**
     * tokenManager.on(event, callback[, context])
     * Subscribe to an event published by the tokenManager.
     * @param event - Event to subscribe to. Possible eents are expired, error, and renewed.
     * @param callback - Function to call when the event is triggered
     * @param context - Optional context to bind the callback to
     */

     /**
      * Subscribing expired token event handler.
      */
    private expiredTokenSubscription() {
        this.authClient.tokenManager.on('expired', this.expiredTokenHandler);

        //If above does not work try
        // this.authClient.tokenManager.on('expired', (key, expiredToken) => {
        //     this.expiredTokenHandler(key, expiredToken)
        // })
    }   

    /**
     * Subscribing renewed token event hanlder
     */
    private renewedTokenSubscription() {
        this.authClient.on('renewed', this.renewedTokenHandler);

        // If above don't work then try below
        // this.authClient.on('renewed', (key, newToken, oldToken) => {
        //     this.renewedTokenHandler(key, newToken, oldToken);
        // })
    }

    /**
     * Subscribing OAuthError event handler
     */
    private errorTokenSubscription() {
        this.authClient.on('error', this.errorTokenHandler);

        // If above don't work try below.
        // this.authClient.on('error', (err) => {
        //     this.errorTokenHandler(err);
        // })
    }

    /**
     * tokenManager.off(event[, callback])
     * Unsubscribe from tokenManager events. If no callback is provided, unsubscribes all listeneres from the event.
     * @param event Event to unsubscribe from
     * @param callback Optional callback that was used to subscrube to the event
     * 
     * authClient.tokenManager.off('renewed')
     * authClient.tokenManager.off('renewed', myRenewedCallback);
     */


    //#endregion Token Manager

    /***********
     * Sessions
     ***********/
    //#region session

    /**
     * This allows you to create a session using a sessionToken.
     * @param sessionToken Ephemeral one-time token used to bootstrap an Okta session
     * @param redirectUri After setting a cookie, Okta redirect to the specified URI. The default is the current URI.
     */
    private sessionSetCookieAndRedirect(sessionToken, redirectUri) {
        this.authClient.session.setCookieAndRedirect(sessionToken, redirectUri);
    }

    //#endregion session

    //#endregion private methods

    //#endregion methods

    /*********
     * Events
     *********/
    //#region events

    /****************
     * Token Manager
     ****************/
    //#region token manager
    
    /**
     * Token Manager event handlers
     */

    /**
     * Expired token event handler.
     * Event subscribe by expiredTokenSubscription method.
     * Pre-condition:  Must first call expiredTokenSubscription before this will handle any events.
     * @param key Key for expired token.
     * @param expiredToken The expired token.
     */
    private expiredTokenHandler = function (key, expiredToken) {
        console.log('Token with key', key, ' has exired:');
        console.log(expiredToken);
    }

    /**
     * Renewed token event handler.
     * Event subscribe by renewedTokenSubscription method
     * Pre-condition: Must first call renewedTokenSubscription before this will handle any renewed events
     */
    private renewedTokenHandler = function (key, newToken, oldToken) {
        console.log('Token with key', key, 'has been renewed');
        console.log('Old token:', oldToken);
        console.log('New token:', newToken);
    }

    /**
     * Triggered when an OAuthError is returned via the API.
     * Event subscrive by errorTokenSubscription method.
     * Pre-condition: Must first call errorTokenSubscription before this will handle any renewed events
     * @param The OAuthError object
     */
    private errorTokenHandler = function (err) {
        console.log('TokenManager error: ', err.message);
        // err.name
        // err.message
        // err.errorCode
        // err.errorSummary
    }



    //#endregion token manager

    //#endregion events
}