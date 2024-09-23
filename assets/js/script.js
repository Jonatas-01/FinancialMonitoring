// Get Elements
const salaryInputEl = document.getElementById('salary-input')
const salaryFix = document.getElementById('salary-fix')
const balanceAmount = document.getElementById('balance-amount')
const expensesInputEl = document.getElementById('expenses-input')
const categoryInputEl = document.getElementById('category-input')
const table = document.getElementById('tbl')
const salaryBox = document.getElementById('salary-box')
const expensesBox = document.getElementById('expenses-box')
const tableDiv = document.getElementById('table-div')
const validation = document.getElementsByClassName('validation')
const deleteBtn = document.getElementsByClassName('btn-delete')
const buttonSalary = document.getElementById('btn-sal')
const tableHeader = document.getElementById('table-header')
let itemList = []
let itemId = 0
let salaryValue = 0

// Format Numbers
const format = new Intl.NumberFormat('en')

// Salary Function
function salaryFunc() {
    salaryValue = salaryInputEl.value
    
    if(salaryValue == '' || salaryValue < 0){
        salaryInputEl.style.border = '1px solid red'
        validation[0].style.display = 'block'
    } else{
        salaryFix.textContent = salaryValue
        salaryInputEl.value = ""
        showBalance()

        salaryBox.classList.add('hide')
        expensesBox.classList.remove('hide')
        tableDiv.classList.remove('hide')
    }
    expensesInputEl.focus()
}

// Balance Function
function showBalance(){
    const expenses = totalExpenses()
    const total = parseInt(salaryFix.textContent) + expenses
    balanceAmount.textContent = total
}

// Calculate Expenses Function
function totalExpenses(){
    const total = itemList.reduce((sum, expense) => sum - expense.amount, 0)
    return total
}

// Expenses Function
function expenses(){
    let expensesAmountValue = expensesInputEl.value
    let expenseCategValue = categoryInputEl.value
    let percentageValue = (expensesAmountValue * 100) / salaryFix.textContent
    if(expensesAmountValue && expenseCategValue){
        let amount = expensesAmountValue

        expensesInputEl.value = ""
        categoryInputEl.value = ""
        
        // store the value inside the object
        let expenses = {
            id: itemId,
            title: expenseCategValue,
            amount: amount,
            percent: percentageValue.toFixed(1),
        }
        itemId++
        itemList.push(expenses)

        // add expenses to HTML page
        addExpenses(expenses)
        showBalance()

        // go back to expenses input after send the details
        expensesInputEl.focus()
    } else{
        if(expensesAmountValue === ''){
            expensesInputEl.style.border = '1px solid red'
            validation[1].style.display = 'block'
        }

        if(expenseCategValue === ''){
                categoryInputEl.style.border = '1px solid red'
                validation[2].style.display = 'block'
        }
    }
}

// Add content in HTML page
function addExpenses(expensesParamenter){
    const html = `
        <tr>
            <td>${expensesParamenter.title}</td>
            <td>${expensesParamenter.amount} £</td>
            <td>${expensesParamenter.percent}%</td>
            <td><button class="btn-delete"><i class="fa-solid fa-trash-can"></i></button</td>
        </tr>`
    table.innerHTML += html 
}