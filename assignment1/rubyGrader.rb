# Grader class
class Grader 
    # class constructor
    def initialize(name, assignment, grade)
        @name = name
        @assignment = assignment
        @grade = grade
    end
    # class method\
    def GradeCalc()
        if @grade >= 90 and @grade <= 100
            return "Grade: A"
        elsif @grade >= 80 and @grade <= 89
            return "Grade: B"
        elsif @grade >= 70 and @grade <= 79
            return "Grade: C"
        elsif @grade >= 60 and @grade <= 69
            return "Grade: D"
        elsif @grade >= 0 and @grade <= 59
            return "Grade: F"
        end
    end
end

def ValidateNumberInput(message)
    puts message
    num = gets.to_i
    while (num <= 0 or num > 100)
        puts "Enter a number between 0 and 100"
        num = gets.to_i
    end
    return num
end
    
def ValidateStringInput(message)
    puts message
    input = gets
    # while input.blank?
    #     puts "Do not leave blank" + message
    #     input = gets
    # end
    return input
end

name = ValidateStringInput("Enter the name of the student: ")
assignment = ValidateStringInput("Next, enter the assignment name: ")
grade = ValidateNumberInput("Finally, enter the grade for the assignment: ")

student = Grader.new(name, assignment, grade)
puts(student.GradeCalc())