sap.ui.define([
    "sap/ui/test/opaQunit"
], function (opaTest) {
    "use strict";

    var Journey = {
        run: function() {
            QUnit.module("First journey");

            opaTest("Start application", function (Given, When, Then) {
                Given.iStartMyApp("zrap100ws7-tile");

                Then.onTheTravelList.iSeeThisPage();

            });


            opaTest("#1: ListReport: Check List Report Page loads", function (Given, When, Then) {
                // Note: this test will fail if the ListReport page doesn't show any data
                
                When.onTheTravelList.onFilterBar().iExecuteSearch();
    
                Then.onTheTravelList.onTable({ 
                    id: "tableView", 
                    success: function(oTable) { 
                        Opa5.assert.ok(oTable, "table is found")
                    }
                })

                When.onTheTravelList.onFilterBar()
                    .iChangeFilterField("Total Price", "11.34" )
                    .and.iExecuteSearch();

                When.onTheTravelList.onFilterBar()
                    .iChangeFilterField("Total Price", "", true)
                    .and.iExecuteSearch();

                Then.onTheTravelList.onTable("tableView")
                    .iCheckRows(1);

                Then.onTheTravelList.onTable().iCheckRows(5);

                When.onTheTravelList.onTable()
                    .iSelectRows({ "Customer": "Ryan (594)" })
                    .and.iExecuteDelete();
                When.onTheTravelList.onDialog().iConfirm();

                When.onTheTravelList.onTable().iPressRow({ "Customer": "Ryan (594)" });

                /////////////////////////////////////////////

                Then.onTheTravelObjectPage
                .iSeeThisPage()
                .and.onHeader().iCheckTitle("Business Trip for Christine, Pierre")
                .and.iCheckEdit({ visible: true, enabled: true });

            });

            opaTest('#2: Object Page: Check Object Page loads', function(Given, When, Then) {

            Then.onTheTravelObjectPage
                .iSeeThisPage()
                .and.iCheckEdit({ visible: true, enabled: true })
                .and.then.onForm("General Information").iCheckField("Agency ID", "Some fancy new name (70010)")
                .and.then.onForm({ section: "GeneralInfo", fieldGroup: "Travel" }).iCheckField({ property: "AgencyID" }, { value: "70010", description: "Some fancy new name" });

                When.onTheTravelObjectPage.iGoToSection("General Information");
                When.onTheTravelObjectPage.onHeader().iExecuteEdit();
                When.onTheTravelObjectPage.onForm({ section: "GeneralInfo", fieldGroup: "Dates" }).iChangeField({ property: "EndDate" }, "Aug 31, 2021");
                When.onTheTravelObjectPage.onFooter().iExecuteSave();
                Then.iSeeMessageToast("Object saved.");
                Then.onTheTravelObjectPage.onForm({ section: "GeneralInfo", fieldGroup: "Dates" }).iCheckField({ property: "EndDate" }, { value: "Aug 31, 2021" })

                When.onTheShell.iNavigateBack();
                Then.onTheTravelList.iSeeThisPage();
              
            });

            opaTest("Teardown", function (Given, When, Then) { 
                // Cleanup
                Given.iTearDownMyApp();
            });
        }
    }

    return Journey;
});