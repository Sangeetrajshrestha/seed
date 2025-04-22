
app.get('/:dest/:id', async (req, res) => {
    const modelName = req.params.dest.toLowerCase();
    const Model = modelMap[modelName];
    const populateFields = populateMap[modelName] || [];

    if (!Model) {
        return res.status(404).send('404 not found.');
    }

    const { id } = req.params;

    // ✅ Handle ?children=true to return related data
    if (req.query.children === 'true') {
        try {
            switch (modelName) {
                case 'units': {
                    const decisionSpaces = await decisionSpace.find({ unitId: id }, '_id name');
                    return res.json({ decisionSpaces });
                }
                case 'decisionspaces': {
                    const categories = await category.find({ decisionSpaceId: id }, '_id name');
                    return res.json({ categories });
                }
                case 'categories': {
                    const analysesList = await analysis.find({ categoryId: id }, '_id name');
                    return res.json({ analyses: analysesList });
                }
                case 'analyses': {
                    const foundAnalysis = await analysis.findById(id);
                    if (!foundAnalysis) return res.status(404).json({ error: 'Analysis not found' });

                    if (foundAnalysis.multipleScenarios && foundAnalysis.scenarios?.length > 0) {
                        return res.json({ scenarios: foundAnalysis.scenarios });
                    } else {
                        return res.json({ message: 'No multiple scenarios for this analysis.' });
                    }
                }
                default:
                    return res.status(400).json({ error: 'Unsupported destination type' });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    // ✅ Default behavior: render show.ejs with populated data
    try {
        let query = Model.findById(id);
        populateFields.forEach(field => {
            query = query.populate(field);
        });
        const data = await query.exec();
        res.render(`${modelName}/show`, { [modelName]: data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});


const analyses = [
  {
    "_id": "28ec82d8b1c14a1c8a6464c1",
    "name": "Virtual client-server installation",
    "unitId": "58b77ca396464f7597171cb5",
    "decisionSpaceId": "214a13d0f0a14893850abc78",
    "categoryId": "65c54dac50344f5086eeaeae",
    "analystId": "ad0f95fb89a54d8cbf225a89",
    "inputId": "bf2f924821164fabb1596a39",
    "aggregation": [
      {
        "quarter": "FYE25Q1",
        "minALE": 1649.24,
        "avgALE": 8049.01,
        "maxALE": 17356.82
      },
      {
        "quarter": "FYE25Q2",
        "minALE": 3676.47,
        "avgALE": 11664.37,
        "maxALE": 24860.84
      }
    ],
    "multipleScenarios": true,
    "scenarios": [],
    "riskDrivers": [
      "cultivate leading-edge initiatives",
      "extend distributed e-services",
      "enable magnetic e-services"
    ],
    "controls": [
      "Expanded didactic adapter",
      "User-friendly stable support"
    ],
    "tags": [
      "availability",
      "gtrm"
    ]
  },
  {
    "_id": "f031797c6155426da25a364d",
    "name": "Profit-focused well-modulated Graphical User Interface",
    "unitId": "c5eb5138f28b42629a6aeec0",
    "decisionSpaceId": "fc2787d1b0354e50bd187d5b",
    "categoryId": "4d7fc9fbed9d47469b3d7486",
    "analystId": "7297e237d1fb40389dbecab3",
    "inputId": "90787ab38c2c4677af60ec64",
    "aggregation": [
      {
        "quarter": "FYE25Q1",
        "minALE": 2417.41,
        "avgALE": 8909.47,
        "maxALE": 16390.83
      },
      {
        "quarter": "FYE25Q2",
        "minALE": 4667.64,
        "avgALE": 10415.22,
        "maxALE": 21179.92
      }
    ],
    "multipleScenarios": true,
    "scenarios": [],
    "riskDrivers": [
      "enhance intuitive relationships",
      "harness impactful partnerships",
      "revolutionize dot-com methodologies"
    ],
    "controls": [
      "Phased attitude-oriented help-desk",
      "Re-engineered intangible artificial intelligence"
    ],
    "tags": [
      "cyber-risk",
      "integrity",
      "fraud"
    ]
  },
  {
    "_id": "1b87fba6900d441588c5da21",
    "name": "Up-sized mission-critical matrix",
    "unitId": "f20d1e08275346fa8bc6307d",
    "decisionSpaceId": "3e487ff56d1946859c25c6f3",
    "categoryId": "e36057ef909a4a9db1637ebc",
    "analystId": "e4eab6d0500a4b149cc3c00c",
    "inputId": "872954fbcac4414b86865ea3",
    "aggregation": [
      {
        "quarter": "FYE25Q1",
        "minALE": 2288.44,
        "avgALE": 14054.15,
        "maxALE": 24761.17
      },
      {
        "quarter": "FYE25Q2",
        "minALE": 1969.0,
        "avgALE": 11485.14,
        "maxALE": 22660.44
      }
    ],
    "multipleScenarios": true,
    "scenarios": [],
    "riskDrivers": [
      "orchestrate efficient users",
      "optimize 24/365 initiatives",
      "productize web-enabled methodologies"
    ],
    "controls": [
      "Distributed 6thgeneration paradigm",
      "Grass-roots 6thgeneration portal"
    ],
    "tags": [
      "cyber-risk",
      "resilience"
    ]
  },
  {
    "_id": "dd91c8648cd5425fa48d66d2",
    "name": "Implemented foreground analyzer",
    "unitId": "2ffc8422127e41f9bb426f2e",
    "decisionSpaceId": "7c0f2075dc954972a3a4bb10",
    "categoryId": "c1287dc6181249658212b668",
    "analystId": "4a7fe5ea03a542db86041d52",
    "inputId": "cbace91427d94ae987d45480",
    "aggregation": [
      {
        "quarter": "FYE25Q1",
        "minALE": 4316.29,
        "avgALE": 12274.71,
        "maxALE": 29415.26
      },
      {
        "quarter": "FYE25Q2",
        "minALE": 3802.76,
        "avgALE": 11834.95,
        "maxALE": 22860.09
      }
    ],
    "multipleScenarios": true,
    "scenarios": [],
    "riskDrivers": [
      "drive customized synergies",
      "re-intermediate killer initiatives",
      "empower impactful infrastructures"
    ],
    "controls": [
      "Function-based fault-tolerant circuit",
      "Phased zero tolerance utilization"
    ],
    "tags": [
      "availability",
      "fraud",
      "compliance"
    ]
  },
  {
    "_id": "b83c8faf74dd4dbabf1ec590",
    "name": "User-centric 5thgeneration analyzer",
    "unitId": "c5d5d231436a46358f01b9f3",
    "decisionSpaceId": "3561067453554ae49566664a",
    "categoryId": "b7455248fdfc4a4c840de22a",
    "analystId": "f361bff9fad64762a97dec40",
    "inputId": "8d838a3329164fd8803900b7",
    "aggregation": [
      {
        "quarter": "FYE25Q1",
        "minALE": 2872.33,
        "avgALE": 10290.48,
        "maxALE": 29691.37
      },
      {
        "quarter": "FYE25Q2",
        "minALE": 3363.9,
        "avgALE": 5780.02,
        "maxALE": 23444.96
      }
    ],
    "multipleScenarios": true,
    "scenarios": [],
    "riskDrivers": [
      "grow enterprise functionalities",
      "drive world-class architectures",
      "cultivate e-business systems"
    ],
    "controls": [
      "Configurable maximized initiative",
      "Integrated analyzing data-warehouse"
    ],
    "tags": [
      "integrity",
      "data-loss"
    ]
  },
  {
    "_id": "5a0b914d9318402a9d1389be",
    "name": "Pre-emptive 24/7 knowledge user",
    "unitId": "29486fdcbf214d918dec7f7a",
    "decisionSpaceId": "c95b86078f0245208c60878c",
    "categoryId": "ef3bdccbfce34ecbac1976d2",
    "analystId": "9472b35f9d3c4c2dbacd5219",
    "inputId": "6aee32a28c524612a0583af0",
    "aggregation": [
      {
        "quarter": "FYE25Q1",
        "minALE": 2398.5,
        "avgALE": 11983.66,
        "maxALE": 19184.53
      },
      {
        "quarter": "FYE25Q2",
        "minALE": 3324.1,
        "avgALE": 12674.49,
        "maxALE": 24668.38
      }
    ],
    "multipleScenarios": true,
    "scenarios": [],
    "riskDrivers": [
      "evolve enterprise applications",
      "innovate enterprise communities",
      "scale strategic partnerships"
    ],
    "controls": [
      "Networked 3rdgeneration protocol",
      "Upgradable zero tolerance framework"
    ],
    "tags": [
      "gtrm",
      "confidentiality",
      "compliance",
      "availability"
    ]
  },
  {
    "_id": "1d6eaac1a7bc4c39a612655c",
    "name": "Synchronized reciprocal emulation",
    "unitId": "7489571cb4424662b4f4f6d5",
    "decisionSpaceId": "30fe2c0c7f73462fade2a2eb",
    "categoryId": "43135b7c184d4fd49eee1405",
    "analystId": "2532e9e7c5e941819c06af3c",
    "inputId": "453a1a51ddcc47f98abf56f4",
    "aggregation": [
      {
        "quarter": "FYE25Q1",
        "minALE": 2764.91,
        "avgALE": 13661.73,
        "maxALE": 19341.76
      },
      {
        "quarter": "FYE25Q2",
        "minALE": 3392.17,
        "avgALE": 7025.93,
        "maxALE": 17245.82
      }
    ],
    "multipleScenarios": true,
    "scenarios": [],
    "riskDrivers": [
      "extend rich e-tailers",
      "synergize ubiquitous platforms",
      "brand integrated e-tailers"
    ],
    "controls": [
      "Intuitive holistic groupware",
      "Re-contextualized asynchronous approach"
    ],
    "tags": [
      "gtrm",
      "incident-response",
      "integrity"
    ]
  },
  {
    "_id": "3769f7784f194fb09267981d",
    "name": "Reduced 5thgeneration superstructure",
    "unitId": "f2c4e6dfe6194b5fbb6302f6",
    "decisionSpaceId": "ffd96bdb3502470180199a9e",
    "categoryId": "5a24ab45ccd2468499d83faf",
    "analystId": "a7d01c02cd7b4284b3ffc95e",
    "inputId": "38a667b3714442b4b6f1a9eb",
    "aggregation": [
      {
        "quarter": "FYE25Q1",
        "minALE": 4116.45,
        "avgALE": 10364.03,
        "maxALE": 19708.12
      },
      {
        "quarter": "FYE25Q2",
        "minALE": 1872.42,
        "avgALE": 9488.81,
        "maxALE": 18990.63
      }
    ],
    "multipleScenarios": true,
    "scenarios": [],
    "riskDrivers": [
      "embrace cross-platform solutions",
      "re-contextualize end-to-end solutions",
      "seize compelling platforms"
    ],
    "controls": [
      "Profit-focused 24/7 workforce",
      "Exclusive client-server knowledgebase"
    ],
    "tags": [
      "availability",
      "compliance",
      "integrity"
    ]
  },
  {
    "_id": "9826872fa02047ebb50bd508",
    "name": "Optional maximized superstructure",
    "unitId": "67228e089b894d25a9aab9a6",
    "decisionSpaceId": "f97f035e77de42d5bc53cad8",
    "categoryId": "57b071786e7d4782ac0559bd",
    "analystId": "b60156aef8824bcb900cb4cc",
    "inputId": "ecdfc370c3004e1d8a011fcb",
    "aggregation": [
      {
        "quarter": "FYE25Q1",
        "minALE": 3525.47,
        "avgALE": 13956.28,
        "maxALE": 23513.98
      },
      {
        "quarter": "FYE25Q2",
        "minALE": 1162.85,
        "avgALE": 11245.0,
        "maxALE": 24482.15
      }
    ],
    "multipleScenarios": true,
    "scenarios": [],
    "riskDrivers": [
      "enable holistic eyeballs",
      "seize one-to-one ROI",
      "re-contextualize cross-media e-tailers"
    ],
    "controls": [
      "Pre-emptive dynamic portal",
      "Integrated solution-oriented moderator"
    ],
    "tags": [
      "data-loss",
      "resilience",
      "gtrm"
    ]
  },
  {
    "_id": "0337fdf557144cefa004ea2d",
    "name": "Reduced background attitude",
    "unitId": "2c81f003bb8d437cbef46808",
    "decisionSpaceId": "dda35dea79c440ecbcafa074",
    "categoryId": "2194261ae2e54698af4bbbb8",
    "analystId": "aba92db43e0e4c12a6ddb266",
    "inputId": "a86fe5bf0b20422584fc259f",
    "aggregation": [
      {
        "quarter": "FYE25Q1",
        "minALE": 4522.42,
        "avgALE": 8434.82,
        "maxALE": 16152.9
      },
      {
        "quarter": "FYE25Q2",
        "minALE": 3987.12,
        "avgALE": 14907.32,
        "maxALE": 28706.38
      }
    ],
    "multipleScenarios": true,
    "scenarios": [],
    "riskDrivers": [
      "re-intermediate scalable ROI",
      "productize impactful systems",
      "exploit strategic mindshare"
    ],
    "controls": [
      "Persistent empowering product",
      "Devolved leadingedge conglomeration"
    ],
    "tags": [
      "resilience",
      "integrity"
    ]
  }
];
module.exports.analyses = analyses;
