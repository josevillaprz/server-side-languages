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
        return @name
    end
end

students = Grader.new("jose", "assignment", 4)
puts(students.GradeCalc)