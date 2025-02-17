sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('zrap100ws7.ext.controller.ObjectPageController', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf zrap100ws7.ext.controller.ObjectPageController
             */
			onBeforeRendering: function() { 
				let oModel = new sap.ui.model.json.JSONModel(); 
				oModel.loadData("../localService/data/Nodes.json")
				this.getView().setModel(oModel, "nodesModel")
			},
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
			},
			editFlow: { 
				onBeforeEdit: function() { 
					let that = this;
					return new Promise(
						function (resolve, reject) {
							this.base
								.getExtensionAPI()
								.loadFragment({ 
									name: "zrap100ws7.ext.fragment.DialogEditBefore",
									controller: this
								})
								.then(function (approveDialog) {
									that.dialog = approveDialog;
									approveDialog.getContent().at(0).getAggregation("items").at(0).start()
									//Dialog Continue button
									approveDialog.getBeginButton().attachPress(function () {
										approveDialog.close();
										resolve(null);
									});
									//Dialog Cancel button
									approveDialog.getEndButton().attachPress(function () {
										approveDialog.close().destroy();
										reject("Cancel Editing")
									});
									//consider dialog closing with Escape
									approveDialog.attachAfterClose(function () {
										approveDialog.destroy();
										reject("Cancel Editing")
									});
									approveDialog.open();
								});
						}.bind(this)
					);
				}
			}
		},
		clockOnFinish: async function() { 
			let oDialog =  await this.dialog; 
			oDialog.close();
		}
	});
});
