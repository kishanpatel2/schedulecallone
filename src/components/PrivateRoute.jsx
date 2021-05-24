import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, roles, ...rest }) {

    return (
        <Route {...rest} render={props => {
            if (!localStorage.getItem('user-info')) {
                // If user is not logged in then redirect to login page with the return url

                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // If user is logged in then return the component
            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute };
