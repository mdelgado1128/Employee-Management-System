const inquirer = require("inquirer");
const { parse } = require("path");
const connection = require("./db/connection");

const firstPrompt = () => {
  inquirer.prompt ([{
    type: "list",
    message:"What do you want to do?",
    name: "choice",
    choices: ["view all employees","view all roles", "add role","view all departments", "view all roles"]


  }]).then ((response)=> {
    console.log(response.choice);
    if(response.choice === "view all employees"){
      viewAllEmployees();
    }
    if (response.choice === "view all departments"){
      viewAllDepartments();
    }
    if (response.choice === "view all roles"){
      viewAllRoles();
    }
    else if (response.choice === "add role"){
      addRole()
    }
  });

};
const viewAllEmployees = () => {
connection.promise().query("SELECT * FROM employee").then((data) =>{
  console.table(data[0]);
  firstPrompt();
});
};
const viewAllDepartments = () =>{
  connection.promise().query("SELECT * FROM department").then((data) =>{
    console.table(data[0]);
    firstPrompt();
  });
};
const viewAllRoles = () => {
  connection.promise().query("SELECT * FROM role").then((data) =>{
    console.table(data[0]);
    firstPrompt();
  });
}
const addRole = () => {
  connection.promise().query("SELECT * FROM department").then((data) =>{
    const depArray = data[0].map((dep) => {

    return {name:dep.name,value:dep.id};
    }); 
    inquirer.prompt( [
      {
      type: "input",
    message:"What is the roles title?",
    name: "title",
      },
      {
        type:"input",
        message:"What is the salary?",
        name:"salary",
      },
      {
        type:"list",
        message:"What is the department?",
        name:"department_id",
        choices:depArray
      }


    ]).then((answers) => {
      console.log(answers);
      answers.salary = parseInt(answers.salary)
      connection.promise().query("INSERT INTO role SET ?", answers).then(()=> {
        console.log("role added");
        firstPrompt()
      })
    })
  });
}
firstPrompt();

