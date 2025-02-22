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
				const oRouter = this.base.getAppComponent().getRouter();
				oRouter.getRoute("TravelList").attachPatternMatched(this._onPatternMatched, this);
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
			// routing functions like onAfterBinding, onBeforeBinding, onBeforeNavigation
			routing: { 
				onAfterBinding: function(oEvent) { 
					let oTable, oView = this.base.getView();
					oView.findAggregatedObjects(true, (oControl) => { 
						if(oControl.isA("sap.ui.mdc.Table")) { 
							oTable = oControl;
							return true;
						} 
						return false;
					})
	
					if(oTable) { 
						let observer = new MutationObserver(() => { 
							let oBinding = oTable.getBinding("rows"); 

							if(oBinding) { 
								console.log("asddas")
								console.log(oBinding)
								// cos tam kiedt ready 
								observer.disconnect();
							}
						});

						observer.observe(oTable, { attributes: true, childList: true, subtree: true})
					}
				}
			}
		},
		onTableRefresh: function (event) {
			var collectionBindingInfoAPI = event.getParameter("collectionBindingInfo");
			var table = this.getView().byId("fe::table::tableView::LineItem")
			
		},
		_onPatternMatched: function(oEvent) { 
			const oArguments = oEvent.getParameter("arguments");
			this.base.getView().attachEvent("modelContextChange", this._onBindingViewChange, this);
		},
		_onBindingViewChange: function() { 
			//here logic when model Change
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
