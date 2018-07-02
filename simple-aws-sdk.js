module.exports = function(RED) {
  "use strict";
  function SimpleAWSSDK(n) {
    var AWS = require("aws-sdk");
    RED.nodes.createNode(this, n);
    var node = this;
    node.on("input", function (msg) {
      try {
        AWS.config.update(msg.aws.config);
        var targetService = new AWS[msg.aws.service]();
        var callback = function (err, data) {
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
          node.status({ fill: "blue", shape: "dot", text: "processing..." });
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
