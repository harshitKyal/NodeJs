const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Favourites = require('../models/favourite');
const Dishes = require('../models/dishes');
var authenticate = require('../authenticate');
const cors = require('./cors');

const favouriteRouter = express.Router();

favouriteRouter.use(bodyParser.json());

favouriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions,authenticate.verifyUser, (req,res,next) => {
    Favourites.findOne({user: req.user._id})
    .populate('user')
    .populate('dishes')
    .then((Favourites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(Favourites);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id})
    .then((favorite) => {
        if (favorite) {
            for (var i=0; i<req.body.length; i++) {
                if (favorite.dishes.indexOf(req.body[i]._id) === -1) {
                    favorite.dishes.push(req.body[i]._id);
                }
            }
            favorite.save()
            .then((favorite) => {
                Favourites.findById(favorite._id)
                .populate('user')
                .populate('dish')
                .then((favorite) =>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
            }, (err) => next(err)); 
        }
        else {
            Favourites.create({"user": req.user._id, "dishes": req.body})
            .then((favorite) => {
                Favourites.findById(favorite._id)
                .populate('user')
                .populate('dish')
                .then((favorite) =>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
            }, (err) => next(err));
        }
    }, (err) => next(err))
    .catch((err) => next(err));  
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Favourites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourites.findOneAndRemove({"user": req.user._id})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));   
});

favouriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Favourites.findOne({user:req.user._id})
        .then((favorite)=>{
            if(!favorite){
                res.statusCode=200;
                res.setHeader('Content-Type','application/json')
                return res.json({"exists":false,"favorites":favorite})
            }
            else{
                if(favorite.dishes.indexOf(req.params.dishId)< 0){
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json')
                    return res.json({"exists":false,"favorites":favorite})
                }
                else{
                    res.statusCode=200;
                    res.setHeader('Content-Type','application/json')
                    return res.json({"exists":true,"favorites":favorite})
                }
            }
        
        },(err) => next(err))
        .catch((err)=>next(err));
    })
    
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id})
    .then((favorite) => {
        if (favorite) {            
            if (favorite.dishes.indexOf(req.params.dishId) === -1) {
                favorite.dishes.push(req.params.dishId)
                favorite.save()
                .then((favorite) => {
                    Favourites.findById(favorite._id)
                    .populate('user')
                    .populate('dish')
                    .then((favorite) =>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favorite);
                    })
                    
                }, (err) => next(err))
            }
        }
        else {
            Favourites.create({"user": req.user._id, "dishes": [req.params.dishId]})
            .then((favorite) => {
                Favourites.findById(favorite._id)
                .populate('user')
                .populate('dish')
                .then((favorite) =>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
            }, (err) => next(err))
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Favourites/'+ req.params.dishId);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id})
    .then((favorite) => {
        if (favorite) {            
            index = favorite.dishes.indexOf(req.params.dishId);
            if (index >= 0) {
                favorite.dishes.splice(index, 1);
                favorite.save()
                .then((favorite) => {
                    console.log('Favorite Deleted ', favorite);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                }, (err) => next(err));
            }
            else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
        }
        else {
            err = new Error('Favourites not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = favouriteRouter;
