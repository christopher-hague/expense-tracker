import React from 'react'
import ExpenseForm from './ExpenseForm'
import Expenses from './Expenses'
// import { Link, Route } from 'react-router-dom'
import '../App.css';
import Graph from './Graph'

export default class InfoContainer extends React.Component {
  constructor(){
    super()

    this.state = {
      expenses: [],
      expenseCalcs: []
    }
  }

    componentDidMount(){
      fetch("http://localhost:3000/expenses")
      .then( res => res.json() )
      .then( data => this.setState({
        expenses: data
      }) )
      .then( () => this.calculations() )
    }

    calculations(){

        let recExp = this.state.expenses.reduce(function(total, expense){
          if (expense.type_id === 1){
            return parseFloat(expense.value) + total
          }else{
            return 0 + total
          }
        }, 0.0)

        let livExp = this.state.expenses.reduce(function(total, expense){
          if (expense.type_id === 2){
            return parseFloat(expense.value) + total
          }else{
            return 0 + total
          }
        }, 0.0)

        let foodExp = this.state.expenses.reduce(function(total, expense){
          if (expense.type_id === 3){
            return parseFloat(expense.value) + total
          }else{
            return 0 + total
          }
        }, 0.0)

        let utilExp = this.state.expenses.reduce(function(total, expense){
          if (expense.type_id === 4){
            return parseFloat(expense.value) + total
          }else{
            return 0 + total
          }
        }, 0.0)

          let travExp = this.state.expenses.reduce(function(total, expense){
            if (expense.type_id === 5){
              return parseFloat(expense.value) + total
            }else{
              return 0 + total
            }
          }, 0.0)

          let eduExp = this.state.expenses.reduce(function(total, expense){
            if (expense.type_id === 6){
              return parseFloat(expense.value) + total
            }else{
              return 0 + total
            }
          }, 0.0)

          let famExp = this.state.expenses.reduce(function(total, expense){
            if (expense.type_id === 7){
              return parseFloat(expense.value) + total
            }else{
              return 0 + total
            }
          }, 0.0)

          let charExp = this.state.expenses.reduce(function(total, expense){
            if (expense.type_id === 8){
              return parseFloat(expense.value) + total
            }else{
              return 0 + total
            }
          }, 0.0)

          this.setState({expenseCalcs: [recExp, livExp, foodExp, utilExp, travExp, eduExp, famExp, charExp] })
      }


    handleNewExpense(name, value, type, recurring, deposit){
      let dollarValue = parseFloat(value).toFixed(2)

      let typeID
      switch (type){
        case 'recreation':
          typeID = 1
          break;
        case 'living':
          typeID = 2
          break;
        case 'food':
          typeID = 3
          break;
        case 'utilities':
          typeID = 4
          break;
        case 'travel':
          typeID = 5
          break;
        case 'education':
          typeID = 6
          break;
        case 'family':
          typeID = 7
          break;
        case 'charity':
          typeID = 8
          break;
        default:
          typeID = null
          break;
      }

      deposit ? typeID = null : typeID
      
      return fetch("http://localhost:3000/expenses",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify( {expense: {name: name, value: dollarValue, type_id: typeID, recurring: recurring, deposit: deposit} } )
      })
      .then( res => res.json() )
      .then( data => this.setState( {expenses: data} ))
      .then( () => this.calculations() )
    }

    handleEditExpense(id, name, value, type, recurring, deposit){
      let dollarValue = parseFloat(value).toFixed(2)

      let typeID
      switch (type){
        case 'recreation':
          typeID = 1
          break;
        case 'living':
          typeID = 2
          break;
        case 'food':
          typeID = 3
          break;
        case 'utilities':
          typeID = 4
          break;
        case 'travel':
          typeID = 5
          break;
        case 'education':
          typeID = 6
          break;
        case 'family':
          typeID = 7
          break;
        case 'charity':
          typeID = 8
          break;
        default:
          typeID = type
          break;
      }

      return fetch(`http://localhost:3000/expenses/${id}`,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify( {expense: {name: name, value: dollarValue, type_id: typeID, recurring: recurring, deposit: deposit} } )
      })
      .then( res => res.json() )
      // .then( data => console.log(data) )
      .then( data => this.setState(
        Object.assign({}, this.state, {expenses: data})
      ) )
      .then( () => this.calculations() )
    }

    handleDeleteExpense(expenseID){
      return fetch(`http://localhost:3000/expenses/${expenseID}`,{
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        method: "DELETE"
      })
      .then( res => res.json() )
      .then( data => this.setState(
        Object.assign({}, this.state, {expenses: data})
      ) )
      .then( () => this.calculations() )
      // this.props.history.push('/categories')
    }


  render(){
    // if (this.state.expenses.length > 0 && this.state.expenseCalcs.length > 0){
      // console.log(this.state.expenseCalcs)
      const totalExpenses = this.state.expenses.reduce( (current, expense) => {
        if (expense.deposit === false){
          return parseFloat(expense.value) + current
        }else{
          return 0 + current
        }
      }, 0.0)

      const recurringExpenses = this.state.expenses.reduce( (current, expense) => {
        if (expense.recurring === true){
          return parseFloat(expense.value) + current
        }else{
          return 0 + current
        }
      },0.0)

      const totalDeposit = this.state.expenses.reduce( (current, expense) => {
        if (expense.deposit === true){
          return parseFloat(expense.value) + current
        }else{
          return 0 + current
        }
      },0.0)

      const netExpense = totalDeposit - totalExpenses

      return (
        <div>
          <div className="expenses">
            <img className="title" src={require('./CheckBook.png')} alt="" width="60" height="60"/>
            <span className="title t-text"> Expense Chart</span>
            {this.state.expenseCalcs.length > 0 ? <Graph expenseData={this.state.expenseCalcs} /> : null}
            <div id="chart-container"></div>
            <div className="data-panels">
              <div className="panel panel-warning">
                <div className="panel-heading">
                  <h3 className="panel-title">Recurring</h3>
                </div>
                <div className="panel-body">
                  ${parseFloat(recurringExpenses).toFixed(2)}
                </div>
              </div>
              <div className="panel panel-danger">
                <div className="panel-heading">
                  <h3 className="panel-title">Total Expense</h3>
                </div>
                <div className="panel-body">
                  ${parseFloat(totalExpenses).toFixed(2)}
                </div>
              </div>
              <div className="panel panel-success">
                <div className="panel-heading">
                  <h3 className="panel-title">Deposits</h3>
                </div>
                <div className="panel-body">
                  ${parseFloat(totalDeposit).toFixed(2)}
                </div>
              </div>
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title">Net Expense</h3>
                </div>
                <div className="panel-body">
                  {netExpense < 0 ? <span className="red-expense"> ${parseFloat(netExpense).toFixed(2)} </span> : <span> ${parseFloat(netExpense).toFixed(2)}</span> }
                </div>
              </div>
            </div>
          <br/>
            <ExpenseForm onCreate={this.handleNewExpense.bind(this)} />
            <br/>
            <Expenses expenses={this.state.expenses} onDelete={this.handleDeleteExpense.bind(this)} onEdit={this.handleEditExpense.bind(this)}/>
          </div>
        </div>
      )
    // }else{
    //   return null
    // }

  }
}
