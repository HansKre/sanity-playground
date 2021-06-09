# Nextjs-Server

Serves as a backend to host some APIs for sanity.

## Installation

```bash
git clone <repourl>
npm install
npm run dev
```

## Code fix

In order for the html-tag to be picked up by `@sanity/block-tools` perform following fix on `next-server/node_modules/@sanity/block-tools/lib/constants.js`:

```diff
var HTML_DECORATOR_TAGS = {
    b: 'strong',
    strong: 'strong',
    i: 'em',
    em: 'em',
    u: 'underline',
    s: 'strike-through',
    strike: 'strike-through',
    del: 'strike-through',
    code: 'code',
+   sup: 'sup'
};
```

## Getting Started

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API routes

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Example Usage of the API

### convert

* `GET` to `http://localhost:3000/api/convert`
* body

```json
{
    "html1": "<h1>Amazing</h1><a href='https://google.com' target=_blank><img src='img_girl.jpg' alt='Girl in a jacket' width='500' height='600'></a><br><a href='second/link.com'>Click on me</a>",
    "html": "<p>Some string with a blank at the end </p>",
    "categoryName": "New Category",
    "categoryDetails": "Some Details",
    "decorators": [
        {
            "title": "Strong",
            "value": "strong"
        },
        {
            "title": "Emphasis",
            "value": "em"
        },
        {
            "title": "Code",
            "value": "code"
        },
        {
            "title": "Underline",
            "value": "underline"
        },
        {
            "title": "Strike",
            "value": "strike-through"
        }
    ],
    "styles": [
        {
            "title": "Normal",
            "value": "normal"
        },
        {
            "title": "Heading 1",
            "value": "h1"
        },
        {
            "title": "H2",
            "value": "h2"
        },
        {
            "title": "H3",
            "value": "h3"
        },
        {
            "title": "H4",
            "value": "h4"
        },
        {
            "title": "H5",
            "value": "h5"
        },
        {
            "title": "H6",
            "value": "h6"
        },
        {
            "title": "Quote",
            "value": "blockquote"
        }
    ]
}
```

### create

* `POST` to `http://localhost:3000/api/create`
* body

```json
{
    "blockStyles": {
        "styles": [
            {
                "title": "Superscript",
                "value": "sup"
            }
        ],
        "lists": [],
        "marks": {
            "decorators": [
                {
                    "title": "Fett",
                    "value": "strong"
                },
                {
                    "title": "Hochgestellt",
                    "value": "sup"
                }
            ],
            "annotations": []
        }
    },
    "categories": [
        {
            "category": "Vorspeisespezialitäten",
            "categoryDetails": "",
            "categoryMeals": [
                {
                    "meal": "<b>Zaziki</b> (griechischer Joghurt<sup>g</sup> mit Gurken und Knoblauch)",
                    "price": "3,70"
                },
                {
                    "meal": "<b>Peperoni</b><sup>6</sup>",
                    "price": "2,70"
                },
                {
                    "meal": "<b>Oliven</b>",
                    "price": "2,70"
                },
                {
                    "meal": "<b>Gebratene Zucchini</b> (paniert<sup>a,c,g</sup>) mit Zaziki<sup>g</sup>",
                    "price": "5,10"
                },
                {
                    "meal": "<b>Gebratene Auberginen</b> (paniert<sup>a,c,g</sup>) mit Zaziki<sup>g</sup>",
                    "price": "5,10"
                },
                {
                    "meal": "<b>Gebratene Paprika</b> mit Zaziki<sup>g</sup>",
                    "price": "5,10"
                },
                {
                    "meal": "<b>Tyrokafteri</b><sup>c,g,k</sup> (scharfe Käsepaste)",
                    "price": "3,90"
                },
                {
                    "meal": "<b>Spanakopitakia</b><sup>a</sup> (Blätterteig gefüllt mit Spinat und Käse<sup>g</sup>)",
                    "price": "4,80"
                },
                {
                    "meal": "<b>Warme Vorspeisen Platte für 2 Pers.</b> (verschiedene warme Vorspeisen)<sup>a,c,g</sup>",
                    "price": "7,90"
                },
                {
                    "meal": "<b>Skordopsomo</b><sup>3,a,g</sup> (Knoblauchbrot - ideal zu einer Vorspeise)",
                    "price": "2,00"
                }
            ]
        },
        {
            "category": "Salate",
            "categoryDetails": "",
            "categoryMeals": [
                {
                    "meal": "<b>Dionysos-Salat</b> (gemischter Salat mit gegrillten Putenbruststreifen)",
                    "price": "9,20"
                },
                {
                    "meal": "<b>Grosser Bauernsalat</b> (gemischt, nach griechischer Art)",
                    "price": "7,20"
                },
                {
                    "meal": "<b>Kleiner Bauernsalat</b> (gemischt, nach griechischer Art)",
                    "price": "4,70"
                },
                {
                    "meal": "<b>Grosser gemischter grüner Salat</b>",
                    "price": "3,50"
                },
                {
                    "meal": "<b>Krautsalat</b> (Beilagensalat)",
                    "price": "2,50"
                },
                {
                    "meal": "<b>Gemischter Salat</b> (Beilagensalat)",
                    "price": "2,60"
                }
            ]
        },
        {
            "category": "Käsespezialitäten",
            "categoryDetails": "",
            "categoryMeals": [
                {
                    "meal": "<b>Feta</b> (Schafskäse<sup>g</sup> mit Tomatenscheibe, Oliven und Peperoni<sup>6</sup>)",
                    "price": "4,40"
                },
                {
                    "meal": "<b>Saganaki</b> (gebratener Käse<sup>g</sup>, paniert<sup>a,c,g</sup>)",
                    "price": "4,90"
                },
                {
                    "meal": "<b>Überbackener Käse</b><sup>g</sup> mit Tomaten, Zwiebeln und Peperoni<sup>6</sup> (pikant)",
                    "price": "5,80"
                }
            ]
        },
        {
            "category": "Beilagen",
            "categoryDetails": "(zu einem Hauptgericht)",
            "categoryMeals": [
                {
                    "meal": "<b>Pommes frites</b>",
                    "price": "2,50"
                },
                {
                    "meal": "<b>Reis</b> mit Tomatensauce",
                    "price": "2,70"
                },
                {
                    "meal": "<b>Grosse weisse Bohnen</b> mit Tomatensauce",
                    "price": "3,80"
                },
                {
                    "meal": "<b>Auberginen</b> mit Tomatensauce",
                    "price": "3,80"
                },
                {
                    "meal": "<b>Pitta</b><sup>3,a</sup> (Fladenbrot)",
                    "price": "1,90"
                }
            ]
        },
        {
            "category": "Fischspezialitäten",
            "categoryDetails": "(die Gerichte beinhalten einen gemischten Beilagensalat)",
            "categoryMeals": [
                {
                    "meal": "<b>Kalamaria</b><sup>a,o</sup> (Tintenfischringe) gebraten dazu Butterreis",
                    "price": "13,30"
                },
                {
                    "meal": "<b>Kalamaria</b><sup>a,o</sup><b> und Zungenfilet</b><sup>a,d</sup> gebraten dazu Butterreis",
                    "price": "14,20"
                },
                {
                    "meal": "<b>Zungenfilet</b><sup>a,d</sup> gebraten dazu Butterreis",
                    "price": "14,90"
                },
                {
                    "meal": "<b>Fischplatte</b> (Kalamaria<sup>a,o</sup>, Zungenfilet<sup>a,d</sup>, Scampis<sup>a, b</sup>)</td >",
                    "price": "18,60"
                }
            ]
        },
        {
            "category": "Spezialitäten des Hauses in der Pfanne serviert",
            "categoryDetails": "(die Gerichte beinhalten eine Portion Brot und einen gemischten Beilagensalat)",
            "categoryMeals": [
                {
                    "meal": "<b>Rinderleber</b> (geschnitten) in pikanter Sauce<sup>g</sup> mit Champignons",
                    "price": "11,70"
                },
                {
                    "meal": "<b>Hähnchenbrustfilet</b> (geschnitten) in pikanter Sauce<sup>g</sup> mit Champignons",
                    "price": "14,50"
                },
                {
                    "meal": "<b>Gyros</b> in Metaxasauce<sup>1,g</sup> mit Champignons",
                    "price": "13,70"
                },
                {
                    "meal": "<b>Fischplatte</b> (Kalamaria<sup>a,o</sup>, Zungenfilet<sup>a,d</sup>, Scampis<sup>a, b</sup>)",
                    "price": "18,60"
                }
            ]
        },
        {
            "category": "Grillspezialitäten",
            "categoryDetails": "(die Gerichte beinhalten einen gemischten Beilagensalat)",
            "categoryMeals": [
                {
                    "meal": "<b>Kotopoulo</b> (Hähnchenbrustfilet)<br>dazu Butterreis und Champignonrahmsauce<sup>5,7,a,g</sup>",
                    "price": "12,70"
                },
                {
                    "meal": "<b>Galopoulo</b> (Hähnchenbrustfilet)<br>dazu Butterreis und Champignonrahmsauce<sup>5,7,a,g</sup>",
                    "price": "12,40"
                },
                {
                    "meal": "<b>Suzuki</b> (griechisches Fleischküchle) dazu Tomatenreis",
                    "price": "9,80"
                },
                {
                    "meal": "<b>Bifteki</b> (gr. Fleischküchle gefüllt mit Schafskäse<sup>g</sup>) dazu Tomatenreis",
                    "price": "11,10"
                },
                {
                    "meal": "<b>Souflaki</b> (2 Fleischspieße) dazu Tomatenreis",
                    "price": "10,70"
                },
                {
                    "meal": "<b>Gyros</b> mit Zaziki<sup>g</sup> dazu Tomatenreis",
                    "price": "11,20"
                },
                {
                    "meal": "<b>Rinderleber</b> dazu Tomatenreis",
                    "price": "9,90"
                },
                {
                    "meal": "<b>Schweinesteak</b> dazu Tomatenreis",
                    "price": "11,40"
                },
                {
                    "meal": "<b>Lammkotelett</b> mit Zaziki<sup>g</sup> dazu Butterreis und ein Tomaten-/Gurkensalat",
                    "price": "18,80"
                }
            ]
        },
        {
            "category": "Gemischte Grillspezialitäten",
            "categoryDetails": "(die Gerichte beinhalten einen gemischten Beilagensalat)",
            "categoryMeals": [
                {
                    "meal": "<b>Dionysos Teller </b> (Souflaki und Gyros) dazu Tomatenreis",
                    "price": "11,60"
                },
                {
                    "meal": "<b>Hermes Teller</b> (Souflaki, Suzuki und Rinderleber) dazu Tomatenreis",
                    "price": "12,30"
                },
                {
                    "meal": "<b>Apollon Teller</b> (Souflaki, Suzuki und Gyros) dazu Tomatenreis",
                    "price": "12,90"
                },
                {
                    "meal": "<b>Spezial Teller</b> (Schweinesteak, Lammkotelett, Souflaki,<br>Suzuki) dazu Tomatenreis",
                    "price": "14,50"
                },
                {
                    "meal": "<b>Dorf Teller</b> (Schweinesteak, Souflaki, Gyros) mit Zaziki<sup>g</sup> dazu<br>Tomatenreis und ein Tomaten-/Gurkensalat",
                    "price": "14,90"
                },
                {
                    "meal": "<b>Marathon Teller</b> (2 Lammkotelett, Souflaki, Gyros) dazu Tomatenreis",
                    "price": "15,80"
                },
                {
                    "meal": "<b>Kreta Teller</b> (Souflaki, Rinderleber, Gyros) dazu Tomatenreis",
                    "price": "12,60"
                },
                {
                    "meal": "<b>Rhodos Platte für 2 Personen</b><br>(2 Lammkotelett, 2 Souflaki, 2 Suzuki, Gyros) dazu Tomatenreis und Zaziki<sup>g</sup>",
                    "price": "37,90"
                },
                {
                    "meal": "<b>Olympia Platte für 4 Personen</b><br>(4 Schweinesteak, 4 Lammkotelett, 4 Souflaki, 4 Suzuki, Gyros) dazu<br>Tomatenreis und Zaziki<sup>g</sup>",
                    "price": "81,80"
                }
            ]
        },
        {
            "category": "Schnitzel - Variationen",
            "categoryDetails": "(die Gerichte beinhalten einen gemischten Beilagensalat)",
            "categoryMeals": [
                {
                    "meal": "<b>Schweineschnitzel</b> paniert<sup>a,c,g</sup> dazu Pommes Frites",
                    "price": "11,30"
                },
                {
                    "meal": "<b>Schweineschnitzel</b> paniert<sup>a,c,g</sup> mit Jägersauce<sup>5,7,g</sup> dazu Pommes Frites",
                    "price": "12,30"
                },
                {
                    "meal": "<b>Schweineschnitzel</b> paniert<sup>a,c,g</sup> mit Bratensauce<sup>5,7,g</sup> dazu Pommes Frites",
                    "price": "12,30"
                }
            ]
        },
        {
            "category": "Kinder- und Seniorenspezialitäten",
            "categoryDetails": "",
            "categoryMeals": [
                {
                    "meal": "<b>Gyros</b> dazu Pommes Frites oder Tomatenreis",
                    "price": "5,80"
                },
                {
                    "meal": "<b>Fleischküchle</b> dazu Pommes Frites oder Tomatenreis",
                    "price": "4,90"
                },
                {
                    "meal": "<b>Hähnchenbrustfilet</b> dazu Pommes Frites oder Tomatenreis",
                    "price": "6,20"
                },
                {
                    "meal": "<b>Souflaki</b> dazu Pommes Frites oder Tomatenreis",
                    "price": "5,30"
                },
                {
                    "meal": "<b>Schweineschnitzel</b> paniert<sup>a,c,g</sup> dazu Pommes Frites",
                    "price": "5,50"
                }
            ]
        }
    ]
}
```

### delete

* `DELETE` to `http://localhost:3000/api/delete/${type}`
