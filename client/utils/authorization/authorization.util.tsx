import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export const authorization = (allowedRoles) => (WrappedComponent) => {
    interface Props {
      user? : any;
    }

    class WithAuthorization extends React.Component<Props & RouteComponentProps<any>> {
      constructor(props) {
        super(props);
      }

      render() {
        const { isSuperuser } = this.props.user.profile ?
          this.props.user.profile : { isSuperuser: false };
        // return allowedRoles.includes(isSuperuser) ?
        return allowedRoles === isSuperuser ?
          <WrappedComponent {...this.props} /> :
          <h1>Current user is NOT authorized to view.</h1>;
      }
    }

    return withRouter(WithAuthorization);
  };


export const Super = authorization(true);