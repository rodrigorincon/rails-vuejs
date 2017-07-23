window.Event = new Vue()

Vue.component('employee-row', {
  template: '#employee-row',
  props: {
    employee: Object
  },
  data: function () {
    return {
      editMode: false,
      errors: {}
    }
  },
  methods: {
    // toggle the manager status which also updates the employee in the database
    toggleManagerStatus: function () {
      this.employee.manager = !this.employee.manager
      this.updateEmployee()
    },
    // ajax call for updating an employee
    updateEmployee: function () {
      var self = this;
      $.ajax({
        method: 'PUT',
        data: {
          employee: self.employee,
        },
        url: '/employees/' + self.employee.id + '.json',
        success: function(res) {
          self.errors = {}
          self.employee = res
          self.editMode = false
        },
        error: function(res) {
          self.errors = res.responseJSON.errors
        }
      })
    },
    fireEmployee: function(){
      Event.$emit('fire-employee', this.employee.id)
    }
  }
})

var employees = new Vue({
  el: '#employees',
  data: {
    employees: [],
    new_employee: {
      name: '',
      email: '',
      manager: false
    },
    errors: {}
  },
  mounted() {
    Event.$on("fire-employee", employee_id => this.fireEmployee(employee_id))
    var self = this;
    $.ajax({
      url: '/employees.json',
      success: function(res) {
        self.employees = res;
      }
    });
  },
  methods: {
    hireEmployee: function () {
      var self = this;
      $.ajax({
        method: 'POST',
        data: {
          employee: self.new_employee
        },
        url: '/employees.json',
        success: function(res) {
          self.errors = {}
          self.new_employee = {name: '', email: '', manager: false}
          self.employees.push(res);
        },
        error: function(res) {
          self.errors = res.responseJSON.errors
        }
      })
    },
    fireEmployee: function (employee_id) {
      var self = this;
      $.ajax({
        method: 'DELETE',
        url: '/employees/' + employee_id + '.json',
        success: function(res) {
          var position = self.employees.findIndex(emp => emp.id == employee_id)
          self.employees.splice(position,1)
        }
      })
    }
  }

});