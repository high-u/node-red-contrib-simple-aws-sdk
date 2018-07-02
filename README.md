# node-red-contrib-simple-aws-sdk

aws-sdk

## Usage

### Inputs

{
    "params": {
        "DeliveryStreamName": "foo-51-sensor-raw-data-stream",
        "Record": {
            "Data": "hogehoge\n"
        }
    },
    "async": false
}


#### AWS.Config

- msg.aws.config.accessKeyId
- msg.aws.config.secretAccessKey
- msg.aws.config.region

#### Service

- msg.aws.Service

#### Method

- msg.aws.Method

#### Params



### Outputs

#### nodemailer response

- msg.payload

## Example


```
[
    {
        "id": "4ee8f7d2.1711d8",
        "type": "simple-aws-sdk",
        "z": "4fd54dd0.9ec404",
        "name": "simple aws-sdk",
        "x": 480,
        "y": 144,
        "wires": [
            [
                "914b6496.cb84e8"
            ]
        ]
    },
    {
        "id": "cd5c6241.e822",
        "type": "template",
        "z": "4fd54dd0.9ec404",
        "name": "set aws-sdk",
        "field": "aws",
        "fieldType": "msg",
        "format": "json",
        "syntax": "mustache",
        "template": "{\n    \"config\": {\n        \"accessKeyId\": \"AKXXXXXXXXXXXXXXXXNQ\",\n        \"secretAccessKey\": \"flxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrF\",\n        \"region\": \"us-east-1\"\n    },\n    \"service\": \"Firehose\",\n    \"method\": \"putRecord\",\n    \"params\": {\n        \"DeliveryStreamName\": \"foo-51-sensor-raw-data-stream\",\n        \"Record\": {\n            \"Data\": \"foobar\\n\"\n        }\n    },\n    \"async\": false\n}\n",
        "output": "json",
        "x": 294,
        "y": 144,
        "wires": [
            [
                "4ee8f7d2.1711d8"
            ]
        ]
    },
    {
        "id": "387bb3d6.ea298c",
        "type": "inject",
        "z": "4fd54dd0.9ec404",
        "name": "inject",
        "topic": "",
        "payload": "",
        "payloadType": "str",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 130,
        "y": 144,
        "wires": [
            [
                "cd5c6241.e822"
            ]
        ]
    },
    {
        "id": "914b6496.cb84e8",
        "type": "debug",
        "z": "4fd54dd0.9ec404",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 678,
        "y": 144,
        "wires": []
    }
]
```
