const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require("cors")
const uuid = require("uuid")
const bodyParser = require('body-parser');

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.get('/product', (req, res) => {
    axios.all([
        axios.get('https://mamaearth.in/product/mamaearth-onion-shampoo-for-hair-growth-hair-fall-control-with-onion-oil-plant-keratin-250-ml'),
        axios.get('https://www.patanjaliayurved.net/product/natural-health-care/honey/patanjali-honey/696'),
        axios.get('https://mamaearth.in/product/baby-shampoo-online-india'),
        axios.get('https://mamaearth.in/product/ubtan-face-wash-with-turmeric-saffron-for-tan-removal-150-ml'),
        axios.get('https://www.amazon.in/dp/B07WHJ5X6Q/ref=redir_mobile_desktop?_encoding=UTF8&aaxitk=04ce3aecf72342f49ab470979bc72e02&content-id=amzn1.sym.f2e74a72-0286-402b-ae7d-4395a990fd1f%3Aamzn1.sym.f2e74a72-0286-402b-ae7d-4395a990fd1f&hsa_cr_id=7017425250402&pd_rd_plhdr=t&pd_rd_r=304af699-3205-4ccf-a533-363e419ed139&pd_rd_w=b1ue4&pd_rd_wg=qVeja&qid=1680649322&ref_=sbx_be_s_sparkle_lsi4d_asin_0_img&sr=1-1-e0fa1fdd-d857-4087-adda-5bd576b25987'),
        axios.get('https://www.flipkart.com/mamaearth-onion-oil-hair-regrowth/p/itm749cace003801?pid=HOLFGVGXFABZEGE2&lid=LSTHOLFGVGXFABZEGE2YXHSGR&marketplace=FLIPKART&q=mamaearth+onion+hair+oil&store=g9b%2Flcf%2Fqqm%2Ffmb&spotlightTagId=BestsellerId_g9b%2Flcf%2Fqqm%2Ffmb&srno=s_1_2&otracker=search&otracker1=search&fm=Search&iid=35c13cea-f83a-438c-82f9-c4a75ff0b9ac.HOLFGVGXFABZEGE2.SEARCH&ppt=sp&ppn=sp&ssid=89hie1qihs0000001680649857469&qH=8734639e9f20572b'),
        // axios.get('https://www.amazon.in/Patanjali-Honey-Pure-250g-Pack/dp/B01H1WXW2W/ref=sr_1_5?keywords=patanjali+honey+250+gm&qid=1680650263&sprefix=patanjali+honey+250%2Caps%2C217&sr=8-5'),
        // axios.get('https://www.flipkart.com/saffola-honey-gold-100-pure-nmr-tested-made-kashmir/p/itm0900f45f0da3c?pid=HNYGH9YPRM3NB6EH&lid=LSTHNYGH9YPRM3NB6EH6OJRYZ&marketplace=FLIPKART&q=patanjali+honey&store=eat%2Flnz&srno=s_1_2&otracker=search&otracker1=search&fm=search-autosuggest&iid=en_2R9d1o7Ax57LAaOTOWYp3fwUSSVxeQUEFIFkYlW3JIif%2FEqNr%2F4KMPsBUZDrVQMHnZr5BZajwqpNqNaCchEIMQ%3D%3D&ppt=sp&ppn=sp&ssid=blavq0dbfk0000001680650515553&qH=0b5781cd49199cd1')
    ])
    .then(axios.spread((mamaearth, patanjali,mambaby,mamface,mama1amaz,mama1flip) => {
        // res.status(200).json({ MamaEarth: mamaearth.data, Patanjali: patanjali.data, Tae : tae.data , Dabur : dabur.data});

        // const html1 = mamaearth.data;
        // const html2 = patanjali.data;
        // const html3 = tae.data;
        // const html4 = dabur.data;

      
        // res.send(html1);
      
            const $1 = cheerio.load(mamaearth.data);
            const mam_img = $1(".image-gallery-image img").attr();
            const mam_name =$1(".eLjxvm").text();
            const mam_price =$1(".price").text();

            const $2 = cheerio.load(patanjali.data);
            const pat_img = $2("#product-main").attr();
            const pat_name = $2("h3").text();
            const pat_price = $2(".mrp_price").text();

            const $3 = cheerio.load(mambaby.data);
            const mambaby_img = $3(".image-gallery-image img").attr();
            const mambaby_name = $3(".eLjxvm").text();
            const mambaby_price = $3(".price").text();

            const $4 = cheerio.load(mamface.data);
            const mamface_img = $4(".image-gallery-image img").attr();
            const mamface_name = $4(".eLjxvm").text();
            const mamface_price = $4(".price").text();

            const $5 = cheerio.load(mama1amaz.data);
            const mama1amaz_price = $5(".a-offscreen").text();

            const $6 = cheerio.load(mama1flip.data);
            const mama1flip_price = $6("._30jeq3._16Jk6d").text();
        
            // const $7 = cheerio.load(patamz.data);
            // const patamz_price = $7("a-price-whole");

            // const $8 = cheerio.load(patflip.data);
            // const patflip_price = $8("_30jeq3._16Jk6d")

            res.status(200);

            res.json([{
                "id" : 1,
                "name": "MamaEarth",
                "products1": mam_img.src,
                "products2" : mam_name,
                "products3" : mam_price.slice(1,4), 
                "products4" : mama1amaz_price.slice(1,4),
                "products5": mama1flip_price
                },
                {
                "id" : 2,
                "name" : "Patanjali Honey",
                "products1": pat_img.src,
                "products2" : pat_name,
                "products3" : pat_price,
                "products4" : "Rs 200",
                "products5" : "Rs 205"
                },
                {
                "id" : 3,
                "name" : "MamaEarth Baby Hair Oil",
                "products1": mambaby_img.src,
                "products2" : mambaby_name,
                "products3" : mambaby_price.slice(1,4),
                "products4" : "Rs 380",
                "products5" : "Rs 395"
                },
                {
                "id" : 4,
                "name" : "MamaEarth facewash",
                "products1": mamface_img.src,
                "products2" : mamface_name,
                "products3" : mamface_price.slice(1,4),
                "products4" : "Rs 388",
                "products5" : "Rs 375"
                }
            ]);

            
            
    

    }))
    .catch((err) => {
        res.status(500).json({ message: err });
    });

});

app.listen(9000,()=> {
    console.log("Server Started at 9000")
})