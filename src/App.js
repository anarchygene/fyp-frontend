import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, Link, HashRouter } from "react-router-dom";

//User Side Components
import Navigation from './components/usersidecomponents/Navbar.jsx';
import UserLogin from './components/usersidecomponents/Login';
import Homepage from './components/usersidecomponents/Homepage';
import About from './components/usersidecomponents/About';
import Product from './components/usersidecomponents/Products'
import Recipe from './components/usersidecomponents/Recipes'
import ProductDetails from './components/usersidecomponents/ProductDetails'
import RecipeDetails from './components/usersidecomponents/RecipeDetails';
import UserAccountDetails from './components/usersidecomponents/UserAccountDetails';
import ShoppingCart from './components/usersidecomponents/ShoppingCart';
import RegisterPage from './components/usersidecomponents/RegisterPage.jsx'
import RecipeSidebar from './components/usersidecomponents/RecipeSidebar.jsx';
import ProductSidebar from './components/usersidecomponents/ProductSidebar.jsx';
import UserDetailSidebar from './components/usersidecomponents/UserDetailSidebar';
import Payment from './components/usersidecomponents/Payment'
import Search from './components/usersidecomponents/Search';
import SuccessfulOrder from './components/usersidecomponents/SuccessfulOrder.jsx';
//
//Admin Side Components
import AdminLogin from './components/adminsidecomponents/AdminLogin.jsx';
import AdminProducts from './components/adminsidecomponents/AdminProducts';
import AdminRecipes from './components/adminsidecomponents/AdminRecipes';
import AdminOrders from './components/adminsidecomponents/AdminOrders';
import AdminProfile from './components/adminsidecomponents/AdminProfile';
import ManageAdmins from './components/adminsidecomponents/ManageAdmins';
import ManageUsers from './components/adminsidecomponents/ManageUsers';
import ManageDiscountCode from './components/adminsidecomponents/ManageDiscountCode'
import AddAdmin from './components/adminsidecomponents/AddAdmins';
import AddDiscount from './components/adminsidecomponents/AddDiscount'
import CreatePasswordAdmin from './components/adminsidecomponents/CreatePasswordAdmin';
import EditAdminProfile from './components/adminsidecomponents/EditAdminProfile.jsx';
import AdminOrderDetails from './components/adminsidecomponents/AdminOrderDetails';
import EditDiscountDetails from './components/adminsidecomponents/EditDiscountDetails';
import AdminSidebar from './components/adminsidecomponents/AdminSidebar.jsx';
import EditAdmins from './components/adminsidecomponents/EditAdmins';
import AdminSearch from './components/adminsidecomponents/AdminSearch';
import UserSearch from './components/adminsidecomponents/UserSearch';

import './App.css';
import './components/css/adminsideglobal.css';
import './components/css/usersideglobal.css'

const App = () => {
  const [users, setUsers] = useState([])
  const [admins, setAdmins] = useState([])
  const [admin, setAdmin] = useState([])
  const [orderDetail, setOrderDetail] = useState({})

  const [productCategories, setProductCategories] = useState([])
  const [productSubCategories, setProductSubCategories] = useState([])
  const [products, setProducts] = useState([])
  const [productStock, setProductStock] = useState([])

  const [recipeCategories, setRecipeCategories] = useState([])
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getOrderNamebyOrderId({})
    getUserRecentOrder()
    getAdmins()

    getAllProductCategories()
    getAllProductSubCategories()
    getAllProducts()
    getAllProductStock()

    getAllRecipeCategories()
    getAllRecipes()

  }, [])

  // admins
  const getAdmins = () => {
    fetch(`https://apibounwe.herokuapp.com/admin`)
      .then(res => res.json())
      .then((json) => {
        // alert("json " + JSON.stringify(json));
        setAdmins(json)
      }).catch((err) => {
        console.log(err);
      });
  }

  const getAdminbyId = (admin_id) => {
    return new Promise((resolve, reject) => {
      fetch(`https://apibounwe.herokuapp.com/admin/${admin_id}`)
        .then(res => res.json())
        .then((json) => {
          // console.log("json " + JSON.stringify(json));
          setAdmin(json[0]);
          return resolve(json[0]);
        }).catch((err) => {
          console.log(err);
          return reject(err);
        });
    })
  }

  // products
  const getAllProductCategories = () => {
    fetch(`https://apibounwe.herokuapp.com/productCategory`)
      .then(res => res.json())
      .then((json) => {
        // alert("json " + JSON.stringify(json));
        setProductCategories(json)
      }).catch((err) => {
        console.log(err);
      });
  }

  const getAllProductSubCategories = () => {
    fetch(`https://apibounwe.herokuapp.com/productSubCategories`)
      .then(res => res.json())
      .then((json) => {
        // console.log("json " + JSON.stringify(json));
        setProductSubCategories(json)
      }).catch((err) => {
        console.log(err);
      });
  }

  const getAllProducts = () => {
    fetch(`https://apibounwe.herokuapp.com/product`)
      .then(res => res.json())
      .then((json) => {
        setProducts(json)
      }).catch((err) => {
        console.log(err);
      });
  }


  const getAllProductStock = () => {
    fetch(`https://apibounwe.herokuapp.com/productStock`)
      .then(res => res.json())
      .then((json) => {
        setProductStock(json)
      }).catch((err) => {
        console.log(err);
      });
  }

  // recipes
  const getAllRecipeCategories = () => {
    return new Promise((resolve, reject) => {
      fetch(`https://apibounwe.herokuapp.com/recipeCategories`)
        .then(res => res.json())
        .then((json) => {
          // console.log("json " + JSON.stringify(json));
          setRecipeCategories(json)
          return resolve(json)
        }).catch((err) => {
          console.log(err);
          return reject(err);
        });
    })
  }

  const getAllRecipes = () => {
    fetch(`https://apibounwe.herokuapp.com/recipes`, { headers: { 'access_right': "USER" } })
      .then(res => res.json())
      .then((json) => {
        setRecipes(json)
      }).catch((err) => {
        console.log(err);
      });
  }

  // order
  const getOrderNamebyOrderId = (order_id) => {
    return new Promise((resolve, reject) => {
      fetch(`https://apibounwe.herokuapp.com/ordername/${order_id}`, {
        headers: { 'access_right': localStorage.getItem('access_right') }
      })
        .then(res => res.json())
        .then((json) => {
          console.log("json " + JSON.stringify(json));
          //alert(json)
          setOrderDetail(json[0])
          // alert(JSON.stringify(json))
          return resolve(json[0])
        }).catch((err) => {
          console.log(err);
          return reject(err);
        });
    })
  }

  const getUserRecentOrder = () => {
    return new Promise((resolve, reject) => {
      fetch(`https://apibounwe.herokuapp.com/userorder`, {
        headers: { authorization: `Bearer ${window.localStorage.getItem('jwttoken')}` }
      })
        .then(res => res.json())
        .then((json) => {
          // console.log("json " + JSON.stringify(json));
          setUsers(json)
          return resolve(json)
        }).catch((err) => {
          console.log(err);
          return reject(err);
        });
    })
  }


  const ensureAdminIsLoggedIn = () => {
    if (localStorage.getItem('access_right') === undefined || localStorage.getItem('access_right') === null) {
      alert("You are not supposed to be in the admin page")
      window.location.href = 'https://celinechow.github.io/fyp-frontend/#/adminlogin'
    }
  }
  const AdminRoutes = () => {
    useEffect(() => {
      ensureAdminIsLoggedIn()
    }, [])
    return (
      <Row style={{ margin: '0' }}>
        <Col xs={2} id="sidebar-wrapper-admin">
          <AdminSidebar />
        </Col>
        <Col xs={10} id="page-content-wrapper">
          <Route path="/manageproducts">
            <AdminProducts products={productStock} />
          </Route>
          <Route exact path="/editproducts/:product_id">
            <AdminProducts />
          </Route>
          <Route path="/adminaddproduct">
            <AdminProducts />
          </Route>
          <Route exact path="/editproductcat">
            <AdminProducts />
          </Route>
          <Route exact path="/searchproduct/:search">
            <AdminProducts />
          </Route>
          <Route path="/managerecipes">
            <AdminRecipes recipes={recipes} />
          </Route>
          <Route path="/adminaddrecipe">
            <AdminRecipes />
          </Route>
          <Route path="/adminaddrecipe2/:id">
            <AdminRecipes />
          </Route>
          <Route exact path="/editrecipes/:id">
            <AdminRecipes />
          </Route>
          <Route exact path="/editrecipes2/:recipe_id">
            <AdminRecipes />
          </Route>
          <Route path="/searchrecipe/:search">
            <AdminRecipes />
          </Route>
          <Route path="/editrecipecat">
            <AdminRecipes />
          </Route>
          <Route exact path="/editingredientprod/:ingredient_id">
            <AdminRecipes />
          </Route>
          <Route path="/manageadmins">
            <ManageAdmins admins={admins} getAdminDetail={getAdminbyId} />
          </Route>
          <Route path="/manageusers">
            <ManageUsers users={users} />
          </Route>
          <Route path="/searchuser/:search">
            <UserSearch />
          </Route>
          <Route path="/addadmin">
            <AddAdmin />
          </Route>
          <Route path="/createpasswordadmin">
            <CreatePasswordAdmin />
          </Route>
          <Route path="/adminprofile">
            <AdminProfile />
          </Route>
          <Route path="/manageorders">
            {/* <AdminOrders orders={orders} getOrderDetail={getOrderNamebyOrderId} /> */}
            <AdminOrders />
          </Route>
          <Route path="/adminorderdetails/:order_id">
            <AdminOrderDetails />
          </Route>
          <Route path="/editadminprofile">
            <EditAdminProfile />
          </Route>
          <Route path="/managediscountcode">
            <ManageDiscountCode />
          </Route>
          <Route exact path="/editdiscount/:discount_id">
            <EditDiscountDetails />
          </Route>
          <Route exact path="/editadmin/:id">
            <EditAdmins admin={admin} />
          </Route>
          <Route path="/searchadmin/:search">
            <AdminSearch getAdminDetail={getAdminbyId} />
          </Route>
          <Route path="/adddiscount">
            <AddDiscount />
          </Route>
        </Col>
      </Row>
    )
  }

  const UserRoutes = () => {
    return (
      <>
        <Navigation />
        <Route path="/home">
          <Homepage products={productStock} recipes={recipes} />
        </Route>
        <Route path="/search/:search">
          <Search />
        </Route>
        <Route path="/login">
          <UserLogin />
        </Route>
        <Route path="/aboutus">
          <About />
        </Route>
        <Route path="/shoppingcart">
          <ShoppingCart />
        </Route>
        <Route path="/useraccountdetails/accountdetails">
          <Row style={{ margin: '0' }} className="row-container row-container-sizing">
            <Col xs={2} id="sidebar-wrapper-user">
              <UserDetailSidebar />
            </Col>
            <Col xs={10} id="page-content-wrapper">
              <UserAccountDetails />
            </Col>
          </Row>
        </Route>
        <Route path="/useraccountdetails/orderhistory">
          <Row style={{ margin: '0' }}>
            <Col xs={2} id="sidebar-wrapper-user">
              <UserDetailSidebar />
            </Col>
            <Col xs={10} id="page-content-wrapper">
              <UserAccountDetails />
            </Col>
          </Row>
        </Route>
        <Route path={["/products", "/products/:category", "/products/:category/:subcategory"]}>
          <Row style={{ margin: '0' }} className="row-container row-container-sizing">
            <Product pcat={productCategories} psubcat={productSubCategories} products={productStock} />
          </Row>
        </Route>
        <Route path="/productdetails/:id">
          <Row style={{ margin: '0' }} className="row-container row-container-sizing">
            <Col xs={2} id="sidebar-wrapper-user">
              <ProductSidebar pcat={productCategories} psubcat={productSubCategories} />
            </Col>
            <Col xs={10} id="page-content-wrapper">
              <ProductDetails />
            </Col>
          </Row>
        </Route>
        <Route path={["/recipes", "/recipes/:category"]}>
          <Row style={{ margin: '0' }} className="row-container row-container-sizing">
            <Recipe recipes={recipes} rcat={recipeCategories} />
          </Row>
        </Route>
        <Route path="/recipedetails/:id">
          <Row style={{ margin: '0' }} className="row-container row-container-sizing">
            <Col xs={2} id="sidebar-wrapper-user">
              <RecipeSidebar rcat={recipeCategories} />
            </Col>
            <Col xs={10} id="page-content-wrapper">
              <RecipeDetails />
            </Col>
          </Row>
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
        <Route exact path="/successfulorder/:id">
          <SuccessfulOrder />
        </Route>
        <Route exact path="/">
          <Homepage products={productStock} recipes={recipes} />
        </Route>
      </>
    )
  }

  return (
    <Container fluid="wrapper">
      <HashRouter>
        <Switch>

          <Route path="/adminlogin">
            <AdminLogin />
          </Route>
          <Route path={["/adminaddrecipe", "/adminaddrecipe2", "/searchuser/:search", "/searchadmin/:search", "/searchrecipe", "/searchproduct", "/manageproducts", "/editrecipecat", "/editdiscount/:discount_id", "/managerecipes", "/manageadmins", "/manageusers", "/manageorders", "/adminaddproduct", "/managediscountcode", "/addadmin", "/createpasswordadmin", "/adminprofile", "/editadminprofile", "/editproducts/:product_id", "/adminorderdetails", "/adddiscount", "/editadmin/:id", "/editproductcat", "/editrecipes/:id", "/editrecipes2/:recipe_id", "/editingredientprod/:ingredient_id"]}>
            <AdminRoutes />
          </Route>
          <Route path={["/", "/search/:search", "/register", "/home", "/login", "/aboutus", "/products", "/products/:category", "/products/:category/:subcategory", "/products/productdetails", "/recipes", "/useraccountdetails/accountdetails", "/useraccountdetails/accountdetails/edit", "/useraccountdetails/orderhistory", "/successfulorder/:id"]}>
            <UserRoutes />
          </Route>
        </Switch>
      </HashRouter>
    </Container>
  );
}

export default App;