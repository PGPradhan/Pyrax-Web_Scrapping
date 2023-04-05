const express = require("express");
const axios  = require("axios");
const app = express();
const bodyParser = require('body-parser');
const cheerio = require("cheerio");


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

 
// // Set the URLs to access
// let urls = [
//   "https://mamaearth.in/product/mamaearth-onion-shampoo-for-hair-growth-hair-fall-control-with-onion-oil-plant-keratin-250-ml",
//   "https://www.patanjaliayurved.net/category/honey/153?utm_source=short%20banner%20honey&utm_medium=shortbanner&utm_campaign=honey",
//   "https://tae.in/products/varaasa-nirujam-joint-care-oil?currency=INR&utm_medium=cpc&utm_source=google&utm_campaign=Google%20Shopping&utm_source=google&utm_medium=cpc&utm_campaign=16166723715&utm_term=EA-VARAASA-NIRUJAM&gclid=EAIaIQobChMI1Lb1rc2Q_gIVlayWCh2chAuyEAQYBCABEgLJCPD_BwE",
//   "https://www.daburshop.com/dabur-all-products/fc50290003"
// ];
// /*
// | Perform the HTTP get request via Axios
// | It returns a Promise immediately,
// | not the response
// */
// const requests = urls.map((url) => axios.get(url));
// /*
// | For waiting the Promise is fulfilled
// | with the Response, use the then() method.
// | If the HTTP request received errors
// | use catch() method
// */
// app.get("/product",(req,res) => 
// axios.all(requests).then((responses) => {
//   responses.forEach((resp) => {
//     // url: resp.config.url
//     // method: "get";
//     let msg = {
//       server: resp.headers.server,
//       status: resp.status,
//     //   fields: Object.keys(resp.data).toString(),
//     }
//     res.send(resp.config.url)
//     console.log(resp.config.url);
//     console.log(msg);
//   });
// }));


app.get('/product', (req, res) => {
    axios.all([
        axios.get('https://mamaearth.in/product/mamaearth-onion-shampoo-for-hair-growth-hair-fall-control-with-onion-oil-plant-keratin-250-ml'),
        axios.get('https://www.patanjaliayurved.net/product/natural-health-care/honey/patanjali-honey/696'),
        axios.get('https://mamaearth.in/product/baby-shampoo-online-india'),
        axios.get('https://mamaearth.in/product/ubtan-face-wash-with-turmeric-saffron-for-tan-removal-150-ml')

    ])
    .then(axios.spread((mamaearth, patanjali,mambaby,mamface) => {
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
            const mambaby_img = $3(".image-gallery-image").attr();
            const mambaby_name = $3(".eLjxvm").text();
            const mambaby_price = $3(".price").text();

            const $4 = cheerio.load(mamface.data);
            const mamface_img = $4(".image-gallery-image").attr();
            const mamface_name = $4(".eLjxvm").text();
            const mamface_price = $4(".price").text();
        

            res.status(200);

            res.json([{
                "id" : 1,
                "name": "MamaEarth",
                "products1": mam_img.src,
                "products2" : mam_name,
                "products3" : mam_price.slice(1,4),  
                },
                {
                "id" : 2,
                "name" : "Patanjali Honey",
                "products1": pat_img.src,
                "products2" : pat_name,
                "products3" : pat_price.slice(0,16)
                },
                {
                "id" : 3,
                "name" : "MamaEarth Baby Hair Oil",
                "products1": mambaby_img.src,
                "products2" : mambaby_name,
                "products3" : mambaby_price.slice(1,4)
                },
                {
                "id" : 4,
                "name" : "MamaEarth facewash",
                "products1": mamface_img.src,
                "products2" : mamface_name,
                "products3" : mamface_price.slice(1,4)
                    }
            ]);

            
            
    

    }))
    .catch((err) => {
        res.status(500).json({ message: err });
    });

});

app.listen(9001,()=> {
    console.log("Server Started at 9001")
})
