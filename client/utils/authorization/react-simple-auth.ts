const sessionKey = 'session';

export interface IProvider<T> {
  buildAuthorizeUrl(): string
  extractError(redirectUrl: string): Error | undefined
  extractSession(redirectUrl: string): T
  validateSession(session: T): boolean
  getSignOutUrl(redirectUrl: string): string
}

export interface IAuthenticationService {
  acquireTokenAsync<T>(
    provider: IProvider<T>,
    storage?: Storage,
    localWindow?: Window
  ): Promise<T>
  restoreSession<T>(provider: IProvider<T>, storage?: Storage): T | undefined
  invalidateSession(storage?: Storage): void
}

export const service: IAuthenticationService = {
  // TODO (Swick): Update acquireTokenAsync to check storage FIRST for token.  Else route to 3rd party login page
  acquireTokenAsync<T>(
    provider: IProvider<T>,
    storage: Storage = window.localStorage,
    localWindow: Window = window,
  ): Promise<T> {
    return new Promise<any>((resolve, reject) => {
      // Check if redirectUrl exists in storage
      const redirectUrl = storage.getItem('redirectUrl');

      if (redirectUrl !== null) {
        // Window was closed, but never reached the redirect.html due to user closing window or network error during authentication
        if (typeof redirectUrl !== 'string' || redirectUrl.length === 0) {
          reject(
            new Error(
              'React Simple Auth: Login window was closed by the user or authentication was incomplete and never reached final redirect page.',
            ),
          );
          return;
        }
        // Window was closed, and reached the redirect.html; however there still might have been error during authentication, check url
        const error = provider.extractError(redirectUrl);
        if (error) {
          reject(error);
          return;
        }

        // Window was closed, reached redirect.html and correctly added tokens to the url
        const session = provider.extractSession(redirectUrl);
        storage.setItem(sessionKey, JSON.stringify(session));
        resolve(session);
      } else {
        // Obtain the authorization URL
        window.open(provider.buildAuthorizeUrl(), '_self');
      }
    });
  },

  restoreSession<T>(
    provider: IProvider<T>,
    storage: Storage = window.localStorage,
  ): T | undefined {
    const sessionString = storage.getItem(sessionKey);
    if (typeof sessionString !== 'string' || sessionString.length === 0) {
      return undefined;
    }

    const session: T = JSON.parse(sessionString);

    if (!provider.validateSession(session)) {
      storage.removeItem(sessionKey);
      return undefined;
    }

    return session;
  },

  invalidateSession(storage: Storage = window.localStorage): void {
    storage.removeItem(sessionKey);
  },
};

export default service;
