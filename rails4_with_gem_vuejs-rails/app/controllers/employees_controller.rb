class EmployeesController < ApplicationController
  before_action :set_employee, only: [:update, :destroy]

  # GET /employees
  # GET /employees.json
  def index
    @employees = Employee.all
    respond_to do |format|
      format.html
      format.json { render :json => @employees }
    end
  end

  # POST /employees
  # POST /employees.json
  def create
    @employee = Employee.new(employee_params)

    respond_to do |format|
      if @employee.save
        format.json { render json: @employee }
      else
        format.json { render json: { errors: @employee.errors.messages }, status: 422 }
      end
    end
  end

  # PATCH/PUT /employees/1
  # PATCH/PUT /employees/1.json
  def update
    respond_to do |format|
      if @employee.update(employee_params)
        format.json { render json: @employee }
      else
        format.json { render json: { errors: @employee.errors.messages }, status: 422 }
      end
    end
  end

  # DELETE /employees/1
  # DELETE /employees/1.json
  def destroy
    @employee.destroy
    respond_to do |format|
      format.json { render :json => {}, :status => :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_employee
      @employee = Employee.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def employee_params
      params.require(:employee).permit(:name, :email, :manager)
    end
end
