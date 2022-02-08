# grader class
class Grader:
    # constructor
    def __init__(self, name, assignment, grade):
        self.name = name
        self.assignment = assignment
        self.grade = grade
    # methods
    def GradeCalc(self):
        grade = self.grade
        if grade >= 90 and grade <= 100:
            return "Grade: A"
        elif grade >= 80 and grade <= 89:
            return "Grade: B"
        elif grade >= 70 and grade <= 79:
            return "Grade: C"
        elif grade >= 60 and grade <= 69:
            return "Grade: D"
        elif grade < 60:
            return "Grade: F"
            
# string input validation
def ValidateInputString(message):
    response = input(message)
    while not response:
        response = input("Cannot leave empty. " + message)
    return response

# int input validation
def ValidateInputInt(message):
    response = input(message)
    while (not response.isnumeric()) or (int(response) < 0 or int(response) > 100):
        response = input("Please enter a grade (0 - 100): ")
    return int(response)

# getting user inputs and validating them
name = ValidateInputString("Enter students name: ")
assignment = ValidateInputString("Next, enter the assignment name: ")
grade = ValidateInputInt("Enter the grade for " + assignment + ": ")

student = Grader(name, assignment, grade)
graded = student.GradeCalc()
print(graded)

