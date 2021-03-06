import React from 'react'
import EachExpense from './EachExpense'

export default function Expenses(props){
  if (props.expenses.length > 0){
    const allExpenses = props.expenses.map( (el) => <EachExpense key={el.id} xpdata={el} onDelete={props.onDelete} onEdit={props.onEdit}/> )
    return(
        <table className="table-striped fulltable">
          <tbody>
            <tr>
              <th className="t-headers">Name</th>
              <th className="t-headers">Value</th>
              <th className="t-headers">Category</th>
              <th className="t-headers"> Recurring</th>
              <th className="t-headers">Date</th>
            </tr>
            {allExpenses}
          </tbody>
        </table>
    )
  }else{
    return null
  }
}
