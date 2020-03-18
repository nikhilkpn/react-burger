import React, { Componen,useState } from 'react'
import { connect } from 'react-redux'
import Aux from '../Aux/Aux'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = props => {
    const [sideDrawerIsVisible, setsideDrawerIsVisible] = useState(false)

    const SideDrawerCloseHandler = () => {
        setsideDrawerIsVisible(false)
    }
    const sideDrawerToggleHander =()=> {
        setsideDrawerIsVisible(!sideDrawerIsVisible)
        }
        return (
                <Aux>
                    <Toolbar 
                        isAuth={props.isAuthenticated}
                        drawerTogglClicked={sideDrawerToggleHander}/>   
                    <SideDrawer 
                        isAuth={props.isAuthenticated}
                        open={props.showSideDrawer} 
                        closed={SideDrawerCloseHandler}/> 
                    <main className={classes.Content}>
                        {props.children}
                    </main>
                </Aux>

        )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !==null
    }
}
export default connect(mapStateToProps)(Layout);

// class Layout extends Component {
//     state = {
//         showSideDrawer:false
//     }

//     SideDrawerCloseHandler = () => {
//         this.setState({showSideDrawer:false})
//     }
//     sideDrawerToggleHander =()=> {
//         this.setState((prevState)=>{
//             return {showSideDrawer: !prevState.showSideDrawer};
//         }
//         )}
//     render() {
//         return (
//                 <Aux>
//                     <Toolbar 
//                         isAuth={this.props.isAuthenticated}
//                         drawerTogglClicked={this.sideDrawerToggleHander}/>   
//                     <SideDrawer 
//                         isAuth={this.props.isAuthenticated}
//                         open={this.state.showSideDrawer} 
//                         closed={this.SideDrawerCloseHandler}/> 
//                     <main className={classes.Content}>
//                         {this.props.children}
//                     </main>
//                 </Aux>

//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.auth.token !==null
//     }
// }
// export default connect(mapStateToProps)(Layout);