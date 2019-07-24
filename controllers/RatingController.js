const express=require('express');
const Rating =require('../models/Rating');
const router = express.Router();
const handler = require('../utils/Errorhandler');
const Service = require('./../models/Service');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// rate a service

router.post('/rate',(req,res)=>{
    var userId = handler.validateAccessToken(req, res);
    var serviceid=req.body.serviceid;
    var rating=req.body.rating;
    
    Rating.create({
        customerid:userId,
        serviceid:serviceid,
        rating:rating

    }).then(response => {
        var jsonString = JSON.stringify(response); //convert to string to remove the sequelize specific meta data
        var obj = JSON.parse(jsonString);
        salonGraph.insertServiceGraph(obj);
        console.log(jsonString);
        return res.json(response);
    })
        .catch(error => handler.handleError(res, 500, error.message));
}
);

module.exports = router;
