
define(["models/customers.model", "require", "knockout", "ojs/ojarraydataprovider",
  "ojs/ojlistdataproviderview", "text!../departmentData.json", "ojs/ojdataprovider", "ojs/ojknockout", "ojs/ojtable", "ojs/ojinputtext"],
  function (CustomersModel, require, ko, ArrayDataProvider, ListDataProviderView, deptData, ojdataprovider_1) {
    function CustomerViewModel() {
      var self = this;
      self.filter = ko.observable("");
      self.baseDeptArray = JSON.parse(deptData);
      self.generateDeptArray = (num) => {
        const deptArray = [];
        let count = 0;
        for (let i = 0; i < num; i++) {
          for (let j = 0; j < self.baseDeptArray.length; j++) {
            deptArray[count] = {
              DepartmentId: self.baseDeptArray[j].DepartmentId + count.toString(),
              DepartmentName: self.baseDeptArray[j].DepartmentName + count.toString(),
              LocationId: self.baseDeptArray[j].LocationId,
              ManagerId: self.baseDeptArray[j].ManagerId,
            };
            count++;
          }
        }
        return deptArray;
      };
      self.deptArray = self.generateDeptArray(1000);
      self.dataprovider = ko.computed(function () {
        let filterCriterion = null;
        if (self.filter() && self.filter() != "") {
          filterCriterion = ojdataprovider_1.FilterFactory.getFilter({
            filterDef: { text: self.filter() },
          });
        }
        const arrayDataProvider = new ArrayDataProvider(self.deptArray, { keyAttributes: "DepartmentId" });
        return new ListDataProviderView(arrayDataProvider, { filterCriterion: filterCriterion });
      }, self);
      self.handleValueChanged = () => {
        self.filter(document.getElementById("filter").rawValue);
      };
      self.highlightingCellRenderer = (context) => {
        let field = null;
        if (context.columnIndex === 0) {
          field = "DepartmentId";
        }
        else if (context.columnIndex === 1) {
          field = "DepartmentName";
        }
        else if (context.columnIndex === 2) {
          field = "LocationId";
        }
        else if (context.columnIndex === 3) {
          field = "ManagerId";
        }
        let data = context.row[field].toString();
        const filterString = self.filter();
        let textNode;
        let spanNode = document.createElement("span");
        if (filterString && filterString.length > 0) {
          const index = data.toLowerCase().indexOf(filterString.toLowerCase());
          if (index > -1) {
            const highlightedSegment = data.substr(index, filterString.length);
            if (index !== 0) {
              textNode = document.createTextNode(data.substr(0, index));
              spanNode.appendChild(textNode);
            }
            let bold = document.createElement("b");
            textNode = document.createTextNode(highlightedSegment);
            bold.appendChild(textNode);
            spanNode.appendChild(bold);
            if (index + filterString.length !== data.length) {
              textNode = document.createTextNode(data.substr(index + filterString.length, data.length - 1));
              spanNode.appendChild(textNode);
            }
          }
          else {
            textNode = document.createTextNode(data);
            spanNode.appendChild(textNode);
          }
        }
        else {
          textNode = document.createTextNode(data);
          spanNode.appendChild(textNode);
        }
        context.parentElement.appendChild(spanNode);
      };
      self.columnArray = [
        { headerText: "Department Id", renderer: self.highlightingCellRenderer },
        { headerText: "Department Name", renderer: self.highlightingCellRenderer },
        { headerText: "Location Id", renderer: self.highlightingCellRenderer },
        { headerText: "Manager Id", renderer: self.highlightingCellRenderer },
      ];


    }//end CustomerViewModel
    //##################################################  
    return CustomerViewModel;
  }
);
