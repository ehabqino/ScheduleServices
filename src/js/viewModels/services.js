
define(["require", "exports", "knockout", "ojs/ojbootstrap", "ojs/ojarraydataprovider","ojs/ojtable", "ojs/ojknockout"],
  function(require, exports, ko, ojbootstrap_1, ArrayDataProvider) {
    function ServicesViewModel() {

      this.deptArray = [
    {
      "DepartmentId": 10,
      "DepartmentName": "Finance 9",
      "LocationId": 300,
      "ManagerId": 7001,
      "StartDate": "2014-06-13",
      "EmployeeCount": 335,
      "Type": "Sales",
      "Currency": "EUR",
      "Primary": [],
      "Rating": 3,
      "TargetComplete": 90
    },
    {
      "DepartmentId": 20,
      "DepartmentName": "Control And Credit 9",
      "LocationId": 300,
      "ManagerId": 7001,
      "StartDate": "2019-09-10",
      "EmployeeCount": 206,
      "Type": "HR",
      "Currency": "USD",
      "Primary": [],
      "Rating": 1,
      "TargetComplete": 90
    },
    {
      "DepartmentId": 30,
      "DepartmentName": "Purchasing 28",
      "LocationId": 400,
      "ManagerId": 6001,
      "StartDate": "2021-01-03",
      "EmployeeCount": 473,
      "Type": "HR",
      "Currency": "JPY",
      "Primary": ["checked"],
      "Rating": 3,
      "TargetComplete": 50
    },
    {
      "DepartmentId": 40,
      "DepartmentName": "Purchasing 27",
      "LocationId": 400,
      "ManagerId": 1001,
      "StartDate": "2016-02-01",
      "EmployeeCount": 369,
      "Type": "Finance",
      "Currency": "JPY",
      "Primary": [],
      "Rating": 5,
      "TargetComplete": 80
    },
    {
      "DepartmentId": 50,
      "DepartmentName": "Shipping 4",
      "LocationId": 300,
      "ManagerId": 2001,
      "StartDate": "2014-07-31",
      "EmployeeCount": 476,
      "Type": "HR",
      "Currency": "EUR",
      "Primary": [],
      "Rating": 2,
      "TargetComplete": 90
    },
    {
      "DepartmentId": 60,
      "DepartmentName": "Finance 10",
      "LocationId": 400,
      "ManagerId": 5001,
      "StartDate": "2017-01-17",
      "EmployeeCount": 304,
      "Type": "Sales",
      "Currency": "JPY",
      "Primary": ["checked"],
      "Rating": 3,
      "TargetComplete": 80
    },
    {
      "DepartmentId": 70,
      "DepartmentName": "Operations 9",
      "LocationId": 400,
      "ManagerId": 6001,
      "StartDate": "2015-05-24",
      "EmployeeCount": 334,
      "Type": "Sales",
      "Currency": "EUR",
      "Primary": [],
      "Rating": 2,
      "TargetComplete": 60
    },
    {
      "DepartmentId": 80,
      "DepartmentName": "Sales and Marketing 18",
      "LocationId": 500,
      "ManagerId": 4001,
      "StartDate": "2017-03-25",
      "EmployeeCount": 211,
      "Type": "Finance",
      "Currency": "JPY",
      "Primary": [],
      "Rating": 1,
      "TargetComplete": 70
    },
    {
      "DepartmentId": 90,
      "DepartmentName": "Inventory 6",
      "LocationId": 400,
      "ManagerId": 5001,
      "StartDate": "2017-12-18",
      "EmployeeCount": 429,
      "Type": "Finance",
      "Currency": "EUR",
      "Primary": ["checked"],
      "Rating": 1,
      "TargetComplete": 70
    }];
      this.dataprovider = new ArrayDataProvider(this.deptArray, {
          keyAttributes: "DepartmentId",
          implicitSort: [{ attribute: "DepartmentId", direction: "ascending" }],
      });

    }
      return ServicesViewModel;
  }
);
