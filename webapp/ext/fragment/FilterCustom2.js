sap.ui.define(["sap/ui/model/Filter", "sap/ui/model/FilterOperator"], function(Filter, FilterOperator) {
    "use strict";
    return {
        filterItems: function(sValue) {
            switch (sValue) {
                case "0":
                        return new Filter({ path: "CurrencyCode", operator: FilterOperator.EQ, value1: "USD"});
                case "1":
                        return  new Filter({ path: "CurrencyCode", operator: FilterOperator.EQ, value1: "EUR"});
                case "2":
                        return new Filter({ path: "CurrencyCode", operator: FilterOperator.EQ, value1: "PLN" });
            }
        }
    };
});
