const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login");


loginBtn.addEventListener("click", async() =>{
    const data = new FormData();

    data.append("username",usernameInput.value);
    data.append("password",passwordInput.value);



    const response = await axios(
        "C:/xampp/htdocs/full-stack-expense-tracker/api/login.php",
        {
            method: "POST",
            data:data,
        }
    );

    if(response.data.status === "Login Successful"){
        localStorage.setItem("userId", response.data.user.id)
        window.location.href = "/home.html";
    }

})


async function addBudget() {
    const budget_form = document.getElementById('budget_form');
    const formData = new FormData(budget_form);

    try {
        const response = await fetch('add_budget.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.text();

        document.getElementById('responseMessage').textContent = result;

        if (result === "Budget added successfully") {
            budget_form.reset();
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('responseMessage').textContent = "Eror";
    }
}


async function addExpense() {
    const expense_form = document.getElementById('expense_form');
    const form_data = new FormData(expense_form);

    try {
        const response = await fetch('add_expense.php', {
            method: 'POST',
            body: form_data
        });

        const result = await response.text();

        alert(result);

        if (result === "Expense added successfully") {
            addRowToTable(form_data);
            expense_form.reset();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function addRowToTable(form_data) {
    const table = document.getElementById('table');

    const new_row = table.insertRow();
    const name_cell = new_row.insertCell(0);
    const amount_cell = new_row.insertCell(1);
    const category_cell = new_row.insertCell(2);
    const data_cell = new_row.insertCell(3);
    const action_cell = new_row.insertCell(4);

    name_cell.textContent = form_data.get('expense_name');
    amount_cell.textContent = form_data.get('expense_amount');
    category_cell.textContent = form_data.get('category');
    data_cell.textContent = form_data.get('date');

    const delete_button = document.createElement('button');
    delete_button.textContent = "Delete";
    delete_button.onclick = () => new_row.remove();
    action_cell.appendChild(delete_button);
}