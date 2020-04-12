import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
// import history from '../../../utils/history';

interface Props {
  user?: any;
  settings?: any;
}

class RedirectPage extends React.Component<Props & RouteComponentProps<any>> {
  constructor(props: any) {
    super(props);

    const requestKey = 'redirectUrl';
    // Update corresponding entry with the redirected url which should
    // contain either access token or failure reason in the query parameter / hash
    window.localStorage.setItem(requestKey, window.location.href);
    // const session = keycloakProvider.extractSession(window.location.href);
    // localStorage.setItem('session', JSON.stringify(session));

    this.props.user.dispatchAuth();

    // history.push('/');
  }

  public render() {
    return ( 
        <h1>Redirecting ...</h1>
    );
  }
}

export default withRouter(RedirectPage);
