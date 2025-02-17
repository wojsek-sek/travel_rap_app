sap.ui.define(["sap/ui/model/Filter", "sap/ui/model/FilterOperator"], function(Filter, FilterOperator) {
    "use strict";
    return {
        NameFunction: function(sValue) {
            let aFilters = [];
            sValue.forEach((value)=> { 
                switch (value) {
                    case "q":
                            aFilters.push(new Filter({ path: "TravelId", operator: FilterOperator.EQ, value1: "1" }));
                            break;
                    case "w":
                            aFilters.push(  new Filter({ path: "TravelId", operator: FilterOperator.EQ, value1: "2" }));
                            break;
                    case "e":
                            aFilters.push(new Filter({ path: "TravelId", operator: FilterOperator.EQ, value1: "3" }));
                            break;
                    default:
                        return null;
                }
            })
            let oFilter = new Filter({ filters: aFilters, and: false });
            
            return oFilter;
           
        }
    };
});
