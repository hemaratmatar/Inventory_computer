import React, { Component } from 'react'
import { firebaseAuth, fireauth } from '../../Firebase/index';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import 'firebase/auth';

import { Layout, Menu, Icon, Avatar } from 'antd';
import { Route, Link, Switch } from 'react-router-dom'
import './Login.css'
import Home from '../Home/Home'
import About from '../About/About'
import Productshow from '../Product/Product-show'
import Productedit from '../Product/Product-edit'
import Contact from '../Contact/Contact'
import Product from '../Product/Product';
import Person from '../Person/Person';
import Personshow from '../Person/Person-show';
import Personedit from '../Person/Person-edit';
import Roomshow from '../Room/Show';
import Roomedit from '../Room/edit';
import Room from '../Room/room';
import Perlist from '../Person/per-list';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



export default class Login extends Component {

    // The component's Local state.
    state = {
        isSignedIn: false // Local signed-in state.
    };

    // Configure FirebaseUI.
    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google , Facebook , Etc as auth providers.
        signInOptions: [
            firebaseAuth.GoogleAuthProvider.PROVIDER_ID,
            firebaseAuth.FacebookAuthProvider.PROVIDER_ID,
            firebaseAuth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccess: () => false
        }
    };

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = fireauth.onAuthStateChanged(
            (user) => this.setState({ isSignedIn: !!user })
        );
        
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        if (!this.state.isSignedIn) {
            return (
                <Layout>
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <div style={{ background: '#fff', padding: 24, minHeight: 830 }}>
                        <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={fireauth}
                />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Hemarat Matar & akarin Srimungkung</Footer>
                </Layout>
            );
        }
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo" />
                    <br />

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to='/'>
                                <Icon type="user" />
                                <span className="nav-text">Home</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="ordered-list" />
                                    <span>Product</span>
                                </span>
                            }>
                            <Menu.Item key="2">Product List</Menu.Item>
                            <Menu.Item key="3"><Link to="/product" >Product List Edit</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="team" />
                                    <span>Person</span>
                                </span>
                            }>
                            <Menu.Item key="4"><Link to="/person-list">Person List</Link></Menu.Item>
                            <Menu.Item key="5"><Link to="/person">Person List Edit</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={
                                <span>
                                    <Icon type="home" />
                                    <span>Room</span>
                                </span>
                            }>
                            <Menu.Item key="6">Room List</Menu.Item>
                            <Menu.Item key="7"><Link to="/room">Room List Edit</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="8">
                            <Link to='/about'>
                                <Icon type="info" />
                                <span className="nav-text">About</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="9">
                            <Link to='/contact'>
                                <Icon type="phone" />
                                <span className="nav-text">Contact</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="10" onClick={() => fireauth.signOut()}>
                            <Link to="/">
                                <Icon type="logout" />
                                <span>Sign out!</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} >
                        <h1 style={{ textAlign: 'center' }}> <Avatar size={64} shape="square" icon="user" src={fireauth.currentUser.photoURL} /> Welcome {fireauth.currentUser.displayName}! You are now signed-in!</h1>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 812 }}>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                {/*Product Group*/}
                                <Route path="/product" component={Product} />
                                <Route path="/product-edit/:id" component={Productedit} />
                                <Route path="/product-show/:id" component={Productshow} />
                                {/*Person Group*/}
                                <Route path="/person" component={Person} />
                                <Route path="/person-show/:id" component={Personshow} />
                                <Route path="/person-edit/:id" component={Personedit} />
                                <Route path="/person-list" component={Perlist}/>
                                {/*Room Group*/}
                                <Route path="/room" component={Room} />
                                <Route path="/room-edit/:id" component={Roomedit} />
                                <Route path="/room-show/:id" component={Roomshow} />
                                <Route path="/about" component={About} />
                                <Route path="/contact" component={Contact} />
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Hemarat Matar & akarin Srimungkung
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
