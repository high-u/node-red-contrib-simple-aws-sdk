module.exports = function(RED) {
  "use strict";

  function SimpleAWSSDK(n) {
    var AWS = require("aws-sdk");
    RED.nodes.createNode(this, n);
    var node = this;
    
    node.on("input", function (msg) {
      try {
        console.log(new Date().getTime());
        AWS.config.update(msg.aws.config);
        console.log(new Date().getTime());
        var targetService = new AWS[msg.aws.service]();

        var callback = function (err, data) {
          console.log(new Date().getTime());
          if (err) {
            node.status({ fill: "red", shape: "dot", text: "error" });
            node.error(err);
          } else {
            node.status({});
            msg.payload = data;
            node.send(msg);
          }
        }
        if (msg.aws.async) {
          if (msg.aws.operation) {
            targetService[msg.aws.method](msg.aws.operation, msg.aws.params);
          } else {
            targetService[msg.aws.method](msg.aws.params);
          }
          node.send(msg);
        } else {
          node.status({ fill: "blue", shape: "dot", text: "Processing..." });
          if (msg.aws.operation) {
            targetService[msg.aws.method](msg.aws.operation, msg.aws.params, callback);
          } else {
            targetService[msg.aws.method](msg.aws.params, callback);
          }
        }
      }
      catch (e) {
        node.status({ fill: "red", shape: "dot", text: "error" });
        node.error(e);
      }
    });
  }
  RED.nodes.registerType("simple-aws-sdk", SimpleAWSSDK);
};
