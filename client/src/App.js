import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'; 
import axios from 'axios';

import Header from './components/Header';

import Create from './pages/Create';
import Home from './pages/Home'; // default icons 
// import HomeCustom from './pages/HomeCustom'; // our own icons
import History from './pages/History';
import List from './pages/List';
import Savings from './pages/Savings';
import Transact from './pages/Transact';
import Report from './pages/Report';

import About from './pages/About';

import Lost from './components/Lost';
import Loading from './components/Loading';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


const App = () =>{

  const [ banks, setBanks ] = useState([])
  const [ history, setHistory ] = useState([])
  const [ totalSavings, setTotalSavings] = useState(0);
  const [ loaded, isLoaded ] = useState(false)


  useEffect(()=>{
    const source = axios.CancelToken.source();
    const fetchDatas = async () =>{
      try {
        await Promise.all([
            axios.get('api/bank'),
            axios.get('api/history')
          ])
          .then(axios.spread((bankData, historyData)=>{
            setBanks(bankData.data)
            setHistory(historyData.data)
            isLoaded(true);
          }))
          .catch(err=>{
            if(err.response){
              console.log("error in response")
              isLoaded(false)
            }
            else if(err.request){
              console.log("error in request");
              <Loading />
            }
            else{
              throw new Error(err);
            }
          })
      } catch (error) {
        if(axios.isCancel(error)) console.log("error");

        else{ throw error }
      }
    }

    fetchDatas();

    return ()=> {
      source.cancel();
    }

  }, []);

  useEffect(() => {
      if(isLoaded){
        const total = banks.map(b=>parseFloat(b.savings))
          .reduce((total, next)=>{
            return total + next
          }, 0)
          .toFixed(2);

        setTotalSavings(total);
      }
    return;
  }, [banks, isLoaded]);

  const displayLoading = ()=>{
    if(!loaded) return <Loading />

    else return;
  }
  displayLoading();

  if(!loaded)return (
    <Loading/>
  )
  else 
  return (
    <Router>
      <Header />
      <ToastContainer limit={3} autoClose={3000}/>
      <Switch>
        <Route exact path="/">
          <HomeCustom totalSavings={totalSavings} />
        </Route>
        <Route path="/create"> 
          <Create /> 
        </Route>
        <Route path="/history">
          <History history={ history } />
        </Route>
        <Route path="/list">
          <List banks={ banks } />
        </Route>

        <Route path="/savings">
          <Savings banks={ banks } />
        </Route>
        <Route path="/transact">
          <Transact banks={ banks } />
        </Route>

        <Route path="/report"> 
          <Report banks={ banks } history={ history } />
        </Route>

        <Route path="/about" component={About} />

        <Route component={Lost}/>
        <Redirect to="/404" />
      </Switch>
    </Router>
  )
}

export default App;