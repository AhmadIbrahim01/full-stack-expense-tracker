let amount_removed_history = JSON.parse(localStorage.getItem('transactions'));
let local_income = parseInt(JSON.parse(localStorage.getItem('income')));
let local_number_of_transactions = parseInt(JSON.parse(localStorage.getItem('transactions_count')));

const budget_amount = document.getElementById("budget_amount")
const budget_name = document.getElementById("budget_name")

const income = document.getElementById("income")
const add_income = document.getElementById("add_income")

const transactions = document.getElementById("transactions")
const balance = document.getElementById("balance")
const expenses = document.getElementById("expenses")


balance.innerHTML = 0
balance.value = 0
expenses.innerHTML = 0
expenses.value = 0
let number_of_transactions = 0 + local_number_of_transactions
transactions.innerHTML = number_of_transactions
income.innerHTML = 0
let new_income = 0 + local_income 
income.innerText = new_income + "$"

let amount_added_history = []



const add_expense = document.getElementById("add_expense")
const expense_name = document.getElementById("expense_name")

const expense_amount = document.getElementById("expense_amount")

const category = document.getElementById("category")

const date = document.getElementById("date")


const table = document.getElementById("table")

let id = 0

add_income.addEventListener("click", (e)=>{
    addBudget()
})


add_expense.addEventListener("click", ()=>{
    addExpense()
})

async function display() {
    try {
        const display_response = await fetch('get_expenses.php');
        const expenses = await display_response.json();

        const table = document.getElementById('table');

        expenses.forEach(expense => {
            const newRow = table.insertRow();

            const nameCell = newRow.insertCell(0);
            const amountCell = newRow.insertCell(1);
            const categoryCell = newRow.insertCell(2);
            const dateCell = newRow.insertCell(3);
            const actionCell = newRow.insertCell(4);

            nameCell.textContent = expense.expense_name;
            amountCell.textContent = expense.expense_amount;
            categoryCell.textContent = expense.category;
            dateCell.textContent = expense.date;

        });
    } catch (error) {
        console.error("error");
    }
}
display()

const min = document.getElementById('min');
min.addEventListener('click', () => {
    applyMin();
});
const max = document.getElementById('max');
max.addEventListener('click', () => {
    applyMax();
});
const all = document.getElementById('all');
all.addEventListener('click', () => {
    display();
});


function applyMin() {
    const minAmount = amount_removed_history.reduce((min, obj) => {
        return Number(obj.amount) < Number(min.amount) ? obj : min;
    });
    displayFiltered(minAmount)
}

function applyMax() {
    const maxAmount = amount_removed_history.reduce((max, obj) => {
        return Number(obj.amount) > Number(max.amount) ? obj : max;
    });
    displayFiltered(maxAmount)
}

function displayFiltered(value){
    let table_inner = ""
        table_inner += `
            <tr>
                <td contenteditable="true">${value.name}</td>
                <td contenteditable="true">${value.amount}</td>
                <td contenteditable="true">${value.category}</td>
                <td contenteditable="true">${value.date}</td>

                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
            `

        table.innerHTML = `
        <tr>
          <th>Expense Name</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
        ${table_inner}
        `
}

function editRow(index) {
    const row = table.rows[index + 1];
    const name = row.cells[0].innerText;
    const amountt = row.cells[1].innerText;
    const categoryy = row.cells[2].innerText;
    const datee = row.cells[3].innerText;

    amount_removed_history[index].name = name
    amount_removed_history[index].amount = amountt
    amount_removed_history[index].category = categoryy
    amount_removed_history[index].date = datee
    
    saveToLocal()
    display()

}

function deleteRow(index) {
    number_of_transactions -= 1
    transactions.innerHTML = number_of_transactions
   
    balance.value += parseInt(amount_removed_history[index].amount)
    balance.innerText = balance.value + "$"

    expenses.value -= parseInt(amount_removed_history[index].amount)
    expenses.innerHTML = expenses.value + "$"
    
    amount_removed_history.splice(index, 1);
    saveToLocal()
    display();
}


function saveToLocal() {
    localStorage.setItem('transactions', JSON.stringify(amount_removed_history));
    localStorage.setItem('income', JSON.stringify(income.innerHTML.slice(0, income.innerHTML.length - 1)));
    localStorage.setItem('transactions_count', JSON.stringify(number_of_transactions));
    display();
}

