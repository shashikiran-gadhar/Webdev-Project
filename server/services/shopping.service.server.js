/**
 * Created by raghu on 2/8/2017.
 */
module.exports =  function(app, ShoppingModel) {
    app.post("/api/host/:hostId/event/:eventId/shopping/add", addItem);
    /*app.get("/api/host/:hostId/shopping", findAllItemsForHost); */
    app.get("/api/event/:eventId/shopping", findAllItemsForEvent);
    app.get("/api/host/:hostId/shopping/:itemId", findItemsByItemId);
    app.put("/api/shopping/:id/quantity/:quantity", updateItemQuantity);
    app.delete("/api/shopping/delete/:id", deleteItem);
    app.put("/api/guest/:guestId/shopping/:id", claimItem);


    /*   app.get("/api/service/:serviceId", findServiceById);
        app.put("/api/service/:serviceId", updateService);
        app.delete("/api/service/:serviceId", deleteService);
        app.post("/api/vendor/:vendorId/service", createService);
        app.put("/api/service/:serviceId/page/:pageId", updatePage);*/

    function addItem(req, res) {
        var itemf = req.body;
        var hostId = req.params.hostId;
        var eventId = req.params.eventId;
        var itemPrice = itemf.salePrice;
        var quantity = itemf.quantity;
        var itemId = itemf.itemId;
        var iteminfo = {_host: hostId, item: itemf, itemId: itemId, _event: eventId, itemPrice: itemPrice, quantity: quantity};

        ShoppingModel.addItemForUser(iteminfo)
            .then(function (service) {
                res.json(service);
            }, function (err) {
                res.sendStatus(500).send(err);
            })

    }



    function findAllItemsForEvent(req, res) {
        var eventId = req.params.eventId;
        ShoppingModel.findAllItemsForEvent(eventId)
            .then(function (items) {
                res.json(items);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function findItemsByItemId(req, res) {
        var itemId = req.params.itemId;
        var hostId = req.params.hostId;
        ShoppingModel.findItemsByItemId(itemId, hostId)
            .then(function (item) {
                res.json(item);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function updateItemQuantity(req, res) {
        var id = req.params.id;
        var quantity = req.params.quantity;
        ShoppingModel.updateItemQuantity(id, quantity)
            .then(function (item) {
                res.json(item);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function claimItem(req, res) {
        var id = req.params.id;
        var guestId = req.params.guestId;
        ShoppingModel.claimItem(id, guestId)
            .then(function (item) {
                res.json(item);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function deleteItem(req, res) {
        var id = req.params.id;
        ShoppingModel.deleteItem(id)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            })

    }

  /*  function findServiceById(req, res) {
        var serviceId = req.params.serviceId;
        ServiceModel.findServiceById(serviceId)
            .then(function (service) {
                res.json(service);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }

    function updateService(req, res) {
        var serviceId = req.params.serviceId;
        var service = req.body;
        ServiceModel.updateService(serviceId, service)
            .then(function (service) {
                res.json(service);
            }, function (err) {
                res.sendStatus(500).send(err);
            })

    }

    function deleteService(req, res) {
        var serviceId = req.params.serviceId;
        ServiceModel.deleteService(serviceId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            })

    }

    function updatePage(req, res) {
        var serviceId = req.params.serviceId;
        var pageId = req.params.pageId;

        ServiceModel.updatePage(serviceId, pageId)
            .then(function (service) {
                res.send(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }*/
}

