sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast"
], function (Controller, Fragment, MessageToast) {
    "use strict";

    return Controller.extend("com.ign.employeedash.controller.employeeApp", {
        
        onInit: function () {
        },

        onOpenAddEmployeeDialog: function () {
            let oView = this.getView();

            if (!this.byId("addEmployeeDialog")) {
                Fragment.load({
                    id: oView.getId(),
                    name: "com.ign.employeedash.fragments.AddEmployee",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                this.byId("addEmployeeDialog").open();
            }
        },

        onSaveEmployee: async function () {
            let oView = this.getView();

            let oFirstName = this.byId("inputFirstName").getValue();
            let oLastName = this.byId("inputLastName").getValue();
            let oDateOfJoin = this.byId("inputJoinDate").getValue();
            let oDateOfBirth = this.byId("dobInput").getValue();
            let oAge = this.byId("inputAge").getValue();
            let oEmail = this.byId("inputEmail").getValue();
            let oDesignation = this.byId("inputDesignation").getValue();
            let oDepartment = this.byId("departmentInput").getValue();
            let oContactNo = this.byId("inputContactNo").getValue();
            if (oFirstName && oLastName && oDateOfBirth && oAge && oEmail && oDesignation && oDepartment && oContactNo) {
                let oEmployee = {
                    firstName: oFirstName,
                    lastName: oLastName,
                    dateOfJoin: oDateOfJoin,
                    dateOfBirth: oDateOfBirth,
                    age: parseInt(oAge),
                    email: oEmail,
                    designation: oDesignation,
                    department: oDepartment,
                    contactNo: oContactNo
                };

                let oModel = this.getView().getModel();
                let resp =await this.createEntries(oEmployee)
                if(resp){
                    MessageToast.show("Employee added successfully.");
                    oView.byId("addEmployeeDialog").close();
                }
                else{
                    MessageToast.show("Error adding employee.");
                }

            } else {
                MessageToast.show("Please fill in all fields.");
            }
        },

        onCancel: function () {
            this.byId("addEmployeeDialog").close();
        },
        createEntries: async function (studentData) {
            let oModel = this.getView().getModel();
            console.log("Creating Entering.... ", studentData);
            console.log("Creating oModel.... ", oModel);

            let oBindList = oModel.bindList("/employees");
            let res = await oBindList.create(studentData);
            oModel.refresh()
            return res;
        },
    });
});
