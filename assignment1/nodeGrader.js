// importing the readline library
const readline = require("readline")

class Grader {
    constructor(name, assignment, grade){
        this.name = name
        this.assignment = assignment
        this.grade = grade
    }

    GradeCalc() {
        let grade = this.grade
        if(grade >= 90 && grade <= 100){
            return "Grade: A"
        }
        else if(grade >= 80 && grade <= 89){
            return "Grade: B"
        }
        else if(grade >= 70 && grade <= 79){
            return "Grade: C"
        }
        else if(grade >= 60 && grade <= 70){
            return "Grade: D"
        }
        else {
            return "Grade: F"
        }        
    }
}

// setting up the interface four the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout 
})

// getting inputs from the user
let name = '',
    assignment = '',
    grade = ''

rl.question("Enter the name of the student: ", (inputName) => {
    name = inputName
    rl.question("Next, enter the assignment name: ", (inputAssignment) => {
        assignment = inputAssignment
        rl.question("Finally, enter the grade for " + assignment + ": ", (inputGrade) => {
            grade = inputGrade
            let gradeAssignment = new Grader(name, assignment, grade)
            console.log(gradeAssignment.GradeCalc())
            rl.close
        })
        rl.close
    })
    rl.close
})

