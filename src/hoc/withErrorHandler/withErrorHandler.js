import React, { Component, useState,useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import useHttpErrorHandler from '../../hooks/http-error-handler'

const withErrorHandler = ( WrappedComponent, axios ) => {
    return props => {
        const [error,clearError] = useHttpErrorHandler(axios)
        

            return (
                <Aux>
                    <Modal
                        show={error}
                        modalClosed={clearError}>
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </Aux>
            );
    }
}

export default withErrorHandler;

// const withErrorHandler = ( WrappedComponent, axios ) => {
//     return class extends Component {
//         state = {
//             error: null
//         }

//         componentWillMount () {
//             this.reqInterceptor = axios.interceptors.request.use( req => {
//                 this.setState( { error: null } );
//                 return req;
//             } );
//             this.resInterceptor = axios.interceptors.response.use( res => res, error => {
//                 this.setState( { error: error } );
//             } );
//         }

//         componentWillUnmount () {
//             axios.interceptors.request.eject( this.reqInterceptor );
//             axios.interceptors.response.eject( this.resInterceptor );
//         }

//         errorConfirmedHandler = () => {
//             this.setState( { error: null } );
//         }

//         render () {
//             return (
//                 <Aux>
//                     <Modal
//                         show={this.state.error}
//                         modalClosed={this.errorConfirmedHandler}>
//                         {this.state.error ? this.state.error.message : null}
//                     </Modal>
//                     <WrappedComponent {...this.props} />
//                 </Aux>
//             );
//         }
//     }
// }

// export default withErrorHandler;