sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('zrap100ws7.ext.controller.TravelList', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf zrap100ws7.ext.controller.TravelList
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
			},
			onViewNeedsRefresh: function() { 
				this.base.getExtensionAPI().refreshView();
			},
			onAfterRendering: function() { 
				let aControls = this.getView().findAggregatedObjects(true)
				let filter = aControls.find((control)=> { 
					return control.isA("sap.ui.mdc.FilterBar")
				})
				filter.attachSearch(this.onSearch, this);

				var table = this.getView().byId("fe::table::tableView::LineItem")
				table.getAggregation("_content").attachEvent("rowsUpdated", ()=> { 
					let oRows = table.getAggregation("_content").getRows();
					oRows.forEach((row)=> { 
						let oContext = row.getBindingContext();
						if(oContext) { 
							let oData = oContext.getObject()
							if(oData.BookingFee === "120.00") { 
								row.addStyleClass("cssRow")
							} else { 
								row.removeStyleClass("cssRow")
							}
								
						}
					})
				})
				let oModel = table.getModel().bindList("/Travel")
				oModel.requestContexts().then((a)=> { 
						//console.log(a)
				})
			},
			routing: { 
				onAfterBinding: function() { 
				}
			}
		},
		onTableRefresh: function (event) {
			var collectionBindingInfoAPI = event.getParameter("collectionBindingInfo");
			var table = this.getView().byId("fe::table::tableView::LineItem")
			
		},
		onSearch: function(oEvent) {

			//let aControls = this.getView().findAggregatedObjects(true)
			//let oTable = aControls.find((control)=> { 
			//	return control.isA("sap.m.Table") || control.isA("sap.ui.mdc.Table")
			//})
			//let aFilters = [], aAllFilters = []
			//let oFilterConditions = oEvent.getSource().getFilterConditions();
			//Object.keys(oFilterConditions).forEach(key => {
			//	let aCondtions = oFilterConditions[key]; 
			//	aCondtions.forEach((oContidions) => { 
			//		let oFilter = new sap.ui.model.Filter(key, oContidions.operator, ...oContidions.values)
			//		aFilters.push(oFilter)
			//	})
			//});	
			//aAllFilters = [...aFilters]
			//console.log(this.base.getExtensionAPI().getFilters()		)
			//this.base.getExtensionAPI().createFiltersFromFilterConditions()
		},
		
		
	});
});
