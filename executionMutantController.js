// setPruebasController.js
// Import model
Execution = require('./executionMutantModel');
// Handle index actions
exports.index = function (req, res) {
    if(req.query && req.query.state){
        Execution.find({state:req.query.state}, function (err, executions) {
            if (err){
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Executions by state",
                data: executions
            });
        });
    }else{
        Execution.get(function (err, executions) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Collection of executions",
                data: executions
            });
        });
    }
};
// Handle create exceution actions
exports.new = function (req, res) {
    var execution = new Execution(req.body);
    execution.state="Register";
    // save the app and check for errors
    execution.save(function (err) {
        if (err)
             res.json(err);
        res.json({
            message: 'New execution created!',
            data: execution
        });
    });
};
// Handle view execution info
exports.view = function (req, res) {
    Execution.findById(req.params.execution_id, function (err, execution) {
        if (err)
            res.send(err);
        res.json({
            message: 'Execution details..',
            data: execution
        });
    });
};
// Handle update execution info
exports.update = function (req, res) {
    Execution.findById(req.params.execution_id, function (err, execution) {
        if (err)
            res.send(err);
            execution.type = req.body.type;
            execution.aplication_id = req.body.aplication_id;
            execution.test_id = req.body.test_id;
            execution.state = req.body.state;
        
        // save the execution and check for errors
        execution.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Execution updated',
                data: execution
            });
        });
    });
};

// Handle execution app
exports.delete = function (req, res) {
    Execution.remove({
        _id: req.params.execution_id
    }, function (err, execution) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Execution deleted'
        });
    });
};