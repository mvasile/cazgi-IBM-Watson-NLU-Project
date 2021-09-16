const express = require('express');
const app = new express();

/*This tells the server to use the client 
folder for all static resources*/
app.use(express.static('client'));

/*This tells the server to allow cross origin references*/
const cors_app = require('cors');
app.use(cors_app());

/*Uncomment the following lines to loan the environment 
variables that you set up in the .env file*/

const dotenv = require('dotenv');
dotenv.config();

const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;
// NaturalLanguageUnderstanding instance 
function getNLUInstance() {
    /*Type the code to create the NLU instance and return it.
    You can refer to the image in the instructions document
    to do the same.*/
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-08-01',
        authenticator: new IamAuthenticator({
            apikey: apikey,
        }),
        serviceUrl: url,
    });

    return naturalLanguageUnderstanding;
}


//The default endpoint for the webserver
app.get("/",(req,res)=>{
    res.render('index.html');
  });

//The endpoint for the webserver ending with /url/emotion
app.get("/url/emotion", (req,res) => {
    //Extract the url passed from the client through the request object
    let urlToAnalyze = req.query.url
    const analyzeParams = 
        {
            "url": urlToAnalyze,
            "features": {
                "keywords": {
                                "emotion": true,
                                "limit": 1
                            }
            }
        }
     
     const naturalLanguageUnderstanding = getNLUInstance();
     
     naturalLanguageUnderstanding.analyze(analyzeParams)
     .then(analysisResults => {
        //Print the JSON returned by NLU instance as a formatted string
        console.log(JSON.stringify(analysisResults.result.keywords[0].emotion,null,2));
        //Please refer to the image to see the order of retrieval
        return res.send(analysisResults.result.keywords[0].emotion,null,2);
     })
     .catch(err => {
     return res.send("Could not do desired operation "+err);
     });
});

//The endpoint for the webserver ending with /url/sentiment
app.get("/url/sentiment", (req,res) => {
        let urlToAnalyze = req.query.url
    const analyzeParams = 
        {
            "text": urlToAnalyze,
            "features": {
                "keywords": {
                                "sentiment": true,
                                "limit": 1
                            }
            }
        }
     // initialyze instance naturalLanguageUnderstanding
     const naturalLanguageUnderstanding = getNLUInstance();
     
     naturalLanguageUnderstanding.analyze(analyzeParams)
     .then(analysisResults => {
        //Print the JSON returned by NLU instance as a formatted string
        console.log(JSON.stringify(analysisResults.result.keywords[0].sentiment,null,2));
        //Please refer to the image to see the order of retrieval
        return res.send(analysisResults.result.keywords[0].sentiment,null,2);
     })
     .catch(err => {
        return res.send("Could not do desired operation "+err);
     });
    //return res.send("url sentiment for "+req.query.url);
});

//The endpoint for the webserver ending with /text/emotion
app.get("/text/emotion", (req,res) => {

    //Extract the url passed from the client through the request object
    let textToAnalyze = req.query.text
    const analyzeParams = 
        {
            "text": textToAnalyze,
            "features": {
                "keywords": {
                                "emotion": true,
                                "limit": 1
                            }
            }
        }
     
     const naturalLanguageUnderstanding = getNLUInstance();
     
     naturalLanguageUnderstanding.analyze(analyzeParams)
     .then(analysisResults => {
        //Print the JSON returned by NLU instance as a formatted string
        console.log(JSON.stringify(analysisResults.result.keywords[0].emotion,null,2));
        //Please refer to the image to see the order of retrieval
        return res.send(analysisResults.result.keywords[0].emotion,null,2);
     })
     .catch(err => {
        return res.send("Could not do desired operation "+err);
     });

    //return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    //Extract the text passed from the client through the request object
    let textToAnalyze = req.query.text
    const analyzeParams = 
        {
            "text": textToAnalyze,
            "features": {
                "keywords": {
                                "sentiment": true,
                                "limit": 1
                            }
            }
        }
     
     const naturalLanguageUnderstanding = getNLUInstance();
     
     naturalLanguageUnderstanding.analyze(analyzeParams)
     .then(analysisResults => {
        //Print the JSON returned by NLU instance as a formatted string
        console.log(JSON.stringify(analysisResults.result.keywords[0].sentiment,null,2));
        //Please refer to the image to see the order of retrieval
        return res.send(analysisResults.result.keywords[0].sentiment,null,2);
     })
     .catch(err => {
        return res.send("Could not do desired operation "+err);
     });

    //return res.send("text sentiment for "+req.query.text);
});

// model JSON from https://cloud.ibm.com/apidocs/natural-language-understanding?utm_medium=Exinfluencer&utm_source=Exinfluencer&utm_content=000026UJ&utm_term=10006555&utm_id=NA-SkillsNetwork-Channel-SkillsNetworkCoursesIBMDeveloperSkillsNetworkCD0220ENSkillsNetwork20363180-2021-01-01&code=node#analyze
// {
//   "entities": [
//     {
//       "type": "Company",
//       "relevance": 0.89792,
//       "count": 12,
//       "name": "IBM",
//       "disambiguation": {
//         "name": "IBM",
//         "dbpedia_resource": "http://dbpedia.org/resource/IBM",
//         "subtype": [
//           "SoftwareLicense",
//           "OperatingSystemDeveloper",
//           "ProcessorManufacturer",
//           "SoftwareDeveloper",
//           "CompanyFounder",
//           "ProgrammingLanguageDesigner",
//           "ProgrammingLanguageDeveloper"
//         ]
//       },
//       "emotion": {
//         "sadness": 0.271362,
//         "joy": 0.618694,
//         "fear": 0.033186,
//         "disgust": 0.056113,
//         "anger": 0.099437
//       }
//     }
//   ],
//   "keywords": [
//     {
//       "emotion": {
//         "sadness": 0.174379,
//         "joy": 0.66067,
//         "fear": 0.051475,
//         "disgust": 0.114401,
//         "anger": 0.044105
//       },
//       "relevance": "0.900808",
//       "sentiment": {
//         "score": 0.419889
//       },
//       "text": "free trial",
//       "count": 1
//     }
//   ],
//   "language": "en",
//   "retrieved_url": "https://www.ibm.com/us-en/"
// }


let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

