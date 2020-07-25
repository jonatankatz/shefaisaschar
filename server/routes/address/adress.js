const express = require('express')
const router = express.Router()

const  israelCitiesDb = require("../../utils/israeli_street_and_cities_names.json")

const cities = israelCitiesDb.streets

router.use("/city",(req, res, next) => {   
    console.log(req.query)
    const queries = Object.keys(req.query).length
    if (!req.query.c || queries > 1 || typeof req.query.c != "string") return res.status(401).json({ error: "not a correct query params"})
   next()
})

router.use("/street", (req, res, next) => {
    console.log(req.query)
    const queries = Object.keys(req.query).length
    if (!req.query.c || queries > 2 ) return res.status(401).json({ error: "not a correct query params" })
    next()
})


router.get("/city", (req, res) => {
    const searchInput = req.query.c
    console.log(searchInput)
    const results  =   cities.filter(object => {
     return   object.city_name.startsWith(searchInput)
    })
    console.log(results)
    const arrayResult = results.map(obj => obj.city_name)
    const sortedResult = new Set(arrayResult)
    const result = [...sortedResult]
    return res.status(200).json({result})
})

router.get("/street", (req, res) => {
    const city = req.query.c
    const searchInput = req.query.s
    console.log(city)
    const CityResults = cities.filter(object => {
        return object.city_name  == city 
    })
    if (!searchInput){
     const   result = CityResults.map(obj=> obj.street_name)
        return res.status(200).json({ result })
    } 

    const results = CityResults.filter(streets =>{
        return streets.street_name.startsWith(searchInput)
    })
    console.log(results)
    const result = results.map(obj => obj.street_name)
    console.log(results)
    
    return res.status(200).json({ result })
})



module.exports = router;
